import React, { useState } from 'react';
import {
  Box, Container, Typography, Button, Grid, Chip, Avatar, Badge,
  ToggleButtonGroup, ToggleButton, FormControl, InputLabel, Select, MenuItem,
  Paper, Rating, Stack, TableContainer, Table, TableBody, TableRow, TableCell,
  Accordion, AccordionSummary, AccordionDetails, Tabs, Tab, ButtonBase,
  useTheme, useMediaQuery, Tooltip, IconButton, TextField, InputAdornment,
  AppBar, Toolbar, Breadcrumbs, Link, Drawer, List, ListItem, ListItemIcon,
  ListItemText, Divider, Fab
} from '@mui/material';
import {
  ExpandMore, ShoppingCart, Favorite, FavoriteBorder, Star, StarBorder,
  LocationOn, LocalShipping, AccessTime, Palette, Print, CheckCircle,
  Home, PushPin, PushPinOutlined, Menu, Search, NotificationsNone,
  Settings, ChevronLeft, ChevronRight, ArrowBack, Storefront
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUIStore } from '../stores/uiStore';

// T-shirt icon component with shared outline and specific print areas
const TShirtIcon: React.FC<{
  area: string;
  selected: boolean;
}> = ({ area, selected }) => {
  const outlineColor = selected ? '#1976d2' : '#424242'; // primary.main : grey.700
  const dashColor = selected ? '#1976d2' : '#9e9e9e'; // primary.main : grey.500
  
  // Print area coordinates for each position
  const printAreas = {
    front: { x: 34, y: 30, w: 28, h: 32 },
    back: { x: 34, y: 30, w: 28, h: 32 },
    leftSleeve: { x: 22, y: 28, w: 10, h: 10 },
    rightSleeve: { x: 64, y: 28, w: 10, h: 10 },
    innerNeck: { x: 41, y: 22, w: 14, h: 8 },
    outerNeck: { x: 38, y: 18, w: 20, h: 8 }
  };
  
  const printArea = printAreas[area as keyof typeof printAreas];
  
  return (
    <svg viewBox="0 0 96 96" width="96" height="96">
      {/* shirt outline */}
      <path
        d="M32 18l16-8 16 8 10-6 8 12-10 6v44c0 3.3-2.7 6-6 6H30c-3.3 0-6-2.7-6-6V30l-10-6 8-12 10 6z"
        fill="none" 
        stroke={outlineColor} 
        strokeWidth={2} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* collar */}
      <path 
        d="M40 20c2.8 2.6 6.2 4 8 4s5.2-1.4 8-4" 
        fill="none"
        stroke={outlineColor} 
        strokeWidth={2} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* print area */}
      <rect
        x={printArea.x}
        y={printArea.y}
        width={printArea.w}
        height={printArea.h}
        fill="none"
        stroke={dashColor}
        strokeWidth={2}
        strokeDasharray="4 3"
        rx={2}
      />
    </svg>
  );
};

// Print Areas Accordion Component
const PrintAreasAccordion: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'DTG' | 'DTF'>('DTG');
  const [selectedArea, setSelectedArea] = useState<string>('front');
  
  const AREAS = [
    { key: 'front', label: 'Front' },
    { key: 'back', label: 'Back' },
    { key: 'leftSleeve', label: 'Left sleeve' },
    { key: 'rightSleeve', label: 'Right sleeve' },
    { key: 'innerNeck', label: 'Inner neck' },
    { key: 'outerNeck', label: 'Outer neck' },
  ];
  
  const TAB_AREAS = { DTG: AREAS, DTF: AREAS };
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: 'DTG' | 'DTF') => {
    if (newValue !== null) {
      setActiveTab(newValue);
      setSelectedArea('front'); // Reset selection when switching tabs
    }
  };
  
  const handleAreaSelect = (areaKey: string) => {
    setSelectedArea(areaKey);
  };
  
  return (
    <Accordion
      defaultExpanded
      square={false}
      disableGutters
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        mt: 2,
        '&:before': { display: 'none' }
      }}
    >
      <AccordionSummary
        expandIcon={
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: 'action.hover',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ExpandMore sx={{ fontSize: 20, color: 'text.secondary' }} />
          </Box>
        }
        sx={{
          '& .MuiAccordionSummary-content': {
            margin: 0
          }
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Print areas
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0, pb: 2 }}>
        {/* DTG/DTF Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            aria-label="Print technology tabs"
            sx={{
              '& .MuiTab-root': {
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'none',
                minHeight: 40,
                px: 3
              },
              '& .MuiTabs-indicator': {
                height: 2,
                borderRadius: '1px 1px 0 0'
              }
            }}
          >
            <Tab 
              label="DTG" 
              value="DTG"
              sx={{ fontSize: '0.875rem' }}
            />
            <Tab 
              label="DTF" 
              value="DTF"
              sx={{ fontSize: '0.875rem' }}
            />
          </Tabs>
        </Box>
        
        {/* Print Areas Grid */}
        <Grid container spacing={3} justifyContent="center">
          {TAB_AREAS[activeTab].map((area) => (
            <Grid item xs={6} md="auto" key={area.key}>
              <ButtonBase
                onClick={() => handleAreaSelect(area.key)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 1,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: selectedArea === area.key ? 'primary.main' : 'divider',
                  borderWidth: selectedArea === area.key ? 2 : 1,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: 'text.primary',
                    boxShadow: 2,
                    '& .tshirt-icon': {
                      color: 'text.primary'
                    }
                  },
                  '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: 2
                  }
                }}
                role="button"
                aria-label={`${area.label} print area`}
                aria-pressed={selectedArea === area.key}
              >
                <Box sx={{ mb: 1 }}>
                  <TShirtIcon 
                    area={area.key} 
                    selected={selectedArea === area.key}
                  />
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: selectedArea === area.key ? 'text.primary' : 'text.secondary',
                    fontWeight: selectedArea === area.key ? 600 : 500
                  }}
                >
                  {area.label}
                </Typography>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};


