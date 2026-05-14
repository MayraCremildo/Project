import { Sprout, RotateCcw, Pencil } from 'lucide-react';
import { CURRENCIES } from '../../lib/currency';

export default function Header({ userName, currency, onCurrencyChange, onReset, onEditProfile }) {
  return (
    <header className="backdrop-blur-xl bg-earth-bg/80 border-b border-earth-border/60 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-5 flex items-center justify-between gap-4">
        <button
          onClick={onEditProfile}
          data-testid="header-greeting"
          className="group flex items-center gap-3 hover:bg-earth-surface2 rounded-2xl pl-2 pr-3 py-1.5 -ml-2 transition-colors"
          title="Editar perfil"
        >
          <div className="w-10 h-10 rounded-2xl bg-earth-primary/10 flex items-center justify-center">
            <Sprout className="w-5 h-5 text-earth-primary" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col leading-tight text-left">
            <span className="text-[11px] uppercase tracking-[0.2em] text-earth-muted font-semibold">Olá,</span>
            <span className="font-heading text-lg md:text-xl font-medium text-earth-text -mt-0.5 flex items-center gap-1.5" data-testid="user-name-display">
              {userName}
              <Pencil className="w-3.5 h-3.5 text-earth-muted opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.8} />
            </span>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onEditProfile}
            data-testid="edit-profile-btn"
            title="Alterar nome e moeda"
            className="inline-flex items-center gap-2 text-sm text-earth-muted hover:text-earth-text bg-transparent hover:bg-earth-surface2 rounded-xl px-3 py-2 transition-colors"
          >
            <Pencil className="w-4 h-4" strokeWidth={1.7} />
            <span className="hidden md:inline">Editar perfil</span>
          </button>
          <button
            onClick={onReset}
            data-testid="reset-btn"
            title="Redefinir dados"
            className="hidden md:inline-flex items-center gap-2 text-sm text-earth-muted hover:text-earth-text bg-transparent hover:bg-earth-surface2 rounded-xl px-3 py-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" strokeWidth={1.7} />
            Redefinir
          </button>

          <div className="relative">
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              data-testid="currency-selector"
              className="bg-earth-surface2 hover:bg-earth-border/60 text-earth-text rounded-xl px-4 py-2.5 pr-9 text-sm font-medium outline-none focus:ring-2 focus:ring-earth-primary transition-colors appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B6A68' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.6rem center',
              }}
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.code}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
