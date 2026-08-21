import { createSign } from "node:crypto";
import { mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const config = JSON.parse(await readFile(new URL("../config/resumes.json", import.meta.url), "utf8"));
const encodedCredentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON_BASE64;
const required = process.env.CI === "true" || process.env.REQUIRE_RESUME_EXPORT === "true";

if (!encodedCredentials) {
  if (required) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 is required to export resumes.");
  console.log("Resume export skipped: Google credentials are not configured locally.");
  process.exit(0);
}

const credentials = JSON.parse(Buffer.from(encodedCredentials, "base64").toString("utf8"));
const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
const now = Math.floor(Date.now() / 1000);
const unsigned = [
  encode({ alg: "RS256", typ: "JWT" }),
  encode({
    iss: credentials.client_email,
    scope: "https://www.googleapis.com/auth/drive.readonly",
    aud: credentials.token_uri || "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }),
].join(".");
const signer = createSign("RSA-SHA256");
signer.update(unsigned);
const assertion = unsigned + "." + signer.sign(credentials.private_key, "base64url");

const tokenResponse = await fetch(credentials.token_uri || "https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion,
  }),
});
if (!tokenResponse.ok) throw new Error(`Google token request failed: ${tokenResponse.status}`);
const { access_token: accessToken } = await tokenResponse.json();

for (const document of config.documents) {
  const endpoint = new URL(`https://www.googleapis.com/drive/v3/files/${document.documentId}/export`);
  endpoint.searchParams.set("mimeType", "application/pdf");
  const response = await fetch(endpoint, { headers: { authorization: `Bearer ${accessToken}` } });
  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Resume export failed for ${document.locale}: ${response.status} ${details}`,
    );
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 10_000 || bytes.subarray(0, 5).toString() !== "%PDF-") {
    throw new Error(`Invalid PDF exported for ${document.locale}`);
  }

  const destination = resolve(document.output);
  const temporary = destination + ".tmp";
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(temporary, bytes);
  await rename(temporary, destination);
  const result = await stat(destination);
  console.log(`Exported ${document.locale} resume (${result.size} bytes) to ${document.output}`);
}

