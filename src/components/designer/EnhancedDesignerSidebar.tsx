import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemIcon, ListItemButton,
  Typography, useTheme, useMediaQuery, Tooltip, IconButton, Divider, Fade,
  Slide, Fab, Menu, MenuItem, FormControlLabel, Switch, Slider, Collapse,
  Paper, Badge, Chip, Menu as MenuIcon
} from '@mui/material';
import {
  Checkroom, CloudUpload, TextFields, ViewModule, Image, Layers,
  Person, Folder, GridOn, Search, CropSquare, Settings, Help,
  ChevronLeft, ChevronRight, PushPin, PushPinOutlined, ExpandMore,
  ExpandLess, Add, Remove, Palette, Brush, AutoAwesome, Star,
  MoreVert
} from '@mui/icons-material';
import { useSidebarStore, RailState } from '../../stores/sidebarStore';

interface SidebarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  category: 'design' | 'product' | 'settings';
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
  { id: 'layers', icon: <Layers />, label: 'Layers', category: 'design' },
  { id: 'personalize', icon: <Person />, label: 'Personalize', category: 'design' },
  { id: 'collections', icon: <Folder />, label: 'Collections', category: 'design' },
  { id: 'layouts', icon: <GridOn />, label: 'Layouts', category: 'design' },
  { id: 'shutterstock', icon: <Search />, label: 'Stock Images', category: 'design' },
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
    design: true,
    product: true,
    settings: true
  });
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [hoverTimer, setHoverTimer] = useState<number | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [startResizeX, setStartResizeX] = useState(0);
  const [startResizeWidth, setStartResizeWidth] = useState(0);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const effectiveWidth = getEffectiveWidth();
  const effectiveState = getEffectiveState();
  const isExpanded = effectiveState === 'expanded';
  const iconSize = 24;

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
      }, 500); // 500ms delay
      
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

  const handlePin = () => {
    setRailState('expanded');
    setIsHoverExpanded(false);
  };

  const handleRailBehaviorChange = (newState: RailState) => {
    setRailState(newState);
    setIsHoverExpanded(false);
    setMenuAnchor(null);
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
        disableHoverListener={isExpanded && showLabels}
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
              px: isExpanded ? 3 : 2,
              py: 1.5,
              borderRadius: 2,
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundColor: isActive 
                ? 'primary.main' 
                : isHovered 
                  ? 'action.hover' 
                  : 'transparent',
              color: isActive 
                ? 'primary.contrastText' 
                : isHovered 
                  ? 'text.primary' 
                  : 'text.secondary',
              '&:hover': {
                backgroundColor: isActive 
                  ? 'primary.dark' 
                  : 'action.hover',
                transform: 'translateX(4px)',
                boxShadow: isActive 
                  ? '0 4px 12px rgba(0,0,0,0.15)' 
                  : '0 2px 8px rgba(0,0,0,0.1)'
              },
              '&.Mui-disabled': {
                opacity: 0.4
              }
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: isExpanded ? 40 : 'auto',
                color: 'inherit',
                '& .MuiSvgIcon-root': {
                  fontSize: iconSize,
                  transition: 'all 0.2s ease'
                }
              }}
            >
              {item.badge ? (
                <Badge badgeContent={item.badge} color="error" max={99}>
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )}
            </ListItemIcon>
            
            {isExpanded && showLabels && (
              <Typography
                variant="body2"
                sx={{
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.875rem',
                  ml: 1,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
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
      product: 'Product & Files',
      design: 'Design Tools',
      settings: 'Settings & Help'
    };

    return (
      <Box key={category}>
        {isExpanded && showLabels && (
          <Box
            onClick={() => toggleCategory(category)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 3,
              py: 1.5,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover',
                borderRadius: 1
              }
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontSize: '0.75rem'
              }}
            >
              {categoryLabels[category]}
            </Typography>
            {expandedCategories[category] ? <ExpandLess sx={{ ml: 'auto', fontSize: 16 }} /> : <ExpandMore sx={{ ml: 'auto', fontSize: 16 }} />}
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
              my: 2, 
              mx: 2, 
              opacity: 0.3
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
            backgroundColor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
            borderRight: `1px solid ${theme.palette.divider}`,
            transition: `width ${railState === 'auto' ? '0.16s' : '0.2s'} cubic-bezier(0.4, 0, 0.2, 1)`,
            overflow: 'hidden',
            boxShadow: isExpanded ? '2px 0 8px rgba(0,0,0,0.1)' : 'none',
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
            borderBottom: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: 64
          }}
        >
          {isExpanded && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                fontSize: '1.1rem'
              }}
            >
              Designer
            </Typography>
          )}
          
          <Box sx={{ display: 'flex', gap: 0.5, ml: 'auto' }}>
            {/* Expand/Collapse Button */}
            {!isExpanded ? (
              <Tooltip title="Expand tools" placement="right">
                <IconButton
                  size="small"
                  onClick={handleExpand}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <ChevronRight />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Collapse tools" placement="right">
                <IconButton
                  size="small"
                  onClick={handleCollapse}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <ChevronLeft />
                </IconButton>
              </Tooltip>
            )}

            {/* Pin Button (only when expanded) */}
            {isExpanded && (
              <Tooltip title={railState === 'expanded' ? 'Unpin' : 'Keep open'} placement="right">
                <IconButton
                  size="small"
                  onClick={handlePin}
                  sx={{
                    color: railState === 'expanded' ? 'primary.main' : 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <PushPin />
                </IconButton>
              </Tooltip>
            )}

            {/* Settings Menu */}
            {isExpanded && (
              <Tooltip title="Rail behavior" placement="right">
                <IconButton
                  size="small"
                  onClick={(e) => setMenuAnchor(e.currentTarget)}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <MoreVert />
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

        {/* Sidebar Footer */}
        {isExpanded && (
          <Box
            sx={{
              p: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={showLabels}
                  onChange={(e) => setShowLabels(e.target.checked)}
                />
              }
              label={
                <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                  Labels
                </Typography>
              }
            />
          </Box>
        )}

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
                opacity: 0.3
              }
            }}
            onMouseDown={handleResizeStart}
          />
        )}
      </Drawer>

      {/* Settings Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => handleRailBehaviorChange('auto')}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">Auto</Typography>
            {railState === 'auto' && <Typography variant="caption" color="primary">✓</Typography>}
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleRailBehaviorChange('expanded')}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">Pinned</Typography>
            {railState === 'expanded' && <Typography variant="caption" color="primary">✓</Typography>}
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleRailBehaviorChange('mini')}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">Mini</Typography>
            {railState === 'mini' && <Typography variant="caption" color="primary">✓</Typography>}
          </Box>
        </MenuItem>
      </Menu>

      {/* Floating Tool Panel (Right Side) */}
      {activeTool && (
        <Slide direction="left" in={!!activeTool} mountOnEnter unmountOnExit>
          <Box
            sx={{
              position: 'fixed',
              right: 24,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1200,
              width: 320,
              maxHeight: '80vh',
              overflow: 'auto'
            }}
          >
            <Paper
              elevation={8}
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              {/* Panel Header */}
              <Box
                sx={{
                  p: 2,
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
                  <Remove />
                </IconButton>
              </Box>

              {/* Panel Content */}
              <Box sx={{ p: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Tool options and settings will appear here for: {activeTool}
                </Typography>
                
                {/* Placeholder content for each tool */}
                <Box sx={{ mt: 2 }}>
                  {activeTool === 'text' && (
                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>Text Options</Typography>
                      <Chip label="Font Family" size="small" sx={{ mr: 1, mb: 1 }} />
                      <Chip label="Size" size="small" sx={{ mr: 1, mb: 1 }} />
                      <Chip label="Color" size="small" sx={{ mr: 1, mb: 1 }} />
                    </Box>
                  )}
                  
                  {activeTool === 'graphics' && (
                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>Graphics</Typography>
                      <Chip label="Upload Image" size="small" sx={{ mr: 1, mb: 1 }} />
                      <Chip label="Stock Photos" size="small" sx={{ mr: 1, mb: 1 }} />
                    </Box>
                  )}
                  
                  {activeTool === 'templates' && (
                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>Templates</Typography>
                      <Chip label="Business" size="small" sx={{ mr: 1, mb: 1 }} />
                      <Chip label="Creative" size="small" sx={{ mr: 1, mb: 1 }} />
                      <Chip label="Holiday" size="small" sx={{ mr: 1, mb: 1 }} />
                    </Box>
                  )}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Slide>
      )}
    </>
  );
};

export default EnhancedDesignerSidebar;
