export function getInitialLanguage(browser) {
  const fromQuery = new URLSearchParams(browser.location.search).get('lang');
  if (fromQuery === 'ru' || fromQuery === 'en') return fromQuery;
  try {
    const saved = browser.localStorage.getItem('vkui-skill-language');
    if (saved === 'ru' || saved === 'en') return saved;
  } catch { /* Restricted storage must not prevent initial rendering. */ }
  return browser.navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en';
}

export function persistLanguage(browser, language) {
  try { browser.localStorage.setItem('vkui-skill-language', language); }
  catch { /* The chosen language remains usable for this visit. */ }
}

export async function copyText(browser, document, text) {
  try {
    await browser.navigator.clipboard.writeText(text);
    return true;
  } catch { /* Try the legacy browser path only after Clipboard API failure. */ }
  const previousFocus = document.activeElement;
  let textArea;
  try {
    textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.append(textArea);
    textArea.select();
    return typeof document.execCommand === 'function' && document.execCommand('copy');
  } catch {
    return false;
  } finally {
    textArea?.remove();
    if (previousFocus?.isConnected) previousFocus.focus();
  }
}
