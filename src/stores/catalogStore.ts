import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ProductCategory = 'mens' | 'womens' | 'kids';
export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';
export type ProductColor = 'White' | 'Black' | 'Green' | 'Red' | 'Blue' | 'Yellow' | 'Pink';

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  subcategory: string;
  gender: 'men' | 'women' | 'unisex';
  image: string;
  priceUSD: number;
  priceAED: number;
  priceEGP: number;
  description: string;
  technology: string[];
  brand: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  inStock: boolean;
  tags: string[];
}

export interface CatalogFilters {
  searchQuery: string;
  selectedSizes: ProductSize[];
  selectedColors: ProductColor[];
  priceRange: [number, number];
  selectedGender: string;
  selectedTechnology: string[];
}

export interface CatalogState {
  // UI State
  selectedTab: ProductCategory;
  filtersPanelOpen: boolean;
  isLoading: boolean;
  
  // Filters
  filters: CatalogFilters;
  
  // Data
  products: Product[];
  filteredProducts: Product[];
}

export interface CatalogActions {
  // Tab Management
  setSelectedTab: (tab: ProductCategory) => void;
  
  // Filter Panel
  toggleFiltersPanel: () => void;
  setFiltersPanelOpen: (open: boolean) => void;
  
  // Filters
  updateSearchQuery: (query: string) => void;
  toggleSize: (size: ProductSize) => void;
  toggleColor: (color: ProductColor) => void;
  updatePriceRange: (range: [number, number]) => void;
  setGender: (gender: string) => void;
  toggleTechnology: (tech: string) => void;
  resetFilters: () => void;
  
  // Data
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  
  // Computed
  getProductsByCategory: (category: ProductCategory) => Product[];
  getFilteredProducts: () => Product[];
}

export type CatalogStore = CatalogState & CatalogActions;

// Sample product data
const sampleProducts: Product[] = [
  // Men's Clothing
  {
    id: 1,
    name: 'T-Shirts',
    category: 'mens',
    subcategory: 'T-Shirts',
    gender: 'men',
    image: '/assets/img/tee.jpg',
    priceUSD: 0,
    priceAED: 0,
    priceEGP: 0,
    description: 'Browse our collection of customizable T-shirts',
    technology: [],
    brand: 'PrintaRex',
    colors: [],
    sizes: [],
    inStock: true,
    tags: ['t-shirts', 'customizable'],
  },
  {
    id: 2,
    name: 'Hoodies',
    category: 'mens',
    subcategory: 'Hoodies',
    gender: 'men',
    image: '/assets/img/hoodie.jpg',
    priceUSD: 0,
    priceAED: 0,
    priceEGP: 0,
    description: 'Browse our collection of customizable hoodies',
    technology: [],
    brand: 'PrintaRex',
    colors: [],
    sizes: [],
    inStock: true,
    tags: ['hoodies', 'customizable'],
  },
  
  // Women's Clothing
  {
    id: 3,
    name: 'T-Shirts',
    category: 'womens',
    subcategory: 'T-Shirts',
    gender: 'women',
    image: '/assets/img/tee.jpg',
    priceUSD: 0,
    priceAED: 0,
    priceEGP: 0,
    description: 'Browse our collection of customizable women\'s T-shirts',
    technology: [],
    brand: 'PrintaRex',
    colors: [],
    sizes: [],
    inStock: true,
    tags: ['t-shirts', 'customizable'],
  },
  {
    id: 4,
    name: 'Hoodies',
    category: 'womens',
    subcategory: 'Hoodies',
    gender: 'women',
    image: '/assets/img/hoodie.jpg',
    priceUSD: 0,
    priceAED: 0,
    priceEGP: 0,
    description: 'Browse our collection of customizable women\'s hoodies',
    technology: [],
    brand: 'PrintaRex',
    colors: [],
    sizes: [],
    inStock: true,
    tags: ['hoodies', 'customizable'],
  },
  
  // Kids' Clothing
  {
    id: 5,
    name: 'T-Shirts',
    category: 'kids',
    subcategory: 'T-Shirts',
    gender: 'unisex',
    image: '/assets/img/tee.jpg',
    priceUSD: 0,
    priceAED: 0,
    priceEGP: 0,
    description: 'Browse our collection of customizable kids\' T-shirts',
    technology: [],
    brand: 'PrintaRex',
    colors: [],
    sizes: [],
    inStock: true,
    tags: ['t-shirts', 'customizable'],
  },
  {
    id: 6,
    name: 'Hoodies',
    category: 'kids',
    subcategory: 'Hoodies',
    gender: 'unisex',
    image: '/assets/img/hoodie.jpg',
    priceUSD: 0,
    priceAED: 0,
    priceEGP: 0,
    description: 'Browse our collection of customizable kids\' hoodies',
    technology: [],
    brand: 'PrintaRex',
    colors: [],
    sizes: [],
    inStock: true,
    tags: ['hoodies', 'customizable'],
  },
];

