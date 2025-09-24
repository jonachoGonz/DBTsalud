import React from 'react';
import { FileText, Palette, Languages, LayoutGrid } from 'lucide-react';

export type AdminNavKey = 'content' | 'styles' | 'translate';

type NavItem = { key: AdminNavKey; label: string; icon: React.ReactNode };

type SubItem = { key: string; label: string; active?: boolean; onClick?: () => void };

const NAV_ITEMS: NavItem[] = [
  { key: 'content', label: 'Contenido', icon: <FileText size={16} /> },
  { key: 'styles', label: 'Estilos', icon: <Palette size={16} /> },
  { key: 'translate', label: 'Traductor', icon: <Languages size={16} /> },
];

type Props = {
  active: AdminNavKey;
  onChange: (key: AdminNavKey) => void;
  locale: 'es' | 'en';
  onLocaleChange: (loc: 'es' | 'en') => void;
  subItems?: SubItem[];
  children: React.ReactNode;
};

export default function AdminLayout({ active, onChange, locale, onLocaleChange, subItems, children }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r bg-white">
        <div className="h-16 px-4 flex items-center gap-2 border-b">
          <LayoutGrid size={18} />
          <span className="font-semibold">Admin</span>
        </div>
        <nav className="p-3 space-y-1">
          {NAV_ITEMS.map((it) => (
            <div key={it.key} className="space-y-1">
              <button
                onClick={() => onChange(it.key)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm border ${
                  active === it.key ? 'bg-stone-900 text-white border-stone-900' : 'bg-white hover:bg-gray-50'
                }`}
              >
                {it.icon}
                <span>{it.label}</span>
              </button>
              {active === 'content' && it.key === 'content' && subItems && subItems.length > 0 && (
                <div className="ml-2 pl-2 border-l space-y-1">
                  <div className="px-2 pt-2 text-[10px] uppercase tracking-wide text-gray-500">Secciones</div>
                  {subItems.map(si => (
                    <button
                      key={si.key}
                      onClick={si.onClick}
                      className={`w-full text-left px-3 py-1.5 rounded-md text-sm ${si.active ? 'bg-[rgb(236,243,255)] text-[rgb(70,95,255)]' : 'hover:bg-gray-50'}`}
                    >
                      {si.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 bg-white border-b px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="md:hidden px-3 py-2 border rounded-md">Menú</button>
            <h1 className="text-lg font-semibold">Panel de control</h1>
          </div>
          <div className="flex items-center gap-3">
            <input className="hidden md:block border rounded-md px-3 py-2 text-sm w-64" placeholder="Buscar..." />
            <select value={locale} onChange={(e)=>onLocaleChange(e.target.value as 'es'|'en')} className="border rounded-md px-3 py-2 text-sm">
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>
        </header>
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
