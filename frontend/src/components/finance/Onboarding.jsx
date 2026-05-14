import { useState } from 'react';
import { CURRENCIES } from '../../lib/currency';
import { Sprout, ArrowRight } from 'lucide-react';

export default function Onboarding({ onSubmit }) {
  const [name, setName] = useState('');
  const [currency, setCurrency] = useState('BRL');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, digite seu nome.');
      return;
    }
    onSubmit({ name: name.trim(), currency });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-earth-bg p-6" data-testid="onboarding-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-earth-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-category-lazer/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-xl fade-up">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-11 h-11 rounded-2xl bg-earth-primary/10 flex items-center justify-center">
            <Sprout className="w-5 h-5 text-earth-primary" strokeWidth={1.5} />
          </div>
          <span className="font-heading text-lg font-medium text-earth-text tracking-tight">Orçamento</span>
        </div>

        <h1 className="font-heading text-4xl md:text-5xl font-light tracking-tight text-earth-text mb-3 leading-tight">
          Bem-vindo.
        </h1>
        <p className="text-earth-muted text-base md:text-lg mb-12 max-w-md leading-relaxed">
          Antes de começar, conte-nos como devemos chamar você e qual moeda você usa no dia a dia.
        </p>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-earth-muted mb-3">
              Seu nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              placeholder="Digite seu primeiro nome"
              autoFocus
              data-testid="onboarding-name-input"
              className="w-full bg-earth-surface2 rounded-2xl border-none focus:ring-2 focus:ring-earth-primary focus:bg-white transition-all text-earth-text p-5 outline-none text-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-earth-muted mb-3">
              Sua moeda
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              data-testid="onboarding-currency-select"
              className="w-full bg-earth-surface2 rounded-2xl border-none focus:ring-2 focus:ring-earth-primary focus:bg-white transition-all text-earth-text p-5 outline-none text-lg appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%236B6A68' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1.25rem center',
                paddingRight: '3rem',
              }}
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.symbol} — {c.label} ({c.code})</option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-earth-danger text-sm" data-testid="onboarding-error">{error}</p>
          )}

          <button
            type="submit"
            data-testid="onboarding-submit-btn"
            className="group inline-flex items-center gap-3 bg-earth-primary text-white rounded-2xl px-7 py-4 font-medium hover:bg-earth-primaryHover transition-all shadow-sm hover:shadow-md mt-4"
          >
            Começar
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
          </button>
        </form>
      </div>
    </div>
  );
}