const initialFilters: CatalogFilters = {
  searchQuery: '',
  selectedSizes: [],
  selectedColors: [],
  priceRange: [0, 200],
  selectedGender: '',
  selectedTechnology: [],
};

export const useCatalogStore = create<CatalogStore>()(
  persist(
    (set, get) => ({
      // Initial state
      selectedTab: 'mens',
      filtersPanelOpen: false,
      isLoading: false,
      filters: initialFilters,
      products: sampleProducts,
      filteredProducts: sampleProducts.filter(p => p.category === 'mens'),

      // Tab Management
      setSelectedTab: (tab: ProductCategory) => {
        set({ selectedTab: tab });
        const filtered = get().getFilteredProducts();
        set({ filteredProducts: filtered });
      },

      // Filter Panel
      toggleFiltersPanel: () => {
        set(state => ({ filtersPanelOpen: !state.filtersPanelOpen }));
      },
      setFiltersPanelOpen: (open: boolean) => {
        set({ filtersPanelOpen: open });
      },

      // Filters
      updateSearchQuery: (query: string) => {
        set(state => ({
          filters: { ...state.filters, searchQuery: query }
        }));
        const filtered = get().getFilteredProducts();
        set({ filteredProducts: filtered });
      },

      toggleSize: (size: ProductSize) => {
        set(state => {
          const selectedSizes = state.filters.selectedSizes.includes(size)
            ? state.filters.selectedSizes.filter(s => s !== size)
            : [...state.filters.selectedSizes, size];
          return {
            filters: { ...state.filters, selectedSizes }
          };
        });
        const filtered = get().getFilteredProducts();
        set({ filteredProducts: filtered });
      },

      toggleColor: (color: ProductColor) => {
        set(state => {
          const selectedColors = state.filters.selectedColors.includes(color)
            ? state.filters.selectedColors.filter(c => c !== color)
            : [...state.filters.selectedColors, color];
          return {
            filters: { ...state.filters, selectedColors }
          };
        });
        const filtered = get().getFilteredProducts();
        set({ filteredProducts: filtered });
      },

      updatePriceRange: (range: [number, number]) => {
        set(state => ({
          filters: { ...state.filters, priceRange: range }
        }));
        const filtered = get().getFilteredProducts();
        set({ filteredProducts: filtered });
      },

      setGender: (gender: string) => {
        set(state => ({
          filters: { ...state.filters, selectedGender: gender }
        }));
        const filtered = get().getFilteredProducts();
        set({ filteredProducts: filtered });
      },

      toggleTechnology: (tech: string) => {
        set(state => {
          const selectedTechnology = state.filters.selectedTechnology.includes(tech)
            ? state.filters.selectedTechnology.filter(t => t !== tech)
            : [...state.filters.selectedTechnology, tech];
          return {
            filters: { ...state.filters, selectedTechnology }
          };
        });
        const filtered = get().getFilteredProducts();
        set({ filteredProducts: filtered });
      },

      resetFilters: () => {
        set({ filters: initialFilters });
        const filtered = get().getFilteredProducts();
        set({ filteredProducts: filtered });
      },

      // Data
      setProducts: (products: Product[]) => {
        set({ products });
        const filtered = get().getFilteredProducts();
        set({ filteredProducts: filtered });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      // Computed
      getProductsByCategory: (category: ProductCategory) => {
        return get().products.filter(p => p.category === category);
      },

      getFilteredProducts: () => {
        const state = get();
        let filtered = state.products.filter(p => p.category === state.selectedTab);

        // Apply search filter
        if (state.filters.searchQuery) {
          const query = state.filters.searchQuery.toLowerCase();
          filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.tags.some(tag => tag.toLowerCase().includes(query))
          );
        }

        // Apply size filter
        if (state.filters.selectedSizes.length > 0) {
          filtered = filtered.filter(p =>
            p.sizes.some(size => state.filters.selectedSizes.includes(size))
          );
        }

        // Apply color filter
        if (state.filters.selectedColors.length > 0) {
          filtered = filtered.filter(p =>
            p.colors.some(color => state.filters.selectedColors.includes(color))
          );
        }

        // Apply price filter
        filtered = filtered.filter(p => {
          const price = p.priceUSD;
          return price >= state.filters.priceRange[0] && price <= state.filters.priceRange[1];
        });

        // Apply gender filter
        if (state.filters.selectedGender) {
          filtered = filtered.filter(p =>
            p.gender === 'unisex' || p.gender === state.filters.selectedGender
          );
        }

        // Apply technology filter
        if (state.filters.selectedTechnology.length > 0) {
          filtered = filtered.filter(p =>
            p.technology.some(tech => state.filters.selectedTechnology.includes(tech))
          );
        }

        return filtered;
      },
    }),
    {
      name: 'catalog-store',
      partialize: (state) => ({
        selectedTab: state.selectedTab,
        filters: state.filters,
      }),
    }
  )
);
