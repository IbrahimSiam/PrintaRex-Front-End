import React from 'react';
import { Box, Typography, Switch, FormControlLabel, Divider } from '@mui/material';
import { Settings } from '@mui/icons-material';

const SettingsPanel: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Designer Settings
      </Typography>
      
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Auto-save designs"
        sx={{ mb: 2 }}
      />
      
      <FormControlLabel
        control={<Switch />}
        label="Show grid guides"
        sx={{ mb: 2 }}
      />
      
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Snap to grid"
        sx={{ mb: 2 }}
      />
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
        Canvas Settings
      </Typography>
      
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Show print area"
        sx={{ mb: 2 }}
      />
      
      <FormControlLabel
        control={<Switch />}
        label="Show safe area"
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default SettingsPanel;
