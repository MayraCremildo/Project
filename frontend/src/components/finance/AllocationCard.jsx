import { PieChart, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../../lib/storage';

export default function AllocationCard({ allocations, onChange }) {
  const total = Object.values(allocations).reduce((s, v) => s + (Number(v) || 0), 0);
  const isValid = total === 100;

  const handleChange = (id, value) => {
    const v = Math.max(0, Math.min(100, parseInt(value, 10) || 0));
    onChange({ ...allocations, [id]: v });
  };

  return (
    <div className="bg-earth-surface rounded-3xl border border-earth-border p-7 md:p-8 shadow-sm" data-testid="allocation-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-earth-primary/10 flex items-center justify-center">
            <PieChart className="w-5 h-5 text-earth-primary" strokeWidth={1.6} />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-earth-muted">Distribuição</p>
            <p className="font-heading text-lg text-earth-text">Alocação por categoria</p>
          </div>
        </div>
        <div
          className={`text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full ${
            isValid
              ? 'bg-earth-primary/10 text-earth-primary'
              : 'bg-earth-danger/15 text-earth-danger'
          }`}
          data-testid="allocation-total"
        >
          Total: {total}%
        </div>
      </div>

      <div className="space-y-5">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} data-testid={`allocation-row-${cat.id}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-sm font-medium text-earth-text">{cat.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={allocations[cat.id] ?? 0}
                  onChange={(e) => handleChange(cat.id, e.target.value)}
                  data-testid={`allocation-input-${cat.id}`}
                  className="w-16 text-right bg-earth-surface2 rounded-lg px-2 py-1.5 text-sm font-medium text-earth-text outline-none focus:ring-2 focus:ring-earth-primary"
                />
                <span className="text-sm text-earth-muted">%</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={allocations[cat.id] ?? 0}
              onChange={(e) => handleChange(cat.id, e.target.value)}
              data-testid={`allocation-slider-${cat.id}`}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-earth-surface2"
              style={{
                background: `linear-gradient(to right, ${cat.color} 0%, ${cat.color} ${
                  allocations[cat.id] ?? 0
                }%, #F0EFEB ${allocations[cat.id] ?? 0}%, #F0EFEB 100%)`,
              }}
            />
          </div>
        ))}
      </div>

      {!isValid && (
        <div className="mt-5 flex items-start gap-2 text-xs text-earth-danger bg-earth-danger/10 rounded-xl p-3" data-testid="allocation-warning">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={1.7} />
          <span>A soma das porcentagens deve ser exatamente 100% para um orçamento balanceado.</span>
        </div>
      )}
    </div>
  );
}
