# Official source strategy

Read this reference when a task depends on exact component APIs, exports, examples, or version-specific behavior.

## Establish the project version

1. Identify the package or monorepo workspace that owns the affected interface.
2. Resolve the exact `@vkontakte/vkui` version in this order:
   - `node_modules/@vkontakte/vkui/package.json` for the relevant workspace;
   - the workspace's lockfile entry;
   - the dependency range in `package.json`, explicitly treated as a range rather than a resolved version.
3. If a monorepo resolves multiple VKUI versions, keep findings scoped to the affected workspace.
4. When there is no existing project, use the current stable version shown by official VKUI sources.

Do not silently update a dependency in order to make documentation examples compile.

## Use the narrowest official source

### 1. Version-matched VKUI MCP

Use the official MCP tools when they are available and configured for the target version. Tool namespaces vary by host; identify the VKUI server semantically rather than assuming a namespace prefix.

Expected official tools include:

- `list_components` and `get_component_metadata` for discovery and props;
- `list_tags` and `list_components_by_tag` for task-oriented discovery on VKUI 8.2.0 or newer;
- `list_hooks` and `get_hook_metadata` for hooks;
- `get_examples` for focused examples;
- `get_docs` for full Markdown documentation on VKUI 8.3.0 or newer;
- `list_migration_targets` and `get_migration_target` for major-version migrations.

Query only components and topics relevant to the task. Absence of a newer tool on an older server is not an error; use the remaining official sources.

### 2. `llms.txt` and linked MDX

Fetch `https://vkui.io/llms.txt` as a current index. Search the index for the relevant guide, component, or hook, then fetch only the linked `.mdx` pages needed for the task. Do not load the whole catalog when one or two pages answer the question.

The public `llms.txt` reflects current documentation. For an older installed version, use it for discovery and intended patterns, then verify every import and prop against local public types.

### 3. Installed package

The installed package is the final compatibility check for that project. It is appropriate to inspect:

- `package.json`, package exports, and version metadata;
- public `.d.ts` files and exported symbols;
- bundled README or migration notes;
- source or distribution implementation when public documentation and types do not explain observed behavior.

Implementation inspection is diagnostic only. Never produce imports from private paths or rely on internal DOM structure, class names, state, or undocumented timing.

### 4. Official repository

Use the [VKCOM/VKUI repository](https://github.com/VKCOM/VKUI) for upstream source, releases, migrations, and issue context when the sources above are insufficient. Stay within official VKUI-owned material unless the user explicitly broadens the research scope.

## Resolve conflicts

- If current docs describe an API missing from the installed version, implement against the installed public API or offer an upgrade when it materially helps.
- If local types allow something that current docs discourage, prefer the documented pattern and explain the compatibility distinction.
- If an MCP server's configured version cannot be established, use its output for discovery only and verify code locally.
- If official sources remain ambiguous, say what is uncertain and choose the least brittle public API.

When reporting the result, link the few official pages that materially informed the implementation and name the installed VKUI version.
