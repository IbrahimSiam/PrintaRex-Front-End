import React from 'react';
import { Box, Typography, Slider, Grid, Button } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';

const EffectsPanel: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Image Effects
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Brightness: 100%
        </Typography>
        <Slider defaultValue={100} min={0} max={200} marks={[{ value: 100, label: '100%' }]} />
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Contrast: 100%
        </Typography>
        <Slider defaultValue={100} min={0} max={200} marks={[{ value: 100, label: '100%' }]} />
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Saturation: 100%
        </Typography>
        <Slider defaultValue={100} min={0} max={200} marks={[{ value: 100, label: '100%' }]} />
      </Box>
      
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Button variant="outlined" fullWidth>Apply Effects</Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" fullWidth>Reset</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EffectsPanel;
