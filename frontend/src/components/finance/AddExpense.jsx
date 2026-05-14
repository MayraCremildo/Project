import { useState } from 'react';
import { Plus } from 'lucide-react';
import { CATEGORIES } from '../../lib/storage';
import { getCurrencySymbol } from '../../lib/currency';

export default function AddExpense({ currency, onAdd }) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = parseFloat(value);
    if (!description.trim()) { setError('Descrição obrigatória'); return; }
    if (!v || v <= 0) { setError('Valor inválido'); return; }
    onAdd({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      description: description.trim(),
      value: v,
      category,
      date: new Date().toISOString(),
    });
    setDescription('');
    setValue('');
    setError('');
  };

  return (
    <div className="bg-earth-surface rounded-3xl border border-earth-border p-7 md:p-8 shadow-sm" data-testid="add-expense-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-earth-primary/10 flex items-center justify-center">
          <Plus className="w-5 h-5 text-earth-primary" strokeWidth={1.7} />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-earth-muted">Nova despesa</p>
          <p className="font-heading text-lg text-earth-text">Registrar gasto</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-earth-muted mb-2">
            Descrição
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => { setDescription(e.target.value); setError(''); }}
            placeholder="Ex: Mercado, conta de luz..."
            data-testid="expense-description-input"
            className="w-full bg-earth-surface2 rounded-2xl border-none focus:ring-2 focus:ring-earth-primary focus:bg-white transition-colors text-earth-text px-4 py-3.5 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-earth-muted mb-2">
              Valor ({getCurrencySymbol(currency)})
            </label>
            <input
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0"
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(''); }}
              placeholder="0,00"
              data-testid="expense-value-input"
              className="w-full bg-earth-surface2 rounded-2xl border-none focus:ring-2 focus:ring-earth-primary focus:bg-white transition-colors text-earth-text px-4 py-3.5 outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-earth-muted mb-2">
              Categoria
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              data-testid="expense-category-select"
              className="w-full bg-earth-surface2 rounded-2xl border-none focus:ring-2 focus:ring-earth-primary focus:bg-white transition-colors text-earth-text px-4 py-3.5 outline-none appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B6A68' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.9rem center',
                paddingRight: '2.5rem',
              }}
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="text-earth-danger text-sm" data-testid="expense-error">{error}</p>}

        <button
          type="submit"
          data-testid="add-expense-btn"
          className="w-full inline-flex items-center justify-center gap-2 bg-earth-primary text-white rounded-2xl px-6 py-3.5 font-medium hover:bg-earth-primaryHover transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" strokeWidth={2.2} />
          Adicionar despesa
        </button>
      </form>
    </div>
  );
}
