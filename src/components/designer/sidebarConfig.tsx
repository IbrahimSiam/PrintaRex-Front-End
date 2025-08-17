import React from 'react';
import {
  Checkroom, CloudUpload, TextFields, ViewModule, Image, Layers,
  Person, Folder, GridOn, Search, CropSquare, Settings, Help,
  Palette, Brush, AutoAwesome
} from '@mui/icons-material';

export interface SidebarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  category: 'design' | 'product' | 'settings';
  color: string;
  shortcut?: string;
}

export interface SidebarGroup {
  id: string;
  title: string;
  items: SidebarItem[];
}

export const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    id: 'product',
    title: 'Product & Files',
    items: [
      {
        id: 'product',
        icon: <Checkroom />,
        label: 'Product',
        description: 'Manage product settings and properties',
        category: 'product' as const,
        color: '#1976d2'
      },
      {
        id: 'files',
        icon: <CloudUpload />,
        label: 'Files & Uploads',
        description: 'Upload and manage design files',
        category: 'product' as const,
        color: '#2e7d32'
      }
    ]
  },
  {
    id: 'design',
    title: 'Design Tools',
    items: [
      {
        id: 'text',
        icon: <TextFields />,
        label: 'Text',
        description: 'Add and edit text elements',
        category: 'design' as const,
        color: '#d32f2f',
        shortcut: 'T'
      },
      {
        id: 'templates',
        icon: <ViewModule />,
        label: 'Templates',
        description: 'Browse and apply design templates',
        category: 'design' as const,
        color: '#7b1fa2',
        shortcut: 'M'
      },
      {
        id: 'graphics',
        icon: <Image />,
        label: 'Graphics & Images',
        description: 'Add images and graphics to your design',
        category: 'design' as const,
        color: '#388e3c',
        shortcut: 'G'
      },
      {
        id: 'layers',
        icon: <Layers />,
        label: 'Layers',
        description: 'Manage design layers and stacking order',
        category: 'design' as const,
        color: '#f57c00',
        shortcut: 'L'
      },
      {
        id: 'personalize',
        icon: <Person />,
        label: 'Personalize',
        description: 'Customize design elements',
        category: 'design' as const,
        color: '#c2185b'
      },
      {
        id: 'collections',
        icon: <Folder />,
        label: 'Collections',
        description: 'Access design collections and libraries',
        category: 'design' as const,
        color: '#5d4037'
      },
      {
        id: 'layouts',
        icon: <GridOn />,
        label: 'Layouts',
        description: 'Choose from various layout options',
        category: 'design' as const,
        color: '#455a64'
      },
      {
        id: 'shutterstock',
        icon: <Search />,
        label: 'Stock Images',
        description: 'Browse stock photos and graphics',
        category: 'design' as const,
        color: '#ff6f00'
      },
      {
        id: 'shapes',
        icon: <CropSquare />,
        label: 'Shapes',
        description: 'Add geometric shapes to your design',
        category: 'design' as const,
        color: '#6a1b9a'
      },
      {
        id: 'effects',
        icon: <AutoAwesome />,
        label: 'Effects',
        description: 'Apply visual effects and filters',
        category: 'design' as const,
        color: '#e91e63'
      },
      {
        id: 'brushes',
        icon: <Brush />,
        label: 'Brushes',
        description: 'Use various brush tools for drawing',
        category: 'design' as const,
        color: '#795548'
      },
      {
        id: 'palette',
        icon: <Palette />,
        label: 'Color Palette',
        description: 'Manage colors and color schemes',
        category: 'design' as const,
        color: '#ff9800'
      }
    ]
  },
  {
    id: 'settings',
    title: 'Settings & Help',
    items: [
      {
        id: 'settings',
        icon: <Settings />,
        label: 'Settings',
        description: 'Configure application preferences',
        category: 'settings' as const,
        color: '#607d8b'
      },
      {
        id: 'help',
        icon: <Help />,
        label: 'Help',
        description: 'Get help and view tutorials',
        category: 'settings' as const,
        color: '#9e9e9e'
      }
    ]
  }
];

export const ALL_SIDEBAR_ITEMS: SidebarItem[] = SIDEBAR_GROUPS.flatMap(group => group.items);

export const getSidebarItem = (id: string): SidebarItem | undefined => {
  return ALL_SIDEBAR_ITEMS.find(item => item.id === id);
};

export const getSidebarItemByShortcut = (shortcut: string): SidebarItem | undefined => {
  return ALL_SIDEBAR_ITEMS.find(item => item.shortcut === shortcut);
};

export const getSidebarItemsByCategory = (category: SidebarItem['category']): SidebarItem[] => {
  return ALL_SIDEBAR_ITEMS.filter(item => item.category === category);
};
