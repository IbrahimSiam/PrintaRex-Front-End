import React from 'react';
import { Box, Typography, TextField, Grid, Chip, Button } from '@mui/material';
import { Search, Image } from '@mui/icons-material';

const GraphicsPanel: React.FC = () => {
  const categories = ['Holiday', 'Abstract', 'Business', 'Nature', 'Technology', 'Food'];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Graphics & Images
      </Typography>
      
      <TextField
        fullWidth
        placeholder="Search graphics..."
        InputProps={{ startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} /> }}
        sx={{ mb: 3 }}
      />
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Categories
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {categories.map((category) => (
            <Chip key={category} label={category} variant="outlined" />
          ))}
        </Box>
      </Box>
      
      <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
        <Image sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
        <Typography variant="body2">
          Graphics library coming soon
        </Typography>
      </Box>
    </Box>
  );
};

export default GraphicsPanel;
