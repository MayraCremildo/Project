export const CURRENCIES = [
  { code: 'MZN', symbol: 'MT', label: 'Metical Moçambicano', locale: 'pt-MZ' },
  { code: 'AOA', symbol: 'Kz', label: 'Kwanza Angolano', locale: 'pt-AO' },
  { code: 'BRL', symbol: 'R$', label: 'Real Brasileiro', locale: 'pt-BR' },
  { code: 'USD', symbol: '$', label: 'Dólar Americano', locale: 'en-US' },
  { code: 'EUR', symbol: '€', label: 'Euro', locale: 'pt-PT' },
];

export function formatMoney(value, currencyCode = 'MZN') {
  const c = CURRENCIES.find((x) => x.code === currencyCode) || CURRENCIES[0];
  try {
    return new Intl.NumberFormat(c.locale, {
      style: 'currency',
      currency: c.code,
      maximumFractionDigits: 2,
    }).format(Number(value) || 0);
  } catch {
    return `${c.symbol} ${(Number(value) || 0).toFixed(2)}`;
  }
}

export function getCurrencySymbol(code) {
  return (CURRENCIES.find((c) => c.code === code) || CURRENCIES[0]).symbol;
}
