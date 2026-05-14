import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatMoney } from '../../lib/currency';

export default function RemainingBalance({ salary, expenses, currency }) {
  const totalSpent = expenses.reduce((s, e) => s + Number(e.value || 0), 0);
  const remaining = salary - totalSpent;
  const isPositive = remaining >= 0;
  const pct = salary > 0 ? Math.round((remaining / salary) * 100) : 0;

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-7 md:p-9 shadow-sm bg-earth-primary text-white"
      data-testid="remaining-balance-card"
    >
      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute -right-8 -bottom-12 w-48 h-48 rounded-full bg-white/5 blur-2xl" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-white/80" strokeWidth={1.7} />
          ) : (
            <TrendingDown className="w-4 h-4 text-white/80" strokeWidth={1.7} />
          )}
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
            {isPositive ? 'Sobrou este mês' : 'Acima do salário'}
          </p>
        </div>

        <p className="font-heading text-5xl md:text-6xl font-light tracking-tight leading-none" data-testid="remaining-balance-value">
          {formatMoney(remaining, currency)}
        </p>

        <div className="mt-7 grid grid-cols-3 gap-4 text-white/90">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/60 mb-1">Salário</p>
            <p className="text-sm font-medium" data-testid="summary-salary">{formatMoney(salary, currency)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/60 mb-1">Despesas</p>
            <p className="text-sm font-medium" data-testid="summary-spent">{formatMoney(totalSpent, currency)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/60 mb-1">Disponível</p>
            <p className="text-sm font-medium">{salary > 0 ? `${pct}%` : '—'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
