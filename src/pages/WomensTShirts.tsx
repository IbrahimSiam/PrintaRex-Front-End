import React, { useState } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent, Button, Chip,
  useTheme, useMediaQuery, AppBar, Toolbar, IconButton, Breadcrumbs, Link,
  Avatar, TextField, InputAdornment, Badge, Drawer, List, ListItem,
  ListItemIcon, ListItemText, Divider, Fab, Tooltip
} from '@mui/material';
import {
  Menu, Search, NotificationsNone, Settings, Home, ChevronLeft,
  ChevronRight, PushPin, PushPinOutlined, FilterList, ArrowBack
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../stores/uiStore';

const WomensTShirts: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarPinned, setSidebarPinned] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Get UI store for currency and shipFrom
  const { shipFrom, setShipFrom, setCurrency } = useUIStore();

  // Sample Women's T-shirt products data
  const tshirtProducts = [
    {
      id: 1,
      name: 'Premium Women\'s T-Shirt',
      image: '/assets/img/tee.jpg',
      priceUSD: 54.25,
      priceAED: 199.09,
      priceEGP: 1708.88,
      description: 'Comfortable women\'s T-shirt for custom designs with premium cotton fabric.',
      colors: ['White', 'Black', 'Red', 'Pink'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      technology: ['DTG', 'Embroidery', 'Screen Printing'],
      inStock: true,
      tags: ['premium', 'comfortable', 'fashion']
    },
    {
      id: 2,
      name: 'Women\'s Fashion T-Shirt',
      image: '/assets/img/tee.jpg',
      priceUSD: 67.85,
      priceAED: 248.99,
      priceEGP: 2137.28,
      description: 'Stylish women\'s T-shirt with modern fit and trendy design options.',
      colors: ['White', 'Black', 'Yellow', 'Blue'],
      sizes: ['XS', 'S', 'M', 'L'],
      technology: ['DTG', 'Embroidery', 'Heat Transfer'],
      inStock: true,
      tags: ['fashion', 'stylish', 'modern']
    },
    {
      id: 3,
      name: 'Women\'s Athletic T-Shirt',
      image: '/assets/img/tee.jpg',
      priceUSD: 49.99,
      priceAED: 183.45,
      priceEGP: 1574.69,
      description: 'Performance T-shirt designed for active women with moisture-wicking technology.',
      colors: ['Black', 'Gray', 'Blue', 'Purple'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      technology: ['DTG', 'DTF', 'Heat Transfer'],
      inStock: true,
      tags: ['athletic', 'performance', 'active']
    },
    {
      id: 4,
      name: 'Women\'s Organic Cotton T-Shirt',
      image: '/assets/img/tee.jpg',
      priceUSD: 79.99,
      priceAED: 293.45,
      priceEGP: 2519.69,
      description: 'Eco-friendly T-shirt made from 100% organic cotton for conscious consumers.',
      colors: ['Natural', 'White', 'Black', 'Green'],
      sizes: ['XS', 'S', 'M', 'L'],
      technology: ['DTG', 'DTF'],
      inStock: true,
      tags: ['organic', 'eco-friendly', 'sustainable']
    },
    {
      id: 5,
      name: 'Women\'s Vintage Style T-Shirt',
      image: '/assets/img/tee.jpg',
      priceUSD: 59.99,
      priceAED: 220.05,
      priceEGP: 1889.69,
      description: 'Vintage-inspired T-shirt with a retro fit and distressed look for streetwear styles.',
      colors: ['Cream', 'Black', 'Olive', 'Burgundy'],
      sizes: ['XS', 'S', 'M', 'L'],
      technology: ['DTG', 'DTF', 'Screen Printing'],
      inStock: true,
      tags: ['vintage', 'retro', 'streetwear']
    },
    {
      id: 6,
      name: 'Women\'s Luxury Pima Cotton T-Shirt',
      image: '/assets/img/tee.jpg',
      priceUSD: 89.99,
      priceAED: 330.26,
      priceEGP: 2834.69,
      description: 'Ultra-soft Pima cotton T-shirt with a luxurious feel and premium quality.',
      colors: ['White', 'Black', 'Ivory', 'Navy'],
      sizes: ['XS', 'S', 'M', 'L'],
      technology: ['DTG', 'DTF', 'Embroidery'],
      inStock: true,
      tags: ['luxury', 'pima-cotton', 'premium']
    }
  ];

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
              <IconButton onClick={() => navigate('/app/catalog')} sx={{ mr: 1 }}><ArrowBack /></IconButton>
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
                placeholder="Search Women's T-shirts..." 
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
            <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>Women's T-Shirts</Typography>
          </Breadcrumbs>

          {/* Page Title */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '2.5rem' }, background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em', mb: 2 }}>
              Women's T-Shirts Collection
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, color: '#6b7280' }}>
              Discover our premium collection of customizable T-shirts designed for women
            </Typography>
          </Box>

          {/* Ships from Section */}
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 500, color: '#374151' }}>
              Ships from:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  border: '1px solid rgba(25, 118, 210, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.12)',
                    borderColor: 'rgba(25, 118, 210, 0.3)',
                  }
                }}
                onClick={() => {
                  setShipFrom('UAE');
                  setCurrency('AED');
                }}
              >
                <span style={{ fontSize: '1rem' }}>🇦🇪</span>
                <Typography
                  variant="body2"
                  sx={{
                    color: shipFrom === 'UAE' ? 'primary.main' : 'text.secondary',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                  }}
                >
                  UAE
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 400,
                  mx: 0.5,
                }}
              >
                •
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  border: '1px solid rgba(25, 118, 210, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.12)',
                    borderColor: 'rgba(25, 118, 210, 0.3)',
                  }
                }}
                onClick={() => {
                  setShipFrom('Egypt');
                  setCurrency('EGP');
                }}
              >
                <span style={{ fontSize: '1rem' }}>🇪🇬</span>
                <Typography
                  variant="body2"
                  sx={{
                    color: shipFrom === 'Egypt' ? 'primary.main' : 'text.secondary',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                  }}
                >
                  Egypt
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Products Grid */}
          <Grid container spacing={3}>
            {tshirtProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card
                  onClick={() => navigate(`/app/designer?productId=${product.id}`)}
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    border: '1px solid #f3f4f6',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.25)',
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <Box sx={{ height: 250, overflow: 'hidden' }}>
                    <img
                      src={product.image}
                      alt={`${product.name} - customizable women's T-shirt`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        console.error('Image failed to load:', e.currentTarget.src);
                        e.currentTarget.src = '/assets/img/tee.jpg';
                      }}
                    />
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 700, color: '#1f2937', fontSize: '1.25rem' }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 3, minHeight: '3rem', color: '#6b7280', lineHeight: 1.6 }}
                    >
                      {product.description}
                    </Typography>
                    
                    {/* Color swatches */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      {product.colors.slice(0, 4).map((color) => (
                        <Box
                          key={color}
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            bgcolor: color.toLowerCase(),
                            border: '2px solid #fff',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}
                        />
                      ))}
                    </Box>
                    
                    {/* Price */}
                    <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                      {shipFrom === 'UAE' 
                        ? `AED ${product.priceAED.toFixed(2)}` 
                        : `EGP ${product.priceEGP.toFixed(2)}`
                      }
                    </Typography>
                    
                    {/* Technology tags */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      {product.technology.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.75rem' }}
                        />
                      ))}
                    </Box>
                    
                    {/* Customize button */}
                    <Button 
                      variant="contained" 
                      fullWidth
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/app/designer?productId=${product.id}`);
                      }}
                      sx={{ 
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600
                      }}
                    >
                      Customize This T-Shirt
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* Floating Action Button for Sidebar Toggle when hidden */}
      {!sidebarOpen && !isMobile && (
        <Fab color="primary" size="small" onClick={handleSidebarToggle} sx={{ position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 1001 }}><Menu /></Fab>
      )}
    </Box>
  );
};

export default WomensTShirts;
