import { useEffect, useMemo, useState } from 'react';
import { fetchContent, upsertContent, fetchSiteSettings, upsertSiteSettings, type Locale } from '@/lib/cms';
import { applyTheme } from '@/lib/theme';
import { autoTranslate } from '@/lib/translate';

const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || 'admin';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'qpsych2025!';

type Tab = 'content' | 'styles' | 'translate';

const sectionKeys = [
  'header.hero',
  'about.section',
  'therapies.section',
  'services.section',
  'footer.section'
];

export default function Admin() {
  const [authed, setAuthed] = useState<boolean>(() => sessionStorage.getItem('adminAuthed') === '1');
  const [tab, setTab] = useState<Tab>('content');
  const [locale, setLocale] = useState<Locale>('es');
  const [selectedKey, setSelectedKey] = useState<string>(sectionKeys[0]);
  const [content, setContent] = useState<any>({});
  const [rawJson, setRawJson] = useState<string>('{}');
  const [saving, setSaving] = useState(false);

  // styles state
  const [primary, setPrimary] = useState('#2e4c47');
  const [secondary, setSecondary] = useState('#CBEDE0');
  const [fontFamily, setFontFamily] = useState('alegreya-sans, sans-serif');
  const [baseSize, setBaseSize] = useState(16);
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    if (!authed) return;
    loadSettings();
  }, [authed]);

  async function loadSettings() {
    const settings = await fetchSiteSettings();
    if (settings?.theme?.colors?.primary) setPrimary(settings.theme.colors.primary);
    if (settings?.theme?.colors?.secondary) setSecondary(settings.theme.colors.secondary);
    if (settings?.theme?.typography?.fontFamily) setFontFamily(settings.theme.typography.fontFamily);
    if (settings?.theme?.typography?.baseSize) setBaseSize(settings.theme.typography.baseSize);
    if (settings?.theme?.assets?.logoUrl) setLogoUrl(settings.theme.assets.logoUrl);
  }

  useEffect(() => {
    if (!authed) return;
    (async () => {
      const data = await fetchContent(selectedKey, locale);
      const safe = data ?? defaultContent(selectedKey);
      setContent(safe);
      setRawJson(JSON.stringify(safe, null, 2));
    })();
  }, [selectedKey, locale, authed]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const user = String(form.get('user') || '');
    const pw = String(form.get('password') || '');
    if (user === ADMIN_USER && pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAuthed', '1');
      setAuthed(true);
    } else {
      alert('Credenciales inválidas');
    }
  };

  const handleSaveContent = async () => {
    try {
      setSaving(true);
      // validate JSON
      const parsed = JSON.parse(rawJson);
      await upsertContent(selectedKey, locale, parsed);
      setContent(parsed);
      alert('Contenido guardado');
    } catch (e: any) {
      alert('Error al guardar: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleApplyTheme = async () => {
    const theme = {
      colors: { primary, secondary },
      typography: { fontFamily, baseSize },
      assets: { logoUrl }
    } as any;
    try {
      await upsertSiteSettings(theme);
    } catch {
      // ignore if RPC not available yet
    }
    applyTheme(theme);
    alert('Estilos aplicados');
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[rgb(252,248,241)] p-6">
        <form onSubmit={handleLogin} className="bg-white shadow rounded-xl p-8 w-full max-w-sm">
          <h1 className="text-2xl font-semibold mb-6">Admin Login</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Usuario</label>
              <input name="user" className="w-full border rounded-md px-3 py-2" placeholder="admin" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input type="password" name="password" className="w-full border rounded-md px-3 py-2" placeholder="••••••••" />
            </div>
            <button className="w-full bg-stone-800 text-white rounded-md py-2">Entrar</button>
            <p className="text-xs text-gray-500">Acceso solo por URL directa (/admin)</p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <select value={locale} onChange={(e) => setLocale(e.target.value as Locale)} className="border rounded-md px-3 py-2">
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>
        </header>

        <nav className="flex gap-2 mb-6">
          <button onClick={() => setTab('content')} className={`px-4 py-2 rounded-md border ${tab==='content' ? 'bg-stone-900 text-white' : 'bg-white'}`}>Contenido</button>
          <button onClick={() => setTab('styles')} className={`px-4 py-2 rounded-md border ${tab==='styles' ? 'bg-stone-900 text-white' : 'bg-white'}`}>Estilos</button>
          <button onClick={() => setTab('translate')} className={`px-4 py-2 rounded-md border ${tab==='translate' ? 'bg-stone-900 text-white' : 'bg-white'}`}>Traductor</button>
        </nav>

        {tab === 'content' && (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <label className="text-sm">Sección</label>
              <select value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)} className="border rounded-md px-3 py-2">
                {sectionKeys.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
              <button onClick={() => setRawJson(JSON.stringify(defaultContent(selectedKey), null, 2))} className="px-3 py-2 border rounded-md">Cargar plantilla</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">JSON ({locale})</label>
                <textarea value={rawJson} onChange={(e) => setRawJson(e.target.value)} className="w-full h-[460px] border rounded-md p-3 font-mono text-sm" />
                <div className="mt-3 flex gap-2">
                  <button disabled={saving} onClick={handleSaveContent} className="px-4 py-2 bg-stone-900 text-white rounded-md">Guardar</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Vista previa</label>
                <pre className="w-full h-[460px] border rounded-md p-3 bg-gray-50 overflow-auto text-xs">{rawJson}</pre>
              </div>
            </div>
          </section>
        )}

        {tab === 'styles' && (
          <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Color primario</label>
                  <input type="text" value={primary} onChange={(e)=>setPrimary(e.target.value)} className="w-full border rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Color secundario</label>
                  <input type="text" value={secondary} onChange={(e)=>setSecondary(e.target.value)} className="w-full border rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tipografía (CSS font-family)</label>
                  <input type="text" value={fontFamily} onChange={(e)=>setFontFamily(e.target.value)} className="w-full border rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tamaño base (px)</label>
                  <input type="number" min={12} max={24} value={baseSize} onChange={(e)=>setBaseSize(Number(e.target.value))} className="w-full border rounded-md px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Logo URL</label>
                  <input type="text" value={logoUrl} onChange={(e)=>setLogoUrl(e.target.value)} className="w-full border rounded-md px-3 py-2" />
                </div>
              </div>
              <div>
                <div className="border rounded-xl p-4">
                  <div className="h-36 rounded bg-gray-50 flex items-center justify-center" style={{ fontFamily }}>
                    <div>
                      <div className="text-sm text-gray-500">Vista previa</div>
                      <div className="text-2xl" style={{ color: primary }}>Título de ejemplo</div>
                      <div className="text-base" style={{ color: secondary }}>Texto secundario</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button onClick={handleApplyTheme} className="px-4 py-2 bg-stone-900 text-white rounded-md">Guardar y aplicar</button>
            </div>
          </section>
        )}

        {tab === 'translate' && (
          <section className="space-y-4">
            <TranslatorTool />
          </section>
        )}
      </div>
    </div>
  );
}

