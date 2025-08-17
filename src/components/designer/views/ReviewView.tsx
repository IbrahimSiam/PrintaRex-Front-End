import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import {
  Save,
  Store,
  ShoppingCart,
  CheckCircle,
} from '@mui/icons-material';
import { useDesignerStore } from '../../../stores/designerStore';
import DesignerSidebar from '../DesignerSidebar';

const ReviewView: React.FC = () => {
  const { 
    productDetails, 
    mockups, 
    pricing, 
    printAreas,
    nextStep,
    previousStep 
  } = useDesignerStore();

  const activePrintAreas = printAreas.filter(area => area.active);
  const primaryMockup = mockups.find(mockup => mockup.isPrimary);
  const totalProfit = pricing.variants.reduce((total, variant) => total + variant.estimatedProfit, 0);
  const averageProfit = totalProfit / pricing.variants.length;

  const handleSaveTemplate = () => {
    console.log('Saving template...');
    // Implementation for saving template
  };

  const handleAddToStore = () => {
    console.log('Adding to store...');
    // Implementation for adding to store
  };

  const handlePlaceOrder = () => {
    console.log('Placing order...');
    // Implementation for placing order
  };

  return (
    <>
      {/* Left Sidebar */}
      <DesignerSidebar />
      
      {/* Main Content - Review Summary */}
      <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Review & Save
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Review your design details and take action to save or publish your template.
        </Typography>
        
        <Grid container spacing={3}>
          {/* Design Summary */}
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Design Summary</Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                  <Chip 
                    label={`${activePrintAreas.length} Print Areas`} 
                    color="primary" 
                    icon={<CheckCircle />}
                  />
                  <Chip 
                    label={`${mockups.length} Mockups`} 
                    color="primary" 
                    icon={<CheckCircle />}
                  />
                  <Chip 
                    label={`${pricing.variants.length} Sizes`} 
                    color="primary" 
                    icon={<CheckCircle />}
                  />
                  <Chip 
                    label="Product Details" 
                    color="primary" 
                    icon={<CheckCircle />}
                  />
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" sx={{ mb: 2 }}>Product Information</Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Title
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {productDetails.title}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body1">
                    {productDetails.description}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Primary Mockup
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {primaryMockup?.name}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Print Areas
                  </Typography>
                  <Typography variant="body1">
                    {activePrintAreas.map(area => area.name).join(', ')}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            
            {/* Profit Summary */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Profit Summary</Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Total Estimated Profit
                    </Typography>
                    <Typography variant="h5" color="success.main" sx={{ fontWeight: 600 }}>
                      {pricing.currency} {totalProfit.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Average Profit per Item
                    </Typography>
                    <Typography variant="h5" color="success.main" sx={{ fontWeight: 600 }}>
                      {pricing.currency} {averageProfit.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
                
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Based on {pricing.variants.length} size variants
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Actions */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3 }}>Actions</Typography>
                
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<Save />}
                  onClick={handleSaveTemplate}
                  sx={{ mb: 2 }}
                >
                  Save Template
                </Button>
                
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  startIcon={<Store />}
                  onClick={handleAddToStore}
                  sx={{ mb: 2 }}
                >
                  Add to Store
                </Button>
                
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  startIcon={<ShoppingCart />}
                  onClick={handlePlaceOrder}
                  sx={{ mb: 3 }}
                >
                  Place Order
                </Button>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Your template is ready! Choose an action to proceed.
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="text"
                    size="small"
                    onClick={previousStep}
                  >
                    Back to Pricing
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Right Panel - Final Checklist */}
      <Box sx={{ width: 400, borderLeft: '1px solid #e0e0e0', overflow: 'auto' }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Final Checklist
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Design Complete</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle color="success" />
                <Typography variant="body2">Design created and configured</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle color="success" />
                <Typography variant="body2">Mockups selected and primary set</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle color="success" />
                <Typography variant="body2">Product details filled in</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle color="success" />
                <Typography variant="body2">Pricing configured</Typography>
              </Box>
            </Box>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Next Steps</Typography>
            <Typography variant="body2" color="text.secondary">
              • Save your template for future use
              • Add it to your store to start selling
              • Place a test order to verify quality
              • Share with your team for feedback
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Support</Typography>
            <Typography variant="body2" color="text.secondary">
              Need help? Contact our support team or check our documentation for detailed guides.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ReviewView;
