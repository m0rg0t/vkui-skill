import {
  Button,
  Card,
  Paragraph,
  SegmentedControl,
  Tabs,
  TabsItem,
  Text,
  Title,
} from "@vkontakte/vkui";

export const INSTALL_COMMAND = "npx skills add m0rg0t/vkui-skill --skill vkui";
const GITHUB_URL = "https://github.com/m0rg0t/vkui-skill";
const MCP_SETUP_URL = `${GITHUB_URL}/blob/main/skills/vkui/references/mcp-setup.md`;
const OFFICIAL_MCP_URL = "https://vkui.io/overview/mcp/";
const LLMS_URL = "https://vkui.io/llms.txt";
const clients = ["Codex", "Claude Code", "OpenCode", "Cursor", "VS Code"];

function InstallCommand({ content, copied, onCopy, compact = false }) {
  return (
    <div className={`install-card${compact ? " install-card--compact" : ""}`}>
      <code>{INSTALL_COMMAND}</code>
      <Button size="m" mode="primary" onClick={onCopy}>
        {copied ? content.copied : content.copy}
      </Button>
    </div>
  );
}

function CheckList({ items }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <span aria-hidden="true">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader({ content, language, mascotUrl, onLanguageChange }) {
  return (
    <header className="topbar">
      <a className="brand" href="#top" aria-label="VKUI Skill">
        <img src={mascotUrl} alt="" />
        <span>VKUI Skill</span>
      </a>

      <nav className="nav" aria-label={content.navLabel}>
        <div className="nav-links">
          <a href="#how">{content.navHow}</a>
          <a href="#examples">{content.navExamples}</a>
          <a href="#sources">{content.navSources}</a>
        </div>
        <div className="language-wrap" role="group" aria-label={content.languageLabel}>
          <SegmentedControl
            className="language-switch"
            size="m"
            value={language}
            onChange={onLanguageChange}
            options={[
              { label: "EN", value: "en" },
              { label: "RU", value: "ru" },
            ]}
          />
        </div>
      </nav>
    </header>
  );
}

export function HeroSection({ content, mascotUrl, copied, onCopy }) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <Text className="eyebrow">{content.eyebrow}</Text>
        <Title level="1" className="hero-title">
          {content.title}
        </Title>
        <Paragraph className="hero-intro">{content.intro}</Paragraph>

        <InstallCommand content={content} copied={copied} onCopy={onCopy} />

        <div className="hero-actions">
          <Button
            Component="a"
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            size="l"
            mode="secondary"
          >
            {content.github}
          </Button>
          <Text className="version-note">{content.builtWith}</Text>
        </div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="visual-grid" />
        <div className="source-pill source-pill--mcp">MCP</div>
        <div className="source-pill source-pill--docs">llms.txt</div>
        <img src={mascotUrl} alt="" />
      </div>
    </section>
  );
}

