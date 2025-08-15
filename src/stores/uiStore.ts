import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Currency = 'AED' | 'EGP';
export type Language = 'en' | 'ar';
export type ShipFrom = 'Egypt' | 'UAE';

export interface UIState {
  currency: Currency;
  shipFrom: ShipFrom;
  language: Language;
  isRTL: boolean;
}

export interface UIActions {
  setCurrency: (currency: Currency) => void;
  setShipFrom: (shipFrom: ShipFrom) => void;
  toggleLanguage: () => void;
  setLanguage: (language: Language) => void;
}

export type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currency: 'AED',
      shipFrom: 'Egypt',
      language: 'en',
      isRTL: false,

      // Actions
      setCurrency: (currency: Currency) => set({ currency }),
      setShipFrom: (shipFrom: ShipFrom) => set({ shipFrom }),
      
      toggleLanguage: () => {
        const currentLanguage = get().language;
        const newLanguage: Language = currentLanguage === 'en' ? 'ar' : 'en';
        const newIsRTL = newLanguage === 'ar';
        
        set({ 
          language: newLanguage, 
          isRTL: newIsRTL 
        });
      },
      
      setLanguage: (language: Language) => {
        const isRTL = language === 'ar';
        set({ language, isRTL });
      },
    }),
    {
      name: 'ui-store',
      partialize: (state) => ({
        currency: state.currency,
        shipFrom: state.shipFrom,
        language: state.language,
        isRTL: state.isRTL,
      }),
    }
  )
);
