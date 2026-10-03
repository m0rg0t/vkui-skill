import test from 'node:test';
import assert from 'node:assert/strict';
import { copyText, getInitialLanguage, persistLanguage } from '../src/browser-platform.mjs';

const browser = (search = '', saved = null, language = 'en-US') => ({
  location: { search }, navigator: { language }, localStorage: { getItem: () => saved, setItem() {} },
});
test('query language takes precedence over saved and browser preferences', () => {
  assert.equal(getInitialLanguage(browser('?lang=en', 'ru', 'ru-RU')), 'en');
  assert.equal(getInitialLanguage(browser('?lang=ru', 'en')), 'ru');
});
test('invalid preferences fall back to the browser language', () => {
  assert.equal(getInitialLanguage(browser('?lang=invalid', 'bad', 'ru-RU')), 'ru');
  assert.equal(getInitialLanguage(browser('', null, 'fr-FR')), 'en');
});
test('storage getter and writer exceptions never block language selection', () => {
  const target = browser('', null, 'ru-RU');
  Object.defineProperty(target, 'localStorage', { get() { throw new Error('Storage blocked'); } });
  assert.equal(getInitialLanguage(target), 'ru');
  assert.doesNotThrow(() => persistLanguage(target, 'en'));
});
test('successful clipboard copy never creates a legacy text field', async () => {
  let copied;
  const target = { navigator: { clipboard: { async writeText(value) { copied = value; } } } };
  assert.equal(await copyText(target, {}, 'synthetic command'), true);
  assert.equal(copied, 'synthetic command');
});
for (const outcome of ['success', 'false', 'throw', 'missing']) {
  test(`clipboard fallback ${outcome} cleans up and restores focus`, async () => {
    let removed = false, restored = false;
    const field = { style: {}, setAttribute() {}, select() {}, remove() { removed = true; } };
    const document = {
      activeElement: { isConnected: true, focus() { restored = true; } },
      createElement: () => field, body: { append() {} },
      execCommand: outcome === 'missing' ? undefined : () => { if (outcome === 'throw') throw new Error('Denied'); return outcome === 'success'; },
    };
    assert.equal(await copyText({ navigator: {} }, document, 'synthetic command'), outcome === 'success');
    assert.equal(removed, true);
    assert.equal(restored, true);
  });
}
