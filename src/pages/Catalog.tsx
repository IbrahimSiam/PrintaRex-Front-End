import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Grid, Tabs, Tab, IconButton, Drawer,
  useTheme, useMediaQuery, AppBar, Toolbar, Button, Fab, Breadcrumbs, Link, Chip, Alert, Avatar,
  Card, CardContent, TextField, InputAdornment,
  List, ListItem, ListItemIcon, ListItemText, Divider, Badge, Tooltip,
} from '@mui/material';
import { 
  FilterList, Menu, Search, NotificationsNone, Settings, 
  Store, Dashboard, Notifications, Inventory, ShoppingCart, Insights,
  ViewModule, LocalShipping, Brush, Storefront, Support, Home,
  ChevronLeft, ChevronRight, PushPin, PushPinOutlined
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCatalogStore } from '../stores/catalogStore';
import { useUIStore } from '../stores/uiStore';
import { formatCurrency, getCurrencySymbol } from '../utils/currency';

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
      id={`catalog-tabpanel-${index}`}
      aria-labelledby={`catalog-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `catalog-tab-${index}`,
    'aria-controls': `catalog-tabpanel-${index}`,
  };
}

const Catalog: React.FC = () => {
  console.log('Catalog component rendering...');
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarPinned, setSidebarPinned] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Get UI store for currency and shipFrom
  const { shipFrom, setShipFrom, setCurrency } = useUIStore();
  
  // Try to access the store with error handling
  let catalogStoreData = null;
  try {
    catalogStoreData = useCatalogStore();
    console.log('Catalog store data loaded successfully');
  } catch (error) {
    console.error('Error accessing catalog store:', error);
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom color="error">
          Store Error
        </Typography>
        <Typography variant="body1">
          There was an error loading the catalog store. Please refresh the page.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Refresh Page
        </Button>
      </Box>
    );
  }
  
  const {
    selectedTab, filtersPanelOpen, isLoading, filteredProducts,
    setSelectedTab, toggleFiltersPanel, setFiltersPanelOpen,
  } = catalogStoreData;

  // Get category from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    if (category === 'hoodies') {
      setSelectedTab('hoodies');
    } else if (category === 'tshirts') {
      setSelectedTab('tshirts');
    }
  }, [searchParams, setSelectedTab]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    const newTab = newValue === 0 ? 'tshirts' : 'hoodies';
    setSelectedTab(newTab);
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
    { label: 'My New Store', icon: <Store />, path: '/store' },
    { label: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { label: 'Notifications', icon: <Notifications />, path: '/notifications' },
    { label: 'My Products', icon: <Inventory />, path: '/products' },
    { label: 'Orders', icon: <ShoppingCart />, path: '/orders' },
    { label: 'Insights', icon: <Insights />, path: '/insights' },
    { label: 'Templates', icon: <ViewModule />, path: '/templates' },
    { label: 'Branded Packing', icon: <LocalShipping />, path: '/branded-packing' },
    { label: 'Personalization Studio', icon: <Brush />, path: '/studio' },
    { label: 'Stores', icon: <Storefront />, path: '/stores' },
    { label: 'Customer Support', icon: <Support />, path: '/support' },
  ];

  const getActiveFiltersCount = () => {
    try {
      const { filters } = useCatalogStore.getState();
      let count = 0;
      if (filters.searchQuery) count++;
      if (filters.selectedSizes.length > 0) count++;
      if (filters.selectedColors.length > 0) count++;
      if (filters.selectedGender) count++;
      if (filters.selectedTechnology.length > 0) count++;
      if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200) count++;
      return count;
    } catch (error) {
      console.error('Error getting filter count:', error);
      return 0;
    }
  };

  const activeFiltersCount = getActiveFiltersCount();

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

  const renderProducts = () => {
    if (isLoading) {
      return (
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Box sx={{ height: 200, bgcolor: '#f0f0f0', borderRadius: 1, mb: 2 }} />
                <Box sx={{ height: 20, bgcolor: '#f0f0f0', borderRadius: 1, mb: 1 }} />
                <Box sx={{ height: 16, bgcolor: '#f0f0f0', borderRadius: 1, width: '60%' }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      );
    }

    if (!filteredProducts || filteredProducts.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Try adjusting your filters or search terms
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              try {
                useCatalogStore.getState().resetFilters();
              } catch (error) {
                console.error('Error resetting filters:', error);
              }
            }}
            sx={{ borderRadius: 2 }}
          >
            Clear All Filters
          </Button>
        </Box>
      );
    }

    return (
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
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
                  src={product.image || '/assets/img/tee.jpg'}
                  alt={`${product.name} - customizable product`}
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
                
                {/* Color Swatches */}
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  {product.colors.slice(0, 3).map((color) => (
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
                
                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                  {shipFrom === 'UAE' ? `AED ${product.priceAED || product.priceUSD * 3.67}` : `EGP ${product.priceEGP || product.priceUSD * 31.5}`}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    variant="contained" 
                    size="small" 
                    onClick={() => navigate(`/app/designer?productId=${product.id}`)}
                    sx={{ flex: 1 }}
                  >
                    Customize
                  </Button>
                  <Button variant="outlined" size="small">
                    Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
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
          </Breadcrumbs>

          {/* Page Title and Results */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '2.5rem' }, background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.025em' }}>
              Product Catalog
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {activeFiltersCount > 0 && (
                <Chip
                  label={`${activeFiltersCount} active filters`}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 2, backgroundColor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                <Typography variant="body1" color="#374151" sx={{ fontWeight: 600 }}>
                  {filteredProducts?.length || 0} products found
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Ships from Section */}
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 500, color: '#374151' }}>
              Ships from:
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 400 }}>
              (Currency: {shipFrom === 'UAE' ? 'AED' : 'EGP'})
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



          {/* Category Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
            <Tabs
              value={selectedTab === 'tshirts' ? 0 : 1}
              onChange={handleTabChange}
              aria-label="Product categories"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  py: 2,
                  px: 3,
                  minHeight: 'auto',
                },
                '& .Mui-selected': {
                  color: 'primary.main',
                },
              }}
            >
              <Tab label="T-Shirts" {...a11yProps(0)} />
              <Tab label="Hoodies" {...a11yProps(1)} />
            </Tabs>
          </Box>

          {/* Active Filters Alert */}
          {activeFiltersCount > 0 && (
            <Alert
              severity="info"
              sx={{ mb: 3 }}
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => {
                    try {
                      useCatalogStore.getState().resetFilters();
                    } catch (error) {
                      console.error('Error resetting filters:', error);
                    }
                  }}
                >
                  Clear All
                </Button>
              }
            >
              {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied
            </Alert>
          )}

          {/* Products Grid */}
          <TabPanel value={selectedTab === 'tshirts' ? 0 : 1} index={selectedTab === 'tshirts' ? 0 : 1}>
            {renderProducts()}
          </TabPanel>
        </Container>
      </Box>
      
      {/* Desktop Filters Panel */}
      {!isMobile && (
        <Box sx={{ width: 300, borderLeft: '1px solid #e5e7eb', p: 3, backgroundColor: 'white' }}>
          <Typography variant="h6" gutterBottom>Filters</Typography>
          <Typography variant="body2" color="text.secondary">
            Filter panel coming soon...
          </Typography>
        </Box>
      )}

      {/* Mobile Filters Drawer */}
      <Drawer
        anchor="right"
        open={filtersPanelOpen && isMobile}
        onClose={() => setFiltersPanelOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: '100%',
            maxWidth: 400,
            backgroundColor: 'white',
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Filters</Typography>
          <Typography variant="body2" color="text.secondary">
            Filter panel coming soon...
          </Typography>
        </Box>
      </Drawer>

      {/* Floating Action Button for Filters on Mobile */}
      {isMobile && (
        <Fab
          color="primary"
          size="large"
          onClick={toggleFiltersPanel}
          sx={{
            position: 'fixed',
            right: 16,
            bottom: 16,
            zIndex: 1000,
          }}
        >
          <FilterList />
        </Fab>
      )}

      {/* Desktop Filters Toggle Button */}
      {!isMobile && (
        <Fab
          color="primary"
          size="medium"
          onClick={toggleFiltersPanel}
          sx={{
            position: 'fixed',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1000,
          }}
        >
          <FilterList />
        </Fab>
      )}

      {/* Floating Action Button for Sidebar Toggle when hidden */}
      {!sidebarOpen && !isMobile && (
        <Fab color="primary" size="small" onClick={handleSidebarToggle} sx={{ position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 1001 }}><Menu /></Fab>
      )}
    </Box>
  );
};

export default Catalog;
