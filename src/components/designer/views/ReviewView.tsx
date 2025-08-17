import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  CheckCircle, Save, Store, ShoppingCart, Palette, Image, Layers,
  Category, AttachMoney, LocalShipping, TrendingUp,
} from '@mui/icons-material';
import { useDesignerStore } from '../../../stores/designerStore';
import { useSidebarStore } from '../../../stores/sidebarStore';
import EnhancedDesignerSidebar from '../EnhancedDesignerSidebar';
import ProfessionalToolPanel from '../ProfessionalToolPanel';

const ReviewView: React.FC = () => {
  const { details, mockups, pricing, saveTemplate, addToStore, placeOrder } = useDesignerStore();
  const { activeTool } = useSidebarStore();

  const summaryItems = [
    {
      icon: <Palette />,
      label: 'Design Elements',
      value: 'Text, Graphics, Shapes applied',
      color: 'primary',
    },
    {
      icon: <Image />,
      label: 'Mockups',
      value: `${mockups.length} mockup views`,
      color: 'secondary',
    },
    {
      icon: <Category />,
      label: 'Sizes Available',
      value: `${pricing.variants.length} variants`,
      color: 'success',
    },
    {
      icon: <AttachMoney />,
      label: 'Pricing Set',
      value: 'All variants priced',
      color: 'info',
    },
  ];

  const profitSummary = {
    totalProfit: pricing.variants.reduce((sum, v) => sum + (v.retailPrice || 0) - (v.productCost || 0) - (v.shipping || 0), 0),
    averageProfit: pricing.variants.reduce((sum, v) => sum + (v.retailPrice || 0) - (v.productCost || 0) - (v.shipping || 0), 0) / pricing.variants.length,
    totalRevenue: pricing.variants.reduce((sum, v) => sum + (v.retailPrice || 0), 0),
  };

  return (
    <>
      {/* Enhanced Left Sidebar */}
      <EnhancedDesignerSidebar />

      {/* Professional Tool Panel - Only show when a tool is selected */}
      {activeTool && <ProfessionalToolPanel isVisible={true} />}

      {/* Main Content - Now centered and clean */}
      <Box sx={{ 
        flex: 1, 
        p: 3,
        ml: '64px', // Account for collapsed sidebar width
      }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
            Review & Save
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Review your design and take action
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Design Summary */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Design Summary
              </Typography>
              
              <Grid container spacing={2}>
                {summaryItems.map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                      <Box sx={{ color: `${item.color}.main` }}>
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {item.label}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {item.value}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Product Details Review */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Product Details
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Title
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {details.title || 'Untitled Product'}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Tags
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {details.tags.length > 0 ? (
                      details.tags.map((tag, index) => (
                        <Chip key={index} label={tag} size="small" variant="outlined" />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No tags added
                      </Typography>
                    )}
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Description
                  </Typography>
                  <Typography variant="body1">
                    {details.description || 'No description provided'}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Mockups Review */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Selected Mockups
              </Typography>
              
              <Grid container spacing={2}>
                {mockups.map((mockup) => (
                  <Grid item xs={12} sm={6} md={4} key={mockup.id}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <Box sx={{ position: 'relative' }}>
                        <Box
                          component="img"
                          src={mockup.imageUrl}
                          alt={mockup.name}
                          sx={{
                            width: '100%',
                            height: 120,
                            objectFit: 'cover',
                          }}
                        />
                        {mockup.isPrimary && (
                          <Chip
                            label="Primary"
                            color="primary"
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                            }}
                          />
                        )}
                      </Box>
                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {mockup.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {mockup.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Profit Summary & Actions */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: 'fit-content', mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Profit Summary
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Total Revenue
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      ${profitSummary.totalRevenue.toFixed(2)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Total Profit
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: profitSummary.totalProfit > 0 ? 'success.main' : 'error.main',
                      }}
                    >
                      ${profitSummary.totalProfit.toFixed(2)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Average Profit
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: profitSummary.averageProfit > 0 ? 'success.main' : 'error.main',
                      }}
                    >
                      ${profitSummary.averageProfit.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  <strong>Ready to launch?</strong> Your design is complete and ready for production.
                </Typography>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<Save />}
                onClick={saveTemplate}
                sx={{ py: 1.5 }}
              >
                Save Template
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<Store />}
                onClick={addToStore}
                sx={{ py: 1.5 }}
              >
                Add to Store
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<ShoppingCart />}
                onClick={placeOrder}
                sx={{ py: 1.5 }}
              >
                Place Order
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ReviewView;
