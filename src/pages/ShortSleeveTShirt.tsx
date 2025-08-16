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
  const [tabValue, setTabValue] = useState(0);
  const [mainImage, setMainImage] = useState('/assets/img/tee.jpg');
  
  // Get UI store for currency and shipFrom
  const { shipFrom, setShipFrom, setCurrency } = useUIStore();

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
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => setTabValue(newValue);

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
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Desktop Sidebar */}
      {!isMobile && sidebarOpen && (
        <Box sx={{ width: getSidebarWidth(), backgroundColor: 'white', borderRight: '1px solid #e5e7eb', position: 'fixed', height: '100vh', zIndex: 1000, transition: 'width 0.3s ease-in-out', overflow: 'hidden' }}>
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
        <AppBar position="sticky" sx={{ backgroundColor: 'white', color: 'text.primary', borderBottom: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
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
                  startAdornment: <InputAdornment position="start"><Search sx={{ color: 'text.secondary' }} /></InputAdornment> 
                }} 
                sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#f8f9fa', borderRadius: 2 } }} 
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
          <Breadcrumbs sx={{ mb: 4, '& .MuiBreadcrumbs-ol': { alignItems: 'center' } }}>
            <Link component="button" variant="body2" onClick={() => navigate('/')} sx={{ textDecoration: 'none', color: '#6b7280', fontWeight: 500, '&:hover': { color: '#6366f1' } }}>Home</Link>
            <Link component="button" variant="body2" onClick={() => navigate('/app/catalog')} sx={{ textDecoration: 'none', color: '#6b7280', fontWeight: 500, '&:hover': { color: '#6366f1' } }}>Catalog</Link>
            <Link component="button" variant="body2" onClick={() => navigate('/app/t-shirts')} sx={{ textDecoration: 'none', color: '#6b7280', fontWeight: 500, '&:hover': { color: '#6366f1' } }}>T-Shirts</Link>
            <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>{product.name}</Typography>
          </Breadcrumbs>

          {/* Product Grid */}
          <Grid container spacing={4}>
            {/* Left: Image Gallery */}
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {product.images.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => setMainImage(image)}
                    sx={{
                      width: '100%',
                      height: 120,
                      borderRadius: 2,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: mainImage === image ? '3px solid #1976d2' : '2px solid #e5e7eb',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        borderColor: '#1976d2',
                        transform: 'scale(1.02)'
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
                borderRadius: 3, 
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                border: '1px solid #f3f4f6'
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
              <Box sx={{ 
                position: 'sticky', 
                top: 100, 
                backgroundColor: 'white', 
                borderRadius: 3, 
                p: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid #f3f4f6'
              }}>
                {/* Product Title */}
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1, color: '#1f2937' }}>
                  {product.name}
                </Typography>
                
                {/* Product Code */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontFamily: 'monospace' }}>
                  Product Code: {product.code}
                </Typography>

                {/* Price */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 800, color: '#1976d2' }}>
                    {getCurrentCurrency()} {getCurrentPrice().toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Base product price
                  </Typography>
                </Box>

                {/* Color Selection */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#374151' }}>
                    Color
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {product.colors.map((color) => (
                      <Avatar
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        sx={{
                          width: 40,
                          height: 40,
                          cursor: 'pointer',
                          border: selectedColor === color ? '3px solid #1976d2' : '2px solid #e5e7eb',
                          bgcolor: color.toLowerCase(),
                          '&:hover': { transform: 'scale(1.1)' },
                          transition: 'all 0.2s ease-in-out'
                        }}
                      >
                        {selectedColor === color && <CheckCircle sx={{ color: 'white', fontSize: 20 }} />}
                      </Avatar>
                    ))}
                  </Box>
                </Box>

                {/* Size Selection */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#374151' }}>
                    Size
                  </Typography>
                  <ToggleButtonGroup
                    value={selectedSize}
                    exclusive
                    onChange={(e, newSize) => newSize && setSelectedSize(newSize)}
                    sx={{ width: '100%' }}
                  >
                    {product.sizes.map((size) => (
                      <ToggleButton 
                        key={size} 
                        value={size}
                        sx={{ 
                          flex: 1,
                          border: '1px solid #e5e7eb',
                          '&.Mui-selected': {
                            backgroundColor: '#1976d2',
                            color: 'white',
                            '&:hover': { backgroundColor: '#1565c0' }
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
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#374151' }}>
                    Printing Technology
                  </Typography>
                  <ToggleButtonGroup
                    value={selectedTechnology}
                    exclusive
                    onChange={(e, newTech) => newTech && setSelectedTechnology(newTech)}
                    sx={{ width: '100%' }}
                  >
                    {product.technology.map((tech) => (
                      <ToggleButton 
                        key={tech} 
                        value={tech}
                        sx={{ 
                          flex: 1,
                          border: '1px solid #e5e7eb',
                          '&.Mui-selected': {
                            backgroundColor: '#1976d2',
                            color: 'white',
                            '&:hover': { backgroundColor: '#1565c0' }
                          }
                        }}
                      >
                        {tech}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Box>

                {/* Shipping Country */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#374151' }}>
                    Ships from
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="UAE">🇦🇪 UAE</MenuItem>
                      <MenuItem value="Egypt">🇪🇬 Egypt</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Shipping Info */}
                <Box sx={{ mb: 3, p: 2, backgroundColor: '#f8f9fa', borderRadius: 2, border: '1px solid #e5e7eb' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <LocalShipping sx={{ color: '#6b7280', fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      Shipping: {getCurrentCurrency()} {getShippingPrice().toFixed(2)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Ships in {product.shipping[selectedCountry as keyof typeof product.shipping]?.days} business days
                  </Typography>
                </Box>

                {/* Total Price */}
                <Box sx={{ mb: 3, p: 2, backgroundColor: '#f0f9ff', borderRadius: 2, border: '1px solid #0ea5e9' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#0c4a6e' }}>
                    Total: {getCurrentCurrency()} {(getCurrentPrice() + getShippingPrice()).toFixed(2)}
                  </Typography>
                </Box>

                {/* Action Buttons */}
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<Storefront />}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      py: 1.5,
                      backgroundColor: '#1976d2',
                      '&:hover': { backgroundColor: '#1565c0' }
                    }}
                  >
                    Add to Store
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    startIcon={<ShoppingCart />}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      py: 1.5,
                      borderColor: '#1976d2',
                      color: '#1976d2',
                      '&:hover': { borderColor: '#1565c0', backgroundColor: 'rgba(25, 118, 210, 0.04)' }
                    }}
                  >
                    Create Order
                  </Button>
                </Stack>

                {/* Fulfillment Info */}
                <Box sx={{ mt: 3, p: 2, backgroundColor: '#f0fdf4', borderRadius: 2, border: '1px solid #22c55e' }}>
                  <Typography variant="body2" sx={{ color: '#166534', fontWeight: 500 }}>
                    ✓ Ships in 8–12 business days
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#166534' }}>
                    ✓ Fulfilled in 14 countries
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Product Tabs */}
          <Box sx={{ mt: 8 }}>
            <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#f8f9fa' }}>
                <Tab label="Description" sx={{ fontWeight: 600 }} />
                <Tab label="Product Details" sx={{ fontWeight: 600 }} />
                <Tab label="Reviews" sx={{ fontWeight: 600 }} />
                <Tab label="Fulfillment" sx={{ fontWeight: 600 }} />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <Typography variant="body1" sx={{ lineHeight: 1.8, color: '#374151' }}>
                  {product.description}
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1f2937' }}>
                    Key Features
                  </Typography>
                  <Grid container spacing={2}>
                    {product.features.map((feature, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CheckCircle sx={{ color: '#22c55e', fontSize: 20 }} />
                          <Typography variant="body1" color="text.secondary">
                            {feature}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1f2937' }}>
                      Specifications
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #f3f4f6' }}>
                        <Typography variant="body2" color="text.secondary">Material</Typography>
                        <Typography variant="body2" fontWeight={500}>100% Premium Cotton</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #f3f4f6' }}>
                        <Typography variant="body2" color="text.secondary">Weight</Typography>
                        <Typography variant="body2" fontWeight={500}>180 GSM</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #f3f4f6' }}>
                        <Typography variant="body2" color="text.secondary">Fit</Typography>
                        <Typography variant="body2" fontWeight={500}>Regular Fit</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #f3f4f6' }}>
                        <Typography variant="body2" color="text.secondary">Sleeve</Typography>
                        <Typography variant="body2" fontWeight={500}>Short Sleeve</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1f2937' }}>
                      Available Options
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #f3f4f6' }}>
                        <Typography variant="body2" color="text.secondary">Colors</Typography>
                        <Typography variant="body2" fontWeight={500}>{product.colors.length} options</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #f3f4f6' }}>
                        <Typography variant="body2" color="text.secondary">Sizes</Typography>
                        <Typography variant="body2" fontWeight={500}>{product.sizes.length} options</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #f3f4f6' }}>
                        <Typography variant="body2" color="text.secondary">Technology</Typography>
                        <Typography variant="body2" fontWeight={500}>{product.technology.length} options</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Star sx={{ fontSize: 60, color: '#e5e7eb', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    No reviews yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Be the first to review this product
                  </Typography>
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={3}>
                <FulfillmentProvidersSection />
              </TabPanel>
            </Paper>
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
