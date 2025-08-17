import {
  Palette,
  FileCopy,
  TextFields,
  Category,
  Image,
  Layers,
  Person,
  Collections,
  ViewModule,
  CropSquare,
  Settings,
  Brush,
  FormatSize,
  AutoAwesome,
  GridOn,
  ColorLens,
  Save,
  Preview,
  ShoppingCart,
} from '@mui/icons-material';
import { SidebarTool } from '../../stores/sidebarStore';

export interface SidebarItem {
  id: SidebarTool;
  label: string;
  icon: React.ReactNode;
  color: string;
  shortcut?: string;
  description: string;
  category: 'design' | 'product' | 'preview' | 'settings';
}

export interface SidebarGroup {
  id: string;
  title: string;
  items: SidebarItem[];
}

export const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    id: 'design',
    title: 'Design Tools',
    items: [
      {
        id: 'text',
        label: 'Text Tool',
        icon: <TextFields />,
        color: '#f57c00',
        shortcut: 'T',
        description: 'Add and edit text elements',
        category: 'design',
      },
      {
        id: 'graphics',
        label: 'Graphics Library',
        icon: <Image />,
        color: '#d32f2f',
        shortcut: 'G',
        description: 'Access icons, shapes, and illustrations',
        category: 'design',
      },
      {
        id: 'shapes',
        label: 'Shapes',
        icon: <CropSquare />,
        color: '#7b1fa2',
        shortcut: 'S',
        description: 'Add geometric shapes and forms',
        category: 'design',
      },
      {
        id: 'layers',
        label: 'Layers',
        icon: <Layers />,
        color: '#1976d2',
        shortcut: 'L',
        description: 'Manage design element layers',
        category: 'design',
      },
      {
        id: 'layouts',
        label: 'Layouts',
        icon: <ViewModule />,
        color: '#388e3c',
        shortcut: 'Y',
        description: 'Choose layout presets and grids',
        category: 'design',
      },
      {
        id: 'files',
        label: 'Upload Files',
        icon: <FileCopy />,
        color: '#388e3c',
        shortcut: 'U',
        description: 'Import images and graphics',
        category: 'design',
      },
    ],
  },
  {
    id: 'product',
    title: 'Product Settings',
    items: [
      {
        id: 'product',
        label: 'Product Info',
        icon: <Palette />,
        color: '#1976d2',
        shortcut: 'P',
        description: 'Configure product specifications',
        category: 'product',
      },
      {
        id: 'personalize',
        label: 'Personalize',
        icon: <Person />,
        color: '#388e3c',
        shortcut: 'I',
        description: 'Add customization options',
        category: 'product',
      },
      {
        id: 'collections',
        label: 'Collections',
        icon: <Collections />,
        color: '#f57c00',
        shortcut: 'C',
        description: 'Organize designs by theme',
        category: 'product',
      },
    ],
  },
  {
    id: 'preview',
    title: 'Preview & Save',
    items: [
      {
        id: 'templates',
        label: 'Templates',
        icon: <Category />,
        color: '#7b1fa2',
        shortcut: 'M',
        description: 'Save and load design templates',
        category: 'preview',
      },
    ],
  },
  {
    id: 'settings',
    title: 'Settings',
    items: [
      {
        id: 'settings',
        label: 'Preferences',
        icon: <Settings />,
        color: '#616161',
        shortcut: ',',
        description: 'Configure tool preferences',
        category: 'settings',
      },
    ],
  },
];

export const ALL_SIDEBAR_ITEMS: SidebarItem[] = SIDEBAR_GROUPS.flatMap(group => group.items);

export const getSidebarItem = (id: SidebarTool): SidebarItem | undefined => {
  return ALL_SIDEBAR_ITEMS.find(item => item.id === id);
};

export const getSidebarItemByShortcut = (shortcut: string): SidebarItem | undefined => {
  return ALL_SIDEBAR_ITEMS.find(item => item.shortcut === shortcut.toUpperCase());
};

export const getSidebarItemsByCategory = (category: SidebarItem['category']): SidebarItem[] => {
  return ALL_SIDEBAR_ITEMS.filter(item => item.category === category);
};
