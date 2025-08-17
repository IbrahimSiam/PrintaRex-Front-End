import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Search, Image } from '@mui/icons-material';

const StockPanel: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Stock Images
      </Typography>
      
      <TextField
        fullWidth
        placeholder="Search stock photos..."
        InputProps={{ startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} /> }}
        sx={{ mb: 3 }}
      />
      
      <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
        <Image sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
        <Typography variant="body2" sx={{ mb: 2 }}>
          Stock photo library coming soon
        </Typography>
        <Button variant="outlined" size="small">
          Browse Categories
        </Button>
      </Box>
    </Box>
  );
};

export default StockPanel;
