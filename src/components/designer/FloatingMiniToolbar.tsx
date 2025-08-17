import React, { useState } from 'react';
import {
  Box,
  Paper,
  IconButton,
  Tooltip,
  Fade,
  Slide,
  Fab,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  DragIndicator,
  Close,
  Settings,
  Palette,
  TextFields,
  Image,
  CropSquare,
  Layers,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useSidebarStore } from '../../stores/sidebarStore';
import { getSidebarItem } from './sidebarConfig';

interface FloatingMiniToolbarProps {
  isVisible: boolean;
  onToggleVisibility: () => void;
}

const FloatingMiniToolbar: React.FC<FloatingMiniToolbarProps> = ({
  isVisible,
  onToggleVisibility,
}) => {
  const { activeTool, setActiveTool } = useSidebarStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 200 });

  const quickTools = [
    { id: 'text', icon: <TextFields />, label: 'Text Tool' },
    { id: 'graphics', icon: <Image />, label: 'Graphics' },
    { id: 'shapes', icon: <CropSquare />, label: 'Shapes' },
    { id: 'layers', icon: <Layers />, label: 'Layers' },
  ];

  const handleToolClick = (toolId: string) => {
    setActiveTool(toolId as any);
    setAnchorEl(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - 50,
        y: e.clientY - 25,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSettingsClick = (e: React.MouseEvent) => {
    setAnchorEl(e.currentTarget as HTMLElement);
  };

  if (!isVisible) return null;

  return (
    <>
      <Fade in={isVisible}>
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            zIndex: 1000,
            borderRadius: 2,
            overflow: 'hidden',
            cursor: isDragging ? 'grabbing' : 'grab',
            '&:hover': {
              boxShadow: 12,
            },
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Toolbar Header */}
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              px: 1,
              py: 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'move',
            }}
          >
            <DragIndicator sx={{ fontSize: 16 }} />
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton
                size="small"
                onClick={handleSettingsClick}
                sx={{ color: 'white' }}
              >
                <Settings sx={{ fontSize: 16 }} />
              </IconButton>
              <IconButton
                size="small"
                onClick={onToggleVisibility}
                sx={{ color: 'white' }}
              >
                <Close sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Box>

          {/* Quick Tools */}
          <Box sx={{ p: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {quickTools.map((tool) => {
                const isActive = activeTool === tool.id;
                const toolItem = getSidebarItem(tool.id as any);
                
                return (
                  <Tooltip
                    key={tool.id}
                    title={tool.label}
                    placement="right"
                    arrow
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleToolClick(tool.id)}
                      sx={{
                        color: isActive ? toolItem?.color || 'primary.main' : 'text.secondary',
                        bgcolor: isActive ? `${toolItem?.color || 'primary.main'}15` : 'transparent',
                        '&:hover': {
                          bgcolor: isActive 
                            ? `${toolItem?.color || 'primary.main'}25` 
                            : 'action.hover',
                        },
                        borderRadius: 1,
                        minWidth: 40,
                        minHeight: 40,
                      }}
                    >
                      {tool.icon}
                    </IconButton>
                  </Tooltip>
                );
              })}
            </Box>
          </Box>
        </Paper>
      </Fade>

      {/* Settings Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <Visibility />
          </ListItemIcon>
          <ListItemText>Always on Top</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Palette />
          </ListItemIcon>
          <ListItemText>Customize Colors</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <FormControlLabel
            control={<Switch size="small" />}
            label="Auto-hide on idle"
            sx={{ m: 0 }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default FloatingMiniToolbar;
