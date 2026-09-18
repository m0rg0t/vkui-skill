# Optional VKUI MCP setup

Read this reference only when VKUI MCP is unavailable, the user asks to configure it, or a version mismatch requires reconfiguration.

The skill remains usable without MCP. Offer one concise, client-specific setup suggestion, then continue with `llms.txt` and local package inspection. Do not edit any configuration until the user explicitly asks.

## Prerequisites

- Node.js with `npx` available.
- The official server package: `@vkontakte/vkui-mcp`.
- Official VKUI setup and supported-version details: [VKUI MCP documentation](https://vkui.io/overview/mcp/).

## Client-specific setup

### Codex

Prefer the CLI command:

```bash
codex mcp add vkui -- npx -y @vkontakte/vkui-mcp
codex mcp list
```

Codex CLI, the desktop app, and its IDE extension share the host MCP configuration. Project-specific configuration can live in `.codex/config.toml` for trusted projects:

```toml
[mcp_servers.vkui]
command = "npx"
args = ["-y", "@vkontakte/vkui-mcp"]
```

See the [official Codex MCP documentation](https://developers.openai.com/es-419/docs/extend/mcp?surface=cli).

### Claude Code

```bash
claude mcp add vkui npx -y @vkontakte/vkui-mcp
```

See the [official VKUI client instructions](https://vkui.io/overview/mcp/) and [Claude Code MCP documentation](https://docs.anthropic.com/en/docs/claude-code/mcp).

### OpenCode

```bash
opencode mcp add vkui -- npx -y @vkontakte/vkui-mcp
opencode mcp list
```

See the [official OpenCode MCP documentation](https://opencode.ai/v2/docs/mcp-servers).

### Cursor

Add or merge this server into `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "vkui": {
      "command": "npx",
      "args": ["-y", "@vkontakte/vkui-mcp"]
    }
  }
}
```

See the [official VKUI client instructions](https://vkui.io/overview/mcp/) and [Cursor MCP documentation](https://cursor.com/docs/context/mcp#installing-mcp-servers).

### VS Code

```bash
code --add-mcp '{"name":"vkui","command":"npx","args":["-y","@vkontakte/vkui-mcp"]}'
```

See the [official VKUI client instructions](https://vkui.io/overview/mcp/) and [VS Code MCP documentation](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_add-an-mcp-server).

### Other MCP clients

Merge the following entry into the client's existing MCP configuration:

```json
{
  "mcpServers": {
    "vkui": {
      "command": "npx",
      "args": ["-y", "@vkontakte/vkui-mcp"]
    }
  }
}
```

## Match the project version

`@vkontakte/vkui-mcp` defaults to `VKUI_VERSION=latest`. For an existing project, first resolve its exact VKUI version, then check the official MCP documentation to confirm that version is supported. Prefer project-scoped configuration when different projects use different VKUI versions.

Example for Codex:

```toml
[mcp_servers.vkui]
command = "npx"
args = ["-y", "@vkontakte/vkui-mcp"]

[mcp_servers.vkui.env]
VKUI_VERSION = "8.3.0"
```

For JSON-style clients, add the equivalent environment block:

```json
{
  "env": {
    "VKUI_VERSION": "8.3.0"
  }
}
```

Do not guess an unsupported version. If exact version data is unavailable, continue from official current docs and validate all public APIs against the installed package. A client restart may be required after changing MCP configuration.

## Safe configuration behavior

- Inspect and merge with existing configuration; never replace the entire file.
- Preserve unrelated servers, environment variables, comments, and client-specific fields.
- Use project scope when requested or when a global version pin would conflict with other projects.
- Verify the server with the client's list/status command where available.
- If setup fails, keep working through official web docs and local package sources rather than blocking the user's task.
