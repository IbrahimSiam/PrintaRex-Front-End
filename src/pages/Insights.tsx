import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
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
  IconButton as MuiIconButton,
  Tooltip,
  Badge,
  LinearProgress,
  Stack
} from '@mui/material';
import {
  TrendingUp,
  ShoppingCart,
  AttachMoney,
  Store,
  Public,
  FilterList,
  Search,
  Menu,
  NotificationsNone,
  Settings,
  Store as StoreIcon,
  Dashboard,
  Notifications,
  Inventory,
  ShoppingCart as CartIcon,
  Insights as InsightsIcon,
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
  ExpandMore,
  CalendarToday,
  LocationOn,
  Category,
  Inventory2,
  BarChart,
  PieChart,
  ShowChart,
  Flag,
  Star,
  TrendingDown,
  Warning,
  CheckCircle,
  Error
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Types
interface KPI {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  orders: number;
  revenue: number;
  cost: number;
  profit: number;
  rating: number;
  status: 'active' | 'inactive' | 'draft';
}

interface OrderData {
  date: string;
  orders: number;
  revenue: number;
}

interface CategoryData {
  name: string;
  orders: number;
  revenue: number;
  percentage: number;
}

interface CountryData {
  country: string;
  flag: string;
  orders: number;
  revenue: number;
  percentage: number;
}

// Mock data
const KPI_DATA: KPI[] = [
  {
    title: 'Total Orders',
    value: '2,847',
    change: '+12.5%',
    changeType: 'positive',
    icon: <ShoppingCart />,
    color: '#1976d2'
  },
  {
    title: 'Sold Products',
    value: '15,234',
    change: '+8.3%',
    changeType: 'positive',
    icon: <Inventory2 />,
    color: '#2e7d32'
  },
  {
    title: 'Total Revenue',
    value: '$45,678',
    change: '+15.2%',
    changeType: 'positive',
    icon: <AttachMoney />,
    color: '#ed6c02'
  },
  {
    title: 'Total Cost',
    value: '$23,456',
    change: '+5.8%',
    changeType: 'negative',
    icon: <TrendingDown />,
    color: '#d32f2f'
  },
  {
    title: 'Active Stores',
    value: '8',
    change: '+1',
    changeType: 'positive',
    icon: <Store />,
    color: '#7b1fa2'
  },
  {
    title: 'Top Countries',
    value: '12',
    change: '+2',
    changeType: 'positive',
    icon: <Public />,
    color: '#1565c0'
  }
];

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic T-Shirt',
    category: 'Apparel',
    image: '/assets/img/tee.jpg',
    orders: 1250,
    revenue: 18750,
    cost: 8750,
    profit: 10000,
    rating: 4.8,
    status: 'active'
  },
  {
    id: '2',
    name: 'Hoodie',
    category: 'Apparel',
    image: '/assets/img/hoodie.jpg',
    orders: 890,
    revenue: 26700,
    cost: 13350,
    profit: 13350,
    rating: 4.6,
    status: 'active'
  },
  {
    id: '3',
    name: 'Poster Print',
    category: 'Print',
    image: '/assets/img/tee.jpg',
    orders: 567,
    revenue: 2835,
    cost: 1134,
    profit: 1701,
    rating: 4.9,
    status: 'active'
  }
];

const ORDER_DATA: OrderData[] = [
  { date: 'Jan', orders: 120, revenue: 1800 },
  { date: 'Feb', orders: 150, revenue: 2250 },
  { date: 'Mar', orders: 180, revenue: 2700 },
  { date: 'Apr', orders: 200, revenue: 3000 },
  { date: 'May', orders: 250, revenue: 3750 },
  { date: 'Jun', orders: 300, revenue: 4500 }
];

const CATEGORY_DATA: CategoryData[] = [
  { name: 'Apparel', orders: 2140, revenue: 45450, percentage: 65 },
  { name: 'Print', orders: 567, revenue: 2835, percentage: 20 },
  { name: 'Accessories', orders: 140, revenue: 2100, percentage: 15 }
];

