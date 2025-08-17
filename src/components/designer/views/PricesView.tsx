import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { useDesignerStore } from '../../../stores/designerStore';
import { useSidebarStore } from '../../../stores/sidebarStore';
import EnhancedDesignerSidebar from '../EnhancedDesignerSidebar';
import ProfessionalToolPanel from '../ProfessionalToolPanel';

const PricesView: React.FC = () => {
  const { pricing, updatePricing } = useDesignerStore();
  const { activeTool } = useSidebarStore();
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handlePriceChange = (variantId: string, field: string, value: number) => {
    const updatedVariants = pricing.variants.map(variant => {
      if (variant.id === variantId) {
        return { ...variant, [field]: value };
      }
      return variant;
    });
    updatePricing({ variants: updatedVariants });
  };

  const calculateProfit = (variant: any) => {
    const retailPrice = variant.retailPrice || 0;
    const productCost = variant.productCost || 0;
    const shipping = variant.shipping || 0;
    return Math.max(0, retailPrice - productCost - shipping);
  };

  const totalProfit = pricing.variants.reduce((sum, variant) => sum + calculateProfit(variant), 0);
  const averageProfit = totalProfit / pricing.variants.length;

  return (
    <>
      {/* Enhanced Left Sidebar */}
      <EnhancedDesignerSidebar />

      {/* Right Tool Panel */}
      {activeTool && <ProfessionalToolPanel />}

      {/* Main Content - Now centered and clean */}
      <Box sx={{ 
        flex: 1, 
        p: 3,
        ml: '64px', // Account for collapsed sidebar width
      }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
            Pricing & Profit
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Set your retail prices and view profit calculations
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Pricing Table */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Variant Pricing
                </Typography>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={selectedCurrency}
                    label="Currency"
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                  >
                    <MenuItem value="USD">USD ($)</MenuItem>
                    <MenuItem value="EUR">EUR (€)</MenuItem>
                    <MenuItem value="GBP">GBP (£)</MenuItem>
                    <MenuItem value="CAD">CAD (C$)</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Size</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Retail Price</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Product Cost</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Shipping</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Estimated Profit</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Margin %</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pricing.variants.map((variant) => {
                      const profit = calculateProfit(variant);
                      const margin = variant.retailPrice > 0 ? (profit / variant.retailPrice) * 100 : 0;
                      
                      return (
                        <TableRow key={variant.id}>
                          <TableCell sx={{ fontWeight: 600 }}>
                            <Chip label={variant.size} size="small" variant="outlined" />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              type="number"
                              value={variant.retailPrice || ''}
                              onChange={(e) => handlePriceChange(variant.id, 'retailPrice', parseFloat(e.target.value) || 0)}
                              InputProps={{
                                startAdornment: <span>{selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : selectedCurrency === 'GBP' ? '£' : 'C$'}</span>,
                              }}
                              sx={{ width: 100 }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : selectedCurrency === 'GBP' ? '£' : 'C$'}{variant.productCost?.toFixed(2) || '0.00'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : selectedCurrency === 'GBP' ? '£' : 'C$'}{variant.shipping?.toFixed(2) || '0.00'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                color: profit > 0 ? 'success.main' : 'error.main',
                              }}
                            >
                              {selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : selectedCurrency === 'GBP' ? '£' : 'C$'}{profit.toFixed(2)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={`${margin.toFixed(1)}%`}
                              size="small"
                              color={margin > 20 ? 'success' : margin > 10 ? 'warning' : 'error'}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Profit Summary */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ height: 'fit-content' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Profit Summary
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Total Variants
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {pricing.variants.length}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Average Retail Price
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : selectedCurrency === 'GBP' ? '£' : 'C$'}
                      {(pricing.variants.reduce((sum, v) => sum + (v.retailPrice || 0), 0) / pricing.variants.length).toFixed(2)}
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
                        color: totalProfit > 0 ? 'success.main' : 'error.main',
                      }}
                    >
                      {selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : selectedCurrency === 'GBP' ? '£' : 'C$'}{totalProfit.toFixed(2)}
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
                        color: averageProfit > 0 ? 'success.main' : 'error.main',
                      }}
                    >
                      {selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : selectedCurrency === 'GBP' ? '£' : 'C$'}{averageProfit.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  <strong>Tips for better pricing:</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  • Aim for 30-50% profit margins
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  • Consider your target market
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  • Factor in marketing costs
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  • Monitor competitor pricing
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PricesView;
