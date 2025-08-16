import React, { useState } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent, Button, Chip,
  useTheme, useMediaQuery, AppBar, Toolbar, IconButton, Breadcrumbs, Link,
  Avatar, TextField, InputAdornment, Badge, Drawer, List, ListItem,
  ListItemIcon, ListItemText, Divider, Fab, Tooltip, ToggleButtonGroup,
  ToggleButton, FormControl, InputLabel, Select, MenuItem, Tabs, Tab,
  Paper, Rating, Stack
} from '@mui/material';
import {
  Menu, Search, NotificationsNone, Settings, Home, ChevronLeft,
  ChevronRight, PushPin, PushPinOutlined, ArrowBack, LocalShipping,
  CheckCircle, Star, ShoppingCart, Storefront
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../stores/uiStore';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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
              <Card
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
                <CardContent sx={{ p: 3 }}>
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

const WomensShortSleeveCropTop: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarPinned, setSidebarPinned] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const [selectedColor, setSelectedColor] = useState('White');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedTechnology, setSelectedTechnology] = useState('DTG');
  const [selectedCountry, setSelectedCountry] = useState('UAE');
  const [tabValue, setTabValue] = useState(0);
  const [mainImage, setMainImage] = useState('/assets/img/tee.jpg');
  
  const { shipFrom, setShipFrom, setCurrency } = useUIStore();

  const product = {
    id: 1,
    name: 'Short Sleeve Crop Top',
    code: 'WC-CT-001',
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
    description: 'Trendy short sleeve crop top with a modern fit and premium cotton fabric. Perfect for fashion-forward looks and custom designs.',
    colors: ['White', 'Black', 'Pink', 'Lavender'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    technology: ['DTG', 'DTF'],
    inStock: true,
    tags: ['crop-top', 'trendy', 'modern'],
    features: [
      '100% Premium Cotton', 'Modern crop fit', 'Breathable fabric',
      'Easy to customize', 'Multiple color options', 'Fashion-forward design'
    ],
    shipping: { UAE: { price: 15.00, currency: 'AED', days: '3-5' }, Egypt: { price: 25.00, currency: 'EGP', days: '5-8' } }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getCurrentPrice = () => {
    switch (shipFrom) {
      case 'UAE':
        return { price: product.priceAED, currency: 'AED' };
      case 'Egypt':
        return { price: product.priceEGP, currency: 'EGP' };
      default:
        return { price: product.priceUSD, currency: 'USD' };
    }
  };

  const getShippingPrice = () => {
    const country = selectedCountry as keyof typeof product.shipping;
    return product.shipping[country] || product.shipping.UAE;
  };

  const currentPrice = getCurrentPrice();
  const shippingInfo = getShippingPrice();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        open={sidebarOpen}
        sx={{
          width: sidebarCollapsed ? 64 : 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarCollapsed ? 64 : 240,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            bgcolor: '#fff',
            borderRight: '1px solid #e0e0e0',
            overflowX: 'hidden',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, minHeight: 64 }}>
          {!sidebarCollapsed && (
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              PrintaRex
            </Typography>
          )}
          <IconButton
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            sx={{ ml: 'auto' }}
          >
            {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Box>
        <Divider />
        <List>
          {[
            { text: 'Dashboard', icon: <Home />, path: '/app' },
            { text: 'Catalog', icon: <Storefront />, path: '/app/catalog' },
            { text: 'Designer', icon: <Settings />, path: '/app/designer' },
          ].map((item) => (
            <ListItem
              key={item.text}
              button
              onClick={() => navigate(item.path)}
              sx={{
                minHeight: 48,
                px: 2.5,
                '&:hover': { bgcolor: '#f5f5f5' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              {!sidebarCollapsed && (
                <ListItemText primary={item.text} />
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <AppBar position="static" elevation={0} sx={{ bgcolor: '#fff', borderBottom: '1px solid #e0e0e0' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate(-1)}
              sx={{ mr: 2, color: '#666' }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, color: '#333' }}>
              {product.name}
            </Typography>
            <IconButton color="inherit" sx={{ color: '#666' }}>
              <Search />
            </IconButton>
            <IconButton color="inherit" sx={{ color: '#666' }}>
              <NotificationsNone />
            </IconButton>
            <IconButton color="inherit" sx={{ color: '#666' }}>
              <Settings />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Breadcrumbs */}
        <Box sx={{ p: 2, bgcolor: '#fff', borderBottom: '1px solid #e0e0e0' }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/app" underline="hover">
              Home
            </Link>
            <Link color="inherit" href="/app/catalog" underline="hover">
              Catalog
            </Link>
            <Link color="inherit" href="/app/womens-t-shirts" underline="hover">
              Women's T-Shirts
            </Link>
            <Typography color="text.primary">{product.name}</Typography>
          </Breadcrumbs>
        </Box>

        {/* Product Content */}
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 4 }}>
          <Grid container spacing={4}>
            {/* Left Side - Image Gallery */}
            <Grid item xs={12} md={3}>
              <Stack spacing={2}>
                {product.images.map((image, index) => (
                  <Card
                    key={index}
                    sx={{
                      cursor: 'pointer',
                      border: mainImage === image ? '2px solid #1976d2' : '1px solid #e0e0e0',
                      '&:hover': { borderColor: '#1976d2' },
                    }}
                    onClick={() => setMainImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      style={{ width: '100%', height: 120, objectFit: 'cover' }}
                    />
                  </Card>
                ))}
              </Stack>
            </Grid>

            {/* Center - Main Image */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: 'fit-content' }}>
                <img
                  src={mainImage}
                  alt={product.name}
                  style={{ width: '100%', height: 'auto', maxHeight: 600, objectFit: 'cover' }}
                />
              </Card>
            </Grid>

            {/* Right Side - Product Details */}
            <Grid item xs={12} md={3}>
              <Box sx={{ position: 'sticky', top: 24 }}>
                <Card sx={{ p: 3, mb: 3 }}>
                  <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Product Code: {product.code}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {product.description}
                  </Typography>

                  {/* Features */}
                  <Box sx={{ mb: 3 }}>
                    {product.features.map((feature, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CheckCircle sx={{ color: '#4caf50', mr: 1, fontSize: 20 }} />
                        <Typography variant="body2">{feature}</Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Color Selection */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Color
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {product.colors.map((color) => (
                        <Avatar
                          key={color}
                          sx={{
                            width: 40,
                            height: 40,
                            cursor: 'pointer',
                            border: selectedColor === color ? '3px solid #1976d2' : '2px solid #e0e0e0',
                            bgcolor: color.toLowerCase(),
                            '&:hover': { borderColor: '#1976d2' },
                          }}
                          onClick={() => setSelectedColor(color)}
                        >
                          {color === 'White' && <Typography variant="caption" sx={{ color: '#000' }}>W</Typography>}
                          {color === 'Black' && <Typography variant="caption" sx={{ color: '#fff' }}>B</Typography>}
                          {color === 'Pink' && <Typography variant="caption" sx={{ color: '#fff' }}>P</Typography>}
                          {color === 'Lavender' && <Typography variant="caption" sx={{ color: '#fff' }}>L</Typography>}
                          {color === 'Navy' && <Typography variant="caption" sx={{ color: '#fff' }}>N</Typography>}
                          {color === 'Burgundy' && <Typography variant="caption" sx={{ color: '#fff' }}>B</Typography>}
                          {color === 'Gray' && <Typography variant="caption" sx={{ color: '#000' }}>G</Typography>}
                          {color === 'Blue' && <Typography variant="caption" sx={{ color: '#fff' }}>B</Typography>}
                          {color === 'Oversized' && <Typography variant="caption" sx={{ color: '#000' }}>O</Typography>}
                          {color === 'Fashion' && <Typography variant="caption" sx={{ color: '#000' }}>F</Typography>}
                        </Avatar>
                      ))}
                    </Box>
                  </Box>

                  {/* Size Selection */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Size
                    </Typography>
                    <ToggleButtonGroup
                      value={selectedSize}
                      exclusive
                      onChange={(e, newSize) => newSize && setSelectedSize(newSize)}
                      sx={{ flexWrap: 'wrap', gap: 1 }}
                    >
                      {product.sizes.map((size) => (
                        <ToggleButton key={size} value={size} sx={{ minWidth: 50 }}>
                          {size}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Box>

                  {/* Technology Selection */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Technology
                    </Typography>
                    <ToggleButtonGroup
                      value={selectedTechnology}
                      exclusive
                      onChange={(e, newTech) => newTech && setSelectedTechnology(newTech)}
                      sx={{ flexWrap: 'wrap', gap: 1 }}
                    >
                      {product.technology.map((tech) => (
                        <ToggleButton key={tech} value={tech} sx={{ minWidth: 80 }}>
                          {tech}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Box>

                  {/* Pricing */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold', color: '#1976d2' }}>
                      {currentPrice.currency} {currentPrice.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Base price
                    </Typography>
                  </Box>

                  {/* Shipping */}
                  <Box sx={{ mb: 3 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Shipping Country</InputLabel>
                      <Select
                        value={selectedCountry}
                        label="Shipping Country"
                        onChange={(e) => setSelectedCountry(e.target.value)}
                      >
                        <MenuItem value="UAE">UAE</MenuItem>
                        <MenuItem value="Egypt">Egypt</MenuItem>
                      </Select>
                    </FormControl>
                    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Shipping:</Typography>
                      <Typography variant="body2">
                        {shippingInfo.currency} {shippingInfo.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Ships in {shippingInfo.days} business days
                    </Typography>
                  </Box>

                  {/* Actions */}
                  <Stack spacing={2}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Storefront />}
                      sx={{ py: 1.5 }}
                    >
                      Add to Store
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<ShoppingCart />}
                      sx={{ py: 1.5 }}
                    >
                      Create Order
                    </Button>
                  </Stack>
                </Card>

                {/* Fulfillment Info */}
                <Card sx={{ p: 3, bgcolor: '#f8f9fa' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocalShipping sx={{ color: '#1976d2', mr: 1 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      Fulfillment
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Ships in 8–12 business days, fulfilled in 14 countries
                  </Typography>
                </Card>
              </Box>
            </Grid>
          </Grid>

          {/* Tabs Section */}
          <Box sx={{ mt: 6 }}>
            <Card>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="product tabs">
                  <Tab label="Description" {...a11yProps(0)} />
                  <Tab label="Product Details" {...a11yProps(1)} />
                  <Tab label="Reviews" {...a11yProps(2)} />
                  <Tab label="Fulfillment" {...a11yProps(3)} />
                </Tabs>
              </Box>
              <TabPanel value={tabValue} index={0}>
                <Typography variant="body1" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="body1" paragraph>
                  This trendy short sleeve crop top is designed for the modern woman who loves to make a statement. 
                  Made from premium cotton fabric, it offers both comfort and style. The crop fit adds a contemporary 
                  touch while maintaining elegance and versatility.
                </Typography>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Specifications</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Material:</Typography>
                      <Typography variant="body2">100% Premium Cotton</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Fit:</Typography>
                      <Typography variant="body2">Crop</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Sleeve Length:</Typography>
                      <Typography variant="body2">Short Sleeve</Typography>
                    </Box>
                    <Box sx={{ display: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Care:</Typography>
                      <Typography variant="body2">Machine wash cold</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Available Options</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Colors:</Typography>
                      <Typography variant="body2">{product.colors.join(', ')}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Sizes:</Typography>
                      <Typography variant="body2">{product.sizes.join(', ')}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Technology:</Typography>
                      <Typography variant="body2">{product.technology.join(', ')}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Star sx={{ fontSize: 60, color: '#ffd700', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>No Reviews Yet</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Be the first to review this product!
                  </Typography>
                </Box>
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                <FulfillmentProvidersSection />
              </TabPanel>
            </Card>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default WomensShortSleeveCropTop;
