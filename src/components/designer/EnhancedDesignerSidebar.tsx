import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemIcon, ListItemButton,
  Typography, useTheme, useMediaQuery, Tooltip, IconButton, Divider,
  Collapse, Paper
} from '@mui/material';
import {
  Checkroom, CloudUpload, TextFields, ViewModule, Image, Layers,
  Person, GridOn, Search, CropSquare, Settings, Help, ChevronLeft,
  ChevronRight, AutoAwesome, Brush, Palette, ExpandMore, ExpandLess
} from '@mui/icons-material';
import { useDesignerUIStore } from '../../stores/designerUIStore';
import { useDesignerContext } from './DesignerProvider';

interface ProductData {
  id: number;
  name: string;
  type: string;
  color: string;
  size: string;
  technology: string;
  image: string;
  printAreas: string[];
}

interface EnhancedDesignerSidebarProps {
  productData?: ProductData;
}

interface SidebarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  category: 'product' | 'design' | 'settings';
  badge?: number;
  disabled?: boolean;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  // PRODUCT & FILES
  { id: 'product', icon: <Checkroom />, label: 'Product', category: 'product' },
  { id: 'files', icon: <CloudUpload />, label: 'Files & Uploads', category: 'product' },
  
  // DESIGN TOOLS
  { id: 'text', icon: <TextFields />, label: 'Text', category: 'design' },
  { id: 'templates', icon: <ViewModule />, label: 'Templates', category: 'design' },
  { id: 'graphics', icon: <Image />, label: 'Graphics & Images', category: 'design' },
  { id: 'personalize', icon: <Person />, label: 'Personalize', category: 'design' },
  { id: 'layers', icon: <Layers />, label: 'Layers', category: 'design' },
  { id: 'layouts', icon: <GridOn />, label: 'Layouts', category: 'design' },
  { id: 'stock', icon: <Search />, label: 'Stock Images', category: 'design' },
  { id: 'shapes', icon: <CropSquare />, label: 'Shapes', category: 'design' },
  { id: 'effects', icon: <AutoAwesome />, label: 'Effects', category: 'design' },
  { id: 'brushes', icon: <Brush />, label: 'Brushes', category: 'design' },
  { id: 'palette', icon: <Palette />, label: 'Color Palette', category: 'design' },
  
  // SETTINGS & HELP
  { id: 'settings', icon: <Settings />, label: 'Settings', category: 'settings' },
  { id: 'help', icon: <Help />, label: 'Help', category: 'settings' },
];

const SIDEBAR_GROUPS = [
  {
    title: 'PRODUCT & FILES',
    items: SIDEBAR_ITEMS.filter(item => item.category === 'product')
  },
  {
    title: 'DESIGN TOOLS',
    items: SIDEBAR_ITEMS.filter(item => item.category === 'design')
  },
  {
    title: 'SETTINGS & HELP',
    items: SIDEBAR_ITEMS.filter(item => item.category === 'settings')
  }
];

