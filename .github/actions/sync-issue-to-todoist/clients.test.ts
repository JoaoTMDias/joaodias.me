import { afterEach, describe, expect, it, vi } from "vitest";
import { createGitHubClient, createTodoistClient } from "./clients.ts";

afterEach(() => {
	vi.unstubAllGlobals();
});

function response(body: unknown, status = 200): Response {
	return new Response(body === undefined ? undefined : JSON.stringify(body), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}

describe("Todoist API client", () => {
	it("uses the current API v1 task endpoints and payloads", async () => {
		const fetchMock = vi
			.fn<typeof fetch>()
			.mockResolvedValueOnce(response({ id: "task-id" }))
			.mockResolvedValueOnce(response(null))
			.mockResolvedValueOnce(response(null));
		vi.stubGlobal("fetch", fetchMock);
		const client = createTodoistClient("secret-token");
		const task = { content: "Task", description: "Details", labels: ["next"] };

		await client.createTask(task);
		await client.closeTask("task/id");
		await client.reopenTask("task/id");

		expect(fetchMock).toHaveBeenNthCalledWith(
			1,
			"https://api.todoist.com/api/v1/tasks",
			expect.objectContaining({ method: "POST", body: JSON.stringify(task) }),
		);
		expect(fetchMock).toHaveBeenNthCalledWith(
			2,
			"https://api.todoist.com/api/v1/tasks/task%2Fid/close",
			expect.objectContaining({ method: "POST" }),
		);
		expect(fetchMock).toHaveBeenNthCalledWith(
			3,
			"https://api.todoist.com/api/v1/tasks/task%2Fid/reopen",
			expect.objectContaining({ method: "POST" }),
		);
	});

	it("reports a status without including a token or sensitive response", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn<typeof fetch>().mockResolvedValue(response({ token: "leaked-response" }, 401)),
		);

		await expect(createTodoistClient("secret-token").closeTask("task-id")).rejects.toThrow(
			"Todoist API request failed with status 401.",
		);
		await expect(createTodoistClient("secret-token").closeTask("task-id")).rejects.not.toThrow(
			/secret-token|leaked-response/,
		);
	});
});

describe("GitHub API client", () => {
	it("paginates comments and creates a comment", async () => {
		const firstPage = Array.from({ length: 100 }, (_, id) => ({ body: String(id) }));
		const fetchMock = vi
			.fn<typeof fetch>()
			.mockResolvedValueOnce(response(firstPage))
			.mockResolvedValueOnce(response([{ body: "last" }]))
			.mockResolvedValueOnce(response({ id: 1 }, 201));
		vi.stubGlobal("fetch", fetchMock);
		const client = createGitHubClient("github-token", "owner/repo");

		await expect(client.listIssueComments(42)).resolves.toHaveLength(101);
		await client.createIssueComment(42, "marker");
		expect(fetchMock).toHaveBeenLastCalledWith(
			"https://api.github.com/repos/owner/repo/issues/42/comments",
			expect.objectContaining({ method: "POST", body: JSON.stringify({ body: "marker" }) }),
		);
	});
});
