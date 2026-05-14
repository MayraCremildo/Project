import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { CURRENCIES } from '../../lib/currency';

export default function EditProfileModal({ open, initialName, initialCurrency, onClose, onSave }) {
  const [name, setName] = useState(initialName || '');
  const [currency, setCurrency] = useState(initialCurrency || 'MZN');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setName(initialName || '');
      setCurrency(initialCurrency || 'MZN');
      setError('');
    }
  }, [open, initialName, initialCurrency]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, digite seu nome.');
      return;
    }
    onSave({ name: name.trim(), currency });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm fade-up"
      data-testid="edit-profile-modal"
      onClick={onClose}
    >
      <div
        className="bg-earth-surface rounded-3xl border border-earth-border shadow-xl w-full max-w-md p-7 md:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          data-testid="edit-profile-close-btn"
          className="absolute top-4 right-4 w-9 h-9 rounded-xl hover:bg-earth-surface2 text-earth-muted hover:text-earth-text flex items-center justify-center transition-colors"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" strokeWidth={2} />
        </button>

        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-earth-muted mb-2">Perfil</p>
        <h2 className="font-heading text-2xl md:text-3xl font-light text-earth-text mb-7 leading-tight">
          Qual é o seu nome?
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-earth-muted mb-2">
              Seu nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              autoFocus
              data-testid="edit-name-input"
              className="w-full bg-earth-surface2 rounded-2xl border-none focus:ring-2 focus:ring-earth-primary focus:bg-white transition-all text-earth-text p-4 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-earth-muted mb-2">
              Sua moeda
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              data-testid="edit-currency-select"
              className="w-full bg-earth-surface2 rounded-2xl border-none focus:ring-2 focus:ring-earth-primary focus:bg-white transition-all text-earth-text p-4 outline-none appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%236B6A68' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                paddingRight: '2.75rem',
              }}
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>{c.symbol} — {c.label} ({c.code})</option>
              ))}
            </select>
          </div>

          {error && <p className="text-earth-danger text-sm" data-testid="edit-profile-error">{error}</p>}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              data-testid="edit-profile-cancel-btn"
              className="flex-1 bg-earth-surface2 text-earth-text rounded-2xl px-5 py-3.5 font-medium hover:bg-earth-border transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              data-testid="edit-profile-save-btn"
              className="flex-1 bg-earth-primary text-white rounded-2xl px-5 py-3.5 font-medium hover:bg-earth-primaryHover transition-colors shadow-sm"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
