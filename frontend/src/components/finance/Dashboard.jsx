import { useEffect, useMemo, useState } from 'react';
import Header from './Header';
import SalaryCard from './SalaryCard';
import AllocationCard from './AllocationCard';
import BudgetOverview from './BudgetOverview';
import AddExpense from './AddExpense';
import ExpensesList from './ExpensesList';
import RemainingBalance from './RemainingBalance';
import MonthlyReport from './MonthlyReport';
import EditProfileModal from './EditProfileModal';
import { ensureMonth, getMonthKey, saveState, resetState, DEFAULT_ALLOCATIONS } from '../../lib/storage';

export default function Dashboard({ initialState, onReset }) {
  const [state, setState] = useState(() => {
    const s = { ...initialState };
    if (!s.months) s.months = {};
    return ensureMonth(s, getMonthKey());
  });
  const [activeMonth, setActiveMonth] = useState(getMonthKey());
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const monthData = useMemo(() => {
    const m = state.months[activeMonth];
    if (m) return m;
    return { salary: 0, allocations: { ...DEFAULT_ALLOCATIONS }, expenses: [] };
  }, [state.months, activeMonth]);

  const updateMonth = (patch) => {
    setState((prev) => {
      const next = { ...prev, months: { ...prev.months } };
      const current = next.months[activeMonth] || { salary: 0, allocations: { ...DEFAULT_ALLOCATIONS }, expenses: [] };
      next.months[activeMonth] = { ...current, ...patch };
      return next;
    });
  };

  const handleChangeMonth = (mk) => {
    setState((prev) => {
      const next = { ...prev, months: { ...prev.months } };
      if (!next.months[mk]) {
        // seed allocations from previous active month for convenience
        next.months[mk] = {
          salary: 0,
          allocations: { ...(prev.months[activeMonth]?.allocations || DEFAULT_ALLOCATIONS) },
          expenses: [],
        };
      }
      return next;
    });
    setActiveMonth(mk);
  };

  const handleReset = () => {
    if (confirm('Tem certeza que deseja redefinir todos os dados? Esta ação não pode ser desfeita.')) {
      resetState();
      onReset();
    }
  };

  return (
    <div className="min-h-screen bg-earth-bg">
      <Header
        userName={state.userName}
        currency={state.currency}
        onCurrencyChange={(c) => setState((p) => ({ ...p, currency: c }))}
        onReset={handleReset}
        onEditProfile={() => setEditOpen(true)}
      />

      <EditProfileModal
        open={editOpen}
        initialName={state.userName}
        initialCurrency={state.currency}
        onClose={() => setEditOpen(false)}
        onSave={({ name, currency }) => {
          setState((p) => ({ ...p, userName: name, currency }));
          setEditOpen(false);
        }}
      />

      <main className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 py-8 md:py-12 space-y-8 fade-up">
        {/* Top: salary + remaining */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          <div className="lg:col-span-3">
            <SalaryCard
              salary={monthData.salary}
              currency={state.currency}
              onSalaryChange={(v) => updateMonth({ salary: v })}
              monthKey={activeMonth}
              onMonthChange={handleChangeMonth}
            />
          </div>
          <div className="lg:col-span-2">
            <RemainingBalance
              salary={monthData.salary}
              expenses={monthData.expenses}
              currency={state.currency}
            />
          </div>
        </section>

        {/* Budget cards */}
        <section>
          <BudgetOverview
            salary={monthData.salary}
            allocations={monthData.allocations}
            expenses={monthData.expenses}
            currency={state.currency}
          />
        </section>

        {/* Allocation + Add expense */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <AllocationCard
            allocations={monthData.allocations}
            onChange={(a) => updateMonth({ allocations: a })}
          />
          <AddExpense
            currency={state.currency}
            onAdd={(exp) => updateMonth({ expenses: [exp, ...(monthData.expenses || [])] })}
          />
        </section>

        {/* Expenses list */}
        <section>
          <ExpensesList
            expenses={monthData.expenses}
            currency={state.currency}
            onDelete={(id) => updateMonth({ expenses: monthData.expenses.filter((e) => e.id !== id) })}
          />
        </section>

        {/* Report */}
        <MonthlyReport months={state.months} currency={state.currency} />

        <footer className="text-center text-xs text-earth-muted pt-6 pb-2">
          Seus dados são salvos localmente no seu navegador.
        </footer>
      </main>
    </div>
  );
}
