import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  TextField,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  Divider,
  AppBar,
  Toolbar,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Add,
  Edit,
  CheckCircle,
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
  PushPinOutlined,
  CloudUpload,
  ExpandMore
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Types
type ChannelStatus = 'active' | 'inactive' | 'draft';
type InsertTemplate = 'Thank-you' | 'Promo' | 'Care';
type LabelPlacement = 'Neck' | 'Box';
type LabelSize = 'Small' | 'Medium' | 'Large';

interface Channel {
  id: string;
  name: string;
  type: 'default' | 'store';
  status: {
    insert: ChannelStatus;
    label: ChannelStatus;
  };
}

interface InsertConfig {
  template: InsertTemplate;
  logoPath: string;
  backgroundColor: string;
  textColor: string;
  headline: string;
  bodyMessage: string;
  activateNow: boolean;
}

interface LabelConfig {
  markPath: string;
  placement: LabelPlacement;
  size: LabelSize;
  color: string;
  activateNow: boolean;
}

// Mock data
const CHANNELS: Channel[] = [
  {
    id: 'default',
    name: 'Default for all orders',
    type: 'default',
    status: { insert: 'inactive', label: 'inactive' }
  },
  {
    id: 'shopify',
    name: 'Just Your T-Shirt',
    type: 'store',
    status: { insert: 'draft', label: 'active' }
  }
];

const INSERT_TEMPLATES: InsertTemplate[] = ['Thank-you', 'Promo', 'Care'];
const LABEL_PLACEMENTS: LabelPlacement[] = ['Neck', 'Box'];
const LABEL_SIZES: LabelSize[] = ['Small', 'Medium', 'Large'];

// FAQ data
const FAQ_ITEMS = [
  {
    question: 'Do inserts and labels increase cost?',
    answer: 'Yes, branded packaging adds a small cost per order. Packing inserts start from AED 2.83 excl. VAT, while label costs vary by provider and quantity.'
  },
  {
    question: 'Are they available with all print providers?',
    answer: 'Packing inserts are available in 9 countries with select providers. Branded labels are available on specific garment types and products.'
  },
  {
    question: 'Can I enable them by store and by product type?',
    answer: 'Yes, you can configure branded packaging per sales channel and customize which product types receive inserts or labels.'
  },
  {
    question: 'What are the file requirements for labels?',
    answer: 'Labels accept SVG and PNG formats. We recommend high-resolution files (300 DPI) with transparent backgrounds for best results.'
  },
  {
    question: 'Where are packing inserts available?',
    answer: 'Packing inserts are currently available in 9 countries including UAE, Egypt, USA, UK, Germany, France, Canada, Australia, and Japan.'
  },
  {
    question: 'Can I bundle insert + label for a discount?',
    answer: 'Yes, activating both features for the same channel provides a 15% discount on the combined packaging costs.'
  }
];

