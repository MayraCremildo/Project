import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatMonthLabel } from '../../lib/storage';

function shiftMonth(monthKey, delta) {
  const [y, m] = monthKey.split('-').map((n) => parseInt(n, 10));
  const d = new Date(y, m - 1 + delta, 1);
  const yy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${yy}-${mm}`;
}

export default function MonthPicker({ value, onChange, testIdPrefix = 'month' }) {
  return (
    <div className="inline-flex items-center gap-1 bg-earth-surface2 rounded-2xl p-1.5" data-testid={`${testIdPrefix}-picker`}>
      <button
        onClick={() => onChange(shiftMonth(value, -1))}
        data-testid={`${testIdPrefix}-prev-btn`}
        className="w-9 h-9 rounded-xl hover:bg-white text-earth-muted hover:text-earth-text transition-colors flex items-center justify-center"
        aria-label="Mês anterior"
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={2} />
      </button>
      <span
        className="px-3 text-sm font-medium text-earth-text font-heading min-w-[140px] text-center"
        data-testid={`${testIdPrefix}-label`}
      >
        {formatMonthLabel(value)}
      </span>
      <button
        onClick={() => onChange(shiftMonth(value, 1))}
        data-testid={`${testIdPrefix}-next-btn`}
        className="w-9 h-9 rounded-xl hover:bg-white text-earth-muted hover:text-earth-text transition-colors flex items-center justify-center"
        aria-label="Próximo mês"
      >
        <ChevronRight className="w-4 h-4" strokeWidth={2} />
      </button>
    </div>
  );
}
