import { useEffect, useMemo, useState } from "react";
import { AppRoot, ConfigProvider } from "@vkontakte/vkui";
import {
  ClientsSection,
  DataFlowSection,
  ExamplesSection,
  FinalCtaSection,
  HeroSection,
  INSTALL_COMMAND,
  PrinciplesSection,
  SiteFooter,
  SiteHeader,
  SourcesSection,
  WorkflowSection,
} from "./Sections";

const copy = {
  en: {
    metaTitle: "VKUI Skill — version-aware UI work for coding agents",
    metaDescription:
      "Install a version-aware agent skill for building, improving, reviewing, and migrating React interfaces with VKUI.",
    skip: "Skip to content",
    navLabel: "Main navigation",
    navHow: "Workflow",
    navExamples: "Examples",
    navSources: "Sources",
    languageLabel: "Page language",
    eyebrow: "Version-aware agent skill",
    title: "Current VKUI, matched to your project.",
    intro:
      "A portable workflow that finds the right official guidance, implements the interface, and verifies the result — without guessing across VKUI versions.",
    copy: "Copy install command",
    copied: "Copied",
    github: "View on GitHub",
    builtWith: "This page runs on VKUI 8.4.0",
    workflowEyebrow: "One disciplined loop",
    workflowTitle: "From project version to verified interface",
    workflowIntro:
      "The skill keeps research narrow and implementation practical. Every step has a concrete output.",
    steps: [
      ["01", "Resolve", "Find the exact VKUI version in the relevant workspace."],
      ["02", "Research", "Use matching MCP data or focused official MDX pages."],
      ["03", "Implement", "Change public VKUI APIs while preserving product behavior."],
      ["04", "Verify", "Run types, tests, build, and visual QA where available."],
    ],
    examplesEyebrow: "Real requests, concrete work",
    examplesTitle: "What the skill does after the prompt",
    examplesIntro:
      "It does not stop at naming a component. It follows the task through research, code changes, and proportionate verification.",
    promptLabel: "You ask",
    actionsLabel: "The skill does",
    resultLabel: "Reviewable result",
    examples: [
      {
        id: "build",
        tab: "Build",
        prompt:
          "Use $vkui to replace this hand-made settings form with suitable VKUI components. Keep validation and submission behavior.",
        actions: [
          "Resolves the installed VKUI version and owning workspace.",
          "Checks the official FormItem, Input, Select, and Switch APIs for that version.",
          "Reuses the existing validation and submit flow instead of redesigning it.",
          "Runs available type checks and build, then inspects narrow and wide layouts.",
        ],
        result:
          "A focused patch using public VKUI APIs, with the original product behavior preserved and verification reported.",
        artifact: "<FormItem top=\"Notifications\">\n  <Switch defaultChecked />\n</FormItem>",
      },
      {
        id: "review",
        tab: "Review",
        prompt:
          "Review this VKUI screen for adaptivity, keyboard access, dark theme, and missing UI states — then fix the issues you find.",
        actions: [
          "Confirms the screen's real component and token APIs locally.",
          "Exercises focus, keyboard flow, loading, empty, error, and disabled states.",
          "Checks supported themes and narrow and wide viewports.",
          "Implements scoped fixes and reruns the relevant checks.",
        ],
        result:
          "An evidence-backed review becomes a tested patch, not a generic accessibility checklist.",
        artifact: "observe  →  reproduce  →  patch  →  verify",
      },
      {
        id: "migrate",
        tab: "Migrate",
        prompt:
          "Migrate this React application to VKUI in stages. Keep each step reviewable and do not break current routes.",
        actions: [
          "Inventories the old UI system, shared primitives, themes, and high-risk screens.",
          "Builds the VKUI provider and token boundary before migrating features.",
          "Moves one coherent slice at a time with compatibility checks.",
          "Removes the former library only after parity and verification.",
        ],
        result:
          "A staged migration with explicit checkpoints, rollback-friendly commits, and no surprise dependency upgrade.",
        artifact: "pilot screen  →  shared shell  →  routes  →  cleanup",
      },
    ],
    dataEyebrow: "Freshness without fragility",
    dataTitle: "MCP improves speed. It never becomes a blocker.",
    dataIntro:
      "The same version check comes first in both paths. If MCP is absent or mismatched, the skill keeps working from official web and local package sources.",
    mcpTitle: "Version-matched MCP",
    mcpBadge: "preferred",
    mcpSteps: [
      "Discover relevant components and hooks.",
      "Read focused examples, docs, and migration targets.",
      "Cross-check uncertain APIs against the installed package.",
    ],
    fallbackTitle: "Official fallback",
    fallbackBadge: "always available",
    fallbackSteps: [
      "Use llms.txt as a live documentation index.",
      "Open only the relevant official MDX pages.",
      "Validate exports, types, and behavior in node_modules.",
    ],
    sameOutcome: "same outcome",
    sameOutcomeText: "Version-compatible code, implemented and verified.",
    sourcesEyebrow: "Source hierarchy",
    sourcesTitle: "Official evidence, in a deliberate order",
    sourcesIntro:
      "The skill does not vendor a stale documentation snapshot. It retrieves only what the current task needs.",
    sources: [
      ["01", "VKUI MCP", "Fast, structured discovery when its VKUI version is known."],
      ["02", "llms.txt + MDX", "Current official docs, narrowed to the relevant pages."],
      ["03", "Installed package", "Public exports and types are the compatibility truth."],
      ["04", "VKCOM/VKUI", "Official releases, migrations, source, and issue context."],
    ],
    clientsEyebrow: "Portable by design",
    clientsTitle: "One skill across your coding agents",
    clientsIntro:
      "Install with the open Skills CLI. On first relevant use, the skill can gently suggest optional VKUI MCP setup for the current client and keep working even if you skip it.",
    clientsNote: "MCP setup is optional and never edits your configuration without permission.",
    setupGuide: "Open the MCP setup guide",
    principlesEyebrow: "Safe defaults",
    principlesTitle: "Helpful without taking over the product",
    principles: [
      ["Version first", "Resolve the actual package before choosing props or examples."],
      ["Public APIs", "Never ship imports from private package paths or undocumented internals."],
      ["Scoped change", "Preserve product intent unless a redesign or behavior change is requested."],
      ["Migration on request", "Adopt or migrate to VKUI fully when asked, in reviewable stages."],
      ["Upgrade, not pressure", "Offer an update when it materially helps; never update silently."],
      ["Finish the loop", "Implement and validate instead of ending with a list of suggestions."],
    ],
    ctaEyebrow: "Give your agent a VKUI specialist",
    ctaTitle: "Install once. Ask in plain language.",
    ctaText:
      "Invoke $vkui explicitly, mention VKUI, or work inside a project that already depends on @vkontakte/vkui.",
    officialMcp: "Official VKUI MCP docs",
    llms: "VKUI llms.txt",
    footer:
      "Community project. Not affiliated with VK. VKUI and related marks belong to their respective owners.",
  },
  ru: {
    metaTitle: "VKUI Skill — работа с интерфейсами с учётом версии",
    metaDescription:
      "Установите skill для проектирования, улучшения, проверки и миграции React-интерфейсов с VKUI.",
    skip: "Перейти к содержимому",
    navLabel: "Основная навигация",
    navHow: "Процесс",
    navExamples: "Примеры",
    navSources: "Источники",
    languageLabel: "Язык страницы",
    eyebrow: "Skill с учётом версии проекта",
    title: "Актуальный VKUI — именно для вашей версии.",
    intro:
      "Переносимый workflow, который находит нужные официальные данные, реализует интерфейс и проверяет результат — без догадок между версиями VKUI.",
    copy: "Скопировать команду",
    copied: "Скопировано",
    github: "Открыть на GitHub",
    builtWith: "Эта страница работает на VKUI 8.4.0",
    workflowEyebrow: "Один дисциплинированный цикл",
    workflowTitle: "От версии проекта до проверенного интерфейса",
    workflowIntro:
      "Skill исследует только нужное и доводит задачу до реализации. У каждого шага есть конкретный результат.",
    steps: [
      ["01", "Определить", "Найти точную версию VKUI в нужном workspace."],
      ["02", "Исследовать", "Использовать подходящие MCP-данные или точечные MDX-страницы."],
      ["03", "Реализовать", "Менять публичные API VKUI, сохраняя поведение продукта."],
      ["04", "Проверить", "Запустить типы, тесты, сборку и визуальный QA, где возможно."],
    ],
    examplesEyebrow: "Реальные запросы, конкретная работа",
    examplesTitle: "Что skill делает после промпта",
    examplesIntro:
      "Он не останавливается на названии компонента, а проходит весь путь: исследование, изменения в коде и соразмерная проверка.",
    promptLabel: "Вы просите",
    actionsLabel: "Skill делает",
    resultLabel: "Проверяемый результат",
    examples: [
      {
        id: "build",
        tab: "Создать",
        prompt:
          "Используй $vkui и замени самописную форму настроек подходящими компонентами VKUI. Сохрани валидацию и отправку.",
        actions: [
          "Определяет установленную версию VKUI и нужный workspace.",
          "Проверяет официальные API FormItem, Input, Select и Switch для этой версии.",
          "Переиспользует текущую валидацию и отправку вместо самовольного редизайна.",
          "Запускает доступные проверки типов и сборку, смотрит узкую и широкую ширину.",
        ],
        result:
          "Точечный патч на публичных API VKUI с сохранённым поведением продукта и отчётом о проверке.",
        artifact: "<FormItem top=\"Уведомления\">\n  <Switch defaultChecked />\n</FormItem>",
      },
      {
        id: "review",
        tab: "Проверить",
        prompt:
          "Проверь этот экран VKUI на адаптивность, клавиатурный доступ, тёмную тему и пропущенные состояния — затем исправь найденное.",
        actions: [
          "Сверяет реальные API компонентов и токенов с локальным пакетом.",
          "Проверяет фокус, клавиатуру, loading-, empty-, error- и disabled-состояния.",
          "Смотрит поддерживаемые темы, узкую и широкую ширину.",
          "Вносит ограниченные по scope исправления и повторяет проверки.",
        ],
        result:
          "Проверка с доказательствами превращается в протестированный патч, а не общий чек-лист.",
        artifact: "наблюдение  →  воспроизведение  →  патч  →  проверка",
      },
      {
        id: "migrate",
        tab: "Миграция",
        prompt:
          "Мигрируй это React-приложение на VKUI поэтапно. Сделай каждый шаг проверяемым и не ломай текущие маршруты.",
        actions: [
          "Инвентаризирует старую UI-систему, общие примитивы, темы и рискованные экраны.",
          "Создаёт границу провайдера и токенов VKUI до переноса продуктовых частей.",
          "Переносит по одному цельному срезу с проверкой совместимости.",
          "Удаляет прежнюю библиотеку только после достижения паритета и проверки.",
        ],
        result:
          "Поэтапная миграция с явными контрольными точками, откатываемыми коммитами и без внезапного обновления зависимостей.",
        artifact: "пилотный экран  →  общий каркас  →  маршруты  →  очистка",
      },
    ],
    dataEyebrow: "Свежие данные без хрупкости",
    dataTitle: "MCP ускоряет работу, но никогда её не блокирует.",
    dataIntro:
      "В обоих сценариях первым идёт определение версии. Если MCP отсутствует или не совпадает, skill продолжает работу по официальным веб-источникам и локальному пакету.",
    mcpTitle: "MCP нужной версии",
    mcpBadge: "предпочтительно",
    mcpSteps: [
      "Найти подходящие компоненты и хуки.",
      "Получить точечные примеры, документацию и цели миграции.",
      "Сверить спорные API с установленным пакетом.",
    ],
    fallbackTitle: "Официальный fallback",
    fallbackBadge: "всегда доступен",
    fallbackSteps: [
      "Использовать llms.txt как живой индекс документации.",
      "Открыть только нужные официальные MDX-страницы.",
      "Проверить экспорты, типы и поведение в node_modules.",
    ],
    sameOutcome: "один результат",
    sameOutcomeText: "Совместимый с версией код, реализованный и проверенный.",
    sourcesEyebrow: "Иерархия источников",
    sourcesTitle: "Официальные данные — в осознанном порядке",
    sourcesIntro:
      "Skill не хранит устаревающий снимок документации. Он получает только то, что нужно текущей задаче.",
    sources: [
      ["01", "VKUI MCP", "Быстрый структурированный поиск, когда версия VKUI известна."],
      ["02", "llms.txt + MDX", "Текущая официальная документация, суженная до нужных страниц."],
      ["03", "Установленный пакет", "Публичные экспорты и типы — истина о совместимости."],
      ["04", "VKCOM/VKUI", "Официальные релизы, миграции, исходники и контекст issues."],
    ],
    clientsEyebrow: "Переносимый по замыслу",
    clientsTitle: "Один skill для разных coding agents",
    clientsIntro:
      "Установка идёт через открытый Skills CLI. При первом подходящем запросе skill может ненавязчиво предложить опциональную настройку VKUI MCP для текущего клиента и продолжит работу, даже если её пропустить.",
    clientsNote: "MCP необязателен и никогда не меняет конфигурацию без разрешения.",
    setupGuide: "Открыть инструкцию по MCP",
    principlesEyebrow: "Безопасные настройки по умолчанию",
    principlesTitle: "Помогает, но не забирает управление продуктом",
    principles: [
      ["Сначала версия", "Определить реальный пакет до выбора props и примеров."],
      ["Публичные API", "Не выпускать импорты из приватных путей и зависимость от внутренних деталей."],
      ["Ограниченный scope", "Сохранять замысел продукта без запроса на редизайн или смену поведения."],
      ["Миграция по запросу", "Полностью переносить на VKUI, когда это попросили, — проверяемыми этапами."],
      ["Обновление без давления", "Предлагать новую версию, когда она существенно помогает, но не обновлять молча."],
      ["Полный цикл", "Реализовывать и проверять, а не заканчивать списком рекомендаций."],
    ],
    ctaEyebrow: "Добавьте агенту VKUI-специалиста",
    ctaTitle: "Одна установка. Запросы обычным языком.",
    ctaText:
      "Вызовите $vkui явно, упомяните VKUI или работайте в проекте, который уже зависит от @vkontakte/vkui.",
    officialMcp: "Официальная документация VKUI MCP",
    llms: "VKUI llms.txt",
    footer:
      "Сообщественный проект, не аффилированный с VK. VKUI и связанные обозначения принадлежат их владельцам.",
  },
};

