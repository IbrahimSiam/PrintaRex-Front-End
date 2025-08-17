import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { ViewModule } from '@mui/icons-material';

const TemplatesPanel: React.FC = () => {
  const templates = [
    { id: '1', name: 'Business Card', category: 'Business' },
    { id: '2', name: 'Holiday Greeting', category: 'Holiday' },
    { id: '3', name: 'Product Showcase', category: 'Marketing' },
    { id: '4', name: 'Social Media Post', category: 'Social' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Design Templates
      </Typography>
      
      <Grid container spacing={2}>
        {templates.map((template) => (
          <Grid item xs={6} key={template.id}>
            <Card>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <ViewModule sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {template.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                  {template.category}
                </Typography>
                <Button variant="outlined" size="small" fullWidth>
                  Use Template
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TemplatesPanel;
