import { describe, expect, it, vi } from "vitest";
import {
	associationComment,
	type GitHubClient,
	type IssueComment,
	type IssuePayload,
	synchronizeIssue,
	type TodoistClient,
} from "./core.ts";

const issue: IssuePayload = {
	number: 42,
	title: "Fix the keyboard trap",
	html_url: "https://github.com/example/site/issues/42",
	labels: [{ name: "todoist" }],
};

function setup({ comments = [], task = { id: "task-123" } } = {}) {
	const botComments = (comments as IssueComment[]).map((comment) => ({
		user: { login: "github-actions[bot]", type: "Bot" },
		...comment,
	}));
	const github = {
		listIssueComments: vi.fn().mockResolvedValue(botComments),
		createIssueComment: vi.fn().mockResolvedValue({}),
	} satisfies GitHubClient;
	const todoist = {
		createTask: vi.fn().mockResolvedValue(task),
		closeTask: vi.fn().mockResolvedValue(undefined),
		reopenTask: vi.fn().mockResolvedValue(undefined),
	} satisfies TodoistClient;

	return { github, todoist, log: vi.fn() };
}

function run(
	clients: ReturnType<typeof setup>,
	overrides: Partial<Parameters<typeof synchronizeIssue>[0]> = {},
) {
	return synchronizeIssue({
		action: "labeled",
		addedLabel: "todoist",
		issue,
		repository: "example/site",
		githubLabel: "todoist",
		todoistLabels: ["✅_next", "🧑🏻‍💻_pc"],
		...clients,
		...overrides,
	});
}

describe("GitHub issue to Todoist synchronization", () => {
	it("creates a correctly populated task and persists its association", async () => {
		const clients = setup();

		await expect(run(clients)).resolves.toEqual({ operation: "create", taskId: "task-123" });
		expect(clients.todoist.createTask).toHaveBeenCalledWith({
			content: "#42 — Fix the keyboard trap",
			description:
				"GitHub issue: https://github.com/example/site/issues/42\nRepository: example/site",
			labels: ["✅_next", "🧑🏻‍💻_pc"],
		});
		expect(clients.github.createIssueComment).toHaveBeenCalledWith(
			42,
			associationComment("task-123"),
		);
	});

	it("does not duplicate a task when a bot association exists", async () => {
		const clients = setup({ comments: [{ body: associationComment("existing-task") }] });

		await expect(run(clients)).resolves.toMatchObject({ operation: "none" });
		expect(clients.todoist.createTask).not.toHaveBeenCalled();
	});

	it("does not trust an association marker written by a non-bot user", async () => {
		const clients = setup({
			comments: [{ body: associationComment("untrusted-task"), user: { type: "User" } }],
		});

		await expect(run(clients)).resolves.toEqual({ operation: "create", taskId: "task-123" });
	});

	it("safely repeats close and reopen for the same associated task", async () => {
		const clients = setup({ comments: [{ body: associationComment("existing-task") }] });

		await run(clients, { action: "closed", addedLabel: "" });
		await run(clients, { action: "closed", addedLabel: "" });
		await run(clients, { action: "reopened", addedLabel: "" });
		await run(clients, { action: "reopened", addedLabel: "" });
		expect(clients.todoist.closeTask).toHaveBeenCalledTimes(2);
		expect(clients.todoist.closeTask).toHaveBeenCalledWith("existing-task");
		expect(clients.todoist.reopenTask).toHaveBeenCalledTimes(2);
		expect(clients.todoist.reopenTask).toHaveBeenCalledWith("existing-task");
	});

	it.each(["closed", "reopened"])(
		"does nothing on %s when there is no association",
		async (action) => {
			const clients = setup();

			await expect(run(clients, { action, addedLabel: "" })).resolves.toEqual({
				operation: "missing-association",
			});
			expect(clients.todoist.createTask).not.toHaveBeenCalled();
			expect(clients.todoist.closeTask).not.toHaveBeenCalled();
			expect(clients.todoist.reopenTask).not.toHaveBeenCalled();
			expect(clients.log).toHaveBeenCalledWith(
				expect.stringContaining("No Todoist task association"),
			);
		},
	);

	it("ignores close events when the issue no longer has the GitHub label", async () => {
		const clients = setup({ comments: [{ body: associationComment("existing-task") }] });

		await expect(
			run(clients, { action: "closed", addedLabel: "", issue: { ...issue, labels: [] } }),
		).resolves.toMatchObject({ operation: "ignore" });
		expect(clients.github.listIssueComments).not.toHaveBeenCalled();
		expect(clients.todoist.closeTask).not.toHaveBeenCalled();
	});

	it("ignores pull requests without making API calls", async () => {
		const clients = setup();

		await expect(run(clients, { issue: { ...issue, pull_request: {} } })).resolves.toEqual({
			operation: "ignore",
		});
		expect(clients.github.listIssueComments).not.toHaveBeenCalled();
		expect(clients.todoist.createTask).not.toHaveBeenCalled();
	});

	it("only processes labeled events for the exact configured label", async () => {
		const clients = setup();

		await expect(run(clients, { addedLabel: "Todoist" })).resolves.toMatchObject({
			operation: "ignore",
		});
		expect(clients.github.listIssueComments).not.toHaveBeenCalled();
	});

	it("propagates API failures and does not write an association", async () => {
		const clients = setup();
		clients.todoist.createTask.mockRejectedValue(
			new Error("Todoist API request failed with status 500."),
		);

		await expect(run(clients)).rejects.toThrow("status 500");
		expect(clients.github.createIssueComment).not.toHaveBeenCalled();
	});
});