// Size Guide Accordion Component
const SizeGuideAccordion: React.FC = () => {
  const sizeChartData = [
    { size: 'S', chest: '34-36', length: '27' },
    { size: 'M', chest: '38-40', length: '28' },
    { size: 'L', chest: '42-44', length: '29' },
    { size: 'XL', chest: '46-48', length: '30' },
    { size: '2XL', chest: '50-52', length: '31' },
    { size: '3XL', chest: '54-56', length: '32' }
  ];

  return (
    <Accordion
      square={false}
      disableGutters
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        mt: 2,
        '&:before': { display: 'none' }
      }}
    >
      <AccordionSummary
        expandIcon={
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: 'action.hover',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ExpandMore sx={{ fontSize: 20, color: 'text.secondary' }} />
          </Box>
        }
        sx={{
          '& .MuiAccordionSummary-content': {
            margin: 0
          }
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Size guide
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0, pb: 2 }}>
        <Box sx={{ overflowX: 'auto' }}>
          <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell sx={{ border: 'none', py: 1, px: 0, fontWeight: 600, color: 'text.secondary' }}>
                    Size
                  </TableCell>
                  <TableCell sx={{ border: 'none', py: 1, px: 0, fontWeight: 600, color: 'text.secondary' }}>
                    Chest (in)
                  </TableCell>
                  <TableCell sx={{ border: 'none', py: 1, px: 0, fontWeight: 600, color: 'text.secondary' }}>
                    Length (in)
                  </TableCell>
                </TableRow>
                {sizeChartData.map((row) => (
                  <TableRow key={row.size}>
                    <TableCell sx={{ border: 'none', py: 1, px: 0, color: 'text.primary' }}>
                      {row.size}
                    </TableCell>
                    <TableCell sx={{ border: 'none', py: 1, px: 0, color: 'text.primary' }}>
                      {row.chest}
                    </TableCell>
                    <TableCell sx={{ border: 'none', py: 1, px: 0, color: 'text.primary' }}>
                      {row.length}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};


// Fulfillment Providers Section Component
const FulfillmentProvidersSection: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>('rating');
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);

  // Sample fulfillment providers data
  const providers = [
    {
      id: 1,
      name: 'Merchlist',
      rating: 9.3,
      location: { country: 'UAE', flag: '🇦🇪' },
      price: { regular: 45.50, premium: 58.99 },
      shippingCost: 18.00,
      productionTime: '3-5 days',
      printAreas: ['Front side', 'Back side'],
      sizesSupported: 'XS–3XL',
      availableColors: 12,
      badges: ['Bulk discount eligible', 'Branded inserts']
    },
    {
      id: 2,
      name: 'Printful Express',
      rating: 9.1,
      location: { country: 'Latvia', flag: '🇱🇻' },
      price: { regular: 13.99, premium: 17.50 },
      shippingCost: 3.99,
      productionTime: '2-4 days',
      printAreas: ['Front side', 'Back side', 'Left sleeve'],
      sizesSupported: 'XS–4XL',
      availableColors: 15,
      badges: ['Fast shipping', 'Quality guarantee']
    },
    {
      id: 3,
      name: 'Gelato Studios',
      rating: 8.9,
      location: { country: 'Norway', flag: '🇳🇴' },
      price: { regular: 14.50, premium: 18.75 },
      shippingCost: 5.50,
      productionTime: '4-6 days',
      printAreas: ['Front side', 'Back side'],
      sizesSupported: 'XS–3XL',
      availableColors: 10,
      badges: ['Eco-friendly', 'Premium quality']
    },
    {
      id: 4,
      name: 'Printify Pro',
      rating: 9.0,
      location: { country: 'USA', flag: '🇺🇸' },
      price: { regular: 13.25, premium: 16.80 },
      shippingCost: 4.25,
      productionTime: '3-5 days',
      printAreas: ['Front side', 'Back side', 'Right sleeve'],
      sizesSupported: 'XS–3XL',
      availableColors: 18,
      badges: ['Bulk discount eligible', 'Fast turnaround']
    }
  ];

  // Use all providers since we removed decoration method filtering
  const filteredProviders = providers;

  // Sort providers
  const sortedProviders = [...filteredProviders].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return a.price.regular - b.price.regular;
      case 'production':
        return parseInt(a.productionTime.split('-')[0]) - parseInt(b.productionTime.split('-')[0]);
      default:
        return 0;
    }
  });

  // Generate color swatches
  const generateColorSwatches = (count: number) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'];
    return colors.slice(0, Math.min(count, 10));
  };

  return (
    <Box>
      {/* Auto Fulfillment Highlight Box */}
      <Box sx={{ mb: 4 }}>
        <Paper sx={{ 
          p: 3, 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Auto Fulfillment
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, opacity: 0.9 }}>
              From AED {Math.min(...filteredProviders.map(p => p.price.regular)).toFixed(2)}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              Best price and quality via trusted providers
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'white',
                color: '#667eea',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#f8f9fa',
                }
              }}
            >
              Start Designing
            </Button>
          </Box>
          <Box sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.1)',
            zIndex: 0
          }} />
        </Paper>
      </Box>

      {/* Manual Selection Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937' }}>
            Select a fulfillment option
          </Typography>
          
          {/* Sort Dropdown */}
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortBy}
              label="Sort by"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="rating">Highest Rating</MenuItem>
              <MenuItem value="price">Lowest Price</MenuItem>
              <MenuItem value="production">Fastest Production</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Provider Cards */}
        <Grid container spacing={3}>
          {sortedProviders.map((provider) => (
            <Grid item xs={12} key={provider.id}>
              <Paper
                sx={{
                  borderRadius: 3,
                  border: selectedProvider === provider.id ? '2px solid #667eea' : '1px solid #e5e7eb',
                  boxShadow: selectedProvider === provider.id ? '0 8px 25px rgba(102, 126, 234, 0.15)' : '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
                  }
                }}
                onClick={() => setSelectedProvider(provider.id)}
              >
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3} alignItems="center">
                    {/* Left: Provider Info */}
                    <Grid item xs={12} md={8}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Rating value={provider.rating / 2} precision={0.1} readOnly size="small" />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#1f2937' }}>
                            {provider.rating}
                          </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937' }}>
                          {provider.name}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <span style={{ fontSize: '1.2rem' }}>{provider.location.flag}</span>
                        <Typography variant="body2" color="text.secondary">
                          {provider.location.country}
                        </Typography>
                      </Box>

                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={6} sm={3}>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            Price
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600, color: '#1f2937' }}>
                            AED {provider.price.regular}
                          </Typography>
                          {provider.price.premium && (
                            <Typography variant="body2" color="text.secondary">
                              Premium: AED {provider.price.premium}
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            Shipping
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600, color: '#1f2937' }}>
                            AED {provider.shippingCost}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            Production
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600, color: '#1f2937' }}>
                            {provider.productionTime}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            Colors
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              {generateColorSwatches(provider.availableColors).map((color, index) => (
                                <Box
                                  key={index}
                                  sx={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: '50%',
                                    backgroundColor: color,
                                    border: '1px solid #e5e7eb'
                                  }}
                                />
                              ))}
                            </Box>
                            <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
                              {provider.availableColors}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          Print Areas
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500, color: '#1f2937' }}>
                          {provider.printAreas.join(', ')}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          Sizes Supported
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500, color: '#1f2937' }}>
                          {provider.sizesSupported}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {provider.badges.map((badge, index) => (
                          <Chip
                            key={index}
                            label={badge}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderColor: '#e5e7eb',
                              color: '#6b7280',
                              fontSize: '0.75rem'
                            }}
                          />
                        ))}
                      </Box>
                    </Grid>

                    {/* Right: Action Buttons */}
                    <Grid item xs={12} md={4}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button
                          variant="outlined"
                          fullWidth
                          sx={{
                            borderColor: '#d1d5db',
                            color: '#6b7280',
                            '&:hover': {
                              borderColor: '#9ca3af',
                              backgroundColor: '#f9fafb'
                            }
                          }}
                        >
                          Provider Info
                        </Button>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            backgroundColor: '#667eea',
                            fontWeight: 600,
                            '&:hover': {
                              backgroundColor: '#5a67d8'
                            }
                          }}
                        >
                          Start Designing
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

