import React from 'react';
import { Box, Typography, Switch, FormControlLabel, Alert } from '@mui/material';
import { Person } from '@mui/icons-material';

const PersonalizePanel: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Personalization Settings
      </Typography>
      
      <FormControlLabel
        control={<Switch />}
        label="Allow customers to edit this element"
        sx={{ mb: 2 }}
      />
      
      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          Select an element on the canvas to make it customer-editable.
        </Typography>
      </Alert>
    </Box>
  );
};

export default PersonalizePanel;
