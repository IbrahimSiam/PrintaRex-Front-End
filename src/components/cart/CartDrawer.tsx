import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  Button,
  Divider,
  Card,
  CardMedia,
  Chip,
} from '@mui/material';
import {
  Close,
  Remove,
  Add,
  Delete,
  ShoppingCart,
  LocalShipping,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';
import { useUIStore } from '../../stores/uiStore';
import { useI18n } from '../../hooks/useI18n';
import { formatCurrency } from '../../utils/currency';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { t, isRTL } = useI18n();
  const { currency } = useUIStore();
  const {
    items,
    updateQuantity,
    removeItem,
    getTotal,
    getItemCount,
    clearCart,
  } = useCartStore();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const handleQuantityChange = (itemId: string, newQty: number) => {
    updateQuantity(itemId, newQty);
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  const formatPrice = (price: number) => {
    return formatCurrency(price, currency);
  };

  if (items.length === 0) {
    return (
      <Drawer
        anchor={isRTL ? 'left' : 'right'}
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 400 } }
        }}
      >
        <Box sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <ShoppingCart sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {t('cart.empty')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {t('common.addToCart')} {t('catalog.products')} {t('common.view')} {t('catalog.title')}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              onClose();
              navigate('/app/catalog');
            }}
            fullWidth
          >
            {t('catalog.title')}
          </Button>
        </Box>
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor={isRTL ? 'left' : 'right'}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShoppingCart />
            {t('cart.title')} ({getItemCount()})
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>

        {/* Cart Items */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <List sx={{ p: 0 }}>
            {items.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem sx={{ px: 2, py: 1 }}>
                  <Box sx={{ display: 'flex', width: '100%', gap: 2 }}>
                    {/* Product Image */}
                    <Box sx={{ width: 80, height: 80, flexShrink: 0 }}>
                      <Card sx={{ height: '100%' }}>
                        <CardMedia
                          component="img"
                          image={item.previewUrl || item.image || '/img/tshirt-flat.svg'}
                          alt={item.name}
                          sx={{ height: '100%', objectFit: 'cover' }}
                        />
                      </Card>
                    </Box>

                    {/* Product Details */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle2" noWrap>
                        {item.name}
                      </Typography>
                      
                      {item.size && (
                        <Typography variant="caption" color="text.secondary" display="block">
                          {t('common.size')}: {item.size}
                        </Typography>
                      )}
                      
                      {item.color && (
                        <Typography variant="caption" color="text.secondary" display="block">
                          {t('common.color')}: {item.color}
                        </Typography>
                      )}

                      {item.designJSON && (
                        <Chip
                          label={t('designer.customDesign')}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ mt: 0.5 }}
                        />
                      )}

                      <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                        {formatPrice(currency === 'AED' ? item.priceAED : item.priceEGP)}
                      </Typography>
                    </Box>

                    {/* Quantity Controls */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, item.qty - 1)}
                          disabled={item.qty <= 1}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography variant="body2" sx={{ px: 1, minWidth: 32, textAlign: 'center' }}>
                          {item.qty}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, item.qty + 1)}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>
                      
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </ListItem>
                
                {index < items.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* Footer */}
        <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              {t('cart.cartTotal')}:
            </Typography>
            <Typography variant="h6" color="primary">
              {formatPrice(getTotal())}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={clearCart}
              fullWidth
              color="error"
            >
              {t('cart.clear')}
            </Button>
            <Button
              variant="contained"
              onClick={handleCheckout}
              fullWidth
              startIcon={<LocalShipping />}
            >
              {t('cart.goToCheckout')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
