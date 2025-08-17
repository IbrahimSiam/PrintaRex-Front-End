import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
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
} from '@mui/icons-material';
import { useDesignerStore, DesignerStep } from '../../stores/designerStore';

const SIDEBAR_ITEMS = [
  { id: 'product', label: 'Product', icon: <Palette />, color: '#1976d2' },
  { id: 'files', label: 'Files', icon: <FileCopy />, color: '#388e3c' },
  { id: 'text', label: 'Text', icon: <TextFields />, color: '#f57c00' },
  { id: 'templates', label: 'Templates', icon: <Category />, color: '#7b1fa2' },
  { id: 'graphics', label: 'Graphics', icon: <Image />, color: '#d32f2f' },
  { id: 'layers', label: 'Layers', icon: <Layers />, color: '#1976d2' },
  { id: 'personalize', label: 'Personalize', icon: <Person />, color: '#388e3c' },
  { id: 'collections', label: 'Collections', icon: <Collections />, color: '#f57c00' },
  { id: 'layouts', label: 'Layouts', icon: <ViewModule />, color: '#7b1fa2' },
  { id: 'shapes', label: 'Shapes', icon: <CropSquare />, color: '#d32f2f' },
  { id: 'settings', label: 'Settings', icon: <Settings />, color: '#616161' },
];

const DesignerSidebar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { activeStep } = useDesignerStore();
  
  const [selectedSidebarItem, setSelectedSidebarItem] = useState('product');

  const handleSidebarItemClick = (itemId: string) => {
    setSelectedSidebarItem(itemId);
  };

  const renderSidebarPanel = () => {
    switch (selectedSidebarItem) {
      case 'product':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Product Settings</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Configure your product base settings and specifications.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Product type: Short Sleeve T-Shirt
              • Base material: 100% Cotton
              • Available sizes: S, M, L, XL, 2XL
            </Typography>
          </Box>
        );
      
      case 'files':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Upload Files</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add images, graphics, and other files to your design.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Supported formats: PNG, JPG, SVG, PDF
              • Maximum file size: 50MB
              • Recommended resolution: 300 DPI
            </Typography>
          </Box>
        );

      case 'text':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Add Text</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Insert and customize text elements in your design.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Font selection from 100+ options
              • Size, color, and style controls
              • Text effects and transformations
            </Typography>
          </Box>
        );

      case 'templates':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Templates</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Choose from pre-designed templates or save your own.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Business templates
              • Holiday designs
              • Sports themes
              • Custom collections
            </Typography>
          </Box>
        );

      case 'graphics':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Graphics Library</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Access thousands of graphics, icons, and illustrations.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Icons and symbols
              • Shapes and patterns
              • Illustrations
              • Stock photos
            </Typography>
          </Box>
        );

      case 'layers':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Layers</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Manage the layering and organization of design elements.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Show/hide elements
              • Reorder layers
              • Group objects
              • Lock/unlock elements
            </Typography>
          </Box>
        );

      case 'personalize':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Personalize</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add personalization options for customers.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Name personalization
              • Custom text fields
              • Color variations
              • Size customization
            </Typography>
          </Box>
        );

      case 'collections':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Collections</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Organize your designs into themed collections.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Seasonal collections
              • Brand themes
              • Product categories
              • Custom groupings
            </Typography>
          </Box>
        );

      case 'layouts':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Layouts</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Choose from various layout presets and grid systems.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Grid layouts
              • Centered designs
              • Asymmetric arrangements
              • Template layouts
            </Typography>
          </Box>
        );

      case 'shapes':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Shapes</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add geometric shapes and custom forms to your design.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Basic shapes (circle, square, triangle)
              • Custom polygons
              • Freeform shapes
              • Shape effects
            </Typography>
          </Box>
        );

      case 'settings':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Settings</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Configure design tool preferences and defaults.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Grid and snap settings
              • Default colors and fonts
              • Export preferences
              • Keyboard shortcuts
            </Typography>
          </Box>
        );

      default:
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {SIDEBAR_ITEMS.find(item => item.id === selectedSidebarItem)?.label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Panel content for {selectedSidebarItem}
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          borderRight: '1px solid #e0e0e0',
        },
      }}
    >
      <Box sx={{ display: 'flex', height: '100%' }}>
        {/* Icon Navigation */}
        <Box sx={{ width: 64, borderRight: '1px solid #e0e0e0', bgcolor: '#fafafa' }}>
          <List sx={{ pt: 0 }}>
            {SIDEBAR_ITEMS.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  onClick={() => handleSidebarItemClick(item.id)}
                  selected={selectedSidebarItem === item.id}
                  sx={{
                    minHeight: 64,
                    justifyContent: 'center',
                    '&.Mui-selected': {
                      bgcolor: `${item.color}15`,
                      '&:hover': {
                        bgcolor: `${item.color}25`,
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: selectedSidebarItem === item.id ? item.color : 'text.secondary',
                    minWidth: 'auto'
                  }}>
                    {item.icon}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Panel Content */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {renderSidebarPanel()}
        </Box>
      </Box>
    </Drawer>
  );
};

export default DesignerSidebar;
