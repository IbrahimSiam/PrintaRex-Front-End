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

const WomensFashionTShirt: React.FC = () => {
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
    id: 2,
    name: 'Women\'s Fashion T-Shirt',
    code: 'WF-TS-001',
    image: '/assets/img/tee.jpg',
    images: [
      '/assets/img/tee.jpg',
      '/assets/img/tee.jpg',
      '/assets/img/tee.jpg',
      '/assets/img/tee.jpg'
    ],
    priceUSD: 29.99,
    priceAED: 110.05,
    priceEGP: 945.19,
    description: 'Trendy fashion T-shirt with modern styling and comfortable fit. Perfect for fashion-forward individuals who want to make a statement.',
    colors: ['White', 'Black', 'Rose', 'Mint'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    technology: ['DTG', 'DTF'],
    inStock: true,
    tags: ['fashion', 'trendy', 'modern'],
    features: [
      'Premium Cotton Blend', 'Modern fit', 'Trendy styling',
      'Easy to customize', 'Multiple color options', 'Fashion-forward design'
    ],
    shipping: { UAE: { price: 15.00, currency: 'AED', days: '3-5' }, Egypt: { price: 25.00, currency: 'EGP', days: '5-8' } }
  };

  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarPin = () => setSidebarPinned(!sidebarPinned);
  const handleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => setTabValue(newValue);

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

  const currentPrice = getCurrentPrice();
  const shippingInfo = product.shipping[shipFrom as keyof typeof product.shipping];

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
            boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {!sidebarCollapsed && (
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              PrintaRex
            </Typography>
          )}
          <IconButton onClick={handleSidebarCollapse} size="small">
            {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Box>
        <Divider />
        <List>
          {[
            { text: 'Dashboard', icon: <Home />, path: '/app' },
            { text: 'Catalog', icon: <Storefront />, path: '/app/catalog' },
            { text: 'Designer', icon: <Settings />, path: '/app/designer' },
            { text: 'Orders', icon: <ShoppingCart />, path: '/app/orders' },
          ].map((item) => (
            <ListItem
              key={item.text}
              button
              onClick={() => navigate(item.path)}
              sx={{
                minHeight: 48,
                justifyContent: sidebarCollapsed ? 'center' : 'initial',
                px: 2.5,
                '&:hover': { bgcolor: '#f5f5f5' },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: sidebarCollapsed ? 0 : 3,
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!sidebarCollapsed && <ListItemText primary={item.text} />}
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
              onClick={handleSidebarToggle}
              sx={{ mr: 2, color: '#333' }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, color: '#333' }}>
              Product Details
            </Typography>
            <IconButton color="inherit" sx={{ color: '#333' }}>
              <Search />
            </IconButton>
            <IconButton color="inherit" sx={{ color: '#333' }}>
              <NotificationsNone />
            </IconButton>
            <IconButton color="inherit" sx={{ color: '#333' }}>
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
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          <Grid container spacing={4}>
            {/* Left - Image Gallery */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: 20 }}>
                <Box sx={{ mb: 2 }}>
                  <img
                    src={mainImage}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                  />
                </Box>
                <Grid container spacing={1}>
                  {product.images.map((image, index) => (
                    <Grid item xs={3} key={index}>
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        onClick={() => setMainImage(image)}
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          border: mainImage === image ? '2px solid #1976d2' : '2px solid transparent',
                          transition: 'all 0.2s ease'
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* Center - Product Info */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: 20 }}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                  {product.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Product Code: {product.code}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                  {product.description}
                </Typography>

                {/* Features */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Features
                  </Typography>
                  <Grid container spacing={1}>
                    {product.features.map((feature, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <CheckCircle sx={{ color: '#4caf50', mr: 1, fontSize: 20 }} />
                          <Typography variant="body2">{feature}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* Tags */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Tags
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {product.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Right - Product Options & Actions */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: 20 }}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: '16px' }}>
                  {/* Pricing */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                      {currentPrice.currency} {currentPrice.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Base Price
                    </Typography>
                  </Box>

                  {/* Color Selection */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
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
                            color: ['white', 'yellow', 'rose', 'mint'].includes(color.toLowerCase()) ? '#333' : '#fff',
                            '&:hover': { transform: 'scale(1.1)' },
                            transition: 'all 0.2s ease'
                          }}
                          onClick={() => setSelectedColor(color)}
                        >
                          {color.charAt(0)}
                        </Avatar>
                      ))}
                    </Box>
                  </Box>

                  {/* Size Selection */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Size
                    </Typography>
                    <ToggleButtonGroup
                      value={selectedSize}
                      exclusive
                      onChange={(e, newSize) => newSize && setSelectedSize(newSize)}
                      sx={{ width: '100%' }}
                    >
                      {product.sizes.map((size) => (
                        <ToggleButton key={size} value={size} sx={{ flex: 1 }}>
                          {size}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Box>

                  {/* Technology Selection */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Technology
                    </Typography>
                    <ToggleButtonGroup
                      value={selectedTechnology}
                      exclusive
                      onChange={(e, newTech) => newTech && setSelectedTechnology(newTech)}
                      sx={{ width: '100%' }}
                    >
                      {product.technology.map((tech) => (
                        <ToggleButton key={tech} value={tech} sx={{ flex: 1 }}>
                          {tech}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Box>

                  {/* Shipping */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Shipping
                    </Typography>
                    <FormControl fullWidth>
                      <InputLabel>Ship From</InputLabel>
                      <Select
                        value={shipFrom}
                        label="Ship From"
                        onChange={(e) => setShipFrom(e.target.value as 'Egypt' | 'UAE')}
                      >
                        <MenuItem value="UAE">UAE</MenuItem>
                        <MenuItem value="Egypt">Egypt</MenuItem>
                      </Select>
                    </FormControl>
                    {shippingInfo && (
                      <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: '8px' }}>
                        <Typography variant="body2">
                          <strong>Shipping:</strong> {shippingInfo.currency} {shippingInfo.price.toFixed(2)}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Delivery:</strong> {shippingInfo.days} business days
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* Actions */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Storefront />}
                      sx={{
                        py: 1.5,
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 'bold'
                      }}
                    >
                      Add to Store
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<ShoppingCart />}
                      sx={{
                        py: 1.5,
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 'bold'
                      }}
                    >
                      Create Order
                    </Button>
                  </Box>
                </Paper>

                {/* Fulfillment Info */}
                <Paper elevation={2} sx={{ p: 2, mt: 2, borderRadius: '12px', bgcolor: '#e3f2fd' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocalShipping sx={{ color: '#1976d2', mr: 1 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                      Fulfillment Info
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Ships in 8–12 business days, fulfilled in 14 countries
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>

          {/* Tabs Section */}
          <Box sx={{ mt: 6 }}>
            <Paper elevation={2} sx={{ borderRadius: '16px' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="product tabs">
                  <Tab label="Description" />
                  <Tab label="Product Details" />
                  <Tab label="Reviews" />
                </Tabs>
              </Box>
              <TabPanel value={tabValue} index={0}>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  {product.description}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.8 }}>
                  This trendy fashion T-shirt is designed for the modern woman who wants to express her unique style. 
                  The contemporary fit and premium cotton blend fabric provide both comfort and sophistication. 
                  Perfect for casual outings, social events, or everyday wear, this T-shirt offers endless styling possibilities.
                </Typography>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Material & Care
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Fabric:</strong> Premium Cotton Blend
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Weight:</strong> 160 GSM
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Care:</strong> Machine wash cold, tumble dry low
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Sizing & Fit
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Fit:</strong> Modern/Contemporary
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Length:</strong> Standard
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Available Sizes:</strong> XS, S, M, L, XL
                    </Typography>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Star sx={{ fontSize: 60, color: '#ffd700', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    No Reviews Yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Be the first to review this product!
                  </Typography>
                </Box>
              </TabPanel>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Back to Top FAB */}
      <Fab
        color="primary"
        aria-label="back to top"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: 'none',
          '@media (min-width: 600px)': {
            display: 'flex'
          }
        }}
      >
        <ArrowBack />
      </Fab>
    </Box>
  );
};

export default WomensFashionTShirt;