// Product Details Accordion Component
const ProductDetailsAccordion: React.FC = () => {
  return (
    <Accordion
      defaultExpanded
      square={false}
      disableGutters
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        mt: 2,
        '&:before': { display: 'none' }
      }}
    >
      <AccordionSummary
        expandIcon={
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: 'action.hover',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ExpandMore sx={{ fontSize: 20, color: 'text.secondary' }} />
          </Box>
        }
        sx={{
          '& .MuiAccordionSummary-content': {
            margin: 0
          }
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Product Details
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0, pb: 2 }}>
        <Grid container spacing={4} sx={{ maxWidth: 1000 }}>
          {/* Specifications */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
              Specifications
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ border: 'none', py: 1, px: 0, fontWeight: 600, color: 'text.secondary' }}>
                      Material
                    </TableCell>
                    <TableCell sx={{ border: 'none', py: 1, px: 0, color: 'text.primary' }}>
                      100% Premium Cotton
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 'none', py: 1, px: 0, fontWeight: 600, color: 'text.secondary' }}>
                      Weight
                    </TableCell>
                    <TableCell sx={{ border: 'none', py: 1, px: 0, color: 'text.primary' }}>
                      180 GSM
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 'none', py: 1, px: 0, fontWeight: 600, color: 'text.secondary' }}>
                      Fit
                    </TableCell>
                    <TableCell sx={{ border: 'none', py: 1, px: 0, color: 'text.primary' }}>
                      Regular Fit
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 'none', py: 1, px: 0, fontWeight: 600, color: 'text.secondary' }}>
                      Style
                    </TableCell>
                    <TableCell sx={{ border: 'none', py: 1, px: 0, color: 'text.primary' }}>
                      Classic Crew Neck
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Available Options */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
              Available Options
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ border: 'none', py: 1, px: 0, fontWeight: 600, color: 'text.secondary' }}>
                      Colors
                    </TableCell>
                    <TableCell sx={{ border: 'none', py: 1, px: 0, color: 'text.primary' }}>
                      4 options
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 'none', py: 1, px: 0, fontWeight: 600, color: 'text.secondary' }}>
                      Sizes
                    </TableCell>
                    <TableCell sx={{ border: 'none', py: 1, px: 0, color: 'text.primary' }}>
                      6 options
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: 'none', py: 1, px: 0, fontWeight: 600, color: 'text.secondary' }}>
                      Technology
                    </TableCell>
                    <TableCell sx={{ border: 'none', py: 1, px: 0, color: 'text.primary' }}>
                      2 options
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

