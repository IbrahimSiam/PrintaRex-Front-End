import React from 'react';
import {
  Box, Typography, Card, CardContent, Button, TextField, FormControl,
  InputLabel, Select, MenuItem, Slider, FormControlLabel, Switch, Chip,
  Grid, IconButton, Tooltip, Divider, Paper, Fade, Slide,
} from '@mui/material';
import {
  Upload, Add, Delete, Save, Refresh, Settings, Palette, FormatSize,
  Layers, ViewModule, Close, TextFields, Image, CropSquare, Category,
  Person, Collections, Visibility, Opacity, RotateRight, Flip,
  FormatBold, FormatItalic, FormatUnderlined,
} from '@mui/icons-material';
import { useSidebarStore } from '../../stores/sidebarStore';
import { getSidebarItem } from './sidebarConfig';

interface ProfessionalToolPanelProps {
  isVisible: boolean;
}

const ProfessionalToolPanel: React.FC<ProfessionalToolPanelProps> = ({ isVisible }) => {
  const { activeTool, closePanel } = useSidebarStore();
  const activeItem = activeTool ? getSidebarItem(activeTool) : null;

  if (!isVisible || !activeItem || !activeTool) {
    return null;
  }

  const renderToolContent = () => {
    switch (activeTool) {
      case 'text':
        return (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
              Text Properties
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Text Content"
                  placeholder="Enter your text..."
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Font Family</InputLabel>
                  <Select label="Font Family" defaultValue="arial">
                    <MenuItem value="arial">Arial</MenuItem>
                    <MenuItem value="helvetica">Helvetica</MenuItem>
                    <MenuItem value="times">Times New Roman</MenuItem>
                    <MenuItem value="georgia">Georgia</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Font Size"
                  type="number"
                  defaultValue={24}
                  inputProps={{ min: 8, max: 200 }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <IconButton size="small" sx={{ border: '1px solid #e0e0e0' }}>
                    <FormatSize />
                  </IconButton>
                  <IconButton size="small" sx={{ border: '1px solid #e0e0e0' }}>
                    <FormatBold />
                  </IconButton>
                  <IconButton size="small" sx={{ border: '1px solid #e0e0e0' }}>
                    <FormatItalic />
                  </IconButton>
                  <IconButton size="small" sx={{ border: '1px solid #e0e0e0' }}>
                    <FormatUnderlined />
                  </IconButton>
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                  Text Color
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Box sx={{ width: 32, height: 32, bgcolor: '#000', borderRadius: 1, border: '2px solid #e0e0e0' }} />
                  <TextField size="small" value="#000000" sx={{ flex: 1 }} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        );

      case 'graphics':
        return (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
              Graphics Library
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Upload />}
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
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Image {i}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Stock Graphics
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {['Icons', 'Shapes', 'Patterns', 'Backgrounds'].map((category) => (
                <Chip key={category} label={category} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>
        );

      case 'shapes':
        return (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
              Shape Tools
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ height: 60, flexDirection: 'column', gap: 0.5 }}
                >
                  <CropSquare sx={{ fontSize: 24 }} />
                  <Typography variant="caption">Rectangle</Typography>
                </Button>
              </Grid>
              
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ height: 60, flexDirection: 'column', gap: 0.5 }}
                >
                  <Box sx={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid currentColor' }} />
                  <Typography variant="caption">Circle</Typography>
                </Button>
              </Grid>
              
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ height: 60, flexDirection: 'column', gap: 0.5 }}
                >
                  <Box sx={{ width: 24, height: 24, transform: 'rotate(45deg)', border: '2px solid currentColor' }} />
                  <Typography variant="caption">Diamond</Typography>
                </Button>
              </Grid>
              
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ height: 60, flexDirection: 'column', gap: 0.5 }}
                >
                  <Box sx={{ width: 24, height: 12, bgcolor: 'currentColor', borderRadius: 1 }} />
                  <Typography variant="caption">Line</Typography>
                </Button>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Shape Properties
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Fill Color
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Box sx={{ width: 32, height: 32, bgcolor: '#1976d2', borderRadius: 1, border: '2px solid #e0e0e0' }} />
                <TextField size="small" value="#1976d2" sx={{ flex: 1 }} />
              </Box>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Border Width
              </Typography>
              <Slider
                size="small"
                defaultValue={2}
                min={0}
                max={20}
                valueLabelDisplay="auto"
              />
            </Box>
          </Box>
        );

      case 'layers':
        return (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
              Layer Management
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Layers (4)
                </Typography>
                <IconButton size="small">
                  <Add />
                </IconButton>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {['Text Layer', 'Image Layer', 'Shape Layer', 'Background'].map((layer, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 1,
                      border: '1px solid #e0e0e0',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      bgcolor: index === 0 ? '#f0f8ff' : 'transparent',
                    }}
                  >
                    <Visibility sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" sx={{ flex: 1 }}>
                      {layer}
                    </Typography>
                    <IconButton size="small">
                      <Delete sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Layer Properties
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Opacity
              </Typography>
              <Slider
                size="small"
                defaultValue={100}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}%`}
              />
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button size="small" variant="outlined" startIcon={<RotateRight />}>
                Rotate
              </Button>
              <Button size="small" variant="outlined" startIcon={<Flip />}>
                Flip
              </Button>
            </Box>
          </Box>
        );

      case 'files':
        return (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
              File Upload
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  border: '2px dashed #e0e0e0',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  bgcolor: '#fafafa',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#f5f5f5' },
                }}
              >
                <Upload sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Drag & drop files here
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  or click to browse
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Supported Formats
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {['PNG', 'JPG', 'SVG', 'PDF', 'AI', 'PSD'].map((format) => (
                <Chip key={format} label={format} size="small" variant="outlined" />
              ))}
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Recent Files
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['logo.png', 'banner.jpg', 'icon.svg'].map((file, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 1,
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Image sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="caption" sx={{ flex: 1 }}>
                    {file}
                  </Typography>
                  <IconButton size="small">
                    <Add />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        );

      case 'templates':
        return (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
              Design Templates
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Add />}
                sx={{ mb: 2 }}
              >
                Save Current Design
              </Button>
              
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                My Templates
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {['Business Card', 'T-Shirt Design', 'Logo Template', 'Social Media'].map((template, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 1,
                      border: '1px solid #e0e0e0',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: '#f5f5f5' },
                    }}
                  >
                    <Category sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" sx={{ flex: 1 }}>
                      {template}
                    </Typography>
                    <IconButton size="small">
                      <Add />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button size="small" variant="outlined">Import</Button>
              <Button size="small" variant="outlined">Export</Button>
              <Button size="small" variant="outlined">Share</Button>
            </Box>
          </Box>
        );

      default:
        return (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
              {activeItem.label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {activeItem.description}
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Slide direction="right" in={isVisible} mountOnEnter unmountOnExit>
      <Paper
        elevation={8}
        sx={{
          position: 'fixed',
          left: 80, // Position right next to the collapsed sidebar
          top: 20,
          width: 320,
          maxHeight: 'calc(100vh - 40px)',
          overflow: 'auto',
          borderRadius: 2,
          border: '1px solid #e0e0e0',
          zIndex: 1200,
          bgcolor: 'white',
        }}
      >
        {/* Panel Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: '#fafafa',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: activeItem.color,
                color: 'white',
              }}
            >
              {activeItem.icon}
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {activeItem.label}
              </Typography>
              {activeItem.shortcut && (
                <Typography variant="caption" color="text.secondary">
                  Shortcut: {activeItem.shortcut}
                </Typography>
              )}
            </Box>
          </Box>
          
          <IconButton size="small" onClick={closePanel}>
            <Close />
          </IconButton>
        </Box>

        {/* Panel Content */}
        <Box sx={{ p: 2 }}>
          {renderToolContent()}
        </Box>
      </Paper>
    </Slide>
  );
};

export default ProfessionalToolPanel;
