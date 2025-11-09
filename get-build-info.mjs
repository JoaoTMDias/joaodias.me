import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function execGitCommand(command, fallback) {
	try {
		return execSync(command, { encoding: "utf-8", stdio: ["ignore", "pipe", "ignore"] })
			.toString()
			.trim();
	} catch {
		console.warn(`Warning: Failed to execute git command: ${command}`);
		if (fallback !== undefined && fallback !== null) {
			return fallback;
		}
		throw new Error(`Git command failed: ${command}`);
	}
}

function ensureDirectoryExists(filePath) {
	const dir = path.dirname(filePath);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
}

try {
	// Get the last Git commit hash and message
	const commitHash = execGitCommand("git rev-parse --short HEAD", "unknown");
	const commitMessage = execGitCommand("git log -1 --pretty=%B", "No commit message");
	const commitDate = execGitCommand("git log -1 --format=%cd --date=short", new Date().toISOString().split("T")[0]);

	// Get the deploy time (prefer Netlify environment variable, fallback to current time)
	const deployTime =
		process.env.NETLIFY_DEPLOY_TIME ||
		process.env.DEPLOY_TIME ||
		new Date().toISOString();

	// Prepare build info object
	const buildInfo = {
		commitHash,
		commitMessage,
		commitDate,
		deployTime,
	};

	// Write to a JSON file to use in your Astro project
	const outputPath = path.join(__dirname, "src", "data", "build-info.json");
	ensureDirectoryExists(outputPath);
	fs.writeFileSync(outputPath, JSON.stringify(buildInfo, null, 2), "utf-8");

	console.log("✓ Build info generated successfully");
	console.log(`  Commit: ${commitHash}`);
	console.log(`  Deploy: ${deployTime}`);
} catch (error) {
	console.error("Error generating build info:", error.message);
	process.exit(1);
}