// Fulfillment Options Accordion Component
const FulfillmentOptionsAccordion: React.FC = () => {
  return (
    <Accordion
      defaultExpanded
      square={false}
      disableGutters
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        mt: 2,
        '&:before': { display: 'none' }
      }}
    >
      <AccordionSummary
        expandIcon={
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: 'action.hover',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ExpandMore sx={{ fontSize: 20, color: 'text.secondary' }} />
          </Box>
        }
        sx={{
          '& .MuiAccordionSummary-content': {
            margin: 0
          }
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Fulfillment Options
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0, pb: 2 }}>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, maxWidth: 600 }}>
          Choose from our network of trusted fulfillment providers. Each provider offers different pricing, production times, and shipping options to meet your specific needs.
        </Typography>
        <FulfillmentProvidersSection />
      </AccordionDetails>
    </Accordion>
  );
};

// Customer Reviews Accordion Component
const CustomerReviewsAccordion: React.FC = () => {
  return (
    <Accordion
      defaultExpanded
      square={false}
      disableGutters
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        mt: 2,
        '&:before': { display: 'none' }
      }}
    >
      <AccordionSummary
        expandIcon={
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: 'action.hover',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ExpandMore sx={{ fontSize: 20, color: 'text.secondary' }} />
          </Box>
        }
        sx={{
          '& .MuiAccordionSummary-content': {
            margin: 0
          }
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Customer Reviews
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0, pb: 2 }}>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: 500 }}>
          No reviews yet for this product. Be the first to share your experience and help other customers make informed decisions.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Write a Review
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

