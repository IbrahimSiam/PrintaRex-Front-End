import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Drawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Badge,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
  AppBar,
  Toolbar,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@mui/material';
import {
  CheckCircleOutlineRounded,
  PaymentRounded,
  StoreRounded,
  InsightsRounded,
  SearchRounded,
  CloseRounded,
  CompareArrowsRounded,
  Menu,
  Search,
  NotificationsNone,
  Settings,
  Store,
  Dashboard,
  Notifications,
  Inventory,
  ShoppingCart,
  Insights,
  ViewModule,
  LocalShipping,
  Brush,
  Storefront,
  Support,
  Home,
  ChevronLeft,
  ChevronRight,
  PushPin,
  PushPinOutlined
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Types
type ChannelKey = 'shopify' | 'amazon' | 'tiktok' | 'woocommerce' | 'wix';
type SetupLevel = 'Easy' | 'Medium' | 'Advanced';
type CostLevel = '$' | '$$' | '$$$';
type SubscriptionType = 'Yes' | 'No';
type BadgeType = 'Recommended' | 'New' | 'Popular' | 'Advanced' | 'Medium' | 'Easy';

interface Channel {
  key: ChannelKey;
  name: string;
  logo: string;
  badge?: BadgeType;
  blurb: string;
  highlights: string[];
  setup: SetupLevel;
  cost: CostLevel;
  subscription: SubscriptionType;
  learnMoreUrl: string;
  connectCta: string;
}

// Dataset
const CHANNELS: Channel[] = [
  {
    key: 'shopify',
    name: 'Shopify',
    logo: '/logos/shopify.svg',
    badge: 'Recommended',
    blurb: 'A complete ecommerce platform with themes, apps, payments and marketing tools.',
    highlights: ['Customizable themes', 'Built-in payments', 'Extensive app store'],
    setup: 'Easy',
    cost: '$$',
    subscription: 'Yes',
    learnMoreUrl: 'https://www.shopify.com',
    connectCta: 'Connect to Shopify'
  },
  {
    key: 'amazon',
    name: 'Amazon',
    logo: '/logos/amazon.svg',
    badge: 'Medium',
    blurb: 'Reach a massive global customer base with trusted fulfillment and advertising.',
    highlights: ['Very large audience', 'Ads & analytics', 'Prime-eligible potential'],
    setup: 'Medium',
    cost: '$$$',
    subscription: 'Yes',
    learnMoreUrl: 'https://sell.amazon.com',
    connectCta: 'Connect to Amazon'
  },
  {
    key: 'tiktok',
    name: 'TikTok Shop',
    logo: '/logos/tiktok.svg',
    badge: 'New',
    blurb: 'Turn discovery into purchases with shoppable videos and creator tools.',
    highlights: ['Young, engaged audience', 'Creator collaborations', 'Live shopping tools'],
    setup: 'Easy',
    cost: '$$',
    subscription: 'No',
    learnMoreUrl: 'https://www.tiktok.com/business/en/tiktok-shop',
    connectCta: 'Connect to TikTok'
  },
  {
    key: 'woocommerce',
    name: 'WooCommerce',
    logo: '/logos/woocommerce.svg',
    badge: 'Advanced',
    blurb: 'Powerful WordPress-based ecommerce with deep customization and control.',
    highlights: ['Open-source flexibility', 'Large extensions library', 'Own your data'],
    setup: 'Advanced',
    cost: '$$',
    subscription: 'No',
    learnMoreUrl: 'https://woocommerce.com',
    connectCta: 'Connect to WooCommerce'
  },
  {
    key: 'wix',
    name: 'Wix',
    logo: '/logos/wix.svg',
    badge: 'Easy',
    blurb: 'User-friendly website builder with modern storefronts and marketing tools.',
    highlights: ['Drag-and-drop builder', 'Professional templates', 'Affordable plans'],
    setup: 'Easy',
    cost: '$$',
    subscription: 'Yes',
    learnMoreUrl: 'https://www.wix.com/ecommerce',
    connectCta: 'Connect to Wix'
  }
];

// Components
interface ChannelCardProps {
  channel: Channel;
  onConnect: (key: ChannelKey) => void;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channel, onConnect }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getBadgeColor = (badge: BadgeType) => {
    switch (badge) {
      case 'Recommended': return 'success';
      case 'New': return 'primary';
      case 'Advanced': return 'warning';
      default: return 'default';
    }
  };

  const getSetupIcon = (setup: SetupLevel) => {
    switch (setup) {
      case 'Easy': return <CheckCircleOutlineRounded fontSize="small" />;
      case 'Medium': return <InsightsRounded fontSize="small" />;
      case 'Advanced': return <StoreRounded fontSize="small" />;
    }
  };

  const getCostColor = (cost: CostLevel) => {
    switch (cost) {
      case '$': return 'success.main';
      case '$$': return 'warning.main';
      case '$$$': return 'error.main';
    }
  };

  return (
    <Paper
      role="region"
      aria-labelledby={`chan-${channel.key}`}
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        p: 2.5,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-2px)'
        }
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box
            component="img"
            src={channel.logo}
            alt={`${channel.name} logo`}
            sx={{ width: 40, height: 40, objectFit: 'contain' }}
          />
          <Typography variant="h6" id={`chan-${channel.key}`} sx={{ flex: 1 }}>
            {channel.name}
          </Typography>
          {channel.badge && (
            <Chip
              label={channel.badge}
              size="small"
              color={getBadgeColor(channel.badge) as any}
              sx={{ fontSize: '0.75rem' }}
            />
          )}
        </Box>
      </Box>

      {/* Blurb */}
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary', lineHeight: 1.5 }}>
        {channel.blurb}
      </Typography>

      {/* Highlights */}
      <Box sx={{ mb: 2, flex: 1 }}>
        {channel.highlights.map((highlight, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <CheckCircleOutlineRounded 
              fontSize="small" 
              color="success" 
              sx={{ fontSize: '1rem' }}
            />
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              {highlight}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Meta Row */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        mb: 2,
        p: 1.5,
        backgroundColor: 'background.default',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {getSetupIcon(channel.setup)}
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {channel.setup}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <PaymentRounded fontSize="small" />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {channel.cost}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <StoreRounded fontSize="small" />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {channel.subscription}
          </Typography>
        </Box>
      </Box>

      {/* Actions */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        gap: 1
      }}>
        <Button
          variant="contained"
          fullWidth={isMobile}
          onClick={() => onConnect(channel.key)}
          aria-label={channel.connectCta}
          sx={{ 
            textTransform: 'none',
            fontWeight: 600,
            py: 1
          }}
        >
          {channel.connectCta}
        </Button>
        <Button
          variant="text"
          fullWidth={isMobile}
          href={channel.learnMoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ 
            textTransform: 'none',
            fontWeight: 500,
            py: 1
          }}
        >
          Learn more
        </Button>
      </Box>
    </Paper>
  );
};

