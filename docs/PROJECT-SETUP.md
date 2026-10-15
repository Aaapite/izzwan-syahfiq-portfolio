# Set up the portfolio for future chats

Use the name **Izzwan Syahfiq Portfolio** in both places. The source of truth is [Aaapite/izzwan-syahfiq-portfolio](https://github.com/Aaapite/izzwan-syahfiq-portfolio).

## Codex: connect the actual repository folder

1. In the desktop app's Codex view, use **Add project / Add new project** (or **Ctrl+O**) and select this repository's root folder: the folder containing `AGENTS.md`, `package.json`, `src/` and `.git/`.
2. Name the local project **Izzwan Syahfiq Portfolio** and pin it if useful. Keep this repository as its primary folder.
3. Start a new chat inside that project. Ask: "Read AGENTS.md and summarize the repository, current state and available GitHub authentication."
4. For a change, ask: "Implement [my change] in this portfolio. Verify it, update the relevant docs, then commit and push to GitHub."

The root `AGENTS.md` gives future Codex chats the repository boundaries, owner preferences, file map and verification workflow. New chats have separate transcripts; the checked-in instructions and current files provide continuity.

If adding the current conversation to the local project requires folder-access consent, move it through the app's sidebar UI. New coding chats should start from the portfolio project.

## ChatGPT Projects: add shared context

1. Create a ChatGPT Project named **Izzwan Syahfiq Portfolio**.
2. Copy the contents of [CHATGPT-PROJECT-INSTRUCTIONS.md](CHATGPT-PROJECT-INSTRUCTIONS.md) into its project instructions.
3. Add [PROJECT-CONTEXT.md](PROJECT-CONTEXT.md), [README.md](../README.md) and [VALIDATION.md](VALIDATION.md) as project files/sources.
4. Add the GitHub repository link to the project context. If a GitHub plugin/connection is available, confirm it can access this repository.
5. Start future planning/content chats inside this project. For code implementation, open the local Codex portfolio project and use the change request above.

ChatGPT Project files and local repository files have separate access and update paths. Refresh uploaded context after major changes. A repository link identifies the source; actual read/write operations still need authenticated tools.

## A request you can reuse

> Update my portfolio: [describe the change]. Read AGENTS.md, preserve the existing content/status boundaries, inspect the affected behavior, run the relevant checks, document the changes, and commit and push to Aaapite/izzwan-syahfiq-portfolio.

For ideas only, say "planning only" or "review only". For application changes, the repository workflow includes `npm test`, `npm run build`, applicable browser review and preview regeneration. Vercel / Cloudflare hosting remains a separate next step.

## Official references

- [Projects and chats](https://learn.chatgpt.com/docs/projects)
- [Project instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Windows desktop app](https://learn.chatgpt.com/docs/app/windows)
