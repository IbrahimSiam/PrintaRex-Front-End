import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemIcon, ListItemButton,
  Typography, useTheme, useMediaQuery, Tooltip, IconButton, Divider, Fade,
  Slide, Fab, Menu, MenuItem, FormControlLabel, Switch, Slider, Collapse,
  Paper, Badge, Chip, Menu as MenuIcon, Snackbar, Alert, Button, TextField
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
  const [expandedTools, setExpandedTools] = useState<Set<string>>(new Set());
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

  // Show toast for small screens
  const [showToast, setShowToast] = useState(false);
  
  useEffect(() => {
    if (isSmallScreen && !hasShownCollapseToast) {
      const timer = setTimeout(() => {
        setShowToast(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSmallScreen, hasShownCollapseToast]);

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

  const toggleTool = (toolId: string) => {
    setExpandedTools(prev => {
      const newSet = new Set(prev);
      if (newSet.has(toolId)) {
        newSet.delete(toolId);
      } else {
        newSet.add(toolId);
      }
      return newSet;
    });
  };

  const isToolExpanded = (toolId: string) => expandedTools.has(toolId);

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
    const isExpandedTool = isToolExpanded(item.id);

    return (
      <Box key={item.id}>
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
                  transform: isExpanded ? 'translateX(2px)' : 'none',
                  boxShadow: isActive 
                    ? '0 4px 12px rgba(0,0,0,0.15)' 
                    : '0 2px 8px rgba(0,0,0,0.08)'
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
                  minWidth: isExpanded ? 40 : 'auto',
                  color: 'inherit',
                  '& .MuiSvgIcon-root': {
                    fontSize: iconSize,
                    transition: 'all 0.2s ease',
                    filter: isActive ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' : 'none'
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
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.875rem',
                      ml: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      transition: 'opacity 0.2s ease',
                      opacity: 1,
                      flex: 1
                    }}
                  >
                    {item.label}
                  </Typography>
                  
                  {/* Expand/Collapse arrow for tools that support nested drawers */}
                  {['files', 'graphics', 'templates', 'layouts', 'palette'].includes(item.id) && (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTool(item.id);
                      }}
                      sx={{
                        color: 'inherit',
                        opacity: 0.6,
                        '&:hover': {
                          opacity: 1,
                          backgroundColor: 'rgba(255,255,255,0.1)'
                        }
                      }}
                    >
                      {isExpandedTool ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  )}
                </Box>
              )}
            </ListItemButton>
          </ListItem>
        </Tooltip>

        {/* Nested Tool Options Drawer */}
        {isExpanded && isExpandedTool && (
          <Collapse in={isExpandedTool} timeout="auto" unmountOnExit>
            <Box sx={{ ml: 2, mr: 1, mb: 1 }}>
              {renderToolOptions(item)}
            </Box>
          </Collapse>
        )}
      </Box>
    );
  };

  const renderToolOptions = (item: SidebarItem) => {
    switch (item.id) {
      case 'files':
        return (
          <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<CloudUpload />}
              sx={{ mb: 2 }}
            >
              Upload Files
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Recent Uploads
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
              {[1, 2, 3, 4].map((i) => (
                <Box
                  key={i}
                  sx={{
                    width: '100%',
                    height: 40,
                    bgcolor: '#f5f5f5',
                    borderRadius: 1,
                    border: '1px dashed #ddd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    File {i}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        );

      case 'graphics':
        return (
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search graphics..."
              sx={{ mb: 2 }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Categories
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {['Holiday', 'Abstract', 'Business', 'Nature'].map((cat) => (
                <Chip key={cat} label={cat} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>
        );

      case 'templates':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Template Styles
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
              {['Business', 'Creative', 'Holiday', 'Minimal'].map((style) => (
                <Chip key={style} label={style} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>
        );

      case 'layouts':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Layout Options
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
              {['Grid', 'Centered', 'Left', 'Right'].map((layout) => (
                <Chip key={layout} label={layout} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>
        );

      case 'palette':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Color Swatches
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
              {['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'].map((color) => (
                <Box
                  key={color}
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: color,
                    borderRadius: 1,
                    border: '1px solid #ddd',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  const renderContextualPanel = (toolId: string) => {
    const item = SIDEBAR_ITEMS.find(item => item.id === toolId);
    if (!item) return null;

    switch (toolId) {
      case 'text':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Text Properties
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Text Content
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Enter your text here..."
                variant="outlined"
                size="small"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Font Settings
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <TextField
                  select
                  label="Font Family"
                  defaultValue="arial"
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value="arial">Arial</MenuItem>
                  <MenuItem value="helvetica">Helvetica</MenuItem>
                  <MenuItem value="times">Times New Roman</MenuItem>
                  <MenuItem value="georgia">Georgia</MenuItem>
                </TextField>
                <TextField
                  label="Font Size"
                  type="number"
                  defaultValue={24}
                  variant="outlined"
                  size="small"
                  inputProps={{ min: 8, max: 200 }}
                />
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Text Formatting
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label="Bold" size="small" variant="outlined" />
                <Chip label="Italic" size="small" variant="outlined" />
                <Chip label="Underline" size="small" variant="outlined" />
                <Chip label="Center" size="small" variant="outlined" />
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Text Color
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Box sx={{ width: 32, height: 32, bgcolor: '#000', borderRadius: 1, border: '2px solid #e0e0e0' }} />
                <TextField size="small" value="#000000" sx={{ flex: 1 }} />
              </Box>
            </Box>
          </Box>
        );

      case 'graphics':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Graphics Library
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<CloudUpload />}
                sx={{ mb: 2 }}
              >
                Upload Image
              </Button>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Recent Uploads
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
                {[1, 2, 3, 4].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      width: '100%',
                      height: 60,
                      bgcolor: '#f5f5f5',
                      borderRadius: 1,
                      border: '1px dashed #ddd',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Image {i}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Stock Graphics
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Search graphics..."
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {['Icons', 'Shapes', 'Patterns', 'Backgrounds', 'Holiday', 'Abstract'].map((category) => (
                  <Chip key={category} label={category} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>
          </Box>
        );

      case 'templates':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Design Templates
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Template Categories
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {['Business', 'Creative', 'Holiday', 'Minimal', 'Vintage', 'Modern'].map((style) => (
                  <Chip key={style} label={style} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Popular Templates
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
                {[1, 2, 3, 4].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      width: '100%',
                      height: 80,
                      bgcolor: '#f5f5f5',
                      borderRadius: 1,
                      border: '1px solid #e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: '#e0e0e0'
                      }
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Template {i}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        );

      case 'product':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Product Settings
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Product Type
              </Typography>
              <TextField
                select
                fullWidth
                defaultValue="tshirt"
                variant="outlined"
                size="small"
              >
                <MenuItem value="tshirt">T-Shirt</MenuItem>
                <MenuItem value="hoodie">Hoodie</MenuItem>
                <MenuItem value="mug">Mug</MenuItem>
                <MenuItem value="poster">Poster</MenuItem>
              </TextField>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Available Sizes
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <Chip key={size} label={size} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Print Areas
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {['Front', 'Back', 'Left Sleeve', 'Right Sleeve'].map((area) => (
                  <Chip key={area} label={area} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>
          </Box>
        );

      default:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              {item.label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tool options and settings will appear here for: {item.label}
            </Typography>
          </Box>
        );
    }
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
              py: 2,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover',
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
                letterSpacing: '1px',
                fontSize: '0.7rem',
                opacity: 0.8
              }}
            >
              {categoryLabels[category]}
            </Typography>
            {expandedCategories[category] ? 
              <ExpandLess sx={{ ml: 'auto', fontSize: 16, opacity: 0.6 }} /> : 
              <ExpandMore sx={{ ml: 'auto', fontSize: 16, opacity: 0.6 }} />
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
              my: 1, 
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
            backgroundColor: theme.palette.mode === 'dark' ? 'grey.900' : '#FAFAFA',
            borderRight: `1px solid ${theme.palette.divider}`,
            transition: `width ${railState === 'auto' ? '0.16s' : '0.25s'} cubic-bezier(0.4, 0, 0.2, 1)`,
            overflow: 'hidden',
            boxShadow: isExpanded ? '2px 0 12px rgba(0,0,0,0.08)' : 'none',
            position: 'relative',
            backdropFilter: isExpanded ? 'blur(8px)' : 'none'
          }
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Sidebar Header */}
        <Box
          sx={{
            p: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: 64,
            backgroundColor: theme.palette.mode === 'dark' ? 'grey.800' : 'white',
            borderBottom: `1px solid ${theme.palette.divider}`,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}
        >
          {isExpanded && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                fontSize: '1.1rem',
                letterSpacing: '-0.02em'
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

            {/* Pin Button (only when expanded) */}
            {isExpanded && (
              <Tooltip title={railState === 'expanded' ? 'Unpin' : 'Keep sidebar open'} placement="right">
                <IconButton
                  size="small"
                  onClick={handlePin}
                  sx={{
                    color: railState === 'expanded' ? 'primary.main' : 'text.secondary',
                    backgroundColor: railState === 'expanded' ? 'primary.50' : 'rgba(0,0,0,0.04)',
                    '&:hover': {
                      backgroundColor: railState === 'expanded' ? 'primary.100' : 'rgba(0,0,0,0.08)',
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.2s ease'
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
                    backgroundColor: 'rgba(0,0,0,0.04)',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.08)',
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.2s ease'
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
              p: 2.5,
              borderTop: `1px solid ${theme.palette.divider}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: theme.palette.mode === 'dark' ? 'grey.800' : 'white',
              boxShadow: '0 -1px 3px rgba(0,0,0,0.05)'
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
                <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
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
              width: 6,
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
              <Remove />
            </IconButton>
          </Box>

          {/* Panel Content */}
          <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
            {renderContextualPanel(activeTool)}
          </Box>
        </Box>
      )}

      {/* Toast Notification for Small Screens */}
      <Snackbar
        open={showToast}
        autoHideDuration={4000}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        sx={{ 
          left: 80, // Position to the right of mini sidebar
          bottom: 20 
        }}
      >
        <Alert 
          onClose={() => setShowToast(false)} 
          severity="info" 
          sx={{ 
            width: '100%',
            backgroundColor: 'info.light',
            color: 'info.contrastText',
            '& .MuiAlert-icon': {
              color: 'info.contrastText'
            }
          }}
        >
          Sidebar collapsed to save space. Hover left edge to expand.
        </Alert>
      </Snackbar>
    </>
  );
};

export default EnhancedDesignerSidebar;
