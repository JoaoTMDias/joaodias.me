import type { GitHubClient, TodoistClient, TodoistTaskInput } from "./core.ts";

const TODOIST_API_URL = "https://api.todoist.com/api/v1";
const GITHUB_API_URL = "https://api.github.com";

async function apiRequest<T>(url: string, options: RequestInit, service: string): Promise<T> {
	const response = await fetch(url, options);
	if (!response.ok) {
		throw new Error(`${service} API request failed with status ${response.status}.`);
	}

	if (response.status === 204) return undefined as T;
	const text = await response.text();
	return (text ? JSON.parse(text) : undefined) as T;
}

export function createTodoistClient(token: string): TodoistClient {
	const request = <T>(path: string, body?: TodoistTaskInput) =>
		apiRequest<T>(
			`${TODOIST_API_URL}${path}`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				...(body && { body: JSON.stringify(body) }),
			},
			"Todoist",
		);

	return {
		createTask: (task) => request<{ id: string }>("/tasks", task),
		closeTask: (taskId) => request(`/tasks/${encodeURIComponent(taskId)}/close`),
		reopenTask: (taskId) => request(`/tasks/${encodeURIComponent(taskId)}/reopen`),
	};
}

export function createGitHubClient(token: string, repository: string): GitHubClient {
	const [owner, repo, ...rest] = repository.split("/");
	if (!owner || !repo || rest.length > 0) {
		throw new Error("Repository must use the owner/repo format.");
	}

	const request = <T>(path: string, options: RequestInit = {}) =>
		apiRequest<T>(
			`${GITHUB_API_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}${path}`,
			{
				...options,
				headers: {
					Accept: "application/vnd.github+json",
					Authorization: `Bearer ${token}`,
					"X-GitHub-Api-Version": "2022-11-28",
					...(options.body && { "Content-Type": "application/json" }),
				},
			},
			"GitHub",
		);

	return {
		async listIssueComments(issueNumber) {
			const comments = [];
			let page = 1;
			while (true) {
				const result = await request<Awaited<ReturnType<GitHubClient["listIssueComments"]>>>(
					`/issues/${issueNumber}/comments?per_page=100&page=${page}`,
				);
				comments.push(...result);
				if (result.length < 100) return comments;
				page += 1;
			}
		},
		createIssueComment: (issueNumber, body) =>
			request(`/issues/${issueNumber}/comments`, {
				method: "POST",
				body: JSON.stringify({ body }),
			}),
	};
}
