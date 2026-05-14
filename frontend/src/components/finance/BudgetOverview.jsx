import { CATEGORIES } from '../../lib/storage';
import { formatMoney } from '../../lib/currency';

export default function BudgetOverview({ salary, allocations, expenses, currency }) {
  const spentByCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.value || 0);
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" data-testid="budget-overview">
      {CATEGORIES.map((cat) => {
        const allocated = (salary * (allocations[cat.id] || 0)) / 100;
        const spent = spentByCategory[cat.id] || 0;
        const remaining = allocated - spent;
        const pct = allocated > 0 ? Math.min(100, (spent / allocated) * 100) : 0;
        const isOver = spent > allocated && allocated > 0;

        return (
          <div
            key={cat.id}
            className="bg-earth-surface rounded-3xl border border-earth-border p-5 md:p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all"
            data-testid={`budget-card-${cat.id}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-earth-muted">
                {cat.label}
              </p>
            </div>
            <p className="font-heading text-2xl md:text-3xl font-light text-earth-text mb-1" data-testid={`budget-remaining-${cat.id}`}>
              {formatMoney(Math.max(0, remaining), currency)}
            </p>
            <p className="text-xs text-earth-muted mb-4">
              de <span className="text-earth-text font-medium">{formatMoney(allocated, currency)}</span>
            </p>
            <div className="h-1.5 w-full rounded-full bg-earth-surface2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  backgroundColor: isOver ? '#D49A89' : cat.color,
                }}
              />
            </div>
            <p className={`text-[11px] mt-2 ${isOver ? 'text-earth-danger font-medium' : 'text-earth-muted'}`}>
              {isOver
                ? `Excedido em ${formatMoney(spent - allocated, currency)}`
                : `Gasto: ${formatMoney(spent, currency)}`}
            </p>
          </div>
        );
      })}
    </div>
  );
}