function defaultContent(key: string) {
  switch (key) {
    case 'header.hero':
      return { title: 'No necesitas tenerlo todo claro.', cta: 'Quiero comenzar terapia' };
    case 'about.section':
      return { title: 'Nosotros', body: 'Creemos que cada persona tiene el potencial de sanar.' };
    case 'therapies.section':
      return { title: 'Terapias', items: [] };
    case 'services.section':
      return { title: 'Servicios', items: [] };
    case 'footer.section':
      return { text: '© 2025' };
    default:
      return {};
  }
}

function TranslatorTool() {
  const [source, setSource] = useState<'es'|'en'>('es');
  const [target, setTarget] = useState<'es'|'en'>('en');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const swap = () => {
    setSource(target);
    setTarget(source);
    setOutput('');
  };

  const translate = async () => {
    setLoading(true);
    const res = await autoTranslate(input, source, target);
    setOutput(res);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <select value={source} onChange={(e)=>setSource(e.target.value as any)} className="border rounded-md px-2 py-1">
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>
          <button onClick={swap} className="px-3 py-1 border rounded-md">↔</button>
          <select value={target} onChange={(e)=>setTarget(e.target.value as any)} className="border rounded-md px-2 py-1">
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
        </div>
        <textarea value={input} onChange={(e)=>setInput(e.target.value)} className="w-full h-64 border rounded-md p-3" placeholder="Texto a traducir" />
        <button onClick={translate} disabled={loading} className="mt-2 px-4 py-2 bg-stone-900 text-white rounded-md">{loading? 'Traduciendo...' : 'Traducir'}</button>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Resultado</label>
        <textarea value={output} readOnly className="w-full h-64 border rounded-md p-3 bg-gray-50" />
      </div>
    </div>
  );
}
