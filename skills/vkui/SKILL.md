---
name: vkui
description: Build, improve, review, troubleshoot, or migrate React interfaces with @vkontakte/vkui using version-matched official VKUI guidance. Use when the user mentions VKUI, asks to adopt or migrate to VKUI, or requests UI work in a project that already depends on VKUI. Do not use for generic React UI work when the project neither uses nor requests VKUI.
---

# VKUI

Use current official VKUI information to complete the requested interface work. Match the project's installed version, preserve its product intent, and finish implementation and proportionate validation instead of stopping at component suggestions.

## Route the request

- For component selection, implementation, refactoring, troubleshooting, or review, follow the core workflow below.
- When exact props, exports, examples, or version behavior matter, read [official-sources.md](references/official-sources.md).
- When VKUI MCP is unavailable or the user asks how to configure it, read [mcp-setup.md](references/mcp-setup.md). Do not load setup details during an ordinary task when MCP already works.
- For adopting VKUI, replacing another UI system, or upgrading VKUI, read [migration.md](references/migration.md).

## Core workflow

1. Locate the relevant package or workspace. Confirm that it already uses `@vkontakte/vkui`, or that the user explicitly wants to adopt it. Do not introduce VKUI into an unrelated React project merely because the request concerns UI.
2. Determine the exact installed VKUI version before researching APIs. Prefer the resolved package in `node_modules` or the relevant lockfile over a semver range in `package.json`. When no project exists yet, use the current stable version documented by VKUI.
3. Gather only the official context needed for the task:
   - Prefer a VKUI MCP server configured for the project's version.
   - Otherwise use `https://vkui.io/llms.txt`, follow the relevant official `.mdx` links, and validate compatibility against the installed package.
   - Inspect public types, exports, and, when necessary, implementation in `node_modules` to resolve version differences.
4. Choose the smallest coherent change that satisfies the request. Preserve the existing visual direction and business behavior unless the user asks for a redesign or behavior change.
5. Implement with public VKUI APIs. Reuse official components, hooks, tokens, adaptivity, themes, typography, and `@vkontakte/icons` where they fit; do not force a VKUI abstraction where it weakens semantics or behavior.
6. Validate in proportion to the change:
   - Run available type checks, focused tests, linting, and a build when practical.
   - If the app can run and browser control is available, inspect affected screens at narrow and wide viewports and in supported light and dark themes.
   - Exercise loading, empty, error, disabled, focus, keyboard, and reduced-motion states when relevant.
7. Report what changed, which VKUI version and official sources informed it, what was verified, and any validation that could not be performed.

## Source and API rules

- Use official VKUI sources only by default: VKUI MCP, `vkui.io`, the installed package, and `VKCOM/VKUI`.
- Treat local public types and exports as the compatibility truth for the installed version. Treat matching official documentation as the usage truth. Explain any conflict instead of guessing.
- Internal implementation may be inspected diagnostically, but final application code must not import private paths or depend on undocumented internals.
- Never copy a snapshot of `llms.txt` or the component catalog into the project. Retrieve focused, current documentation at task time.
- Do not claim that MCP data matches the project version unless the server reports or is configured for that version. Cross-check uncertain props and imports locally.
- Answer in the user's language. Keep identifiers and upstream API names unchanged.

## Change boundaries

- Improve consistency, accessibility, adaptivity, themes, typography, and state handling inside the requested scope.
- Replace obvious hand-built substitutes when an official VKUI component is a better fit, while preserving product-specific behavior.
- Do not perform a broad redesign, dependency upgrade, or UI-library migration unless requested.
- Mention an upgrade only when it materially helps the request, such as when an API is unavailable, deprecated, or fixed in a newer version. Do not repeat routine upgrade suggestions.

## Optional MCP onboarding

If the official VKUI MCP tools are absent, mention the optional setup once in the conversation and continue through `llms.txt` and local sources. Tailor the suggestion to the current client when it is known. Never edit an MCP configuration or global agent settings without the user's explicit request, and never overwrite unrelated servers.
