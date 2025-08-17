import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Tabs, Tab, Grid, Card, CardContent, Button,
  TextField, Slider, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, FormControl, InputLabel, Select, MenuItem, Chip,
  Divider, Alert
} from '@mui/material';
import {
  Add, Delete, Palette, FormatColorFill, Brush, TextFields,
  Save, Colorize, Opacity
} from '@mui/icons-material';
import { useDesignerUIStore } from '../../../stores/designerUIStore';
import { useCanvasService } from '../../../services/canvasService';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`color-tabpanel-${index}`}
      aria-labelledby={`color-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

const ColorPalettePanel: React.FC = () => {
  const { assets, addColorToPalette, removeColorFromPalette, addRecentColor, createPalette, removePalette } = useDesignerUIStore();
  const canvasService = useCanvasService();
  
  const [activeTab, setActiveTab] = useState(0);
  const [customColor, setCustomColor] = useState({
    hex: '#3B82F6',
    rgb: { r: 59, g: 130, b: 246 },
    alpha: 1
  });
  const [showNewPaletteDialog, setShowNewPaletteDialog] = useState(false);
  const [newPaletteName, setNewPaletteName] = useState('');
  const [selectedRole, setSelectedRole] = useState<'fill' | 'stroke' | 'text'>('fill');

  // Auto-detect selection and set appropriate tab
  useEffect(() => {
    const selection = canvasService.getSelection();
    if (selection.type === 'text') {
      setActiveTab(2); // Text tab
      setSelectedRole('text');
    } else if (selection.type === 'shape' || selection.type === 'image') {
      setActiveTab(0); // Fill tab
      setSelectedRole('fill');
    }
  }, [canvasService]);

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  // Handle hex input change
  const handleHexChange = (hex: string) => {
    if (hex.match(/^#[0-9A-Fa-f]{6}$/)) {
      const rgb = hexToRgb(hex);
      setCustomColor(prev => ({
        ...prev,
        hex,
        rgb
      }));
    } else {
      setCustomColor(prev => ({ ...prev, hex }));
    }
  };

  // Handle RGB input change
  const handleRgbChange = (component: 'r' | 'g' | 'b', value: number) => {
    const clampedValue = Math.max(0, Math.min(255, value));
    const newRgb = { ...customColor.rgb, [component]: clampedValue };
    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    
    setCustomColor(prev => ({
      ...prev,
      rgb: newRgb,
      hex
    }));
  };

  // Apply color to canvas
  const applyColor = (color: { hex: string; rgb: { r: number; g: number; b: number }; alpha: number }) => {
    canvasService.applyColor({
      role: selectedRole,
      color: { r: color.rgb.r, g: color.rgb.g, b: color.rgb.b, a: color.alpha, hex: color.hex }
    });
  };

  // Handle color swatch click
  const handleColorClick = (color: { hex: string; rgb: { r: number; g: number; b: number }; alpha: number }) => {
    applyColor(color);
    addRecentColor(color);
  };

  // Create new palette
  const handleCreatePalette = () => {
    if (newPaletteName.trim()) {
      createPalette(newPaletteName.trim());
      setNewPaletteName('');
      setShowNewPaletteDialog(false);
    }
  };

  // Add custom color to palette
  const handleSaveCustomColor = () => {
    const brandPalette = assets.palettes.find(p => p.isBrand);
    if (brandPalette) {
      addColorToPalette(brandPalette.id, customColor);
      addRecentColor(customColor);
    }
  };

  const tabLabels = ['Fill', 'Stroke', 'Text'];

  return (
    <Box sx={{ p: 3 }}>
      {/* Role Selection Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          aria-label="color application tabs"
        >
          {tabLabels.map((label, index) => (
            <Tab
              key={label}
              label={label}
              id={`color-tab-${index}`}
              aria-controls={`color-tabpanel-${index}`}
              onClick={() => setSelectedRole(['fill', 'stroke', 'text'][index] as 'fill' | 'stroke' | 'text')}
            />
          ))}
        </Tabs>
      </Box>

      {/* Fill Tab */}
      <TabPanel value={activeTab} index={0}>
        <Box>
          {/* Brand Palettes */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Brand Palettes
              </Typography>
              <Button
                size="small"
                startIcon={<Add />}
                onClick={() => setShowNewPaletteDialog(true)}
              >
                New Palette
              </Button>
            </Box>
            
            {assets.palettes.filter(p => p.isBrand).map((palette) => (
              <Card key={palette.id} sx={{ mb: 2 }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {palette.name}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => removePalette(palette.id)}
                      color="error"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                  
                  <Grid container spacing={1}>
                    {palette.colors.map((color, index) => (
                      <Grid item key={index}>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            backgroundColor: color.hex,
                            borderRadius: 1,
                            border: '2px solid #e5e7eb',
                            cursor: 'pointer',
                            position: 'relative',
                            '&:hover': {
                              transform: 'scale(1.1)',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                            },
                            transition: 'all 0.2s ease'
                          }}
                          onClick={() => handleColorClick(color)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* System Swatches */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
              System Colors
            </Typography>
            <Grid container spacing={1}>
              {assets.palettes.find(p => p.id === 'default')?.colors.map((color, index) => (
                <Grid item key={index}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: color.hex,
                      borderRadius: 1,
                      border: '2px solid #e5e7eb',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => handleColorClick(color)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Recent Colors */}
          {assets.recentColors.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                Recent Colors
              </Typography>
              <Grid container spacing={1}>
                {assets.recentColors.map((color, index) => (
                  <Grid item key={index}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        backgroundColor: color.hex,
                        borderRadius: 1,
                        border: '2px solid #e5e7eb',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => handleColorClick(color)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </TabPanel>

      {/* Stroke Tab */}
      <TabPanel value={activeTab} index={1}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Select colors for stroke/border styling
          </Typography>
          
          {/* Reuse the same color selection from Fill tab */}
          <TabPanel value={0} index={0}>
            {/* Same content as Fill tab */}
          </TabPanel>
        </Box>
      </TabPanel>

      {/* Text Tab */}
      <TabPanel value={activeTab} index={2}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Select colors for text styling
          </Typography>
          
          {/* Reuse the same color selection from Fill tab */}
          <TabPanel value={0} index={0}>
            {/* Same content as Fill tab */}
          </TabPanel>
        </Box>
      </TabPanel>

      <Divider sx={{ my: 3 }} />

      {/* Custom Color Section */}
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          Custom Color
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                backgroundColor: customColor.hex,
                borderRadius: 1,
                border: '2px solid #e5e7eb'
              }}
            />
            <TextField
              size="small"
              label="HEX"
              value={customColor.hex}
              onChange={(e) => handleHexChange(e.target.value)}
              sx={{ width: 100 }}
            />
          </Box>
          
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={4}>
              <TextField
                size="small"
                label="Red"
                type="number"
                value={customColor.rgb.r}
                onChange={(e) => handleRgbChange('r', parseInt(e.target.value) || 0)}
                inputProps={{ min: 0, max: 255 }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                label="Green"
                type="number"
                value={customColor.rgb.g}
                onChange={(e) => handleRgbChange('g', parseInt(e.target.value) || 0)}
                inputProps={{ min: 0, max: 255 }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                label="Blue"
                type="number"
                value={customColor.rgb.b}
                onChange={(e) => handleRgbChange('b', parseInt(e.target.value) || 0)}
                inputProps={{ min: 0, max: 255 }}
              />
            </Grid>
          </Grid>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Opacity: {Math.round(customColor.alpha * 100)}%
            </Typography>
            <Slider
              value={customColor.alpha}
              onChange={(_, value) => setCustomColor(prev => ({ ...prev, alpha: value as number }))}
              min={0}
              max={1}
              step={0.01}
              marks={[
                { value: 0, label: '0%' },
                { value: 0.5, label: '50%' },
                { value: 1, label: '100%' }
              ]}
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Colorize />}
              onClick={() => handleColorClick(customColor)}
              sx={{ flex: 1 }}
            >
              Apply Color
            </Button>
            <Button
              variant="outlined"
              startIcon={<Save />}
              onClick={handleSaveCustomColor}
              sx={{ flex: 1 }}
            >
              Save to Palette
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Selection Helper */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          Select an element on the canvas to apply colors. Currently targeting: <strong>{selectedRole}</strong>
        </Typography>
      </Alert>

      {/* New Palette Dialog */}
      <Dialog open={showNewPaletteDialog} onClose={() => setShowNewPaletteDialog(false)}>
        <DialogTitle>Create New Palette</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Palette Name"
            fullWidth
            variant="outlined"
            value={newPaletteName}
            onChange={(e) => setNewPaletteName(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNewPaletteDialog(false)}>Cancel</Button>
          <Button onClick={handleCreatePalette} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ColorPalettePanel;