const ShortSleeveTShirt: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarPinned, setSidebarPinned] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Product state
  const [selectedColor, setSelectedColor] = useState('White');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedTechnology, setSelectedTechnology] = useState('DTG');
  const [selectedCountry, setSelectedCountry] = useState('UAE');
  const [mainImage, setMainImage] = useState('/assets/img/tee.jpg');
  
  // Get UI store for currency and shipFrom
  const { shipFrom } = useUIStore();

  // Product data
  const product = {
    id: 1,
    name: 'Short Sleeve T-Shirt',
    code: 'SS-TS-001',
    image: '/assets/img/tee.jpg',
    images: [
      '/assets/img/tee.jpg',
      '/assets/img/tee.jpg',
      '/assets/img/tee.jpg',
      '/assets/img/tee.jpg'
    ],
    priceUSD: 24.99,
    priceAED: 91.75,
    priceEGP: 787.69,
    description: 'Classic short sleeve T-shirt with a comfortable fit and premium cotton fabric. Perfect for everyday wear and custom designs.',
    colors: ['White', 'Black', 'Navy', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    technology: ['DTG', 'DTF'],
    inStock: true,
    tags: ['classic', 'comfortable', 'versatile'],
    features: [
      '100% Premium Cotton',
      'Comfortable fit',
      'Breathable fabric',
      'Easy to customize',
      'Multiple color options',
      'Various size availability'
    ],
    shipping: {
      UAE: { price: 15.00, currency: 'AED', days: '3-5' },
      Egypt: { price: 25.00, currency: 'EGP', days: '5-8' }
    }
  };

  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarPin = () => setSidebarPinned(!sidebarPinned);
  const handleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed);

  const getSidebarWidth = () => {
    if (sidebarCollapsed) return 64;
    if (sidebarOpen) return 280;
    return 0;
  };

  const sidebarItems = [
    { label: 'My New Store', icon: <Home />, path: '/store' },
    { label: 'Dashboard', icon: <Home />, path: '/dashboard' },
    { label: 'Catalog', icon: <Home />, path: '/app/catalog' },
    { label: 'Designer', icon: <Home />, path: '/app/designer' },
  ];

  const SidebarContent = () => (
    <Box sx={{ width: sidebarCollapsed ? 64 : 280, pt: 2, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ px: sidebarCollapsed ? 2 : 3, py: 2, display: 'flex', alignItems: 'center', gap: 1, justifyContent: sidebarCollapsed ? 'center' : 'space-between' }}>
        {!sidebarCollapsed && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Home sx={{ color: '#1976d2', fontSize: 24 }} />
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 700 }}>PrintaRex</Typography>
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title={sidebarPinned ? "Unpin sidebar" : "Pin sidebar"}>
            <IconButton size="small" onClick={handleSidebarPin} sx={{ color: sidebarPinned ? 'primary.main' : 'text.secondary' }}>
              {sidebarPinned ? <PushPin fontSize="small" /> : <PushPinOutlined fontSize="small" />}
            </IconButton>
          </Tooltip>
          {!sidebarCollapsed && (
            <Tooltip title="Collapse sidebar">
              <IconButton size="small" onClick={handleSidebarCollapse}><ChevronLeft fontSize="small" /></IconButton>
            </Tooltip>
          )}
          {sidebarCollapsed && (
            <Tooltip title="Expand sidebar">
              <IconButton size="small" onClick={handleSidebarCollapse}><ChevronRight fontSize="small" /></IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
      <Divider />
      <List sx={{ pt: 1, flex: 1 }}>
        {sidebarItems.map((item, index) => (
          <ListItem key={index} button onClick={() => navigate(item.path)} sx={{ py: sidebarCollapsed ? 2 : 1.5, px: sidebarCollapsed ? 2 : 3, justifyContent: sidebarCollapsed ? 'center' : 'flex-start', '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' } }}>
            <ListItemIcon sx={{ color: 'text.secondary', minWidth: sidebarCollapsed ? 0 : 40, justifyContent: 'center' }}>{item.icon}</ListItemIcon>
            {!sidebarCollapsed && <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const getCurrentPrice = () => {
    if (selectedCountry === 'UAE') return product.priceAED;
    if (selectedCountry === 'Egypt') return product.priceEGP;
    return product.priceUSD;
  };

  const getCurrentCurrency = () => {
    if (selectedCountry === 'UAE') return 'AED';
    if (selectedCountry === 'Egypt') return 'EGP';
    return 'USD';
  };

  const getShippingPrice = () => {
    return product.shipping[selectedCountry as keyof typeof product.shipping]?.price || 0;
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>
      {/* Desktop Sidebar */}
      {!isMobile && sidebarOpen && (
        <Box sx={{ 
          width: getSidebarWidth(), 
          background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', 
          borderRight: '1px solid rgba(226, 232, 240, 0.8)', 
          position: 'fixed', 
          height: '100vh', 
          zIndex: 1000, 
          transition: 'width 0.3s ease-in-out', 
          overflow: 'hidden',
          boxShadow: '2px 0 20px rgba(0, 0, 0, 0.05)'
        }}>
          <SidebarContent />
        </Box>
      )}

      {/* Mobile Sidebar Drawer */}
      <Drawer anchor="left" open={sidebarOpen && isMobile} onClose={handleSidebarToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: 280, backgroundColor: 'white' } }}>
        <SidebarContent />
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1, ml: { xs: 0, md: sidebarOpen ? `${getSidebarWidth()}px` : 0 }, transition: 'margin-left 0.3s ease-in-out' }}>
        {/* Top Bar */}
        <AppBar position="sticky" sx={{ 
          background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(20px)',
          color: 'text.primary', 
          borderBottom: '1px solid rgba(226, 232, 240, 0.6)', 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}>
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton edge="start" onClick={handleSidebarToggle} sx={{ mr: 1 }}><Menu /></IconButton>
              <IconButton onClick={() => navigate('/app/t-shirts')} sx={{ mr: 1 }}><ArrowBack /></IconButton>
              <Box onClick={() => navigate('/')} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', '&:hover': { opacity: 0.8 } }}>
                <Box sx={{ width: 32, height: 32, backgroundColor: '#1976d2', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}>
                  <Typography sx={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>PR</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2', fontSize: { xs: '1rem', md: '1.25rem' } }}>PrintaRex</Typography>
              </Box>
            </Box>

            <Box sx={{ flex: 1, maxWidth: 500, mx: { xs: 1, md: 4 } }}>
              <TextField 
                fullWidth 
                placeholder="Search products..." 
                variant="outlined" 
                size="small" 
                InputProps={{ 
                  startAdornment: <InputAdornment position="start"><Search sx={{ color: '#64748b' }} /></InputAdornment> 
                }} 
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    backgroundColor: 'rgba(248, 250, 252, 0.8)', 
                    borderRadius: 3,
                    border: '1px solid rgba(226, 232, 240, 0.6)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(248, 250, 252, 1)',
                      borderColor: 'rgba(148, 163, 184, 0.8)'
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'white',
                      borderColor: '#3b82f6',
                      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                    }
                  } 
                }} 
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton sx={{ color: 'text.secondary' }}><Badge badgeContent={3} color="error"><NotificationsNone /></Badge></IconButton>
              <IconButton sx={{ color: 'text.secondary' }}><Settings /></IconButton>
              <Avatar sx={{ width: 36, height: 36, backgroundColor: '#1976d2', cursor: 'pointer' }}>U</Avatar>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ py: 6 }}>
          {/* Breadcrumbs */}
          <Breadcrumbs sx={{ 
            mb: 4, 
            '& .MuiBreadcrumbs-ol': { alignItems: 'center' },
            '& .MuiBreadcrumbs-separator': { color: '#94a3b8' }
          }}>
            <Link component="button" variant="body2" onClick={() => navigate('/')} sx={{ 
              textDecoration: 'none', 
              color: '#64748b', 
              fontWeight: 500, 
              px: 2,
              py: 1,
              borderRadius: 2,
              transition: 'all 0.2s ease',
              '&:hover': { 
                color: '#3b82f6', 
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                transform: 'translateY(-1px)'
              } 
            }}>Home</Link>
            <Link component="button" variant="body2" onClick={() => navigate('/app/catalog')} sx={{ 
              textDecoration: 'none', 
              color: '#64748b', 
              fontWeight: 500, 
              px: 2,
              py: 1,
              borderRadius: 2,
              transition: 'all 0.2s ease',
              '&:hover': { 
                color: '#3b82f6', 
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                transform: 'translateY(-1px)'
              } 
            }}>Catalog</Link>
            <Link component="button" variant="body2" onClick={() => navigate('/app/t-shirts')} sx={{ 
              textDecoration: 'none', 
              color: '#64748b', 
              fontWeight: 500, 
              px: 2,
              py: 1,
              borderRadius: 2,
              transition: 'all 0.2s ease',
              '&:hover': { 
                color: '#3b82f6', 
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                transform: 'translateY(-1px)'
              } 
            }}>T-Shirts</Link>
            <Typography variant="body2" color="text.primary" sx={{ 
              fontWeight: 600, 
              color: '#1e293b',
              px: 2,
              py: 1,
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderRadius: 2,
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>{product.name}</Typography>
          </Breadcrumbs>

          {/* Product Grid */}
          <Grid container spacing={4}>
            {/* Left: Image Gallery */}
            <Grid item xs={12} md={3}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2,
                position: 'sticky',
                top: 100
              }}>
                                 {product.images.map((image, index) => (
                   <Box
                     key={index}
                     onClick={() => setMainImage(image)}
                     sx={{
                       width: '100%',
                       height: 120,
                       borderRadius: 3,
                       overflow: 'hidden',
                       cursor: 'pointer',
                       border: mainImage === image ? '3px solid #3b82f6' : '2px solid rgba(226, 232, 240, 0.8)',
                       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                       boxShadow: mainImage === image ? '0 8px 25px rgba(59, 130, 246, 0.25)' : '0 2px 8px rgba(0, 0, 0, 0.06)',
                       '&:hover': {
                         borderColor: '#3b82f6',
                         transform: 'scale(1.03) translateY(-2px)',
                         boxShadow: '0 12px 30px rgba(59, 130, 246, 0.2)'
                       }
                     }}
                   >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                ))}


              </Box>
            </Grid>

                         {/* Center: Main Image */}
             <Grid item xs={12} md={6}>
               <Box sx={{ 
                 width: '100%', 
                 height: 600, 
                 borderRadius: 4, 
                 overflow: 'hidden',
                 boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                 border: '1px solid rgba(226, 232, 240, 0.8)',
                 transition: 'all 0.3s ease',
                 '&:hover': {
                   transform: 'translateY(-4px)',
                   boxShadow: '0 25px 80px rgba(0,0,0,0.18)'
                 }
               }}>
                <img
                  src={mainImage}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
            </Grid>

                                      {/* Right: Product Details */}
             <Grid item xs={12} md={3}>
               <Paper sx={{ 
                 position: 'sticky', 
                 top: 100, 
                 p: 2,
                 borderRadius: 2,
                 boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                 border: '1px solid #e5e7eb'
               }}>
                 {/* Product Title */}
                 <Typography variant="h5" component="h1" sx={{ fontWeight: 600, mb: 1, color: '#1f2937' }}>
                   {product.name}
                 </Typography>
                 
                 {/* Product Code */}
                 <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontFamily: 'monospace', fontSize: '0.75rem' }}>
                   {product.code}
                 </Typography>

                 {/* Base Product Price */}
                 <Typography variant="body1" sx={{ mb: 3, color: '#374151', fontWeight: 500 }}>
                   Base product price: {getCurrentCurrency()} {getCurrentPrice().toFixed(2)}
                 </Typography>

                 {/* Color Selection */}
                 <Box sx={{ mb: 3 }}>
                   <Grid container alignItems="center" spacing={2}>
                     <Grid item xs={4}>
                       <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>
                         Color:
                       </Typography>
                     </Grid>
                     <Grid item xs={8}>
                       <Stack direction="row" spacing={1} flexWrap="wrap">
                         {product.colors.map((color) => (
                           <Avatar
                             key={color}
                             onClick={() => setSelectedColor(color)}
                             sx={{
                               width: 28,
                               height: 28,
                               cursor: 'pointer',
                               border: selectedColor === color ? '2px solid #3b82f6' : '1px solid #d1d5db',
                               bgcolor: color.toLowerCase(),
                               transition: 'all 0.2s ease',
                               '&:hover': { 
                                 transform: 'scale(1.1)',
                                 borderColor: '#3b82f6'
                               }
                             }}
                           >
                             {selectedColor === color && <CheckCircle sx={{ color: 'white', fontSize: 14 }} />}
                           </Avatar>
                         ))}
                       </Stack>
                     </Grid>
                   </Grid>
                 </Box>

                 {/* Size Selection */}
                 <Box sx={{ mb: 3 }}>
                   <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5, color: '#374151' }}>
                     Size
                   </Typography>
                   <ToggleButtonGroup
                     value={selectedSize}
                     exclusive
                     onChange={(e, newSize) => newSize && setSelectedSize(newSize)}
                     size="small"
                     sx={{ width: '100%' }}
                   >
                     {product.sizes.map((size) => (
                       <ToggleButton 
                         key={size} 
                         value={size}
                         sx={{ 
                           flex: 1,
                           width: 36,
                           height: 36,
                           fontSize: '14px',
                           border: '1px solid #d1d5db',
                           '&.Mui-selected': {
                             backgroundColor: '#3b82f6',
                             color: 'white',
                             borderColor: '#3b82f6',
                             '&:hover': { backgroundColor: '#2563eb' }
                           }
                         }}
                       >
                         {size}
                       </ToggleButton>
                     ))}
                   </ToggleButtonGroup>
                 </Box>

                 {/* Technology Selection */}
                 <Box sx={{ mb: 3 }}>
                   <Grid container alignItems="center" spacing={2}>
                     <Grid item xs={5}>
                       <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>
                         Printing Technology:
                       </Typography>
                     </Grid>
                     <Grid item xs={7}>
                       <ToggleButtonGroup
                         value={selectedTechnology}
                         exclusive
                         onChange={(e, newTech) => newTech && setSelectedTechnology(newTech)}
                         size="small"
                         sx={{ width: '100%' }}
                       >
                         {product.technology.map((tech) => (
                           <ToggleButton 
                             key={tech} 
                             value={tech}
                             sx={{ 
                               flex: 1,
                               fontSize: '12px',
                               py: 0.5,
                               px: 1,
                               border: '1px solid #d1d5db',
                               '&.Mui-selected': {
                                 backgroundColor: '#3b82f6',
                                 color: 'white',
                                 borderColor: '#3b82f6',
                                 '&:hover': { backgroundColor: '#2563eb' }
                               }
                             }}
                           >
                             {tech}
                           </ToggleButton>
                         ))}
                       </ToggleButtonGroup>
                     </Grid>
                   </Grid>
                 </Box>

                 {/* Shipping Country */}
                 <Box sx={{ mb: 3 }}>
                   <Grid container alignItems="center" spacing={2}>
                     <Grid item xs={4}>
                       <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>
                         Ships from:
                       </Typography>
                     </Grid>
                     <Grid item xs={8}>
                       <FormControl size="small" sx={{ width: '100%' }}>
                         <Select
                           value={selectedCountry}
                           onChange={(e) => setSelectedCountry(e.target.value)}
                           sx={{ fontSize: '14px' }}
                         >
                           <MenuItem value="UAE">🇦🇪 UAE</MenuItem>
                           <MenuItem value="Egypt">🇪🇬 Egypt</MenuItem>
                         </Select>
                       </FormControl>
                     </Grid>
                   </Grid>
                 </Box>

                 {/* Shipping Info */}
                 <Box sx={{ mb: 3, p: 1.5, backgroundColor: '#f9fafb', borderRadius: 1.5, border: '1px solid #e5e7eb' }}>
                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                     <LocalShipping sx={{ color: '#6b7280', fontSize: 16 }} />
                     <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                       Shipping: {getCurrentCurrency()} {getShippingPrice().toFixed(2)}
                     </Typography>
                   </Box>
                   <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                     Ships in {product.shipping[selectedCountry as keyof typeof product.shipping]?.days} business days
                   </Typography>
                 </Box>

                 {/* Total Price */}
                 <Box sx={{ mb: 3, p: 1.5, backgroundColor: '#eff6ff', borderRadius: 1.5, border: '1px solid #bfdbfe' }}>
                   <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1e40af' }}>
                     Total: {getCurrentCurrency()} {(getCurrentPrice() + getShippingPrice()).toFixed(2)}
                   </Typography>
                 </Box>

                 {/* Action Buttons */}
                 <Stack spacing={2}>
                   <Button
                     variant="contained"
                     fullWidth
                     size="medium"
                     startIcon={<Storefront />}
                     sx={{
                       borderRadius: 2,
                       textTransform: 'none',
                       fontWeight: 600,
                       py: 1.5,
                       backgroundColor: '#10b981',
                       '&:hover': { 
                         backgroundColor: '#059669',
                         transform: 'translateY(-1px)'
                       }
                     }}
                   >
                     Add to Store
                   </Button>
                   <Button
                     variant="outlined"
                     fullWidth
                     size="medium"
                     startIcon={<ShoppingCart />}
                     sx={{
                       borderRadius: 2,
                       textTransform: 'none',
                       fontWeight: 600,
                       py: 1.5,
                       borderColor: '#3b82f6',
                       color: '#3b82f6',
                       '&:hover': { 
                         borderColor: '#2563eb', 
                         backgroundColor: 'rgba(59, 130, 246, 0.08)',
                         transform: 'translateY(-1px)'
                       }
                     }}
                   >
                     Create Order
                   </Button>
                 </Stack>

                 {/* Fulfillment Info */}
                 <Box sx={{ 
                   mt: 3, 
                   p: 1.5, 
                   backgroundColor: '#f0fdf4', 
                   borderRadius: 1.5, 
                   border: '1px solid #bbf7d0'
                 }}>
                   <Typography variant="body2" sx={{ color: '#166534', fontWeight: 500, fontSize: '0.875rem', mb: 0.5 }}>
                     ✓ Ships in 8–12 business days
                   </Typography>
                   <Typography variant="body2" sx={{ color: '#16a34a', fontSize: '0.875rem' }}>
                     ✓ Fulfilled in 14 countries
                   </Typography>
                 </Box>
               </Paper>
             </Grid>
          </Grid>

          {/* Info Sections - Full Width Below Main Grid */}
          <Box sx={{ mt: 8 }}>
            {/* Description Section */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
                Product Description
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.7, maxWidth: 800 }}>
                {product.description}
              </Typography>
              
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
                Key Features
              </Typography>
              <Grid container spacing={2} sx={{ maxWidth: 800 }}>
                {product.features.map((feature: string, index: number) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        borderColor: 'divider',
                        backgroundColor: 'background.paper'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                        <Box sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: 'primary.main',
                          mt: 0.5,
                          flexShrink: 0
                        }} />
                        <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.5 }}>
                          {feature}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Product Details Section */}
            <ProductDetailsAccordion />

            {/* Size Guide Accordion */}
            <SizeGuideAccordion />

            {/* Print Areas Accordion */}
            <PrintAreasAccordion />

            {/* Fulfillment Section */}
            <FulfillmentOptionsAccordion />

            {/* Reviews Section */}
            <CustomerReviewsAccordion />
          </Box>
        </Container>
      </Box>
      
      {/* Floating Action Button for Sidebar Toggle when hidden */}
      {!sidebarOpen && !isMobile && (
        <Fab color="primary" size="small" onClick={handleSidebarToggle} sx={{ position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 1001 }}><Menu /></Fab>
      )}
    </Box>
  );
};
export default ShortSleeveTShirt;

