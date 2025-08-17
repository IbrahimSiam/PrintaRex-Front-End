import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DesignerStep = 'design' | 'mockups' | 'details' | 'prices' | 'review';

export interface PrintArea {
  id: string;
  name: string;
  active: boolean;
}

export interface Mockup {
  id: number;
  name: string;
  image: string;
  isPrimary: boolean;
}

export interface ProductDetails {
  title: string;
  description: string;
  sizeTable: {
    metric: boolean;
    sizes: Array<{
      size: string;
      chest: string;
      length: string;
      chestInch: string;
      lengthInch: string;
    }>;
  };
  careInstructions: string;
  tags: string[];
}

export interface PricingData {
  currency: string;
  variants: Array<{
    size: string;
    retailPrice: number;
    productCost: number;
    shipping: number;
    estimatedProfit: number;
  }>;
}

export interface DesignerState {
  // Step management
  activeStep: DesignerStep;
  setActiveStep: (step: DesignerStep) => void;
  
  // Design data
  printAreas: PrintArea[];
  selectedPrintArea: string;
  setSelectedPrintArea: (areaId: string) => void;
  togglePrintArea: (areaId: string) => void;
  
  // Mockups
  mockups: Mockup[];
  setPrimaryMockup: (mockupId: number) => void;
  
  // Product details
  productDetails: ProductDetails;
  updateProductDetails: (updates: Partial<ProductDetails>) => void;
  
  // Pricing
  pricing: PricingData;
  updatePricing: (updates: Partial<PricingData>) => void;
  updateVariantPrice: (size: string, field: keyof PricingData['variants'][0], value: number) => void;
  
  // Validation
  stepValidation: Record<DesignerStep, boolean>;
  setStepValidation: (step: DesignerStep, isValid: boolean) => void;
  
  // Navigation
  canNavigateToStep: (step: DesignerStep) => boolean;
  nextStep: () => void;
  previousStep: () => void;
  
  // Reset
  resetDesigner: () => void;
}

const INITIAL_PRINT_AREAS: PrintArea[] = [
  { id: 'front', name: 'Front', active: true },
  { id: 'back', name: 'Back', active: false },
  { id: 'innerNeck', name: 'Inner Neck', active: false },
  { id: 'outerNeck', name: 'Outer Neck', active: false },
  { id: 'leftSleeve', name: 'Left Sleeve', active: false },
  { id: 'rightSleeve', name: 'Right Sleeve', active: false },
];

const INITIAL_MOCKUPS: Mockup[] = [
  { id: 1, name: 'Front View', image: '/assets/img/tee.jpg', isPrimary: true },
  { id: 2, name: 'Back View', image: '/assets/img/tee-back.jpg', isPrimary: false },
  { id: 3, name: 'Side View', image: '/assets/img/tee-side1.jpg', isPrimary: false },
  { id: 4, name: 'Lifestyle', image: '/assets/img/tee-side2.jpg', isPrimary: false },
];

const INITIAL_PRODUCT_DETAILS: ProductDetails = {
  title: 'Custom Short Sleeve T-Shirt',
  description: 'High-quality custom t-shirt with your unique design. Perfect for personal use, gifts, or business branding.',
  sizeTable: {
    metric: true,
    sizes: [
      { size: 'S', chest: '90-95', length: '68', chestInch: '35-37', lengthInch: '27' },
      { size: 'M', chest: '95-100', length: '70', chestInch: '37-39', lengthInch: '28' },
      { size: 'L', chest: '100-105', length: '72', chestInch: '39-41', lengthInch: '28' },
      { size: 'XL', chest: '105-110', length: '74', chestInch: '41-43', lengthInch: '29' },
      { size: '2XL', chest: '110-115', length: '76', chestInch: '43-45', lengthInch: '30' },
    ],
  },
  careInstructions: 'Machine wash cold, tumble dry low. Do not bleach. Iron on low if needed.',
  tags: ['custom', 't-shirt', 'print-on-demand'],
};

const INITIAL_PRICING: PricingData = {
  currency: 'AED',
  variants: [
    { size: 'S', retailPrice: 120, productCost: 45.5, shipping: 18, estimatedProfit: 56.5 },
    { size: 'M', retailPrice: 120, productCost: 45.5, shipping: 18, estimatedProfit: 56.5 },
    { size: 'L', retailPrice: 120, productCost: 45.5, shipping: 18, estimatedProfit: 56.5 },
    { size: 'XL', retailPrice: 120, productCost: 45.5, shipping: 18, estimatedProfit: 56.5 },
    { size: '2XL', retailPrice: 120, productCost: 45.5, shipping: 18, estimatedProfit: 56.5 },
  ],
};

