import React from 'react';
import {
  Box, Paper, Typography, IconButton, Button, Divider,
  Slider, FormControl, InputLabel, Select, MenuItem,
  Switch, FormControlLabel, Chip, Grid
} from '@mui/material';
import {
  FormatBold, FormatItalic, FormatUnderlined, FormatAlignLeft,
  FormatAlignCenter, FormatAlignRight, FormatAlignJustify,
  Layers, ViewModule, Close, TextFields, Image, CropSquare, Category,
  Person, Collections, Visibility, Opacity, RotateRight, Flip
} from '@mui/icons-material';
import { useSidebarStore } from '../../stores/sidebarStore';

const ProfessionalToolPanel: React.FC = () => {
  const { activeTool, setActiveTool } = useSidebarStore();

  const handleClose = () => {
    setActiveTool(null);
  };

  if (!activeTool) return null;

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        right: 24,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 320,
        maxHeight: '80vh',
        overflow: 'auto',
        zIndex: 1200,
        borderRadius: 3
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '12px 12px 0 0'
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Professional Tools
        </Typography>
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{ color: 'inherit' }}
        >
          <Close />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Advanced design tools and options for {activeTool}
        </Typography>

        {/* Text Formatting Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Text Formatting
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
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
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="small" sx={{ border: '1px solid #e0e0e0' }}>
              <FormatAlignLeft />
            </IconButton>
            <IconButton size="small" sx={{ border: '1px solid #e0e0e0' }}>
              <FormatAlignCenter />
            </IconButton>
            <IconButton size="small" sx={{ border: '1px solid #e0e0e0' }}>
              <FormatAlignRight />
            </IconButton>
            <IconButton size="small" sx={{ border: '1px solid #e0e0e0' }}>
              <FormatAlignJustify />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Layer Management */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Layer Management
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Layers />}
                fullWidth
              >
                Layer Panel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Visibility />}
                fullWidth
              >
                Show/Hide
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Effects & Filters */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Effects & Filters
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip label="Shadow" size="small" />
            <Chip label="Glow" size="small" />
            <Chip label="Blur" size="small" />
            <Chip label="Sharpen" size="small" />
          </Box>
        </Box>

        {/* Opacity Control */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Opacity
          </Typography>
          <Slider
            defaultValue={100}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}%`}
            min={0}
            max={100}
            sx={{ color: 'primary.main' }}
          />
        </Box>

        {/* Transform Controls */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Transform
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<RotateRight />}
                fullWidth
              >
                Rotate
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Flip />}
                fullWidth
              >
                Flip
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<CropSquare />}
                fullWidth
              >
                Scale
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfessionalToolPanel;
