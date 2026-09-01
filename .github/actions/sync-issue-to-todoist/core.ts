export interface IssueLabel {
	name: string | null;
}

export interface IssuePayload {
	number: number;
	title: string;
	html_url: string;
	labels: Array<IssueLabel | string>;
	pull_request?: unknown;
}

export interface IssueComment {
	body?: string | null;
	user?: { login?: string | null; type?: string | null } | null;
}

export interface GitHubClient {
	listIssueComments(issueNumber: number): Promise<IssueComment[]>;
	createIssueComment(issueNumber: number, body: string): Promise<unknown>;
}

export interface TodoistTaskInput {
	content: string;
	description: string;
	labels: string[];
}

export interface TodoistClient {
	createTask(task: TodoistTaskInput): Promise<{ id: string }>;
	closeTask(taskId: string): Promise<unknown>;
	reopenTask(taskId: string): Promise<unknown>;
}

export interface SynchronizationInput {
	action: string;
	addedLabel: string;
	issue: IssuePayload;
	repository: string;
	githubLabel: string;
	todoistLabels: string[];
	github: GitHubClient;
	todoist: TodoistClient;
	log?: (message: string) => void;
}

export type SynchronizationResult =
	| { operation: "ignore"; reason?: string }
	| { operation: "none"; taskId: string }
	| { operation: "missing-association" }
	| { operation: "create"; taskId: string }
	| { operation: "close" | "reopen"; taskId: string };

export const ASSOCIATION_MARKER = /<!-- todoist-sync:task-id=([^\s>]+) -->/;

export function findTaskId(comments: IssueComment[]): string | undefined {
	for (const comment of comments) {
		if (comment.user?.type !== "Bot" || comment.user.login !== "github-actions[bot]") continue;
		const match = comment.body?.match(ASSOCIATION_MARKER);
		if (match) return match[1];
	}

	return undefined;
}

export function issueHasLabel(issue: IssuePayload, labelName: string): boolean {
	return issue.labels.some(
		(label) => (typeof label === "string" ? label : label.name) === labelName,
	);
}

export function planSynchronization({
	action,
	addedLabel,
	issue,
	githubLabel,
	taskId,
}: {
	action: string;
	addedLabel: string;
	issue: IssuePayload;
	githubLabel: string;
	taskId?: string;
}): SynchronizationResult | { operation: "create" } {
	if (issue.pull_request) {
		return { operation: "ignore", reason: "Pull requests are not synchronized." };
	}

	if (action === "labeled") {
		if (addedLabel !== githubLabel) {
			return { operation: "ignore", reason: `The added label is not ${githubLabel}.` };
		}

		return taskId ? { operation: "none", taskId } : { operation: "create" };
	}

	if (action !== "closed" && action !== "reopened") {
		return { operation: "ignore", reason: `Unsupported event action: ${action}.` };
	}

	if (!issueHasLabel(issue, githubLabel)) {
		return { operation: "ignore", reason: `The issue does not have the ${githubLabel} label.` };
	}

	if (!taskId) return { operation: "missing-association" };

	return { operation: action === "closed" ? "close" : "reopen", taskId };
}

export function taskFromIssue(
	issue: IssuePayload,
	repository: string,
	todoistLabels: string[],
): TodoistTaskInput {
	return {
		content: `#${issue.number} — ${issue.title}`,
		description: `GitHub issue: ${issue.html_url}\nRepository: ${repository}`,
		labels: todoistLabels,
	};
}

export function associationComment(taskId: string): string {
	return [
		"This issue is linked to a Todoist task created automatically.",
		"",
		`<!-- todoist-sync:task-id=${taskId} -->`,
	].join("\n");
}

export async function synchronizeIssue({
	action,
	addedLabel,
	issue,
	repository,
	githubLabel,
	todoistLabels,
	github,
	todoist,
	log = console.log,
}: SynchronizationInput): Promise<SynchronizationResult> {
	if (issue.pull_request) {
		log("Ignoring pull request payload.");
		return { operation: "ignore" };
	}

	const shouldInspectAssociation =
		(action === "labeled" && addedLabel === githubLabel) ||
		((action === "closed" || action === "reopened") && issueHasLabel(issue, githubLabel));
	const taskId = shouldInspectAssociation
		? findTaskId(await github.listIssueComments(issue.number))
		: undefined;
	const plan = planSynchronization({ action, addedLabel, issue, githubLabel, taskId });

	switch (plan.operation) {
		case "ignore":
			log(plan.reason ?? "Event ignored.");
			return plan;
		case "none":
			log(`Issue already has an associated Todoist task (${plan.taskId}); nothing to create.`);
			return plan;
		case "missing-association":
			log(`No Todoist task association found for issue #${issue.number}; nothing to ${action}.`);
			return plan;
		case "create": {
			const task = await todoist.createTask(taskFromIssue(issue, repository, todoistLabels));
			if (!task?.id) throw new Error("Todoist created a task without returning its ID.");
			await github.createIssueComment(issue.number, associationComment(task.id));
			log(`Created and associated Todoist task ${task.id}.`);
			return { operation: "create", taskId: task.id };
		}
		case "close":
			await todoist.closeTask(plan.taskId);
			log(`Completed associated Todoist task ${plan.taskId}.`);
			return plan;
		case "reopen":
			await todoist.reopenTask(plan.taskId);
			log(`Reopened associated Todoist task ${plan.taskId}.`);
			return plan;
	}
}
