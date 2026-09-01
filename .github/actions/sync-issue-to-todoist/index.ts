import { createGitHubClient, createTodoistClient } from "./clients.ts";
import { type IssuePayload, synchronizeIssue } from "./core.ts";

function input(name: string, { required = true }: { required?: boolean } = {}): string {
	const value = process.env[`INPUT_${name.replaceAll(" ", "_").toUpperCase()}`]?.trim();
	if (required && !value) throw new Error(`Missing required input: ${name}.`);
	return value ?? "";
}

try {
	const todoistToken = input("todoist-token");
	const githubToken = input("github-token");
	const repository = input("repository");
	const issue = JSON.parse(input("issue")) as IssuePayload;
	const todoistLabels = JSON.parse(input("todoist-labels")) as unknown;
	if (!Array.isArray(todoistLabels) || todoistLabels.some((label) => typeof label !== "string")) {
		throw new Error("todoist-labels must be a JSON array of strings.");
	}

	await synchronizeIssue({
		action: input("event-action"),
		addedLabel: input("added-label", { required: false }),
		issue,
		repository,
		githubLabel: input("github-label"),
		todoistLabels,
		github: createGitHubClient(githubToken, repository),
		todoist: createTodoistClient(todoistToken),
	});
} catch (error) {
	console.error(
		`::error::${error instanceof Error ? error.message : "Unexpected synchronization error."}`,
	);
	process.exitCode = 1;
}
