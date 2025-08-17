import React from 'react';
import { Box, Typography, Slider, Grid, Button } from '@mui/material';
import { Brush } from '@mui/icons-material';

const BrushesPanel: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Brush Tools
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Brush Size: 5px
        </Typography>
        <Slider defaultValue={5} min={1} max={50} marks={[{ value: 5, label: '5px' }]} />
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Opacity: 100%
        </Typography>
        <Slider defaultValue={100} min={0} max={100} marks={[{ value: 100, label: '100%' }]} />
      </Box>
      
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Button variant="outlined" fullWidth>Start Drawing</Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" fullWidth>Clear Canvas</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BrushesPanel;