interface SearchAndFiltersProps {
  query: string;
  setQuery: (query: string) => void;
  setupFilter: 'All' | SetupLevel;
  setSetupFilter: (filter: 'All' | SetupLevel) => void;
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({ 
  query, 
  setQuery, 
  setupFilter, 
  setSetupFilter 
}) => {
  const filters: ('All' | SetupLevel)[] = ['All', 'Easy', 'Medium', 'Advanced'];

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        alignItems: { xs: 'stretch', md: 'center' }
      }}>
        <TextField
          placeholder="Search sales channels..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            )
          }}
          sx={{ 
            flex: 1,
            maxWidth: { xs: '100%', md: 400 }
          }}
        />
        
        <Box sx={{ 
          display: 'flex', 
          gap: 1,
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}>
          {filters.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              onClick={() => setSetupFilter(filter)}
              variant={setupFilter === filter ? 'filled' : 'outlined'}
              color={setupFilter === filter ? 'primary' : 'default'}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

interface CompareDrawerProps {
  open: boolean;
  onClose: () => void;
  channels: Channel[];
}

const CompareDrawer: React.FC<CompareDrawerProps> = ({ open, onClose, channels }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Drawer
      anchor={isMobile ? 'bottom' : 'right'}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: isMobile ? '100%' : 600,
          height: isMobile ? '80vh' : '100%',
          borderTopLeftRadius: isMobile ? 3 : 0,
          borderTopRightRadius: isMobile ? 3 : 0
        }
      }}
    >
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 3
        }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Compare integrations
          </Typography>
          <IconButton onClick={onClose} size="large">
            <CloseRounded />
          </IconButton>
        </Box>

        {/* Table */}
        <TableContainer sx={{ flex: 1 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Platform</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Setup</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Cost</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Subscription</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Highlights</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {channels.map((channel) => (
                <TableRow key={channel.key}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        component="img"
                        src={channel.logo}
                        alt={`${channel.name} logo`}
                        sx={{ width: 24, height: 24, objectFit: 'contain' }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {channel.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={channel.setup} 
                      size="small" 
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {channel.cost}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={channel.subscription} 
                      size="small" 
                      color={channel.subscription === 'Yes' ? 'success' : 'default'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                      {channel.highlights.join(', ')}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Drawer>
  );
};

// Main Page
export default function SalesChannels() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [setupFilter, setSetupFilter] = useState<'All' | SetupLevel>('All');
  const [compareOpen, setCompareOpen] = useState(false);
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarPinned, setSidebarPinned] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
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
    { label: 'Stores', icon: <Storefront />, path: '/stores' },
    { label: 'Insights', icon: <Insights />, path: '/insights' },
    { label: 'Templates', icon: <ViewModule />, path: '/templates' },
    { label: 'Branded Packing', icon: <LocalShipping />, path: '/branded-packing' },
    { label: 'Personalization Studio', icon: <Brush />, path: '/studio' },
    { label: 'Customer Support', icon: <Support />, path: '/support' },
  ];

  // Filter channels
  const filteredChannels = useMemo(() => {
    return CHANNELS.filter(channel => {
      const matchesQuery = query === '' || 
        channel.name.toLowerCase().includes(query.toLowerCase()) ||
        channel.blurb.toLowerCase().includes(query.toLowerCase());
      
      const matchesFilter = setupFilter === 'All' || channel.setup === setupFilter;
      
      return matchesQuery && matchesFilter;
    });
  }, [query, setupFilter]);

  const handleConnect = (key: ChannelKey) => {
    console.log(`Connecting to ${key}`);
    // TODO: Implement actual connection logic
  };

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
          <ListItem 
            key={index} 
            button 
            onClick={() => navigate(item.path)}
            sx={{ 
              py: sidebarCollapsed ? 2 : 1.5, 
              px: sidebarCollapsed ? 2 : 3, 
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              backgroundColor: item.path === '/stores' ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
              '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' } 
            }}
          >
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
                placeholder="Search..." 
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

        {/* Page Content */}
        <Container maxWidth="lg" sx={{ mx: 'auto', px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ 
          fontWeight: 600, 
          mb: 1,
          color: 'text.primary'
        }}>
          Connect your store
        </Typography>
        <Typography variant="body1" sx={{ 
          color: 'text.secondary',
          maxWidth: 600
        }}>
          Choose from our supported sales channels and start selling your products online. 
          Each platform offers unique features to help grow your business.
        </Typography>
      </Box>

      {/* Search and Filters */}
      <SearchAndFilters
        query={query}
        setQuery={setQuery}
        setupFilter={setupFilter}
        setSetupFilter={setSetupFilter}
      />

      {/* Channels Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {filteredChannels.map((channel) => (
          <Grid item xs={12} md={6} lg={4} key={channel.key}>
            <ChannelCard 
              channel={channel} 
              onConnect={handleConnect}
            />
          </Grid>
        ))}
      </Grid>

      {/* Compare CTA */}
      {filteredChannels.length > 1 && (
        <Box sx={{ 
          textAlign: 'center',
          p: 4,
          backgroundColor: 'background.default',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider'
        }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Need help choosing?
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            Compare all available integrations side by side to find the perfect fit for your business.
          </Typography>
          <Button
            variant="outlined"
            size="large"
            startIcon={<CompareArrowsRounded />}
            onClick={() => setCompareOpen(true)}
            sx={{ 
              textTransform: 'none',
              fontWeight: 600,
              px: 4
            }}
          >
            Compare integrations ({filteredChannels.length})
          </Button>
        </Box>
      )}

      {/* Compare Drawer */}
      <CompareDrawer
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        channels={filteredChannels}
      />
        </Container>
      </Box>
    </Box>
  );
}
