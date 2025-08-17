import React from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Grid, Chip } from '@mui/material';
import { Checkroom } from '@mui/icons-material';

const ProductPanel: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Product Settings
      </Typography>
      
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Product Type</InputLabel>
        <Select defaultValue="tshirt" label="Product Type">
          <MenuItem value="tshirt">T-Shirt</MenuItem>
          <MenuItem value="hoodie">Hoodie</MenuItem>
          <MenuItem value="mug">Mug</MenuItem>
          <MenuItem value="poster">Poster</MenuItem>
        </Select>
      </FormControl>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Available Sizes
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <Chip key={size} label={size} variant="outlined" />
          ))}
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Print Areas
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {['Front', 'Back', 'Left Sleeve', 'Right Sleeve'].map((area) => (
            <Chip key={area} label={area} variant="outlined" />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductPanel;