// Flag component that works across all browsers
const FlagIcon = ({ countryCode }: { countryCode: string }): React.ReactElement => {
  const getFlagPattern = (code: string): React.ReactElement => {
    switch (code) {
      case 'US':
        return (
          <Box sx={{ position: 'relative', width: 24, height: 16, backgroundColor: '#FFFFFF' }}>
            {/* Red stripes - 13 total stripes */}
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1.2, backgroundColor: '#B22234' }} />
            <Box sx={{ position: 'absolute', top: 2.4, left: 0, right: 0, height: 1.2, backgroundColor: '#B22234' }} />
            <Box sx={{ position: 'absolute', top: 4.8, left: 0, right: 0, height: 1.2, backgroundColor: '#B22234' }} />
            <Box sx={{ position: 'absolute', top: 7.2, left: 0, right: 0, height: 1.2, backgroundColor: '#B22234' }} />
            <Box sx={{ position: 'absolute', top: 9.6, left: 0, right: 0, height: 1.2, backgroundColor: '#B22234' }} />
            <Box sx={{ position: 'absolute', top: 12, left: 0, right: 0, height: 1.2, backgroundColor: '#B22234' }} />
            <Box sx={{ position: 'absolute', top: 14.4, left: 0, right: 0, height: 1.2, backgroundColor: '#B22234' }} />
            {/* Blue canton */}
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: 9.6, height: 8.4, backgroundColor: '#3C3B6E' }} />
            {/* White stars - 5-pointed star pattern */}
            <Box sx={{ position: 'absolute', top: 0.8, left: 0.8, width: 1.2, height: 1.2, color: 'white', fontSize: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ★
            </Box>
            <Box sx={{ position: 'absolute', top: 0.8, left: 2.4, width: 1.2, height: 1.2, color: 'white', fontSize: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ★
            </Box>
            <Box sx={{ position: 'absolute', top: 0.8, left: 4, width: 1.2, height: 1.2, color: 'white', fontSize: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ★
            </Box>
            <Box sx={{ position: 'absolute', top: 0.8, left: 5.6, width: 1.2, height: 1.2, color: 'white', fontSize: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ★
            </Box>
            <Box sx={{ position: 'absolute', top: 0.8, left: 7.2, width: 1.2, height: 1.2, color: 'white', fontSize: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ★
            </Box>
            <Box sx={{ position: 'absolute', top: 2.4, left: 1.6, width: 1.2, height: 1.2, color: 'white', fontSize: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ★
            </Box>
            <Box sx={{ position: 'absolute', top: 2.4, left: 3.2, width: 1.2, height: 1.2, color: 'white', fontSize: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ★
            </Box>
            <Box sx={{ position: 'absolute', top: 2.4, left: 4.8, width: 1.2, height: 1.2, color: 'white', fontSize: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ★
            </Box>
            <Box sx={{ position: 'absolute', top: 2.4, left: 6.4, width: 1.2, height: 1.2, color: 'white', fontSize: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ★
            </Box>
            <Box sx={{ position: 'absolute', top: 4, left: 0.8, width: 1.2, height: 1.2, color: 'white', fontSize: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ★
            </Box>
            <Box sx={{ position: 'absolute', top: 4, left: 2.4, width: 1.2, height: 1.2, color: 'white', fontSize: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ★
            </Box>
            <Box sx={{ position: 'absolute', top: 4, left: 4, width: 1.2, height: 1.2, color: 'white', fontSize: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ★
            </Box>
            <Box sx={{ position: 'absolute', top: 4, left: 5.6, width: 1.2, height: 1.2, color: 'white', fontSize: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ★
            </Box>
            <Box sx={{ position: 'absolute', top: 4, left: 7.2, width: 1.2, height: 1.2, color: 'white', fontSize: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ★
            </Box>
          </Box>
        );
      case 'GB':
        return (
          <Box sx={{ position: 'relative', width: 24, height: 16, backgroundColor: '#012169' }}>
            {/* White cross of St. Andrew */}
            <Box sx={{ position: 'absolute', top: 6.4, left: 0, right: 0, height: 3.2, backgroundColor: 'white' }} />
            <Box sx={{ position: 'absolute', top: 0, left: 9.6, bottom: 0, width: 4.8, backgroundColor: 'white' }} />
            {/* Red cross of St. George */}
            <Box sx={{ position: 'absolute', top: 7.2, left: 0, right: 0, height: 1.6, backgroundColor: '#C8102E' }} />
            <Box sx={{ position: 'absolute', top: 0, left: 10.4, bottom: 0, width: 3.2, backgroundColor: '#C8102E' }} />
            {/* Red cross of St. Patrick (diagonal) */}
            <Box sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%',
              background: 'linear-gradient(45deg, transparent 45%, #C8102E 45%, #C8102E 55%, transparent 55%)'
            }} />
            <Box sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%',
              background: 'linear-gradient(-45deg, transparent 45%, #C8102E 45%, #C8102E 55%, transparent 55%)'
            }} />
          </Box>
        );
      case 'DE':
        return (
          <Box sx={{ width: 24, height: 16 }}>
            <Box sx={{ height: 5.33, backgroundColor: '#000000' }} />
            <Box sx={{ height: 5.33, backgroundColor: '#DD0000' }} />
            <Box sx={{ height: 5.34, backgroundColor: '#FFCE00' }} />
          </Box>
        );
      case 'CA':
        return (
          <Box sx={{ position: 'relative', width: 24, height: 16, backgroundColor: '#FF0000' }}>
            {/* White center stripe */}
            <Box sx={{ position: 'absolute', top: 2, left: 6, right: 6, bottom: 2, backgroundColor: 'white' }} />
            {/* Red maple leaf - more detailed */}
            <Box sx={{ 
              position: 'absolute', 
              top: 3, 
              left: 8, 
              width: 8, 
              height: 10, 
              color: '#FF0000', 
              fontSize: '10px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              🍁
            </Box>
          </Box>
        );
      default:
        return (
          <Box sx={{ 
            width: 24, 
            height: 16, 
            backgroundColor: '#666666', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: 'white', 
            fontSize: '8px', 
            fontWeight: 'bold',
            borderRadius: 1
          }}>
            {countryCode}
          </Box>
        );
    }
  };

  return getFlagPattern(countryCode);
};

const COUNTRY_DATA: CountryData[] = [
  { country: 'United States', flag: 'US', orders: 1200, revenue: 18000, percentage: 40 },
  { country: 'United Kingdom', flag: 'GB', orders: 800, revenue: 12000, percentage: 25 },
  { country: 'Germany', flag: 'DE', orders: 600, revenue: 9000, percentage: 20 },
  { country: 'Canada', flag: 'CA', orders: 400, revenue: 6000, percentage: 15 }
];

// Filter options
const TIME_RANGES = ['Last 7 days', 'Last 30 days', 'Last 3 months', 'Last 6 months', 'Last year'];
const STORES = ['All Stores', 'Just Your T-Shirt', 'Fashion Hub', 'Print Studio'];
const COUNTRIES = ['All Countries', 'United States', 'United Kingdom', 'Germany', 'Canada'];
const CATEGORIES = ['All Categories', 'Apparel', 'Print', 'Accessories'];
const PRODUCTS_LIST = ['All Products', 'Classic T-Shirt', 'Hoodie', 'Poster Print'];

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
      id={`insights-tabpanel-${index}`}
      aria-labelledby={`insights-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `insights-tab-${index}`,
    'aria-controls': `insights-tabpanel-${index}`,
  };
}

export default function Insights() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarPinned, setSidebarPinned] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Tab state
  const [tabValue, setTabValue] = useState(0);
  
  // Filter states
  const [timeRange, setTimeRange] = useState('Last 30 days');
  const [selectedStore, setSelectedStore] = useState('All Stores');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedProduct, setSelectedProduct] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarPin = () => setSidebarPinned(!sidebarPinned);
  const handleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed);
  
  const getSidebarWidth = () => {
    if (sidebarCollapsed) return 64;
    if (sidebarOpen) return 280;
    return 0;
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const sidebarItems = [
    { label: 'My New Store', icon: <StoreIcon />, path: '/store' },
    { label: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { label: 'Notifications', icon: <Notifications />, path: '/notifications' },
    { label: 'My Products', icon: <Inventory />, path: '/products' },
    { label: 'Orders', icon: <CartIcon />, path: '/orders' },
    { label: 'Stores', icon: <Storefront />, path: '/stores' },
    { label: 'Insights', icon: <InsightsIcon />, path: '/insights' },
    { label: 'Templates', icon: <ViewModule />, path: '/templates' },
    { label: 'Branded Packing', icon: <LocalShipping />, path: '/branded-packing' },
    { label: 'Personalization Studio', icon: <Brush />, path: '/studio' },
    { label: 'Customer Support', icon: <Support />, path: '/support' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
      const matchesProduct = selectedProduct === 'All Products' || product.name === selectedProduct;
      
      return matchesSearch && matchesCategory && matchesProduct;
    });
  }, [searchQuery, selectedCategory, selectedProduct]);

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
            <MuiIconButton size="small" onClick={handleSidebarPin} sx={{ color: sidebarPinned ? 'primary.main' : 'text.secondary' }}>
              {sidebarPinned ? <PushPin fontSize="small" /> : <PushPinOutlined fontSize="small" />}
            </MuiIconButton>
          </Tooltip>
          {!sidebarCollapsed && (
            <Tooltip title="Collapse sidebar">
              <MuiIconButton size="small" onClick={handleSidebarCollapse}><ChevronLeft fontSize="small" /></MuiIconButton>
            </Tooltip>
          )}
          {sidebarCollapsed && (
            <Tooltip title="Expand sidebar">
              <MuiIconButton size="small" onClick={handleSidebarCollapse}><ChevronRight fontSize="small" /></MuiIconButton>
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
              backgroundColor: item.path === '/insights' ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
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

  const KPICard = ({ kpi }: { kpi: KPI }) => (
    <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              backgroundColor: `${kpi.color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: kpi.color
            }}
          >
            {kpi.icon}
          </Box>
          <Chip
            label={kpi.change}
            size="small"
            color={kpi.changeType === 'positive' ? 'success' : kpi.changeType === 'negative' ? 'error' : 'default'}
            variant="outlined"
            sx={{ fontSize: '0.75rem' }}
          />
        </Box>
        <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1 }}>
          {kpi.value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {kpi.title}
        </Typography>
      </CardContent>
    </Card>
  );

  const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );

  const SimpleBarChart = ({ data, height = 200 }: { data: any[]; height?: number }) => (
    <Box sx={{ height, display: 'flex', alignItems: 'end', gap: 1, px: 2 }}>
      {data.map((item, index) => (
        <Box
          key={index}
          sx={{
            flex: 1,
            height: `${(item.orders / Math.max(...data.map(d => d.orders))) * 100}%`,
            backgroundColor: 'primary.main',
            borderRadius: '4px 4px 0 0',
            minHeight: 20,
            position: 'relative'
          }}
        >
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              bottom: -20,
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'text.secondary',
              whiteSpace: 'nowrap'
            }}
          >
            {item.date}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  const HorizontalBarChart = ({ data, height = 200 }: { data: any[]; height?: number }) => (
    <Box sx={{ height }}>
      {data.map((item, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.orders} orders
            </Typography>
          </Box>
          <Box sx={{ position: 'relative', height: 8, backgroundColor: 'grey.200', borderRadius: 4 }}>
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${item.percentage}%`,
                backgroundColor: 'primary.main',
                borderRadius: 4
              }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );

  const CountryTable = ({ data }: { data: CountryData[] }) => (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell align="right">Orders</TableCell>
            <TableCell align="right">Revenue</TableCell>
            <TableCell align="right">%</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.country}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FlagIcon countryCode={row.flag} />
                  <Typography variant="body2">{row.country}</Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2">{row.orders.toLocaleString()}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2">${row.revenue.toLocaleString()}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2">{row.percentage}%</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
        <Container maxWidth="xl" sx={{ mx: 'auto', px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 } }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
              Insights & Analytics
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600 }}>
              Track your performance, analyze trends, and optimize your print-on-demand business
            </Typography>
          </Box>

          {/* Filters */}
          <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <FilterList color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Filters
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Time Range</InputLabel>
                  <Select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    label="Time Range"
                    startAdornment={<CalendarToday sx={{ mr: 1, fontSize: 16 }} />}
                  >
                    {TIME_RANGES.map((range) => (
                      <MenuItem key={range} value={range}>{range}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Store</InputLabel>
                  <Select
                    value={selectedStore}
                    onChange={(e) => setSelectedStore(e.target.value)}
                    label="Store"
                    startAdornment={<StoreIcon sx={{ mr: 1, fontSize: 16 }} />}
                  >
                    {STORES.map((store) => (
                      <MenuItem key={store} value={store}>{store}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Country</InputLabel>
                  <Select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    label="Country"
                    startAdornment={<LocationOn sx={{ mr: 1, fontSize: 16 }} />}
                  >
                    {COUNTRIES.map((country) => (
                      <MenuItem key={country} value={country}>{country}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    label="Category"
                    startAdornment={<Category sx={{ mr: 1, fontSize: 16 }} />}
                  >
                    {CATEGORIES.map((category) => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Product</InputLabel>
                  <Select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    label="Product"
                    startAdornment={<Inventory2 sx={{ mr: 1, fontSize: 16 }} />}
                  >
                    {PRODUCTS_LIST.map((product) => (
                      <MenuItem key={product} value={product}>{product}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="Insights tabs"
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
              <Tab label="Overview" {...a11yProps(0)} />
              <Tab label="Product Performance" {...a11yProps(1)} />
              <Tab label="Best of Store" {...a11yProps(2)} />
              <Tab label="Price Updates" {...a11yProps(3)} />
              <Tab label="Product Quality" {...a11yProps(4)} />
            </Tabs>
          </Box>

          {/* Tab Panels */}
          <TabPanel value={tabValue} index={0}>
            {/* KPI Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {KPI_DATA.map((kpi, index) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                  <KPICard kpi={kpi} />
                </Grid>
              ))}
            </Grid>

            {/* Charts */}
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <ChartCard title="Orders Over Time">
                  <SimpleBarChart data={ORDER_DATA} />
                </ChartCard>
              </Grid>
              <Grid item xs={12} lg={6}>
                <ChartCard title="Top Selling Categories">
                  <HorizontalBarChart data={CATEGORY_DATA} />
                </ChartCard>
              </Grid>
              <Grid item xs={12} lg={6}>
                <ChartCard title="Orders by Country">
                  <CountryTable data={COUNTRY_DATA} />
                </ChartCard>
              </Grid>
              <Grid item xs={12} lg={6}>
                <ChartCard title="Revenue Trend">
                  <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="h6" color="text.secondary">
                      Revenue chart visualization
                    </Typography>
                  </Box>
                </ChartCard>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Product Performance
                </Typography>
                <TextField
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  size="small"
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                  sx={{ width: 300 }}
                />
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">Orders</TableCell>
                      <TableCell align="right">Revenue</TableCell>
                      <TableCell align="right">Cost</TableCell>
                      <TableCell align="right">Profit</TableCell>
                      <TableCell align="right">Rating</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box
                              component="img"
                              src={product.image}
                              alt={product.name}
                              sx={{ width: 40, height: 40, borderRadius: 1, objectFit: 'cover' }}
                            />
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {product.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell align="right">{product.orders.toLocaleString()}</TableCell>
                        <TableCell align="right">${product.revenue.toLocaleString()}</TableCell>
                        <TableCell align="right">${product.cost.toLocaleString()}</TableCell>
                        <TableCell align="right">${product.profit.toLocaleString()}</TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Star sx={{ fontSize: 16, color: 'warning.main' }} />
                            {product.rating}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={product.status}
                            size="small"
                            color={product.status === 'active' ? 'success' : product.status === 'draft' ? 'warning' : 'default'}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Best of Store - Top Performers
              </Typography>
              <Grid container spacing={3}>
                {PRODUCTS.slice(0, 3).map((product, index) => (
                  <Grid item xs={12} md={4} key={product.id}>
                    <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
                      <Box
                        component="img"
                        src={product.image}
                        alt={product.name}
                        sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                      />
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          #{index + 1} {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {product.category}
                        </Typography>
                        <Stack spacing={1}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2">Orders:</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {product.orders.toLocaleString()}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2">Revenue:</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                              ${product.revenue.toLocaleString()}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2">Rating:</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Star sx={{ fontSize: 16, color: 'warning.main' }} />
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {product.rating}
                              </Typography>
                            </Box>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Price Updates & Cost Changes
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Track price changes, cost updates, and margin adjustments across your product catalog.
              </Typography>
              <Box sx={{ mt: 3, p: 3, backgroundColor: 'grey.50', borderRadius: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Price update tracking and cost change monitoring features will be available soon.
                </Typography>
              </Box>
            </Paper>
          </TabPanel>

          <TabPanel value={tabValue} index={4}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Product Quality & Issues
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'success.main' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <CheckCircle color="success" />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Quality Score
                      </Typography>
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                      94.2%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Excellent product quality across all categories
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'warning.main' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Warning color="warning" />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Issues Reported
                      </Typography>
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                      12
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Minor issues reported in the last 30 days
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </TabPanel>
        </Container>
      </Box>
    </Box>
  );
}
