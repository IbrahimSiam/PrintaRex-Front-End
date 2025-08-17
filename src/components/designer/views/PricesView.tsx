import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
} from '@mui/material';
import { useDesignerStore } from '../../../stores/designerStore';
import DesignerSidebar from '../DesignerSidebar';

const PricesView: React.FC = () => {
  const { pricing, updatePricing, updateVariantPrice } = useDesignerStore();

  const handleCurrencyChange = (currency: string) => {
    updatePricing({ currency });
  };

  const handleRetailPriceChange = (size: string, value: number) => {
    updateVariantPrice(size, 'retailPrice', value);
  };

  const handleProductCostChange = (size: string, value: number) => {
    updateVariantPrice(size, 'productCost', value);
  };

  const handleShippingChange = (size: string, value: number) => {
    updateVariantPrice(size, 'shipping', value);
  };

  const calculateTotalProfit = () => {
    return pricing.variants.reduce((total, variant) => total + variant.estimatedProfit, 0);
  };

  const calculateAverageProfit = () => {
    return calculateTotalProfit() / pricing.variants.length;
  };

  return (
    <>
      {/* Left Sidebar */}
      <DesignerSidebar />
      
      {/* Main Content - Pricing Tables */}
      <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Pricing & Profit
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Set your retail prices and view profit margins for each size variant.
        </Typography>
        
        <Grid container spacing={3}>
          {/* Currency and Settings */}
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Pricing Settings</Typography>
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={pricing.currency}
                    label="Currency"
                    onChange={(e) => handleCurrencyChange(e.target.value)}
                  >
                    <MenuItem value="AED">AED (UAE Dirham)</MenuItem>
                    <MenuItem value="USD">USD (US Dollar)</MenuItem>
                    <MenuItem value="EUR">EUR (Euro)</MenuItem>
                    <MenuItem value="GBP">GBP (British Pound)</MenuItem>
                  </Select>
                </FormControl>
                
                <Typography variant="body2" color="text.secondary">
                  Choose the currency for your pricing. This will be displayed to customers in your store.
                </Typography>
              </CardContent>
            </Card>
            
            {/* Profit Summary */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Profit Summary</Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Estimated Profit
                  </Typography>
                  <Typography variant="h5" color="success.main" sx={{ fontWeight: 600 }}>
                    {pricing.currency} {calculateTotalProfit().toFixed(2)}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Average Profit per Item
                  </Typography>
                  <Typography variant="h6" color="success.main" sx={{ fontWeight: 600 }}>
                    {pricing.currency} {calculateAverageProfit().toFixed(2)}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Variants
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {pricing.variants.length}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Pricing Table */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Pricing Table</Typography>
                
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Size</TableCell>
                        <TableCell align="right">Retail Price</TableCell>
                        <TableCell align="right">Product Cost</TableCell>
                        <TableCell align="right">Shipping</TableCell>
                        <TableCell align="right">Estimated Profit</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pricing.variants.map((variant) => (
                        <TableRow key={variant.size}>
                          <TableCell sx={{ fontWeight: 600 }}>{variant.size}</TableCell>
                          <TableCell align="right">
                            <TextField
                              type="number"
                              value={variant.retailPrice}
                              onChange={(e) => handleRetailPriceChange(variant.size, Number(e.target.value))}
                              size="small"
                              InputProps={{
                                startAdornment: <InputAdornment position="start">{pricing.currency}</InputAdornment>,
                              }}
                              sx={{ width: 120 }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              type="number"
                              value={variant.productCost}
                              onChange={(e) => handleProductCostChange(variant.size, Number(e.target.value))}
                              size="small"
                              InputProps={{
                                startAdornment: <InputAdornment position="start">{pricing.currency}</InputAdornment>,
                              }}
                              sx={{ width: 120 }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              type="number"
                              value={variant.shipping}
                              onChange={(e) => handleShippingChange(variant.size, Number(e.target.value))}
                              size="small"
                              InputProps={{
                                startAdornment: <InputAdornment position="start">{pricing.currency}</InputAdornment>,
                              }}
                              sx={{ width: 120 }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography color="success.main" sx={{ fontWeight: 600 }}>
                              {pricing.currency} {variant.estimatedProfit.toFixed(2)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Edit retail prices, product costs, and shipping to see profit calculations update automatically.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Right Panel - Pricing Tips */}
      <Box sx={{ width: 400, borderLeft: '1px solid #e0e0e0', overflow: 'auto' }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Pricing Tips
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Profit Margins</Typography>
            <Typography variant="body2" color="text.secondary">
              • Aim for 30-50% profit margins for sustainable business
              • Consider your target market's price sensitivity
              • Factor in platform fees and marketing costs
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Competitive Pricing</Typography>
            <Typography variant="body2" color="text.secondary">
              • Research competitor prices in your niche
              • Position your product based on quality and uniqueness
              • Use pricing psychology (e.g., $19.99 vs $20.00)
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Shipping Strategy</Typography>
            <Typography variant="body2" color="text.secondary">
              • Free shipping can increase conversion rates
              • Consider bundling shipping costs into product prices
              • Offer multiple shipping options for customer choice
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PricesView;