export const useDesignerStore = create<DesignerState>()(
  persist(
    (set, get) => ({
      // Step management
      activeStep: 'design',
      setActiveStep: (step: DesignerStep) => set({ activeStep: step }),
      
      // Design data
      printAreas: INITIAL_PRINT_AREAS,
      selectedPrintArea: 'front',
      setSelectedPrintArea: (areaId: string) => set({ selectedPrintArea: areaId }),
      togglePrintArea: (areaId: string) => set((state) => ({
        printAreas: state.printAreas.map(area => ({
          ...area,
          active: area.id === areaId ? !area.active : area.active
        }))
      })),
      
      // Mockups
      mockups: INITIAL_MOCKUPS,
      setPrimaryMockup: (mockupId: number) => set((state) => ({
        mockups: state.mockups.map(mockup => ({
          ...mockup,
          isPrimary: mockup.id === mockupId
        }))
      })),
      
      // Product details
      productDetails: INITIAL_PRODUCT_DETAILS,
      updateProductDetails: (updates: Partial<ProductDetails>) => set((state) => ({
        productDetails: { ...state.productDetails, ...updates }
      })),
      
      // Pricing
      pricing: INITIAL_PRICING,
      updatePricing: (updates: Partial<PricingData>) => set((state) => ({
        pricing: { ...state.pricing, ...updates }
      })),
      updateVariantPrice: (size: string, field: keyof PricingData['variants'][0], value: number) => set((state) => ({
        pricing: {
          ...state.pricing,
          variants: state.pricing.variants.map(variant => {
            if (variant.size === size) {
              const updated = { ...variant, [field]: value };
              // Recalculate profit if retail price, product cost, or shipping changes
              if (field === 'retailPrice' || field === 'productCost' || field === 'shipping') {
                updated.estimatedProfit = updated.retailPrice - updated.productCost - updated.shipping;
              }
              return updated;
            }
            return variant;
          })
        }
      })),
      
      // Validation
      stepValidation: {
        design: true,
        mockups: true,
        details: false, // Will be true when title is filled
        prices: true,
        review: true,
      },
      setStepValidation: (step: DesignerStep, isValid: boolean) => set((state) => ({
        stepValidation: { ...state.stepValidation, [step]: isValid }
      })),
      
      // Navigation
      canNavigateToStep: (step: DesignerStep) => {
        const state = get();
        const stepOrder: DesignerStep[] = ['design', 'mockups', 'details', 'prices', 'review'];
        const currentIndex = stepOrder.indexOf(state.activeStep);
        const targetIndex = stepOrder.indexOf(step);
        
        // Can go back to any previous step
        if (targetIndex <= currentIndex) return true;
        
        // Can only go forward if current step is valid
        return state.stepValidation[state.activeStep];
      },
      
      nextStep: () => {
        const state = get();
        const stepOrder: DesignerStep[] = ['design', 'mockups', 'details', 'prices', 'review'];
        const currentIndex = stepOrder.indexOf(state.activeStep);
        if (currentIndex < stepOrder.length - 1 && state.stepValidation[state.activeStep]) {
          set({ activeStep: stepOrder[currentIndex + 1] });
        }
      },
      
      previousStep: () => {
        const state = get();
        const stepOrder: DesignerStep[] = ['design', 'mockups', 'details', 'prices', 'review'];
        const currentIndex = stepOrder.indexOf(state.activeStep);
        if (currentIndex > 0) {
          set({ activeStep: stepOrder[currentIndex - 1] });
        }
      },
      
      // Reset
      resetDesigner: () => set({
        activeStep: 'design',
        printAreas: INITIAL_PRINT_AREAS,
        selectedPrintArea: 'front',
        mockups: INITIAL_MOCKUPS,
        productDetails: INITIAL_PRODUCT_DETAILS,
        pricing: INITIAL_PRICING,
        stepValidation: {
          design: true,
          mockups: true,
          details: false,
          prices: true,
          review: true,
        },
      }),
    }),
    {
      name: 'designer-store',
      partialize: (state) => ({
        printAreas: state.printAreas,
        selectedPrintArea: state.selectedPrintArea,
        mockups: state.mockups,
        productDetails: state.productDetails,
        pricing: state.pricing,
        stepValidation: state.stepValidation,
      }),
    }
  )
);
