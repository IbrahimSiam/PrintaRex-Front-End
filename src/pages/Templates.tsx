import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Badge,
  useTheme,
  useMediaQuery,
  Avatar,
  Tooltip,
  Fab
} from '@mui/material';
import {
  Home,
  Store,
  ShoppingCart,
  Folder,
  Analytics,
  PhotoCamera,
  Code,
  Search,
  FilterList,
  Add,
  Star,
  StarBorder,
  Edit,
  Delete,
  Visibility,
  Download,
  Share,
  MoreVert,
  CalendarToday,
  Category,
  Palette,
  LocalShipping
} from '@mui/icons-material';

// Mock data for templates
const TEMPLATES = [
  {
    id: 1,
    title: 'Business Logo T-Shirt',
    image: '/assets/img/tee.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    technology: 'DTG',
    createdDate: '2024-01-15',
    category: 'Business',
    isFavorite: true,
    views: 156,
    downloads: 23
  },
  {
    id: 2,
    title: 'Holiday Celebration Design',
    image: '/assets/img/tee-back.jpg',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    technology: 'Embroidery',
    createdDate: '2024-01-10',
    category: 'Holiday',
    isFavorite: false,
    views: 89,
    downloads: 12
  },
  {
    id: 3,
    title: 'Sports Team Jersey',
    image: '/assets/img/tee-side1.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    technology: 'DTG',
    createdDate: '2024-01-08',
    category: 'Sports',
    isFavorite: true,
    views: 234,
    downloads: 45
  },
  {
    id: 4,
    title: 'Artistic Abstract Pattern',
    image: '/assets/img/tee-side2.jpg',
    sizes: ['S', 'M', 'L'],
    technology: 'DTG',
    createdDate: '2024-01-05',
    category: 'Art',
    isFavorite: false,
    views: 67,
    downloads: 8
  },
  {
    id: 5,
    title: 'Corporate Branding Set',
    image: '/assets/img/tee.jpg',
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    technology: 'Embroidery',
    createdDate: '2024-01-03',
    category: 'Business',
    isFavorite: true,
    views: 189,
    downloads: 34
  },
  {
    id: 6,
    title: 'Summer Beach Collection',
    image: '/assets/img/tee-back.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    technology: 'DTG',
    createdDate: '2024-01-01',
    category: 'Seasonal',
    isFavorite: false,
    views: 123,
    downloads: 19
  }
];

const SIDEBAR_ITEMS = [
  { id: 'home', label: 'Home', icon: <Home />, badge: null },
  { id: 'catalog', label: 'Product Catalog', icon: <Store />, badge: null },
  { id: 'orders', label: 'Orders', icon: <ShoppingCart />, badge: 5 },
  { id: 'templates', label: 'Templates', icon: <Folder />, badge: null, active: true },
  { id: 'analytics', label: 'Analytics', icon: <Analytics />, badge: null },
  { id: 'mockup', label: 'Mockup Studio', icon: <PhotoCamera />, badge: null },
  { id: 'developer', label: 'Developer', icon: <Code />, badge: null },
];

const CATEGORIES = ['All', 'Business', 'Holiday', 'Sports', 'Art', 'Seasonal', 'Personal'];
const TECHNOLOGIES = ['All', 'DTG', 'Embroidery', 'Screen Print', 'Vinyl'];

