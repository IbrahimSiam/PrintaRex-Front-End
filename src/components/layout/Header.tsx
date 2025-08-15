import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  Language,
  ShoppingCart,
  AccountCircle,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../../stores/uiStore';
import { useCartStore } from '../../stores/cartStore';
import { useI18n } from '../../hooks/useI18n';
import CurrencySwitcher from '../common/CurrencySwitcher';
import CountryBadge from '../common/CountryBadge';
import CartDrawer from '../cart/CartDrawer';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useI18n();
  const { language, toggleLanguage } = useUIStore();
  const { isOpen: isCartOpen, toggleCart, getItemCount } = useCartStore();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (newLanguage: 'en' | 'ar') => {
    if (newLanguage !== language) {
      toggleLanguage();
    }
    handleMenuClose();
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'text.primary' }}>
        <Toolbar>
          {/* Left side - Logo and Navigation */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            
            <Box 
              onClick={() => navigate('/')} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer', 
                '&:hover': { opacity: 0.8 } 
              }}
            >
              <Box sx={{ 
                width: 32, 
                height: 32, 
                backgroundColor: '#1976d2', 
                borderRadius: '6px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                mr: 1 
              }}>
                <Typography sx={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>
                  PR
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2' }}>
                {t('header.title')}
              </Typography>
            </Box>
            
            <CountryBadge />
          </Box>

          {/* Center - Navigation Links */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              color="inherit" 
              onClick={() => navigate('/')}
              sx={{ textTransform: 'none' }}
            >
              {t('header.home')}
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/app/catalog')}
              sx={{ textTransform: 'none' }}
            >
              {t('header.catalog')}
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/app/designer')}
              sx={{ textTransform: 'none' }}
            >
              {t('header.designer')}
            </Button>
          </Box>

          {/* Right side - Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Language Toggle */}
            <Tooltip title={t('common.language')}>
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                sx={{ 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                  minWidth: 'auto'
                }}
              >
                <Language fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
                  {language}
                </Typography>
              </IconButton>
            </Tooltip>

            {/* Currency Switcher */}
            <CurrencySwitcher />

            {/* Cart Icon */}
            <Tooltip title={t('cart.title')}>
              <IconButton
                color="inherit"
                onClick={toggleCart}
                sx={{ position: 'relative' }}
              >
                <Badge badgeContent={getItemCount()} color="primary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* User Account */}
            <Tooltip title={t('header.account')}>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Language Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: isRTL ? 'left' : 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: isRTL ? 'left' : 'right',
        }}
      >
        <MenuItem onClick={() => handleLanguageChange('en')}>
          <Typography sx={{ fontWeight: language === 'en' ? 600 : 400 }}>
            🇺🇸 English
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange('ar')}>
          <Typography sx={{ fontWeight: language === 'ar' ? 600 : 400 }}>
            🇸🇦 العربية
          </Typography>
        </MenuItem>
      </Menu>

      {/* Cart Drawer */}
      <CartDrawer open={isCartOpen} onClose={() => toggleCart()} />
    </>
  );
};

export default Header;
