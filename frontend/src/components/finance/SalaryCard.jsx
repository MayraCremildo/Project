import { Wallet } from 'lucide-react';
import { getCurrencySymbol, formatMoney } from '../../lib/currency';
import MonthPicker from './MonthPicker';

export default function SalaryCard({ salary, currency, onSalaryChange, monthKey, onMonthChange }) {
  return (
    <div className="bg-earth-surface rounded-3xl border border-earth-border p-7 md:p-8 shadow-sm" data-testid="salary-card">
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-earth-primary/10 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-earth-primary" strokeWidth={1.6} />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-earth-muted">Mês de referência</p>
            <p className="font-heading text-lg text-earth-text">Salário mensal</p>
          </div>
        </div>
        <MonthPicker value={monthKey} onChange={onMonthChange} testIdPrefix="salary-month" />
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-earth-muted text-2xl font-light" data-testid="salary-currency-symbol">
          {getCurrencySymbol(currency)}
        </span>
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          value={salary || ''}
          onChange={(e) => onSalaryChange(parseFloat(e.target.value) || 0)}
          placeholder="0,00"
          data-testid="salary-input"
          className="flex-1 bg-transparent border-none outline-none font-heading text-4xl md:text-5xl font-light text-earth-text placeholder:text-earth-border w-full"
        />
      </div>
      <p className="text-sm text-earth-muted mt-3">
        Receita líquida considerada para o mês selecionado.{' '}
        {salary > 0 && (
          <span className="text-earth-text font-medium" data-testid="salary-formatted">
            {formatMoney(salary, currency)}
          </span>
        )}
      </p>
    </div>
  );
}
