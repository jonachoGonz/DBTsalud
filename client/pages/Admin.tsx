import { useEffect, useMemo, useState } from 'react';
import { fetchContent, upsertContent, fetchSiteSettings, upsertSiteSettings, listContentKeys, type Locale } from '@/lib/cms';
import { applyTheme } from '@/lib/theme';
import { autoTranslate } from '@/lib/translate';

const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || 'admin';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'qpsych2025!';

type Tab = 'content' | 'styles' | 'translate';

const defaultKeys = [
  'luminous.seo',
  'luminous.header',
  'luminous.about',
  'luminous.therapies',
  'luminous.services',
  'luminous.process',
  'luminous.team',
  'luminous.contact',
  'luminous.footer'
];

export default function Admin() {
  const [authed, setAuthed] = useState<boolean>(() => sessionStorage.getItem('adminAuthed') === '1');
  const [tab, setTab] = useState<Tab>('content');
  const [locale, setLocale] = useState<Locale>('es');
  const [availableKeys, setAvailableKeys] = useState<string[]>(defaultKeys);
  const [selectedKey, setSelectedKey] = useState<string>(defaultKeys[0]);
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
    (async () => {
      try {
        const keys = await listContentKeys('luminous.');
        if (keys.length) setAvailableKeys(Array.from(new Set([...defaultKeys, ...keys])));
      } catch {}
    })();
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

  async function migrateFromLuminous() {
    const es = {
      header: {
        title1: "No necesitas tenerlo todo claro.",
        title2: "A veces, solo hace falta tomar el primer paso.",
        subtitle1: "Acompañamos procesos terapéuticos con calidez, evidencia y humanidad.",
        subtitle2: "Atención psicológica online y presencial, en español e inglés, desde Chile.",
        cta1: "Quiero comenzar terapia",
        cta2: "Conoce el Programa DBT",
      },
      about: {
        title: "Somos DBT Salud",
        body: "En DBT Salud creemos que cada persona, sin importar su historia, tiene el potencial de sanar y construir una vida con propósito. Por eso creamos un espacio profesional, humano y cercano, donde puedas sentirte escuchado, acompañado y comprendido.\n\nNos especializamos en tratar dificultades emocionales complejas como desregulación emocional, ansiedad, trastornos de personalidad, depresión, relaciones conflictivas y más. También acompañamos procesos de crecimiento personal, toma de decisiones importantes y desarrollo emocional.\n\nOfrecemos psicoterapia basada en evidencia, con un enfoque flexible y adaptado a tus necesidades. Integramos terapias como DBT, TCC, ACT y PBT.",
        linkText: "Conócenos",
        linkUrl: "/#nosotros",
      },
      therapies: {
        title: "Terapias que ofrecemos",
        items: [
          { title: "DBT (Terapia Dialéctico-Conductual)", desc: "Enfoque intensivo ideal para crisis emocionales, impulsividad y relaciones conflictivas.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=450&fit=crop" },
          { title: "TCC (Terapia Cognitivo-Conductual)", desc: "Identifica y transforma pensamientos y conductas que afectan tu bienestar.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=450&fit=crop" },
          { title: "ACT (Aceptación y Compromiso)", desc: "Conecta con tus valores y aprende a vivir con sentido, incluso en la dificultad.", image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=450&fit=crop" },
          { title: "PBT (Process-Based Therapy)", desc: "Terapia flexible centrada en procesos específicos, no solo en diagnósticos.", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=450&fit=crop" },
        ]
      },
      services: {
        title: "Nuestros servicios",
        subtitle: "Atención online y presencial | Español e inglés",
        items: [
          { title: "Programa DBT Completo", desc: "Incluye sesiones individuales, talleres de habilidades, coaching entre sesiones y equipo clínico." },
          { title: "DBT-SUD (Consumo problemático de sustancias)", desc: "Programa especializado para quienes enfrentan adicción y desregulación emocional." },
          { title: "Sesiones individuales personalizadas", desc: "Espacios de psicoterapia flexibles, empáticos y confidenciales." },
          { title: "Evaluaciones psicológicas", desc: "Informes clínicos claros, adaptados a contextos escolares, médicos o familiares." },
        ]
      },
      footer: { text: "© 2025 DBT Salud", quote: "Tu historia merece ser escuchada. Tu vida merece ser vivida con sentido." }
    };

    const en = {
      header: {
        title1: "You don't need to have it all figured out.",
        title2: "Sometimes, you just need to take the first step.",
        subtitle1: "We accompany therapeutic processes with warmth, evidence and humanity.",
        subtitle2: "Online and in-person psychological care, in Spanish and English, from Chile.",
        cta1: "I want to start therapy",
        cta2: "Learn about DBT Program",
      },
      about: {
        title: "We are DBT Salud",
        body: "At DBT Salud we believe that every person, regardless of their history, has the potential to heal and build a life with purpose. That's why we create a professional, human and close space, where you can feel heard, accompanied and understood.\n\nWe specialize in treating complex emotional difficulties such as emotional dysregulation, anxiety, personality disorders, depression, conflictual relationships and more. We also accompany personal growth processes, important decision making and emotional development.\n\nWe offer evidence-based psychotherapy, with a flexible approach adapted to your needs. We integrate therapies such as DBT, CBT, ACT and PBT.",
        linkText: "About us",
        linkUrl: "/#nosotros",
      },
      therapies: {
        title: "Therapies we offer",
        items: [
          { title: "DBT (Dialectical Behavior Therapy)", desc: "Intensive approach ideal for emotional crises, impulsivity and conflictual relationships.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=450&fit=crop" },
          { title: "CBT (Cognitive-Behavioral Therapy)", desc: "Identifies and transforms thoughts and behaviors that affect your well-being.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=450&fit=crop" },
          { title: "ACT (Acceptance and Commitment)", desc: "Connect with your values and learn to live meaningfully, even in difficulty.", image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=450&fit=crop" },
          { title: "PBT (Process-Based Therapy)", desc: "Flexible therapy focused on specific processes, not just diagnoses.", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=450&fit=crop" },
        ]
      },
      services: {
        title: "Our services",
        subtitle: "Online and in-person care | Spanish and English",
        items: [
          { title: "Complete DBT Program", desc: "Includes individual sessions, skills workshops, between-session coaching and clinical team." },
          { title: "DBT-SUD (Problematic substance use)", desc: "Specialized program for those facing addiction and emotional dysregulation." },
          { title: "Personalized individual sessions", desc: "Flexible, empathetic and confidential psychotherapy spaces." },
          { title: "Psychological evaluations", desc: "Clear clinical reports, adapted to school, medical or family contexts." },
        ]
      },
      footer: { text: "© 2025 DBT Salud", quote: "Your story deserves to be heard. Your life deserves to be lived with meaning." }
    };

    try {
      // Upsert ES
      await upsertContent('luminous.seo', 'es', { title: 'Terapia DBT en Chile | DBT Salud', description: 'Psicoterapia DBT, TCC, ACT y PBT en Chile. Online y presencial.', canonical: 'https://www.dbtsalud.cl/', ogUrl: 'https://www.dbtsalud.cl/', ogImage: 'https://www.dbtsalud.cl/assets/og-image.jpg' });
      await upsertContent('luminous.header', 'es', es.header);
      await upsertContent('luminous.about', 'es', es.about);
      await upsertContent('luminous.therapies', 'es', es.therapies);
      await upsertContent('luminous.services', 'es', es.services);
      await upsertContent('luminous.process', 'es', defaultContent('luminous.process'));
      await upsertContent('luminous.team', 'es', defaultContent('luminous.team'));
      await upsertContent('luminous.contact', 'es', defaultContent('luminous.contact'));
      await upsertContent('luminous.footer', 'es', es.footer);
      // Upsert EN
      await upsertContent('luminous.seo', 'en', { title: 'DBT therapy in Chile | DBT Salud', description: 'DBT, CBT, ACT and PBT in Chile. Online and in-person.', canonical: 'https://www.dbtsalud.cl/', ogUrl: 'https://www.dbtsalud.cl/', ogImage: 'https://www.dbtsalud.cl/assets/og-image.jpg' });
      await upsertContent('luminous.header', 'en', en.header);
      await upsertContent('luminous.about', 'en', en.about);
      await upsertContent('luminous.therapies', 'en', en.therapies);
      await upsertContent('luminous.services', 'en', en.services);
      await upsertContent('luminous.process', 'en', defaultContent('luminous.process'));
      await upsertContent('luminous.team', 'en', defaultContent('luminous.team'));
      await upsertContent('luminous.contact', 'en', defaultContent('luminous.contact'));
      await upsertContent('luminous.footer', 'en', en.footer);

      const keys = await listContentKeys('luminous.');
      if (keys.length) setAvailableKeys(Array.from(new Set([...defaultKeys, ...keys])));
      alert('Contenido migrado desde Luminous');
    } catch (e:any) {
      alert('Error en migración: ' + e.message);
    }
  }

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
            <div className="flex items-center gap-3 flex-wrap">
              <label className="text-sm">Sección</label>
              <select value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)} className="border rounded-md px-3 py-2">
                {availableKeys.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
              <button onClick={() => setRawJson(JSON.stringify(defaultContent(selectedKey), null, 2))} className="px-3 py-2 border rounded-md">Cargar plantilla</button>
              <button onClick={migrateFromLuminous} className="px-3 py-2 border rounded-md bg-stone-900 text-white">Migrar desde Luminous</button>
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
                <div className="w-full h-[460px] border rounded-md p-3 bg-gray-50 overflow-auto text-xs">
                  <ComponentPreview k={selectedKey} jsonText={rawJson} />
                </div>
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
    case 'luminous.seo':
      return { title: 'Terapia DBT en Chile | DBT Salud', description: 'Psicoterapia DBT, TCC, ACT y PBT en Chile. Online y presencial.', canonical: 'https://www.dbtsalud.cl/', ogUrl: 'https://www.dbtsalud.cl/', ogImage: 'https://www.dbtsalud.cl/assets/og-image.jpg', keywords: 'terapia DBT, psicólogos Chile, TCC, ACT' };
    case 'luminous.header':
      return { title1: 'No necesitas tenerlo todo claro.', title2: 'A veces, solo hace falta tomar el primer paso.', subtitle1: 'Psicoterapia DBT basada en evidencia', subtitle2: 'Acompañamiento humano y profesional', cta1: 'Quiero comenzar terapia', cta2: 'Conoce el Programa DBT' };
    case 'luminous.about':
      return { title: 'Nosotros', body: 'Creemos que cada persona tiene el potencial de sanar.', linkText: 'Conócenos', linkUrl: '/#nosotros' };
    case 'luminous.therapies':
      return { title: 'Terapias', items: [{ title: 'DBT', desc: 'Terapia dialéctico-conductual' }, { title: 'TCC', desc: 'Terapia cognitivo-conductual' }] };
    case 'luminous.services':
      return { title: 'Servicios', items: [{ title: 'Evaluaciones' }, { title: 'Sesiones Individuales' }] };
    case 'luminous.process':
      return { title: 'Nuestro proceso', steps: [
        { title: 'Primer contacto', desc: 'Escríbenos por WhatsApp o correo.' },
        { title: 'Cuestionario de ingreso', desc: 'Breve formulario para conocerte mejor.' },
        { title: 'Primera sesión', desc: 'Exploramos tu historia y objetivos.' },
        { title: 'Plan terapéutico', desc: 'Definimos tipo de terapia y frecuencia.' },
      ] };
    case 'luminous.team':
      return { title: 'Conoce al equipo', members: [
        { name: 'Karla González', role: 'Psicóloga clínica', bio: 'Formación en DBT, ACT y TCA.' },
        { name: 'Daniel Henríquez', role: 'Psicólogo clínico', bio: 'Formación en DBT y TCC.' },
      ] };
    case 'luminous.contact':
      return { title: 'Contacto directo', address: 'Almirante Pastene 185, Providencia, oficina 204', whatsapp: '+56 9 4989 7699', instagram: '@psi.karlagg', email: 'contacto@dbtsalud.cl', hours: { weekdays: 'Lun-Vie 10:00-19:00', saturday: 'Sáb 9:00-14:00', sunday: 'Domingo: Cerrado' } };
    case 'luminous.footer':
      return { text: '© 2025 DBT Salud' };
    default:
      return {};
  }
}

function Heading({children}:{children:any}){return <div className="text-lg font-semibold mb-2">{children}</div>}
function Small({children}:{children:any}){return <div className="text-xs text-gray-500">{children}</div>}

function ComponentPreview({ k, jsonText }: { k: string; jsonText: string }) {
  let data: any = {};
  try { data = JSON.parse(jsonText || '{}'); } catch { data = {}; }
  if (k === 'luminous.seo') {
    return (
      <div className="space-y-2">
        <Heading>SEO</Heading>
        <Small>Título: {data.title}</Small>
        <Small>Descripción: {data.description}</Small>
        <Small>Canonical: {data.canonical}</Small>
      </div>
    );
  }
  if (k === 'luminous.header') {
    return (
      <div className="h-full flex flex-col">
        <Heading>Header</Heading>
        <div className="relative flex-1 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-stone-700 to-stone-900" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
            <div className="text-white text-3xl font-bold tk-alegreya">{data.title1}</div>
            <div className="text-white text-2xl mt-2 tk-alegreya">{data.title2}</div>
            <div className="mt-6 flex gap-3">
              <span className="bg-white text-black rounded-full px-4 py-2 text-sm">{data.cta1}</span>
              <span className="border border-white text-white rounded-full px-4 py-2 text-sm">{data.cta2}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (k === 'luminous.about') {
    return (
      <div>
        <Heading>Nosotros</Heading>
        <div className="bg-[rgb(253,251,245)] rounded-lg p-4">
          <div className="text-xl font-medium mb-2 tk-alegreya">{data.title}</div>
          <Small>{data.body}</Small>
        </div>
      </div>
    );
  }
  if (k === 'luminous.therapies') {
    return (
      <div>
        <Heading>Terapias</Heading>
        <div className="grid grid-cols-2 gap-3">
          {(data.items || []).slice(0,4).map((it:any,idx:number)=> (
            <div key={idx} className="border rounded-lg p-3 bg-white">
              <div className="font-medium">{it.title}</div>
              <Small>{it.desc}</Small>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (k === 'luminous.services') {
    return (
      <div>
        <Heading>Servicios</Heading>
        <div className="grid grid-cols-2 gap-3">
          {(data.items || []).slice(0,4).map((it:any,idx:number)=> (
            <div key={idx} className="border rounded-lg p-3 bg-white">
              <div className="font-medium">{it.title}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (k === 'luminous.process') {
    return (
      <div>
        <Heading>Proceso</Heading>
        <ol className="space-y-2 list-decimal pl-5">
          {(data.steps || []).map((s:any, idx:number) => (
            <li key={idx}>
              <div className="font-medium">{s.title}</div>
              <Small>{s.desc}</Small>
            </li>
          ))}
        </ol>
      </div>
    );
  }
  if (k === 'luminous.team') {
    return (
      <div>
        <Heading>Equipo</Heading>
        <div className="grid grid-cols-2 gap-3">
          {(data.members || []).map((m:any, idx:number) => (
            <div key={idx} className="border rounded-lg p-3 bg-white">
              <div className="font-medium">{m.name}</div>
              <Small>{m.role}</Small>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (k === 'luminous.contact') {
    return (
      <div>
        <Heading>Contacto</Heading>
        <Small>{data.address}</Small>
        <Small>{data.whatsapp}</Small>
        <Small>{data.instagram}</Small>
        <Small>{data.email}</Small>
      </div>
    );
  }
  if (k === 'luminous.footer') {
    return (
      <div>
        <Heading>Footer</Heading>
        <Small>{data.text}</Small>
      </div>
    );
  }
  return <pre className="text-[10px]">{jsonText}</pre>;
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
