import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Grid, Card, CardContent, Chip, TextField, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Slider, Divider, Alert, Tooltip, useTheme, useMediaQuery } from '@mui/material';
import { useDesignerStore } from '../../stores/designerStore';
import { TrendingUp, LocalShipping, Build, AttachMoney, ShowChart, Info } from '@mui/icons-material';

const DesignerContent: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [pricingData, setPricingData] = useState([
    { size: 'S', retail: 29.99, cost: 12.50, shipping: 5.99, profit: 11.50 },
    { size: 'M', retail: 29.99, cost: 12.50, shipping: 5.99, profit: 11.50 },
    { size: 'L', retail: 29.99, cost: 12.50, shipping: 5.99, profit: 11.50 },
    { size: 'XL', retail: 29.99, cost: 12.50, shipping: 5.99, profit: 11.50 },
    { size: 'XXL', retail: 32.99, cost: 13.50, shipping: 5.99, profit: 13.50 }
  ]);

  const [markup, setMarkup] = useState(85);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<string>('design');

  // Try to get from store, fallback to local state if store fails
  let activeStep = 'design';
  try {
    const store = useDesignerStore();
    activeStep = store.activeStep || 'design';
  } catch (err) {
    console.error('Store error:', err);
    setError('Store initialization failed');
    activeStep = currentStep;
  }

  useEffect(() => {
    console.log('DesignerContent mounted, activeStep:', activeStep);
    setCurrentStep(activeStep);
    setError(null); // Clear any previous errors
  }, [activeStep]);

  const handleRetailPriceChange = (size: string, newPrice: number) => {
    try {
      setPricingData(prev => prev.map(item => {
        if (item.size === size) {
          const newProfit = newPrice - item.cost - item.shipping;
          return { ...item, retail: newPrice, profit: newProfit };
        }
        return item;
      }));
    } catch (err) {
      console.error('Error updating price:', err);
      setError('Failed to update pricing');
    }
  };

  const handleMarkupChange = (newMarkup: number) => {
    setMarkup(newMarkup);
    // Update all retail prices based on new markup
    setPricingData(prev => prev.map(item => {
      const baseCost = item.cost + item.shipping;
      const newRetail = baseCost * (1 + newMarkup / 100);
      const newProfit = newRetail - baseCost;
      return { ...item, retail: newRetail, profit: newProfit };
    }));
  };

  const totalProfit = pricingData.reduce((sum, item) => sum + item.profit, 0);
  const averageProfit = totalProfit / pricingData.length;

  // Error fallback
  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => setError(null)}>
          Try Again
        </Button>
      </Box>
    );
  }

  const renderDesignView = () => (
    <Box sx={{ flex: 1, display: 'flex', p: 2 }}>
      {/* Main Canvas Area */}
      <Box sx={{ flex: 1, mr: 2 }}>
        <Paper 
          elevation={2} 
          sx={{ 
            height: '100%', 
            bgcolor: '#f8f9fa',
            border: '2px dashed #dee2e6',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ mb: 2, color: '#6c757d' }}>
              Design Canvas
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Use the tools on the left to create your t-shirt design
            </Typography>
            <Button variant="contained" size="large">
              Start Designing
            </Button>
          </Box>
        </Paper>
        
        {/* Print Areas Footer */}
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Print Areas
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {['Front', 'Back', 'Inner Neck', 'Outer Neck', 'Left Sleeve', 'Right Sleeve'].map((area) => (
              <Chip key={area} label={area} size="small" variant="outlined" />
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Right Tool Panel */}
      <Box sx={{ width: 300 }}>
        <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Design Tools
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Select a tool from the left sidebar to see options here
          </Typography>
          <Button variant="outlined" fullWidth>
            Text Tool
          </Button>
          <Button variant="outlined" fullWidth sx={{ mt: 1 }}>
            Graphics
          </Button>
          <Button variant="outlined" fullWidth sx={{ mt: 1 }}>
            Shapes
          </Button>
        </Paper>
      </Box>
    </Box>
  );

  const renderMockupsView = () => (
    <Box sx={{ flex: 1, p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Product Mockups
      </Typography>
      <Grid container spacing={3}>
        {[
          { name: 'Front View', primary: true, image: 'Front mockup' },
          { name: 'Back View', primary: false, image: 'Back mockup' },
          { name: 'Side View', primary: false, image: 'Side mockup' },
          { name: 'Lifestyle', primary: false, image: 'Lifestyle mockup' }
        ].map((mockup, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ height: 200, bgcolor: '#f5f5f5', borderRadius: 1, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {mockup.image}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {mockup.name}
                </Typography>
                <Button 
                  variant={mockup.primary ? "contained" : "outlined"} 
                  size="small"
                  fullWidth
                >
                  {mockup.primary ? 'Primary' : 'Set as Primary'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderDetailsView = () => (
    <Box sx={{ flex: 1, p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Product Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Basic Information
              </Typography>
              <TextField
                fullWidth
                label="Product Title"
                defaultValue="Custom Short Sleeve T-Shirt"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                defaultValue="High-quality custom t-shirt with your unique design. Perfect for personal use, gifts, or business branding."
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Care Instructions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Washing" defaultValue="Machine wash cold, gentle cycle" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Drying" defaultValue="Tumble dry low, or air dry" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Ironing" defaultValue="Iron on low heat if needed" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Additional" defaultValue="Do not bleach" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Size Chart
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Units</InputLabel>
                <Select defaultValue="metric">
                  <MenuItem value="metric">Metric (cm)</MenuItem>
                  <MenuItem value="imperial">Imperial (inches)</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ fontSize: '0.875rem' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <span>S:</span>
                  <span>36-38 cm</span>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <span>M:</span>
                  <span>38-40 cm</span>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <span>L:</span>
                  <span>40-42 cm</span>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>XL:</span>
                  <span>42-44 cm</span>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderPricingView = () => (
    <Box sx={{ flex: 1, p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Pricing & Profit
      </Typography>
      
      {/* Enhanced Profit Summary Card */}
      <Card 
        elevation={3} 
        sx={{ 
          mb: 4, 
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          border: '1px solid',
          borderColor: 'grey.200',
          borderRadius: 3
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShowChart sx={{ fontSize: 28, color: 'success.main', mr: 2 }} />
                <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>
                  Profit Summary
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                  ${totalProfit.toFixed(2)}
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
                Total Estimated Profit
              </Typography>
              
              <Typography variant="h6" color="success.main" sx={{ fontWeight: 600 }}>
                Average: ${averageProfit.toFixed(2)} per item
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 2, border: '1px solid', borderColor: 'grey.200' }}>
                <Typography variant="body1" color="text.primary" sx={{ mb: 2, fontWeight: 600 }}>
                  Markup: {markup}%
                </Typography>
                <Slider
                  value={markup}
                  onChange={(_, value) => handleMarkupChange(value as number)}
                  min={20}
                  max={200}
                  step={5}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}%`}
                  sx={{ 
                    color: 'success.main',
                    '& .MuiSlider-thumb': {
                      width: 24,
                      height: 24,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    },
                    '& .MuiSlider-track': {
                      height: 6,
                      borderRadius: 3
                    },
                    '& .MuiSlider-rail': {
                      height: 6,
                      borderRadius: 3
                    }
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  Adjust markup to automatically update all retail prices
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Enhanced Pricing Cards Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {pricingData.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={item.size}>
            <Card 
              elevation={2} 
              sx={{ 
                height: '100%',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                '&:hover': { 
                  elevation: 8,
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                {/* Size Header */}
                <Box sx={{ 
                  mb: 3, 
                  p: 1.5, 
                  bgcolor: 'primary.main', 
                  borderRadius: 2,
                  color: 'white'
                }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Size {item.size}
                  </Typography>
                </Box>
                
                {/* Retail Price Section */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    <AttachMoney sx={{ fontSize: 18, color: 'primary.main', mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Retail Price
                    </Typography>
                  </Box>
                  <TextField
                    size="small"
                    value={item.retail.toFixed(2)}
                    onChange={(e) => handleRetailPriceChange(item.size, parseFloat(e.target.value) || 0)}
                    sx={{ 
                      width: 100,
                      '& .MuiOutlinedInput-root': { 
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main'
                          }
                        }
                      }
                    }}
                    inputProps={{ 
                      style: { textAlign: 'center', fontWeight: 'bold' }
                    }}
                  />
                </Box>

                {/* Cost & Shipping Info */}
                <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Build sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Cost
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      ${item.cost}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocalShipping sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Shipping
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      ${item.shipping}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Profit Highlight Section */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    <TrendingUp sx={{ fontSize: 20, color: 'success.main', mr: 0.5 }} />
                    <Typography variant="body2" color="success.main" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                      Profit
                    </Typography>
                  </Box>
                  
                  <Tooltip 
                    title={`$${item.retail.toFixed(2)} - ($${item.cost} + $${item.shipping}) = $${item.profit.toFixed(2)}`}
                    arrow
                    placement="top"
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5 }}>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                        ${item.profit.toFixed(2)}
                      </Typography>
                      <Info sx={{ fontSize: 16, color: 'success.main', ml: 0.5, opacity: 0.7 }} />
                    </Box>
                  </Tooltip>
                  
                  <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                    {((item.profit / (item.cost + item.shipping)) * 100).toFixed(0)}% margin
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Enhanced Call to Action */}
      <Box sx={{ textAlign: 'center' }}>
        <Button 
          variant="contained" 
          size="large"
          sx={{ 
            px: 6, 
            py: 2,
            fontSize: '1.2rem',
            fontWeight: 700,
            borderRadius: 3,
            textTransform: 'none',
            background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 20px rgba(25, 118, 210, 0.4)',
              background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)'
            }
          }}
        >
          Continue to Review →
        </Button>
      </Box>
    </Box>
  );

  const renderReviewView = () => (
    <Box sx={{ flex: 1, p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Review & Save
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Design Summary
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                <Chip label="Text Elements: 2" color="primary" />
                <Chip label="Graphics: 1" color="primary" />
                <Chip label="Mockups: 4" color="primary" />
                <Chip label="Sizes: 5" color="primary" />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Your design is ready for production. Review all details before saving.
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Profit Summary
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <span>Average Profit per Item:</span>
                <span style={{ fontWeight: 'bold', color: 'success.main' }}>${averageProfit.toFixed(2)}</span>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <span>Total Potential Profit:</span>
                <span style={{ fontWeight: 'bold', color: 'success.main' }}>${totalProfit.toFixed(2)}</span>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Actions
              </Typography>
              <Button variant="contained" fullWidth sx={{ mb: 2 }}>
                Save Template
              </Button>
              <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
                Add to Store
              </Button>
              <Button variant="outlined" fullWidth>
                Place Order
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderStepContent = () => {
    try {
      switch (activeStep) {
        case 'design':
          return renderDesignView();
        case 'mockups':
          return renderMockupsView();
        case 'details':
          return renderDetailsView();
        case 'prices':
          return renderPricingView();
        case 'review':
          return renderReviewView();
        default:
          return renderDesignView();
      }
    } catch (err) {
      console.error('Error rendering step:', err);
      setError(`Failed to render ${activeStep} view: ${err}`);
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error">
            Error rendering {activeStep} view
          </Typography>
          <Button variant="contained" onClick={() => setError(null)} sx={{ mt: 2 }}>
            Try Again
          </Button>
        </Box>
      );
    }
  };

  return (
    <Box sx={{ flex: 1, overflow: 'hidden' }}>
      {renderStepContent()}
    </Box>
  );
};

export default DesignerContent;
