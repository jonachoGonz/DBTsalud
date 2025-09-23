export async function autoTranslate(text: string, source: 'es' | 'en', target: 'es' | 'en'): Promise<string> {
  if (!text.trim()) return text;
  try {
    const res = await fetch('https://libretranslate.com/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, source, target, format: 'text' })
    });
    if (!res.ok) throw new Error('Translation API error');
    const data = await res.json();
    return data.translatedText ?? text;
  } catch (err) {
    console.error('autoTranslate error', err);
    return text; // graceful fallback
  }
}
