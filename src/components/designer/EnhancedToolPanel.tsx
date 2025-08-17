import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormControlLabel,
  Switch,
  Chip,
  Grid,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Upload,
  Add,
  Delete,
  Save,
  Refresh,
  Settings,
  Palette,
  FormatSize,
  Layers,
  ViewModule,
} from '@mui/icons-material';
import { useSidebarStore } from '../../stores/sidebarStore';
import { getSidebarItem, SIDEBAR_GROUPS } from './sidebarConfig';

const EnhancedToolPanel: React.FC = () => {
  const { activeTool } = useSidebarStore();
  const activeItem = activeTool ? getSidebarItem(activeTool) : null;

  if (!activeItem) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Select a tool from the sidebar
        </Typography>
      </Box>
    );
  }

  const renderToolContent = () => {
    switch (activeTool) {
      case 'text':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Text Properties</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Text Content"
                  placeholder="Enter your text here"
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
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
                  label="Font Size"
                  type="number"
                  defaultValue={24}
                  inputProps={{ min: 8, max: 200 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Text Color
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      bgcolor: '#000000',
                      border: '2px solid',
                      borderColor: 'divider',
                      cursor: 'pointer',
                    }}
                  />
                  <TextField
                    size="small"
                    value="#000000"
                    sx={{ width: 100 }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" fullWidth startIcon={<Add />}>
                  Add Text to Canvas
                </Button>
              </Grid>
            </Grid>
          </Box>
        );

      case 'graphics':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Graphics Library</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder="Search graphics..."
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {['Icons', 'Shapes', 'Patterns', 'Illustrations'].map((category) => (
                    <Chip key={category} label={category} size="small" />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" fullWidth startIcon={<Upload />}>
                  Upload Custom Graphic
                </Button>
              </Grid>
            </Grid>
          </Box>
        );

      case 'shapes':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Shape Tools</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {['Rectangle', 'Circle', 'Triangle', 'Polygon'].map((shape) => (
                    <Button key={shape} variant="outlined" size="small">
                      {shape}
                    </Button>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Width"
                  type="number"
                  defaultValue={100}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Height"
                  type="number"
                  defaultValue={100}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" fullWidth startIcon={<Add />}>
                  Add Shape
                </Button>
              </Grid>
            </Grid>
          </Box>
        );

      case 'layers':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Layer Management</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Button variant="outlined" size="small" startIcon={<Layers />}>
                    Show All
                  </Button>
                  <Button variant="outlined" size="small" startIcon={<Delete />}>
                    Hide All
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Button variant="outlined" size="small">
                    Bring Forward
                  </Button>
                  <Button variant="outlined" size="small">
                    Send Back
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" fullWidth startIcon={<Add />}>
                  New Layer
                </Button>
              </Grid>
            </Grid>
          </Box>
        );

      case 'files':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>File Upload</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button variant="outlined" fullWidth startIcon={<Upload />} sx={{ mb: 2 }}>
                  Choose Files
                </Button>
                <Typography variant="caption" color="text.secondary">
                  Supported: PNG, JPG, SVG, PDF (Max 50MB)
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label="300 DPI recommended" size="small" color="primary" />
                  <Chip label="Transparent background" size="small" color="primary" />
                </Box>
              </Grid>
            </Grid>
          </Box>
        );

      case 'product':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Product Settings</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Name"
                  defaultValue="Short Sleeve T-Shirt"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Code"
                  defaultValue="SS-TS-001"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel>Material</InputLabel>
                  <Select label="Material" defaultValue="cotton">
                    <MenuItem value="cotton">100% Cotton</MenuItem>
                    <MenuItem value="polyester">Polyester</MenuItem>
                    <MenuItem value="blend">Cotton Blend</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" fullWidth startIcon={<Save />}>
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Box>
        );

      case 'personalize':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Personalization Options</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable Name Personalization"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch />}
                  label="Custom Text Fields"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch />}
                  label="Color Variations"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" fullWidth startIcon={<Settings />}>
                  Configure Options
                </Button>
              </Grid>
            </Grid>
          </Box>
        );

      case 'templates':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Template Management</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button variant="outlined" fullWidth startIcon={<Save />} sx={{ mb: 2 }}>
                  Save Current Design
                </Button>
                <Button variant="outlined" fullWidth startIcon={<Refresh />}>
                  Load Template
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label="Business" size="small" />
                  <Chip label="Holiday" size="small" />
                  <Chip label="Sports" size="small" />
                </Box>
              </Grid>
            </Grid>
          </Box>
        );

      case 'settings':
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Tool Preferences</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Snap to Grid"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch />}
                  label="Show Rulers"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Grid Size
                </Typography>
                <Slider
                  value={10}
                  min={5}
                  max={50}
                  step={5}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}px`}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" fullWidth startIcon={<Settings />}>
                  Advanced Settings
                </Button>
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>{activeItem.label}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {activeItem.description}
            </Typography>
            <Button variant="contained" fullWidth>
              Configure {activeItem.label}
            </Button>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      {/* Tool Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: `${activeItem.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: activeItem.color,
              }}
            >
              {activeItem.icon}
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {activeItem.label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {activeItem.description}
              </Typography>
            </Box>
          </Box>
          
          {activeItem.shortcut && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Keyboard shortcut:
              </Typography>
              <Chip
                label={activeItem.shortcut}
                size="small"
                color="primary"
                variant="outlined"
              />
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Tool Content */}
      <Card>
        <CardContent>
          {renderToolContent()}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
          Quick Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button variant="outlined" size="small" startIcon={<Refresh />}>
            Reset
          </Button>
          <Button variant="outlined" size="small" startIcon={<Save />}>
            Save Preset
          </Button>
          <Button variant="outlined" size="small" startIcon={<Settings />}>
            Advanced
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EnhancedToolPanel;
