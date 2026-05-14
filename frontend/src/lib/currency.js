export const CURRENCIES = [
  { code: 'BRL', symbol: 'R$', label: 'Real Brasileiro', locale: 'pt-BR' },
  { code: 'USD', symbol: '$', label: 'US Dollar', locale: 'en-US' },
  { code: 'EUR', symbol: '€', label: 'Euro', locale: 'de-DE' },
  { code: 'GBP', symbol: '£', label: 'British Pound', locale: 'en-GB' },
  { code: 'JPY', symbol: '¥', label: 'Japanese Yen', locale: 'ja-JP' },
  { code: 'CAD', symbol: 'C$', label: 'Canadian Dollar', locale: 'en-CA' },
  { code: 'AUD', symbol: 'A$', label: 'Australian Dollar', locale: 'en-AU' },
  { code: 'CHF', symbol: 'Fr', label: 'Swiss Franc', locale: 'de-CH' },
  { code: 'CNY', symbol: '¥', label: 'Chinese Yuan', locale: 'zh-CN' },
  { code: 'INR', symbol: '₹', label: 'Indian Rupee', locale: 'en-IN' },
  { code: 'MXN', symbol: 'Mex$', label: 'Mexican Peso', locale: 'es-MX' },
  { code: 'ARS', symbol: 'AR$', label: 'Argentine Peso', locale: 'es-AR' },
];

export function formatMoney(value, currencyCode = 'BRL') {
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
