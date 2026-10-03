# Website maintenance (2026-10-03)

The site uses stable VKUI 8.4.1, icons 3.74.0, React 19.3.0 and Vite 8.3.2.
Node 24 LTS is selected in `.nvmrc` and both existing workflows. New lint and
browser tools are pinned to reviewed stable releases. The installed skill's
instructions, references and installation behavior are unchanged.

From the repository root:

```sh
npm ci --prefix site
npm --prefix site run check
node scripts/validate.mjs
cd site && npx playwright install chromium && npm run test:browser
```

Eight offline unit tests cover language precedence and storage denial, Clipboard
API success, legacy fallback success/denial/missing API, element cleanup and
focus restoration. Four production-preview browser journeys cover 320/390/1280
pixels, RU/EN switching/reload, example tabs and copying, plus unavailable
storage and both clipboard paths. These tests copy synthetic/installation text;
they never execute the command or install a skill.

Denied localStorage access previously prevented startup and language changes.
An exception from legacy clipboard copying also escaped its fallback and left
a hidden textarea behind. Both paths now remain usable without unhandled errors.

The existing repository validator, Skills CLI discovery-only check and official
link checks stay in CI. Normal production bundling retains VKUI's existing
module-level directive warnings. No deploy workflow was triggered, no website
was published, and no agent configuration or credentials were changed.
