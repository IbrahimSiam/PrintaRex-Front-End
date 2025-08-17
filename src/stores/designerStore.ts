import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DesignerStep = 'design' | 'mockups' | 'details' | 'prices' | 'review';

export interface PrintArea {
  id: string;
  name: string;
  active: boolean;
}

export interface Mockup {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  isPrimary: boolean;
  tags: string[];
}

export interface Details {
  title: string;
  description: string;
  tags: string[];
  careInstructions: {
    washing: string;
    drying: string;
    ironing: string;
    additional: string;
  };
}

export interface PricingData {
  currency: string;
  variants: Array<{
    id: string;
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
  setPrimaryMockup: (mockupId: string) => void;
  
  // Product details
  details: Details;
  updateDetails: (updates: Partial<Details>) => void;
  
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
  
  // Actions
  saveTemplate: () => void;
  addToStore: () => void;
  placeOrder: () => void;
  
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
  { 
    id: '1', 
    name: 'Front View', 
    imageUrl: '/assets/img/tee.jpg', 
    description: 'Classic front view of the t-shirt',
    isPrimary: true,
    tags: ['front', 'classic']
  },
  { 
    id: '2', 
    name: 'Back View', 
    imageUrl: '/assets/img/tee-back.jpg', 
    description: 'Back view showing the design',
    isPrimary: false,
    tags: ['back', 'design']
  },
  { 
    id: '3', 
    name: 'Side View', 
    imageUrl: '/assets/img/tee-side1.jpg', 
    description: 'Side profile of the t-shirt',
    isPrimary: false,
    tags: ['side', 'profile']
  },
  { 
    id: '4', 
    name: 'Lifestyle', 
    imageUrl: '/assets/img/tee-side2.jpg', 
    description: 'Lifestyle shot in context',
    isPrimary: false,
    tags: ['lifestyle', 'context']
  },
];

const INITIAL_DETAILS: Details = {
  title: 'Custom Short Sleeve T-Shirt',
  description: 'High-quality custom t-shirt with your unique design. Perfect for personal use, gifts, or business branding.',
  tags: ['custom', 't-shirt', 'print-on-demand'],
  careInstructions: {
    washing: 'Machine wash cold, gentle cycle',
    drying: 'Tumble dry low, or air dry',
    ironing: 'Iron on low heat if needed',
    additional: 'Do not bleach. Wash with similar colors.',
  },
};

const INITIAL_PRICING: PricingData = {
  currency: 'USD',
  variants: [
    { id: 's', size: 'S', retailPrice: 29.99, productCost: 12.50, shipping: 5.99, estimatedProfit: 11.50 },
    { id: 'm', size: 'M', retailPrice: 29.99, productCost: 12.50, shipping: 5.99, estimatedProfit: 11.50 },
    { id: 'l', size: 'L', retailPrice: 29.99, productCost: 12.50, shipping: 5.99, estimatedProfit: 11.50 },
    { id: 'xl', size: 'XL', retailPrice: 29.99, productCost: 12.50, shipping: 5.99, estimatedProfit: 11.50 },
    { id: 'xxl', size: 'XXL', retailPrice: 32.99, productCost: 13.50, shipping: 5.99, estimatedProfit: 13.50 },
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
      setPrimaryMockup: (mockupId: string) => set((state) => ({
        mockups: state.mockups.map(mockup => ({
          ...mockup,
          isPrimary: mockup.id === mockupId
        }))
      })),
      
      // Product details
      details: INITIAL_DETAILS,
      updateDetails: (updates: Partial<Details>) => set((state) => ({
        details: { ...state.details, ...updates }
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
        
        // Can only move forward if current step is valid
        if (targetIndex > currentIndex) {
          return state.stepValidation[state.activeStep];
        }
        
        // Can always move backward
        return true;
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
      
      // Actions
      saveTemplate: () => {
        console.log('Saving template...');
        // Implementation for saving template
      },
      
      addToStore: () => {
        console.log('Adding to store...');
        // Implementation for adding to store
      },
      
      placeOrder: () => {
        console.log('Placing order...');
        // Implementation for placing order
      },
      
      // Reset
      resetDesigner: () => set({
        activeStep: 'design',
        printAreas: INITIAL_PRINT_AREAS,
        selectedPrintArea: 'front',
        mockups: INITIAL_MOCKUPS,
        details: INITIAL_DETAILS,
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
        activeStep: state.activeStep,
        printAreas: state.printAreas,
        selectedPrintArea: state.selectedPrintArea,
        mockups: state.mockups,
        details: state.details,
        pricing: state.pricing,
        stepValidation: state.stepValidation,
      }),
    }
  )
);
