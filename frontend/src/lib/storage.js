const KEY = 'finance_app_state_v1';

export const DEFAULT_ALLOCATIONS = {
  investimentos: 30,
  despesas_fixas: 50,
  lazer: 20,
};

export const CATEGORIES = [
  { id: 'investimentos', label: 'Investimentos', color: '#4A7C59' },
  { id: 'despesas_fixas', label: 'Despesas Fixas', color: '#D49A89' },
  { id: 'lazer', label: 'Lazer', color: '#E3C16F' },
];

export function getMonthKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

export function formatMonthLabel(monthKey) {
  if (!monthKey) return '';
  const [y, m] = monthKey.split('-');
  const date = new Date(parseInt(y, 10), parseInt(m, 10) - 1, 1);
  const label = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

const emptyState = {
  userName: '',
  currency: 'MZN',
  months: {},
};

const emptyMonth = () => ({
  salary: 0,
  allocations: { ...DEFAULT_ALLOCATIONS },
  expenses: [],
});

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...emptyState };
    const parsed = JSON.parse(raw);
    const state = { ...emptyState, ...parsed };
    // Migrate legacy "necessidades" category into "despesas_fixas"
    if (state.months) {
      Object.keys(state.months).forEach((mk) => {
        const m = state.months[mk] || {};
        if (m.allocations && 'necessidades' in m.allocations) {
          const nec = Number(m.allocations.necessidades) || 0;
          m.allocations.despesas_fixas = (Number(m.allocations.despesas_fixas) || 0) + nec;
          delete m.allocations.necessidades;
        }
        if (Array.isArray(m.expenses)) {
          m.expenses = m.expenses.map((e) =>
            e.category === 'necessidades' ? { ...e, category: 'despesas_fixas' } : e
          );
        }
        state.months[mk] = m;
      });
    }
    return state;
  } catch {
    return { ...emptyState };
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function ensureMonth(state, monthKey) {
  if (!state.months[monthKey]) {
    state.months[monthKey] = emptyMonth();
  }
  return state;
}

export function resetState() {
  localStorage.removeItem(KEY);
}
