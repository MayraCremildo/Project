import { Trash2, Inbox } from 'lucide-react';
import { CATEGORIES } from '../../lib/storage';
import { formatMoney } from '../../lib/currency';

function categoryMeta(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[1];
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  } catch { return ''; }
}

export default function ExpensesList({ expenses, currency, onDelete }) {
  const sorted = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="bg-earth-surface rounded-3xl border border-earth-border p-7 md:p-8 shadow-sm" data-testid="expenses-list-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-earth-muted">Histórico</p>
          <p className="font-heading text-lg text-earth-text">Despesas do mês</p>
        </div>
        <span className="text-xs text-earth-muted bg-earth-surface2 rounded-full px-3 py-1.5 font-medium" data-testid="expenses-count">
          {sorted.length} {sorted.length === 1 ? 'lançamento' : 'lançamentos'}
        </span>
      </div>

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center" data-testid="expenses-empty">
          <div className="w-14 h-14 rounded-2xl bg-earth-surface2 flex items-center justify-center mb-3">
            <Inbox className="w-6 h-6 text-earth-muted" strokeWidth={1.4} />
          </div>
          <p className="text-sm text-earth-muted max-w-xs">
            Nenhuma despesa registrada ainda. Comece adicionando seu primeiro gasto deste mês.
          </p>
        </div>
      ) : (
        <ul className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
          {sorted.map((exp) => {
            const cat = categoryMeta(exp.category);
            return (
              <li
                key={exp.id}
                data-testid={`expense-item-${exp.id}`}
                className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-earth-surface2 transition-colors"
              >
                <span
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${cat.color}1A` }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-earth-text truncate">{exp.description}</p>
                  <p className="text-xs text-earth-muted">
                    {cat.label} · {formatDate(exp.date)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-earth-text whitespace-nowrap">
                  {formatMoney(exp.value, currency)}
                </p>
                <button
                  onClick={() => onDelete(exp.id)}
                  data-testid={`delete-expense-${exp.id}`}
                  className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 rounded-xl hover:bg-earth-danger/15 text-earth-muted hover:text-earth-danger flex items-center justify-center"
                  aria-label="Excluir despesa"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={1.7} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