const Templates: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedSidebarItem, setSelectedSidebarItem] = useState('templates');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTechnology, setSelectedTechnology] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [personalizedOnly, setPersonalizedOnly] = useState(false);
  const [templates, setTemplates] = useState(TEMPLATES);

  const handleSidebarItemClick = (itemId: string) => {
    setSelectedSidebarItem(itemId);
  };

  const handleFavoriteToggle = (templateId: number) => {
    setTemplates(templates.map(template => 
      template.id === templateId 
        ? { ...template, isFavorite: !template.isFavorite }
        : template
    ));
  };

  const handleAddToStore = (templateId: number) => {
    console.log('Add to store:', templateId);
    // Implementation for adding to store
  };

  const handlePlaceOrder = (templateId: number) => {
    console.log('Place order:', templateId);
    // Implementation for placing order
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesTechnology = selectedTechnology === 'All' || template.technology === selectedTechnology;
    const matchesPersonalized = !personalizedOnly || template.isFavorite;
    
    return matchesSearch && matchesCategory && matchesTechnology && matchesPersonalized;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      case 'oldest':
        return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'popular':
        return b.views - a.views;
      default:
        return 0;
    }
  });

  const renderTemplateCard = (template: typeof TEMPLATES[0]) => (
    <Card key={template.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={template.image}
        alt={template.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
            {template.title}
          </Typography>
          <IconButton
            size="small"
            onClick={() => handleFavoriteToggle(template.id)}
            sx={{ color: template.isFavorite ? 'warning.main' : 'text.secondary' }}
          >
            {template.isFavorite ? <Star /> : <StarBorder />}
          </IconButton>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip 
            label={template.category} 
            size="small" 
            variant="outlined"
            color="primary"
          />
          <Chip 
            label={template.technology} 
            size="small" 
            variant="outlined"
            color="secondary"
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Sizes: {template.sizes.join(', ')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(template.createdDate).toLocaleDateString()}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              👁 {template.views}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ⬇ {template.downloads}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="outlined"
          size="small"
          fullWidth
          startIcon={<Store />}
          onClick={() => handleAddToStore(template.id)}
          sx={{ mb: 1 }}
        >
          Add to Store
        </Button>
        <Button
          variant="contained"
          size="small"
          fullWidth
          startIcon={<ShoppingCart />}
          onClick={() => handlePlaceOrder(template.id)}
        >
          Place Order
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Left Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            borderRight: '1px solid #e0e0e0',
          },
        }}
      >
        <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
              PR
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                PrintaRex
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Template Studio
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <List sx={{ pt: 2 }}>
          {SIDEBAR_ITEMS.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => handleSidebarItemClick(item.id)}
                selected={selectedSidebarItem === item.id}
                sx={{
                  mx: 2,
                  borderRadius: 2,
                  mb: 0.5,
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  color: selectedSidebarItem === item.id ? 'inherit' : 'text.secondary',
                  minWidth: 40
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
                {item.badge && (
                  <Badge badgeContent={item.badge} color="error" />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top App Bar */}
        <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary' }}>
          <Toolbar>
            <Typography variant="h5" sx={{ flex: 1, fontWeight: 600 }}>
              Templates
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ mr: 2 }}
            >
              Create Template
            </Button>
            <IconButton>
              <MoreVert />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Filters and Search */}
        <Paper sx={{ p: 3, mb: 3, mx: 3, mt: 3 }}>
          <Grid container spacing={3} alignItems="center">
            {/* Search */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Category Filter */}
            <Grid item xs={12} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Category"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {CATEGORIES.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Technology Filter */}
            <Grid item xs={12} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Technology</InputLabel>
                <Select
                  value={selectedTechnology}
                  label="Technology"
                  onChange={(e) => setSelectedTechnology(e.target.value)}
                >
                  {TECHNOLOGIES.map((tech) => (
                    <MenuItem key={tech} value={tech}>
                      {tech}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Sort */}
            <Grid item xs={12} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Sort by</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort by"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="newest">Newest</MenuItem>
                  <MenuItem value="oldest">Oldest</MenuItem>
                  <MenuItem value="alphabetical">Alphabetical</MenuItem>
                  <MenuItem value="popular">Most Popular</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Personalized Only */}
            <Grid item xs={12} md={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={personalizedOnly}
                    onChange={(e) => setPersonalizedOnly(e.target.checked)}
                  />
                }
                label="Personalized Only"
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Templates Grid */}
        <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          {sortedTemplates.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                No templates found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your filters or create a new template
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {sortedTemplates.map((template) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={template.id}>
                  {renderTemplateCard(template)}
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
        >
          <Add />
        </Fab>
      </Box>
    </Box>
  );
};

export default Templates;
