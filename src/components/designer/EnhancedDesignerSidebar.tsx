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
import { useSidebarStore } from '../../stores/sidebarStore';

interface SidebarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  category: 'product' | 'design' | 'settings';
  badge?: number;
  disabled?: boolean;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  // Product & Files
  { id: 'product', icon: <Checkroom />, label: 'Product', category: 'product' },
  { id: 'files', icon: <CloudUpload />, label: 'Files & Uploads', category: 'product' },
  
  // Design Tools
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
  
  // Settings & Help
  { id: 'settings', icon: <Settings />, label: 'Settings', category: 'settings' },
  { id: 'help', icon: <Help />, label: 'Help', category: 'settings' },
];

const EnhancedDesignerSidebar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
  
  const { 
    activeTool, 
    setActiveTool, 
    railState,
    setRailState,
    railWidth,
    setRailWidth,
    isHoverExpanded,
    setIsHoverExpanded,
    showLabels, 
    setShowLabels,
    autoCollapseOnMobile,
    hasShownCollapseToast,
    setHasShownCollapseToast,
    getEffectiveWidth,
    getEffectiveState
  } = useSidebarStore();

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState({
    product: true,
    design: true,
    settings: true
  });
  const [hoverTimer, setHoverTimer] = useState<number | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [startResizeX, setStartResizeX] = useState(0);
  const [startResizeWidth, setStartResizeWidth] = useState(0);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const effectiveWidth = getEffectiveWidth();
  const effectiveState = getEffectiveState();
  const isExpanded = effectiveState === 'expanded';
  const iconSize = 22;

  // Auto-collapse on small screens
  useEffect(() => {
    if (isSmallScreen && railState === 'expanded' && !hasShownCollapseToast) {
      setRailState('mini');
      setHasShownCollapseToast(true);
    }
  }, [isSmallScreen, railState, hasShownCollapseToast, setRailState, setHasShownCollapseToast]);

  // Hover behavior for auto mode
  const handleMouseEnter = useCallback(() => {
    if (railState === 'auto') {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        setHoverTimer(null);
      }
      
      const timer = setTimeout(() => {
        setIsHoverExpanded(true);
      }, 300); // 300ms delay
      
      setHoverTimer(timer);
    }
  }, [railState, hoverTimer, setIsHoverExpanded]);

  const handleMouseLeave = useCallback(() => {
    if (railState === 'auto') {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        setHoverTimer(null);
      }
      
      const timer = setTimeout(() => {
        setIsHoverExpanded(false);
      }, 200); // 200ms delay before closing
      
      setHoverTimer(timer);
    }
  }, [railState, hoverTimer, setIsHoverExpanded]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
    };
  }, [hoverTimer]);

  const handleToolClick = (toolId: string) => {
    setActiveTool(toolId);
    // Auto-collapse on mobile after selection
    if (isMobile && railState === 'auto') {
      setIsHoverExpanded(false);
    }
  };

  const handleExpand = () => {
    setRailState('expanded');
    setIsHoverExpanded(false);
  };

  const handleCollapse = () => {
    setRailState('mini');
    setIsHoverExpanded(false);
  };

  const toggleCategory = (category: keyof typeof expandedCategories) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Resize functionality
  const handleResizeStart = (e: React.MouseEvent) => {
    if (isExpanded) {
      setIsResizing(true);
      setStartResizeX(e.clientX);
      setStartResizeWidth(railWidth);
      e.preventDefault();
    }
  };

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (isResizing) {
      const deltaX = e.clientX - startResizeX;
      const newWidth = Math.max(240, Math.min(360, startResizeWidth + deltaX));
      setRailWidth(newWidth);
    }
  }, [isResizing, startResizeX, startResizeWidth, setRailWidth]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      return () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  const renderSidebarItem = (item: SidebarItem) => {
    const isActive = activeTool === item.id;
    const isHovered = hoveredItem === item.id;
    
    return (
      <Tooltip
        title={item.label}
        placement="right"
        disableHoverListener={isExpanded}
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
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            disabled={item.disabled}
            sx={{
              minHeight: 48,
              px: isExpanded ? 2 : 1.5,
              py: 1.5,
              borderRadius: 2,
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundColor: isActive 
                ? 'primary.main' 
                : isHovered 
                  ? 'rgba(0, 0, 0, 0.04)' 
                  : 'transparent',
              color: isActive 
                ? 'primary.contrastText' 
                : isHovered 
                  ? 'text.primary' 
                  : 'text.secondary',
              '&:hover': {
                backgroundColor: isActive 
                  ? 'primary.dark' 
                  : 'rgba(0, 0, 0, 0.04)',
                transform: isExpanded ? 'translateX(2px)' : 'none',
              },
              '&.Mui-disabled': {
                opacity: 0.4
              },
              position: 'relative',
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
              } : {}
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: isExpanded ? 32 : 'auto',
                color: 'inherit',
                '& .MuiSvgIcon-root': {
                  fontSize: iconSize,
                  transition: 'all 0.2s ease',
                }
              }}
            >
              {item.badge ? (
                <Box sx={{ position: 'relative' }}>
                  {item.icon}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -4,
                      right: -4,
                      width: 16,
                      height: 16,
                      bgcolor: 'error.main',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      color: 'white',
                      fontWeight: 600
                    }}
                  >
                    {item.badge}
                  </Box>
                </Box>
              ) : (
                item.icon
              )}
            </ListItemIcon>
            
            {isExpanded && (
              <Typography
                variant="body2"
                sx={{
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '14px',
                  ml: 2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontFamily: 'Inter, Roboto, sans-serif',
                  transition: 'opacity 0.2s ease',
                  opacity: 1
                }}
              >
                {item.label}
              </Typography>
            )}
          </ListItemButton>
        </ListItem>
      </Tooltip>
    );
  };

  const renderCategorySection = (category: keyof typeof expandedCategories, items: SidebarItem[]) => {
    const categoryLabels = {
      product: 'PRODUCT & FILES',
      design: 'DESIGN TOOLS',
      settings: 'SETTINGS & HELP'
    };
    
    return (
      <Box key={category}>
        {isExpanded && (
          <Box
            onClick={() => toggleCategory(category)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 1.5,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                borderRadius: 1
              },
              transition: 'background-color 0.2s ease'
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontSize: '11px',
                opacity: 0.7,
                fontFamily: 'Inter, Roboto, sans-serif'
              }}
            >
              {categoryLabels[category]}
            </Typography>
            {expandedCategories[category] ? 
              <ExpandLess sx={{ ml: 'auto', fontSize: 16, opacity: 0.5 }} /> : 
              <ExpandMore sx={{ ml: 'auto', fontSize: 16, opacity: 0.5 }} />
            }
          </Box>
        )}
        
        <Collapse in={isExpanded ? expandedCategories[category] : true}>
          <List disablePadding>
            {items.map(renderSidebarItem)}
          </List>
        </Collapse>
        
        {category !== 'settings' && isExpanded && (
          <Divider 
            sx={{ 
              my: 1.5, 
              mx: 2, 
              opacity: 0.15,
              borderColor: 'divider'
            }} 
          />
        )}
      </Box>
    );
  };

  const groupedItems = {
    product: SIDEBAR_ITEMS.filter(item => item.category === 'product'),
    design: SIDEBAR_ITEMS.filter(item => item.category === 'design'),
    settings: SIDEBAR_ITEMS.filter(item => item.category === 'settings')
  };

  return (
    <>
      {/* Hover hot-zone for auto mode */}
      {railState === 'auto' && (
        <Box
          sx={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: 16,
            height: '100vh',
            zIndex: 1199,
            cursor: 'pointer'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}

      {/* Main Sidebar */}
      <Drawer
        variant="permanent"
        ref={sidebarRef}
        sx={{
          width: effectiveWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: effectiveWidth,
            backgroundColor: '#F9FAFB',
            borderRight: `1px solid ${theme.palette.divider}`,
            transition: `width ${railState === 'auto' ? '0.2s' : '0.25s'} cubic-bezier(0.4, 0, 0.2, 1)`,
            overflow: 'hidden',
            boxShadow: '2px 0 8px rgba(0,0,0,0.06)',
            position: 'relative'
          }
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Sidebar Header */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: 64,
            backgroundColor: 'white',
            borderBottom: `1px solid ${theme.palette.divider}`,
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
          }}
        >
          {isExpanded && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                fontSize: '1.1rem',
                letterSpacing: '-0.02em',
                fontFamily: 'Inter, Roboto, sans-serif'
              }}
            >
              Designer
            </Typography>
          )}
          
          <Box sx={{ display: 'flex', gap: 0.5, ml: 'auto' }}>
            {/* Expand/Collapse Button */}
            {!isExpanded ? (
              <Tooltip title="Expand sidebar" placement="right">
                <IconButton
                  size="small"
                  onClick={handleExpand}
                  sx={{
                    color: 'text.secondary',
                    backgroundColor: 'rgba(0,0,0,0.04)',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.08)',
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ChevronRight />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Collapse sidebar" placement="right">
                <IconButton
                  size="small"
                  onClick={handleCollapse}
                  sx={{
                    color: 'text.secondary',
                    backgroundColor: 'rgba(0,0,0,0.04)',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.08)',
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ChevronLeft />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>

        {/* Sidebar Content */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            py: 1
          }}
        >
          {renderCategorySection('product', groupedItems.product)}
          {renderCategorySection('design', groupedItems.design)}
          {renderCategorySection('settings', groupedItems.settings)}
        </Box>

        {/* Resize Handle */}
        {isExpanded && (
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: 4,
              height: '100%',
              cursor: 'col-resize',
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: 0.4
              },
              '&:active': {
                backgroundColor: 'primary.main',
                opacity: 0.6
              },
              transition: 'all 0.2s ease'
            }}
            onMouseDown={handleResizeStart}
          />
        )}
      </Drawer>

      {/* Right-Side Contextual Panel */}
      {activeTool && (
        <Box
          sx={{
            position: 'fixed',
            right: 0,
            top: 0,
            width: 320,
            height: '100vh',
            backgroundColor: 'white',
            borderLeft: `1px solid ${theme.palette.divider}`,
            boxShadow: '-2px 0 12px rgba(0,0,0,0.08)',
            zIndex: 1200,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Panel Header */}
          <Box
            sx={{
              p: 2.5,
              borderBottom: `1px solid ${theme.palette.divider}`,
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {SIDEBAR_ITEMS.find(item => item.id === activeTool)?.label}
            </Typography>
            <IconButton
              size="small"
              onClick={() => setActiveTool(null)}
              sx={{ color: 'inherit' }}
            >
              <ChevronLeft />
            </IconButton>
          </Box>

          {/* Panel Content */}
          <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Tool options and settings will appear here for: {activeTool}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default EnhancedDesignerSidebar;
