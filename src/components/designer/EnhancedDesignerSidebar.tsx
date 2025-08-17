import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemIcon, ListItemButton, ListItemText,
  Typography, useTheme, useMediaQuery, Tooltip, IconButton, Divider, Fade,
  Slide, Fab, Menu, MenuItem, FormControlLabel, Switch, Slider, Collapse,
} from '@mui/material';
import {
  ChevronLeft, ChevronRight, Menu as MenuIcon, Settings as SettingsIcon,
  ExpandMore, ExpandLess,
} from '@mui/icons-material';
import { useSidebarStore } from '../../stores/sidebarStore';
import { SIDEBAR_GROUPS, SidebarItem } from './sidebarConfig';

const EnhancedDesignerSidebar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const {
    mode, setMode, activeTool, setActiveTool, autoCollapse, setAutoCollapse,
    autoCollapseDelay, setAutoCollapseDelay, setIsMobile, resetAutoCollapseTimer,
    togglePanel, closePanel,
  } = useSidebarStore();

  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['design']));
  const [settingsMenuAnchor, setSettingsMenuAnchor] = useState<null | HTMLElement>(null);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  // Set mobile state
  useEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile, setIsMobile]);

  // Auto-collapse timer
  useEffect(() => {
    if (autoCollapse && activeTool) {
      resetAutoCollapseTimer();
    }
  }, [activeTool, autoCollapse, resetAutoCollapseTimer]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) return; // Don't interfere with browser shortcuts
      
      const shortcut = e.key.toUpperCase();
      const tool = SIDEBAR_GROUPS.flatMap(group => group.items).find(item => item.shortcut === shortcut);
      
      if (tool) {
        e.preventDefault();
        togglePanel(tool.id);
      }
      
      // Escape to close panel
      if (e.key === 'Escape' && activeTool) {
        closePanel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTool, togglePanel, closePanel]);

  // Responsive mode
  useEffect(() => {
    if (isTablet && mode === 'expanded') {
      setMode('collapsed');
    }
  }, [isTablet, mode, setMode]);

  const handleToolClick = (toolId: string) => {
    togglePanel(toolId as any);
  };

  const handleGroupToggle = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const toggleMode = () => {
    if (mode === 'expanded') {
      setMode('collapsed');
    } else if (mode === 'collapsed') {
      setMode('expanded');
    } else {
      setMode('collapsed');
    }
  };

  const renderToolItem = (item: SidebarItem, isCollapsed: boolean) => {
    const isActive = activeTool === item.id;
    
    return (
      <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
        <ListItemButton
          onClick={() => handleToolClick(item.id)}
          sx={{
            minHeight: 48,
            borderRadius: 1,
            mx: 0.5,
            bgcolor: isActive ? `${item.color}20` : 'transparent',
            border: isActive ? `1px solid ${item.color}40` : '1px solid transparent',
            '&:hover': {
              bgcolor: isActive ? `${item.color}30` : 'rgba(0, 0, 0, 0.04)',
            },
            transition: theme.transitions.create(['background-color', 'border-color'], {
              duration: theme.transitions.duration.shortest,
            }),
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: isCollapsed ? 40 : 48,
              color: isActive ? item.color : 'text.secondary',
              '& .MuiSvgIcon-root': {
                fontSize: isCollapsed ? 20 : 24,
              },
            }}
          >
            {item.icon}
          </ListItemIcon>
          
          {!isCollapsed && (
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? item.color : 'text.primary',
              }}
            />
          )}
        </ListItemButton>
      </ListItem>
    );
  };

  const renderSidebarContent = () => {
    const isCollapsed = mode === 'collapsed';
    
    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: 64,
          }}
        >
          {!isCollapsed && (
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Tools
            </Typography>
          )}
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Settings">
              <IconButton
                size="small"
                onClick={(e) => setSettingsMenuAnchor(e.currentTarget)}
                sx={{ color: 'text.secondary' }}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Tool Groups */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
          {SIDEBAR_GROUPS.map((group) => (
            <Box key={group.id} sx={{ mb: 2 }}>
              {!isCollapsed && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 1,
                    py: 0.5,
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      color: 'text.secondary',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    {group.title}
                  </Typography>
                  
                  <IconButton
                    size="small"
                    onClick={() => handleGroupToggle(group.id)}
                    sx={{ color: 'text.secondary' }}
                  >
                    {expandedGroups.has(group.id) ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>
              )}
              
              <Collapse in={isCollapsed || expandedGroups.has(group.id)}>
                <List disablePadding>
                  {group.items.map((item) => renderToolItem(item, isCollapsed))}
                </List>
              </Collapse>
              
              {!isCollapsed && <Divider sx={{ mt: 1 }} />}
            </Box>
          ))}
        </Box>

        {/* Footer */}
        {!isCollapsed && (
          <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={autoCollapse}
                  onChange={(e) => setAutoCollapse(e.target.checked)}
                />
              }
              label={
                <Typography variant="caption" color="text.secondary">
                  Auto-collapse panels
                </Typography>
              }
            />
          </Box>
        )}
      </Box>
    );
  };

  const renderFloatingButton = () => {
    if (mode !== 'hidden') return null;
    
    return (
      <Fab
        color="primary"
        size="medium"
        onClick={() => setMode('collapsed')}
        sx={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 1200,
        }}
      >
        <MenuIcon />
      </Fab>
    );
  };

  const renderSettingsMenu = () => (
    <Menu
      anchorEl={settingsMenuAnchor}
      open={Boolean(settingsMenuAnchor)}
      onClose={() => setSettingsMenuAnchor(null)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem>
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={autoCollapse}
              onChange={(e) => setAutoCollapse(e.target.checked)}
            />
          }
          label="Auto-collapse panels"
          sx={{ m: 0 }}
        />
      </MenuItem>
      
      <MenuItem>
        <Typography variant="body2" sx={{ px: 1, py: 0.5 }}>
          Auto-collapse delay: {autoCollapseDelay / 1000}s
        </Typography>
      </MenuItem>
      
      <MenuItem>
        <Box sx={{ px: 1, py: 0.5, width: 200 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Auto-collapse delay
          </Typography>
          <Slider
            size="small"
            value={autoCollapseDelay / 1000}
            onChange={(_, value) => setAutoCollapseDelay((value as number) * 1000)}
            min={5}
            max={60}
            step={5}
            marks
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}s`}
          />
        </Box>
      </MenuItem>
    </Menu>
  );

  if (mode === 'hidden') {
    return (
      <>
        {renderFloatingButton()}
        {renderSettingsMenu()}
      </>
    );
  }

  const sidebarWidth = mode === 'expanded' ? 280 : 64;

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          '& .MuiDrawer-paper': {
            width: sidebarWidth,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            border: 'none',
            bgcolor: '#fafafa',
            borderRight: '1px solid #e0e0e0',
            overflow: 'hidden',
          },
        }}
      >
        {/* Toggle Button */}
        <Box sx={{ position: 'absolute', top: 8, right: -12, zIndex: 1 }}>
          <Tooltip title={mode === 'expanded' ? 'Collapse Sidebar' : 'Expand Sidebar'}>
            <IconButton 
              size="small" 
              onClick={toggleMode} 
              sx={{ 
                bgcolor: 'white',
                border: '1px solid #e0e0e0',
                '&:hover': { bgcolor: '#f5f5f5' },
              }}
            >
              {mode === 'expanded' ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </Tooltip>
        </Box>

        {/* Sidebar Content */}
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
          <Box sx={{ height: '100%' }}>
            {renderSidebarContent()}
          </Box>
        </Slide>
      </Drawer>

      {renderFloatingButton()}
      {renderSettingsMenu()}
    </>
  );
};

export default EnhancedDesignerSidebar;
