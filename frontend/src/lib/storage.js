const KEY = 'finance_app_state_v1';

export const DEFAULT_ALLOCATIONS = {
  investimentos: 20,
  necessidades: 50,
  despesas_fixas: 20,
  lazer: 10,
};

export const CATEGORIES = [
  { id: 'investimentos', label: 'Investimentos', color: '#4A7C59' },
  { id: 'necessidades', label: 'Necessidades', color: '#738290' },
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
    return { ...emptyState, ...parsed };
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
