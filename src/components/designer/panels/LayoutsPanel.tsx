import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { GridOn } from '@mui/icons-material';

const LayoutsPanel: React.FC = () => {
  const layouts = [
    { id: '1', name: 'Grid Layout', description: '3x3 grid' },
    { id: '2', name: 'Centered', description: 'Center aligned' },
    { id: '3', name: 'Left Aligned', description: 'Left justified' },
    { id: '4', name: 'Right Aligned', description: 'Right justified' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Layout Presets
      </Typography>
      
      <Grid container spacing={2}>
        {layouts.map((layout) => (
          <Grid item xs={6} key={layout.id}>
            <Card>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <GridOn sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {layout.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                  {layout.description}
                </Typography>
                <Button variant="outlined" size="small" fullWidth>
                  Apply Layout
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LayoutsPanel;
