'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'BDT' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceBDT: number, priceUSD: number) => string;
  getSymbol: () => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'BDT',
  setCurrency: () => {},
  formatPrice: (bdt) => `৳${bdt.toLocaleString('en-BD')}`,
  getSymbol: () => '৳',
});

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('BDT');

  useEffect(() => {
    const saved = localStorage.getItem('artora_currency') as Currency;
    if (saved === 'USD' || saved === 'BDT') {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('artora_currency', c);
  };

  const getSymbol = () => (currency === 'BDT' ? '৳' : '$');

  const formatPrice = (priceBDT: number = 0, priceUSD: number = 0) => {
    if (currency === 'BDT') {
      return `৳${(priceBDT || 0).toLocaleString('en-BD')}`;
    }
    return `$${(priceUSD || 0).toLocaleString('en-US')}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, getSymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
