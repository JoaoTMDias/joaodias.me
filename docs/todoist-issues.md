# GitHub Issues to Todoist

This repository provides a reusable action that treats GitHub Issues as the source of truth and
Todoist as an execution layer. Adding the `todoist` label creates one Todoist task. Closing or
reopening the issue completes or reopens that same task. Changes made in Todoist are never
synchronized back to GitHub, and pull requests are always ignored.

The implementation uses TypeScript directly on the action's Node.js 24 runtime. Node 24 removes
erasable TypeScript types at runtime, so the action needs neither a bundle nor production
dependencies. It uses the current Todoist API v1 endpoints under
`https://api.todoist.com/api/v1`: `POST /tasks`, `POST /tasks/{task_id}/close`, and
`POST /tasks/{task_id}/reopen`. See the [Todoist API v1 reference](https://developer.todoist.com/api/v1/)
and [Node.js TypeScript documentation](https://nodejs.org/docs/latest-v24.x/api/typescript.html).

## Set up this repository

1. In Todoist, open **Settings → Integrations → Developer** and copy the personal API token. The
   [Todoist authorization documentation](https://developer.todoist.com/api/v1/#authorization)
   links directly to the integrations settings.
2. In GitHub, open **Settings → Secrets and variables → Actions**, create a repository secret named
   `TODOIST_API_TOKEN`, and paste the token. Never store the value in the repository.
3. In Todoist, confirm that the personal labels `✅_next` and `🧑🏻‍💻_pc` exist. Create either label
   in Todoist if it is missing; the action uses labels but deliberately does not manage them.
4. In GitHub, create an issue label named exactly `todoist`.

The workflow at `.github/workflows/todoist-issues.yml` is then ready for `labeled`, `closed`, and
`reopened` issue events. It grants only `contents: read` and `issues: write`. The Todoist token is
passed explicitly from `${{ secrets.TODOIST_API_TOKEN }}`. The workflow has no pull-request trigger,
so it does not expose the token to pull-request code or use `pull_request_target`.

## Use from another repository

After publishing a stable `v1` tag, another repository can use the action with this workflow:

```yaml
name: Sync issues to Todoist

on:
  issues:
    types: [labeled, closed, reopened]

permissions:
  contents: read
  issues: write

concurrency:
  group: todoist-issue-${{ github.repository }}-${{ github.event.issue.number }}
  cancel-in-progress: false

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: JoaoTMDias/joaodias.me/.github/actions/sync-issue-to-todoist@v1
        with:
          todoist-token: ${{ secrets.TODOIST_API_TOKEN }}
          github-token: ${{ github.token }}
          event-action: ${{ github.event.action }}
          issue: ${{ toJson(github.event.issue) }}
          repository: ${{ github.repository }}
          added-label: ${{ github.event.label.name }}
```

Each consuming repository needs its own `TODOIST_API_TOKEN` Actions secret. Alternatively, use an
organization secret whose repository access is limited to the intended consumers. Create the same
GitHub and Todoist labels described above for every consuming repository.

The optional action inputs `github-label` and `todoist-labels` customize the defaults. The latter is
a JSON array, for example `'["next", "computer"]'`.

## Publish version 1

Publishing is a manual maintainer operation and is not performed by this integration. After the
implementation is reviewed and merged, a maintainer can create an annotated immutable release tag
and a major-version tag on the reviewed commit:

```sh
git tag -a v1.0.0 -m "Release v1.0.0"
git tag -a v1 -m "Release v1"
git push origin v1.0.0 v1
```

For a later backward-compatible release, create a new immutable tag such as `v1.1.0`, review it,
then move `v1` to the same commit and push that tag with force. Moving a published tag affects every
consumer, so do it only with explicit authorization and after review. This task does not create or
push either tag.

## Association, idempotency, and recovery

The action stores the Todoist task ID in a bot-authored issue comment with a hidden marker:

```html
<!-- todoist-sync:task-id=<id> -->
```

It searches comments authored by `github-actions[bot]` before creation, so repeated event delivery
does not normally create duplicates while user-supplied markers are not trusted. Per-issue workflow
concurrency further reduces races. Do not edit or delete the association comment during normal use.

There is intentionally no Todoist-to-GitHub synchronization. Later edits to an issue title or body
are not copied to Todoist, and Todoist edits do not affect GitHub. If a linked Todoist task is
manually deleted, close/reopen operations fail clearly rather than replacing it implicitly. To
recover, first confirm that the task is truly gone, delete the bot association comment, then remove
and re-add the GitHub `todoist` label. Keep the newly created association comment.

Task creation and writing the association comment are separate API operations. A failure between
them can leave an unassociated Todoist task. Before retrying after such a failure, find the issue
number in Todoist and delete the orphan, then remove and re-add the GitHub label. Otherwise a retry
could create a duplicate. User-authored marker comments are deliberately ignored.