function getInitialLanguage() {
  const fromQuery = new URLSearchParams(window.location.search).get("lang");
  if (fromQuery === "ru" || fromQuery === "en") return fromQuery;
  const saved = window.localStorage.getItem("vkui-skill-language");
  if (saved === "ru" || saved === "en") return saved;
  return window.navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
}

export function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const [copied, setCopied] = useState(false);
  const [selectedExample, setSelectedExample] = useState("build");
  const content = copy[language];
  const activeExample = content.examples.find((example) => example.id === selectedExample);
  const mascotUrl = useMemo(() => `${import.meta.env.BASE_URL}q-mascot.png`, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = content.metaTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", content.metaDescription);
    window.localStorage.setItem("vkui-skill-language", language);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    window.history.replaceState({}, "", url);
  }, [content.metaDescription, content.metaTitle, language]);

  useEffect(() => {
    if (!copied) return undefined;
    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copyInstallCommand() {
    let didCopy = false;

    try {
      await window.navigator.clipboard.writeText(INSTALL_COMMAND);
      didCopy = true;
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = INSTALL_COMMAND;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.append(textArea);
      textArea.select();
      didCopy = document.execCommand("copy");
      textArea.remove();
    }

    if (didCopy) setCopied(true);
  }

  return (
    <ConfigProvider locale={language} colorScheme="dark">
      <AppRoot mode="full">
        <a className="skip-link" href="#content">
          {content.skip}
        </a>

        <div className="site-shell">
          <SiteHeader
            content={content}
            language={language}
            mascotUrl={mascotUrl}
            onLanguageChange={setLanguage}
          />

          <main id="content">
            <HeroSection
              content={content}
              mascotUrl={mascotUrl}
              copied={copied}
              onCopy={copyInstallCommand}
            />
            <WorkflowSection content={content} />

            <ExamplesSection
              content={content}
              activeExample={activeExample}
              selectedExample={selectedExample}
              onSelectedExampleChange={setSelectedExample}
            />
            <DataFlowSection content={content} />

            <SourcesSection content={content} />
            <ClientsSection content={content} />

            <PrinciplesSection content={content} />
            <FinalCtaSection
              content={content}
              mascotUrl={mascotUrl}
              copied={copied}
              onCopy={copyInstallCommand}
            />
          </main>

          <SiteFooter content={content} mascotUrl={mascotUrl} />
        </div>

        <div className="copy-status" aria-live="polite">
          {copied ? content.copied : ""}
        </div>
      </AppRoot>
    </ConfigProvider>
  );
}
