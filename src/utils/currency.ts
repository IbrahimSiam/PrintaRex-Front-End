import { Currency } from '../stores/uiStore';

export const EXCHANGE_RATES = {
  AED: 1,
  EGP: 8.5, // Example rate: 1 AED = 8.5 EGP
};

export interface CurrencyConfig {
  symbol: string;
  name: string;
  position: 'before' | 'after';
  decimalPlaces: number;
}

export const CURRENCY_CONFIGS: Record<Currency, CurrencyConfig> = {
  AED: {
    symbol: 'د.إ',
    name: 'UAE Dirham',
    position: 'before',
    decimalPlaces: 2,
  },
  EGP: {
    symbol: 'ج.م',
    name: 'Egyptian Pound',
    position: 'before',
    decimalPlaces: 2,
  },
};

/**
 * Convert amount from one currency to another
 */
export const convertCurrency = (amount: number, from: Currency, to: Currency): number => {
  if (from === to) return amount;
  
  const fromRate = EXCHANGE_RATES[from];
  const toRate = EXCHANGE_RATES[to];
  
  if (!fromRate || !toRate) {
    console.warn(`Exchange rate not found for ${from} or ${to}`);
    return amount;
  }
  
  // Convert to base currency (AED) first, then to target currency
  const baseAmount = amount / fromRate;
  return baseAmount * toRate;
};

/**
 * Format currency amount with symbol and proper formatting
 */
export const formatCurrency = (amount: number, currency: Currency): string => {
  const config = CURRENCY_CONFIGS[currency];
  if (!config) {
    console.warn(`Currency config not found for ${currency}`);
    return `${amount.toFixed(2)} ${currency}`;
  }
  
  const formattedAmount = amount.toLocaleString('en-US', {
    minimumFractionDigits: config.decimalPlaces,
    maximumFractionDigits: config.decimalPlaces,
  });
  
  if (config.position === 'before') {
    return `${config.symbol}${formattedAmount}`;
  } else {
    return `${formattedAmount}${config.symbol}`;
  }
};

/**
 * Format USD amount to specified currency
 */
export const formatUSDToCurrency = (usdAmount: number, currency: Currency): string => {
  // Convert USD to AED first (assuming 1 USD = 3.67 AED)
  const aedAmount = usdAmount * 3.67;
  const convertedAmount = convertCurrency(aedAmount, 'AED', currency);
  return formatCurrency(convertedAmount, currency);
};

/**
 * Get currency symbol
 */
export const getCurrencySymbol = (currency: Currency): string => {
  return CURRENCY_CONFIGS[currency]?.symbol || currency;
};

/**
 * Get currency name
 */
export const getCurrencyName = (currency: Currency): string => {
  return CURRENCY_CONFIGS[currency]?.name || currency;
};