const EnhancedDesignerSidebar: React.FC<EnhancedDesignerSidebarProps> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const {
    sidebar: { isCollapsed, activeToolId },
    setActiveTool,
    toggleSidebar
  } = useDesignerUIStore();
  
  const {
    addText,
    addShape,
    addImage
  } = useDesignerContext();

  const [expandedCategories, setExpandedCategories] = useState({
    product: true,
    design: true,
    settings: true
  });

  // Auto-collapse on small screens
  useEffect(() => {
    if (isMobile && !isCollapsed) {
      // Don't auto-collapse, just show a toast or notification
      console.log('Consider collapsing sidebar on small screens');
    }
  }, [isMobile, isCollapsed]);

  const toggleCategory = (category: keyof typeof expandedCategories) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleToolClick = (toolId: string) => {
    setActiveTool(toolId as any);
    
    // Dispatch designer actions based on tool selection
    switch (toolId) {
      case 'text':
        addText();
        break;
      case 'shapes':
        addShape({ shape: 'rect' });
        break;
      case 'graphics':
        // This will trigger the right drawer for file uploads
        console.log('Graphics tool selected - should open file uploads');
        break;
      case 'files':
        // This will trigger the right drawer for file uploads
        console.log('Files tool selected - should open file uploads');
        break;
      default:
        // For other tools, just set the active tool
        break;
    }
  };

  const getEffectiveWidth = () => {
    return isCollapsed ? 70 : 240;
  };

  const renderSidebarItem = (item: SidebarItem) => {
    const isActive = activeToolId === item.id;
    const isHovered = false; // We'll handle hover effects with CSS

    return (
      <Box key={item.id}>
        <Tooltip
          title={item.label}
          placement="right"
          disableHoverListener={!isCollapsed}
          arrow
        >
          <ListItem
            disablePadding
            sx={{
              mb: 0.5,
              mx: 1,
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <ListItemButton
              onClick={() => handleToolClick(item.id)}
              sx={{
                minHeight: 48,
                px: isCollapsed ? 1.5 : 2,
                py: 1,
                borderRadius: 2,
                backgroundColor: isActive ? 'primary.main' : 'transparent',
                color: isActive ? 'primary.contrastText' : 'text.primary',
                '&:hover': {
                  backgroundColor: isActive ? 'primary.dark' : 'action.hover',
                },
                '&::before': isActive ? {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 3,
                  height: 20,
                  backgroundColor: 'primary.main',
                  borderRadius: '0 2px 2px 0'
                } : {},
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: isCollapsed ? 0 : 40,
                  color: 'inherit',
                  '& .MuiSvgIcon-root': {
                    fontSize: 22,
                    filter: isActive ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' : 'none'
                  }
                }}
              >
                {item.icon}
              </ListItemIcon>
              
              {!isCollapsed && (
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    fontSize: '14px',
                    fontFamily: 'Inter, Roboto, sans-serif',
                    ml: 1
                  }}
                >
                  {item.label}
                </Typography>
              )}
            </ListItemButton>
          </ListItem>
        </Tooltip>
      </Box>
    );
  };

  const renderCategorySection = (group: typeof SIDEBAR_GROUPS[0]) => {
    const isExpanded = expandedCategories[group.title.toLowerCase().replace(/\s+&?\s+/, '') as keyof typeof expandedCategories];

    return (
      <Box key={group.title} sx={{ mb: 2 }}>
        {!isCollapsed && (
          <Box
            sx={{
              px: 2,
              py: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
            onClick={() => toggleCategory(group.title.toLowerCase().replace(/\s+&?\s+/, '') as keyof typeof expandedCategories)}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                color: 'text.secondary',
                opacity: 0.8,
                transition: 'opacity 0.2s ease'
              }}
            >
              {group.title}
            </Typography>
            {isExpanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
          </Box>
        )}
        
        <Collapse in={isExpanded}>
          <List disablePadding>
            {group.items.map(renderSidebarItem)}
          </List>
        </Collapse>
        
        {!isCollapsed && (
          <Divider
            sx={{
              mx: 2,
              mt: 1,
              borderColor: 'divider',
              opacity: 0.6
            }}
          />
        )}
      </Box>
    );
  };

  return (
    <>
      {/* Main Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: getEffectiveWidth(),
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: getEffectiveWidth(),
            backgroundColor: '#F9FAFB',
            borderRight: `1px solid ${theme.palette.divider}`,
            boxShadow: '2px 0 8px rgba(0,0,0,0.06)',
            transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden'
          }
        }}
      >
        {/* Sidebar Header */}
        <Box
          sx={{
            p: 2,
            backgroundColor: 'white',
            borderBottom: `1px solid ${theme.palette.divider}`,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {!isCollapsed && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: '16px',
                fontFamily: 'Inter, Roboto, sans-serif',
                color: 'text.primary'
              }}
            >
              Designer
            </Typography>
          )}
          
          <IconButton
            size="small"
            onClick={toggleSidebar}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover'
              }
            }}
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Box>

        {/* Sidebar Content */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            py: 2
          }}
        >
          {SIDEBAR_GROUPS.map(renderCategorySection)}
        </Box>
      </Drawer>
    </>
  );
};

export default EnhancedDesignerSidebar;
