import React from 'react';
import { FileText, Palette, Languages, LayoutGrid } from 'lucide-react';

export type AdminNavKey = 'content' | 'styles' | 'translate';

type NavItem = { key: AdminNavKey; label: string; icon: React.ReactNode };

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
  children: React.ReactNode;
};

export default function AdminLayout({ active, onChange, locale, onLocaleChange, children }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r bg-white">
        <div className="h-16 px-4 flex items-center gap-2 border-b">
          <LayoutGrid size={18} />
          <span className="font-semibold">Admin</span>
        </div>
        <nav className="p-3 space-y-1">
          {NAV_ITEMS.map((it) => (
            <button
              key={it.key}
              onClick={() => onChange(it.key)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm border ${
                active === it.key ? 'bg-stone-900 text-white border-stone-900' : 'bg-white hover:bg-gray-50'
              }`}
            >
              {it.icon}
              <span>{it.label}</span>
            </button>
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
