# VKUI migration and upgrades

Read this reference when adopting VKUI, replacing another UI system, removing hand-built UI primitives, or upgrading the installed VKUI version.

## Adopt or migrate to VKUI

Default to a staged migration unless the application is small or the user explicitly requests an atomic conversion.

1. **Establish the target.** Confirm the target VKUI version, package manager, supported browsers, rendering model, platform behavior, theme requirements, and whether the application is a VK Mini App or a regular web app.
2. **Inventory the current UI.** Locate providers, resets and global styles, routing and modal ownership, layout primitives, form controls, icons, tokens, themes, custom interaction components, and affected tests. Identify business logic that must remain independent of the UI library.
3. **Build an evidence-backed mapping.** Map existing primitives and screens to public VKUI components using version-matched official docs. Record deliberate exceptions where a custom component remains more appropriate.
4. **Install the foundation.** Add only the officially required styles, providers, roots, theme and adaptivity configuration for the target version. Avoid mixing incompatible provider or navigation patterns from other VKUI majors.
5. **Migrate vertical slices.** Convert one coherent screen or flow at a time. Keep temporary interoperability boundaries explicit and avoid a permanent mix of competing spacing, typography, focus, or modal systems.
6. **Verify each slice.** Run type checks and focused tests, then inspect narrow and wide layouts, supported themes, keyboard and focus behavior, and important loading, empty, error, disabled, and reduced-motion states.
7. **Remove the old system last.** Delete an old UI dependency only after imports, styles, runtime ownership, tests, and build output confirm it is unused.

Preserve business behavior and product direction. A migration is not permission for an unrelated redesign.

## Upgrade VKUI

- Mention an upgrade only when it materially benefits the request. Do not add a routine update notice to every task.
- Never change the VKUI version without the user's request or agreement.
- Read the official migration guide and query MCP migration targets for the source and target majors.
- Inspect the full dependency set, including `@vkontakte/icons`, token packages, testing utilities, and peer dependencies when relevant.
- Prefer official codemods when they cover the target transition, but inspect their scope and resulting diff before accepting changes.
- Separate mechanical API migration from discretionary visual changes so regressions are easier to review.
- Re-run the project's type checks, tests, lint, build, and visual QA after each coherent stage.

## Completion criteria

A migration is complete only when:

- touched code imports public APIs supported by the installed target version;
- required providers, styles, themes, and adaptivity behavior are correct for that version;
- obsolete imports, styles, and dependencies in the migrated scope are removed;
- functional and visual validation has been performed or its limitations are clearly reported;
- remaining migration work, if any, is explicit and bounded.
