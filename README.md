<p align="center">
  <img src="skills/vkui/assets/q-mascot.png" width="280" alt="Q, the blue cat mascot assembling interface components">
</p>

<h1 align="center">VKUI Skill</h1>

<p align="center">
  A version-aware agent skill for building, improving, reviewing, and migrating React interfaces with VKUI.
</p>

<p align="center">
  <a href="https://github.com/m0rg0t/vkui-skill/actions/workflows/validate.yml"><img src="https://github.com/m0rg0t/vkui-skill/actions/workflows/validate.yml/badge.svg" alt="Validate"></a>
  <a href="https://m0rg0t.github.io/vkui-skill/"><img src="https://img.shields.io/badge/website-live-2688EB.svg" alt="Bilingual website"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a>
</p>

## English

This skill helps coding agents use [`@vkontakte/vkui`](https://github.com/VKCOM/VKUI) against the version actually installed in a project. It prefers the official VKUI MCP server, falls back to [`llms.txt`](https://vkui.io/llms.txt) and focused official MDX pages, and validates uncertain APIs against public types and exports in `node_modules`.

The bilingual [VKUI Skill website](https://m0rg0t.github.io/vkui-skill/) explains the workflow and includes interactive build, review, and migration examples.

### What it does

- selects and implements suitable VKUI components and hooks;
- improves existing VKUI interfaces without silently redesigning the product;
- reviews accessibility, adaptivity, themes, typography, and UI states;
- performs type, test, build, and visual checks when the project supports them;
- migrates applications to VKUI in reviewable stages;
- assists with VKUI upgrades only when requested or materially useful;
- uses official VKUI sources by default and never relies on private package imports.

### Install

Install for the current project:

```bash
npx skills add m0rg0t/vkui-skill --skill vkui
```

Install globally for supported agents:

```bash
npx skills add m0rg0t/vkui-skill --skill vkui -g
```

The installer is provided by the open [Vercel Skills CLI](https://github.com/vercel-labs/skills).

### Use

Invoke `$vkui` explicitly, mention VKUI in the request, or ask for interface work inside a project that already depends on `@vkontakte/vkui`.

Example requests:

```text
Use $vkui to replace this custom settings form with suitable VKUI components.
Review this VKUI screen for adaptivity, keyboard access, and dark theme issues.
Migrate this React application from its current UI library to VKUI in stages.
Upgrade this workspace from VKUI 7 to 8 and follow the official migration guidance.
```

### Optional VKUI MCP

The skill works without MCP. On first relevant use, it can detect that VKUI MCP tools are missing, offer setup for the current client, and continue from official web and local package sources without blocking the task.

For Codex:

```bash
codex mcp add vkui -- npx -y @vkontakte/vkui-mcp
codex mcp list
```

Setup for Codex, Claude Code, OpenCode, Cursor, VS Code, and generic MCP clients is documented in [mcp-setup.md](skills/vkui/references/mcp-setup.md). The server supports version selection through `VKUI_VERSION`; consult the [official VKUI MCP documentation](https://vkui.io/overview/mcp/) before pinning a version.

### How freshness works

1. Resolve the exact VKUI version for the affected workspace.
2. Use MCP only when its configured version matches or can be verified.
3. Otherwise search the live `llms.txt` index and fetch only relevant official pages.
4. Confirm imports and props against the installed package's public API.
5. Inspect internal implementation only to diagnose behavior, never as an application API.

The repository intentionally does not contain a snapshot of VKUI documentation.

## Русский

Этот skill помогает агентам проектировать, улучшать, проверять и мигрировать React-интерфейсы с VKUI с учётом версии, установленной в проекте. Он предпочитает официальный VKUI MCP, а без него использует актуальный [`llms.txt`](https://vkui.io/llms.txt), точечные страницы официальной документации и публичные типы из `node_modules`.

Двуязычный [сайт VKUI Skill](https://m0rg0t.github.io/vkui-skill/) объясняет workflow и показывает интерактивные примеры создания, проверки и миграции интерфейса.

### Возможности

- подбор и внедрение компонентов и хуков VKUI;
- улучшение существующего интерфейса без самовольного редизайна;
- проверка адаптивности, тем, доступности, типографики и состояний;
- запуск типов, тестов, сборки и визуального QA, когда это возможно;
- поэтапная миграция приложения на VKUI;
- помощь с обновлением версии по запросу или при существенной пользе;
- использование только официальных источников VKUI по умолчанию.

### Установка

В текущий проект:

```bash
npx skills add m0rg0t/vkui-skill --skill vkui
```

Глобально:

```bash
npx skills add m0rg0t/vkui-skill --skill vkui -g
```

### Использование

Вызовите `$vkui`, явно упомяните VKUI или попросите улучшить интерфейс проекта, который уже зависит от `@vkontakte/vkui`.

```text
Используй $vkui и перенеси эту форму на подходящие компоненты VKUI.
Проверь экран VKUI на узкой и широкой ширине, в светлой и тёмной теме.
Составь и выполни поэтапную миграцию приложения на VKUI.
```

MCP необязателен. При его отсутствии skill один раз предложит подходящую настройку для текущего клиента и продолжит работу через официальную документацию и установленный пакет. Все варианты подключения находятся в [mcp-setup.md](skills/vkui/references/mcp-setup.md).

## Mascot

Q is the original blue cat assembling UI components at the top of this README. The mascot asset is distributed under the repository's MIT license.

## License

[MIT](LICENSE). This community project is not affiliated with VK. VKUI and related marks belong to their respective owners.
