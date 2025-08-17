import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
} from '@mui/material';
import { useDesignerStore } from '../../../stores/designerStore';
import DesignerSidebar from '../DesignerSidebar';

const MockupsView: React.FC = () => {
  const { mockups, setPrimaryMockup } = useDesignerStore();

  return (
    <>
      {/* Left Sidebar */}
      <DesignerSidebar />
      
      {/* Main Content - Mockups Grid */}
      <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Product Mockups
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Choose which mockup views to include and set one as the primary display image.
        </Typography>
        
        <Grid container spacing={3}>
          {mockups.map((mockup) => (
            <Grid item xs={12} sm={6} md={4} key={mockup.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  border: mockup.isPrimary ? '2px solid #1976d2' : '1px solid #e0e0e0',
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={mockup.image}
                  alt={mockup.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {mockup.name}
                    </Typography>
                    {mockup.isPrimary && (
                      <Chip label="Primary" size="small" color="primary" />
                    )}
                  </Box>
                  
                  <Button
                    variant={mockup.isPrimary ? 'contained' : 'outlined'}
                    size="medium"
                    fullWidth
                    onClick={() => setPrimaryMockup(mockup.id)}
                    sx={{ mt: 'auto' }}
                  >
                    {mockup.isPrimary ? 'Primary Mockup' : 'Set as Primary'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Right Panel - Mockup Settings */}
      <Box sx={{ width: 400, borderLeft: '1px solid #e0e0e0', overflow: 'auto' }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Mockup Settings
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Configure how your product mockups will be displayed to customers.
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Primary Mockup</Typography>
            <Typography variant="body2" color="text.secondary">
              The primary mockup will be the main image shown in your store and product listings.
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Mockup Types</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Front View', 'Back View', 'Side View', 'Lifestyle'].map((type) => (
                <Box key={type} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                    }}
                  />
                  <Typography variant="body2">{type}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Tips</Typography>
            <Typography variant="body2" color="text.secondary">
              • Choose mockups that best showcase your design
              • Ensure the primary mockup is clear and professional
              • Consider your target audience when selecting views
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MockupsView;