export function WorkflowSection({ content }) {
  return (
    <section className="workflow section" id="how" aria-labelledby="workflow-title">
      <div className="section-heading">
        <Text className="eyebrow">{content.workflowEyebrow}</Text>
        <Title level="2" id="workflow-title" className="section-title">
          {content.workflowTitle}
        </Title>
        <Paragraph className="section-intro">{content.workflowIntro}</Paragraph>
      </div>

      <div className="workflow-grid">
        {content.steps.map(([number, title, description]) => (
          <Card Component="div" key={number} className="workflow-card" mode="shadow">
            <div className="workflow-number">{number}</div>
            <Title level="3">{title}</Title>
            <Paragraph>{description}</Paragraph>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function ExamplesSection({
  content,
  activeExample,
  selectedExample,
  onSelectedExampleChange,
}) {
  return (
    <section className="examples section" id="examples" aria-labelledby="examples-title">
      <div className="section-heading section-heading--wide">
        <Text className="eyebrow">{content.examplesEyebrow}</Text>
        <Title level="2" id="examples-title" className="section-title">
          {content.examplesTitle}
        </Title>
        <Paragraph className="section-intro">{content.examplesIntro}</Paragraph>
      </div>

      <div className="example-stage">
        <Tabs
          className="example-tabs"
          mode="secondary"
          layoutFillMode="stretched"
          selectedId={selectedExample}
          onSelectedIdChange={onSelectedExampleChange}
        >
          {content.examples.map((example) => (
            <TabsItem
              key={example.id}
              id={example.id}
              aria-controls={`example-${example.id}`}
            >
              {example.tab}
            </TabsItem>
          ))}
        </Tabs>

        <article
          className="example-panel"
          id={`example-${activeExample.id}`}
          role="tabpanel"
          aria-labelledby={activeExample.id}
        >
          <div className="prompt-card">
            <Text className="micro-label">{content.promptLabel}</Text>
            <blockquote>“{activeExample.prompt}”</blockquote>
          </div>

          <div className="example-actions">
            <Text className="micro-label">{content.actionsLabel}</Text>
            <ol>
              {activeExample.actions.map((action, index) => (
                <li key={action}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Paragraph>{action}</Paragraph>
                </li>
              ))}
            </ol>
          </div>

          <div className="result-card">
            <Text className="micro-label">{content.resultLabel}</Text>
            <Paragraph>{activeExample.result}</Paragraph>
            <pre>
              <code>{activeExample.artifact}</code>
            </pre>
          </div>
        </article>
      </div>
    </section>
  );
}

export function DataFlowSection({ content }) {
  return (
    <section className="data-flow section" aria-labelledby="data-title">
      <div className="section-heading">
        <Text className="eyebrow">{content.dataEyebrow}</Text>
        <Title level="2" id="data-title" className="section-title">
          {content.dataTitle}
        </Title>
        <Paragraph className="section-intro">{content.dataIntro}</Paragraph>
      </div>

      <div className="data-grid">
        <Card Component="div" className="data-card data-card--mcp" mode="shadow">
          <div className="data-card-head">
            <Title level="3">{content.mcpTitle}</Title>
            <Text>{content.mcpBadge}</Text>
          </div>
          <CheckList items={content.mcpSteps} />
        </Card>

        <div className="same-outcome">
          <span>{content.sameOutcome}</span>
          <strong aria-hidden="true">→</strong>
          <Text>{content.sameOutcomeText}</Text>
        </div>

        <Card Component="div" className="data-card data-card--fallback" mode="shadow">
          <div className="data-card-head">
            <Title level="3">{content.fallbackTitle}</Title>
            <Text>{content.fallbackBadge}</Text>
          </div>
          <CheckList items={content.fallbackSteps} />
        </Card>
      </div>
    </section>
  );
}

export function SourcesSection({ content }) {
  return (
    <section className="sources section" id="sources" aria-labelledby="sources-title">
      <div className="section-heading">
        <Text className="eyebrow">{content.sourcesEyebrow}</Text>
        <Title level="2" id="sources-title" className="section-title">
          {content.sourcesTitle}
        </Title>
        <Paragraph className="section-intro">{content.sourcesIntro}</Paragraph>
      </div>

      <div className="source-grid">
        {content.sources.map(([number, title, description]) => (
          <div className="source-row" key={number}>
            <span>{number}</span>
            <Title level="3">{title}</Title>
            <Paragraph>{description}</Paragraph>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ClientsSection({ content }) {
  return (
    <section className="clients section" aria-labelledby="clients-title">
      <div className="clients-copy">
        <Text className="eyebrow">{content.clientsEyebrow}</Text>
        <Title level="2" id="clients-title" className="section-title">
          {content.clientsTitle}
        </Title>
        <Paragraph className="section-intro">{content.clientsIntro}</Paragraph>
        <Text className="clients-note">{content.clientsNote}</Text>
        <Button
          Component="a"
          href={MCP_SETUP_URL}
          target="_blank"
          rel="noreferrer"
          size="l"
          mode="secondary"
        >
          {content.setupGuide}
        </Button>
      </div>

      <ul className="client-stack" aria-label={clients.join(", ")}>
        {clients.map((client, index) => (
          <li className="client-chip" key={client} style={{ "--client-index": index }}>
            <span aria-hidden="true">0{index + 1}</span>
            <strong>{client}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PrinciplesSection({ content }) {
  return (
    <section className="principles section" aria-labelledby="principles-title">
      <div className="section-heading">
        <Text className="eyebrow">{content.principlesEyebrow}</Text>
        <Title level="2" id="principles-title" className="section-title">
          {content.principlesTitle}
        </Title>
      </div>

      <div className="principles-grid">
        {content.principles.map(([title, description]) => (
          <div className="principle" key={title}>
            <span aria-hidden="true">↳</span>
            <div>
              <Title level="3">{title}</Title>
              <Paragraph>{description}</Paragraph>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FinalCtaSection({ content, mascotUrl, copied, onCopy }) {
  return (
    <section className="final-cta section" aria-labelledby="cta-title">
      <div className="cta-mascot" aria-hidden="true">
        <img src={mascotUrl} alt="" />
      </div>
      <div className="cta-copy">
        <Text className="eyebrow">{content.ctaEyebrow}</Text>
        <Title level="2" id="cta-title" className="section-title">
          {content.ctaTitle}
        </Title>
        <Paragraph className="section-intro">{content.ctaText}</Paragraph>
        <InstallCommand content={content} copied={copied} onCopy={onCopy} compact />
        <div className="resource-links">
          <a href={OFFICIAL_MCP_URL} target="_blank" rel="noreferrer">
            {content.officialMcp} ↗
          </a>
          <a href={LLMS_URL} target="_blank" rel="noreferrer">
            {content.llms} ↗
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ content, mascotUrl }) {
  return (
    <footer className="footer">
      <div className="brand brand--footer">
        <img src={mascotUrl} alt="" />
        <span>VKUI Skill</span>
      </div>
      <Text>{content.footer}</Text>
      <Text>MIT · 2026</Text>
    </footer>
  );
}