export default function BrandedPackaging() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarPinned, setSidebarPinned] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Modal states
  const [insertModalOpen, setInsertModalOpen] = useState(false);
  const [labelModalOpen, setLabelModalOpen] = useState(false);
  const [editingChannel, setEditingChannel] = useState<string | null>(null);
  const [editingFeature, setEditingFeature] = useState<'insert' | 'label' | null>(null);
  
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  // Local channels state
  const [channels, setChannels] = useState<Channel[]>(CHANNELS);

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

  const handleActivateInsert = (channelId: string) => {
    setEditingChannel(channelId);
    setEditingFeature('insert');
    setInsertModalOpen(true);
  };

  const handleActivateLabel = (channelId: string) => {
    setEditingChannel(channelId);
    setEditingFeature('label');
    setLabelModalOpen(true);
  };

  const handleEditInsert = (channelId: string) => {
    setEditingChannel(channelId);
    setEditingFeature('insert');
    setInsertModalOpen(true);
  };

  const handleEditLabel = (channelId: string) => {
    setEditingChannel(channelId);
    setEditingFeature('label');
    setLabelModalOpen(true);
  };

  const handleSaveInsert = (config: InsertConfig) => {
    if (editingChannel) {
      setChannels(prev => prev.map(channel => 
        channel.id === editingChannel 
          ? { ...channel, status: { ...channel.status, insert: 'active' } }
          : channel
      ));
      
      const channelName = channels.find(c => c.id === editingChannel)?.name || 'Channel';
      setSnackbarMessage(`Packing insert activated for ${channelName}`);
      setSnackbarOpen(true);
    }
  };

  const handleSaveLabel = (config: LabelConfig) => {
    if (editingChannel) {
      setChannels(prev => prev.map(channel => 
        channel.id === editingChannel 
          ? { ...channel, status: { ...channel.status, label: 'active' } }
          : channel
      ));
      
      const channelName = channels.find(c => c.id === editingChannel)?.name || 'Channel';
      setSnackbarMessage(`Branded label activated for ${channelName}`);
      setSnackbarOpen(true);
    }
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
              backgroundColor: item.path === '/branded-packing' ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
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
                  startAdornment: <Search sx={{ color: 'text.secondary' }} />
                }} 
                sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#f8f9fa', borderRadius: 2 } }} 
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton sx={{ color: 'text.secondary' }}><NotificationsNone /></IconButton>
              <IconButton sx={{ color: 'text.secondary' }}><Settings /></IconButton>
              <Avatar sx={{ width: 36, height: 36, backgroundColor: '#1976d2', cursor: 'pointer' }}>U</Avatar>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Container maxWidth="lg" sx={{ mx: 'auto', px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 } }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
              Branded packaging
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mb: 2 }}>
              Delight customers with on-brand unboxing. Add inserts and labels to selected orders.
            </Typography>
            <Button
              variant="text"
              size="small"
              sx={{ textTransform: 'none', p: 0, minWidth: 'auto' }}
            >
              What's included?
            </Button>
          </Box>

          {/* Hero Tiles */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <Box sx={{ mb: 3 }}>
                  <Box
                    component="img"
                    src="/assets/img/tee.jpg"
                    alt="Packing inserts"
                    sx={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 2,
                      mb: 2
                    }}
                  />
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                    Packing inserts
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
                    From AED 2.83 excl. VAT
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Available for posters in 9 countries
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    {['Thank-you message', 'Promo code or QR', 'Care tips'].map((benefit, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CheckCircle fontSize="small" color="success" />
                        <Typography variant="body2">{benefit}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    setEditingChannel('default');
                    setEditingFeature('insert');
                    setInsertModalOpen(true);
                  }}
                  sx={{ mb: 2, textTransform: 'none', fontWeight: 600 }}
                >
                  Create insert
                </Button>
                
                <Button
                  variant="text"
                  fullWidth
                  sx={{ textTransform: 'none', justifyContent: 'flex-end' }}
                >
                  Read more
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <Box sx={{ mb: 3 }}>
                  <Box
                    component="img"
                    src="/assets/img/tee.jpg"
                    alt="Branded labels"
                    sx={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 2,
                      mb: 2
                    }}
                  />
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                    Branded labels
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
                    Varies by provider
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Available on select garments and products
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    {['Logo ready', 'Brand guidelines safe-area', 'High-res print'].map((benefit, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CheckCircle fontSize="small" color="success" />
                        <Typography variant="body2">{benefit}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    setEditingChannel('default');
                    setEditingFeature('label');
                    setLabelModalOpen(true);
                  }}
                  sx={{ mb: 2, textTransform: 'none', fontWeight: 600 }}
                >
                  Create label
                </Button>
                
                <Button
                  variant="text"
                  fullWidth
                  sx={{ textTransform: 'none', justifyContent: 'flex-end' }}
                >
                  Read more
                </Button>
              </Paper>
            </Grid>
          </Grid>

          {/* Activation Matrix */}
          <Box sx={{ mb: 6 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Configure per channel
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Sales channel</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Branded label</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Packing insert</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {channels.map((channel) => (
                      <TableRow key={channel.id}>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {channel.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start' }}>
                            <Chip 
                              label={channel.status.label.charAt(0).toUpperCase() + channel.status.label.slice(1)} 
                              color={channel.status.label === 'active' ? 'success' : channel.status.label === 'draft' ? 'warning' : 'default'} 
                              size="small" 
                            />
                            {channel.status.label === 'inactive' ? (
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<Add />}
                                onClick={() => handleActivateLabel(channel.id)}
                                sx={{ textTransform: 'none' }}
                              >
                                Activate
                              </Button>
                            ) : (
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<Edit />}
                                onClick={() => handleEditLabel(channel.id)}
                                sx={{ textTransform: 'none' }}
                              >
                                Edit
                              </Button>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start' }}>
                            <Chip 
                              label={channel.status.insert.charAt(0).toUpperCase() + channel.status.insert.slice(1)} 
                              color={channel.status.insert === 'active' ? 'success' : channel.status.insert === 'draft' ? 'warning' : 'default'} 
                              size="small" 
                            />
                            {channel.status.insert === 'inactive' ? (
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<Add />}
                                onClick={() => handleActivateInsert(channel.id)}
                                sx={{ textTransform: 'none' }}
                              >
                                Activate
                              </Button>
                            ) : (
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<Edit />}
                                onClick={() => handleEditInsert(channel.id)}
                                sx={{ textTransform: 'none' }}
                              >
                                Edit
                              </Button>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>

          {/* FAQ Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Frequently asked questions
            </Typography>
            {FAQ_ITEMS.map((item, index) => (
              <Accordion key={index} sx={{ mb: 1, '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Modals */}
      <Dialog open={insertModalOpen} onClose={() => setInsertModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create packing insert</DialogTitle>
        <DialogContent>
          <Typography>Insert configuration modal content will go here</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInsertModalOpen(false)}>Cancel</Button>
          <Button onClick={() => {
            handleSaveInsert({
              template: 'Thank-you',
              logoPath: '',
              backgroundColor: '#ffffff',
              textColor: '#000000',
              headline: 'Thank you!',
              bodyMessage: 'We appreciate your business',
              activateNow: true
            });
          }} variant="contained">
            Save & activate
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={labelModalOpen} onClose={() => setLabelModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create branded label</DialogTitle>
        <DialogContent>
          <Typography>Label configuration modal content will go here</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLabelModalOpen(false)}>Cancel</Button>
          <Button onClick={() => {
            handleSaveLabel({
              markPath: '',
              placement: 'Neck',
              size: 'Medium',
              color: '#000000',
              activateNow: true
            });
          }} variant="contained">
            Save & activate
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
