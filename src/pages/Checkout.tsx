import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Button,
  TextField,
  FormControl,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Chip,
  Alert,
} from '@mui/material';
import {
  ShoppingCart,
  CheckCircle,
  ArrowBack,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { useUIStore } from '../stores/uiStore';
import { useI18n } from '../hooks/useI18n';
import { formatCurrency } from '../utils/currency';

const steps = ['shipping', 'delivery', 'payment', 'review'];

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useI18n();
  const { currency } = useUIStore();
  const { items, getTotal } = useCartStore();
  
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [deliveryMethod, setDeliveryMethod] = useState('egypt');
  const [paymentMethod] = useState('card');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleShippingChange = (field: string, value: string) => {
    setShippingData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = () => {
    // Here you would typically submit the order to your backend
    console.log('Order placed:', {
      shipping: shippingData,
      delivery: deliveryMethod,
      payment: paymentMethod,
      items,
      total: getTotal(),
    });
    
    // Redirect to success page or show success message
    alert('Order placed successfully!');
    navigate('/');
  };

  const renderShippingStep = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('checkout.shipping.title')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label={t('checkout.shipping.fullName')}
            value={shippingData.fullName}
            onChange={(e) => handleShippingChange('fullName', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label={t('checkout.shipping.phone')}
            value={shippingData.phone}
            onChange={(e) => handleShippingChange('phone', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={t('checkout.shipping.email')}
            type="email"
            value={shippingData.email}
            onChange={(e) => handleShippingChange('email', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={t('checkout.shipping.address')}
            value={shippingData.address}
            onChange={(e) => handleShippingChange('address', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label={t('checkout.shipping.city')}
            value={shippingData.city}
            onChange={(e) => handleShippingChange('city', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label={t('checkout.shipping.state')}
            value={shippingData.state}
            onChange={(e) => handleShippingChange('state', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label={t('checkout.shipping.zipCode')}
            value={shippingData.zipCode}
            onChange={(e) => handleShippingChange('zipCode', e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label={t('checkout.shipping.country')}
            value={shippingData.country}
            onChange={(e) => handleShippingChange('country', e.target.value)}
            required
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderDeliveryStep = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('checkout.delivery.title')}
      </Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">{t('checkout.delivery.title')}</FormLabel>
        <RadioGroup
          value={deliveryMethod}
          onChange={(e) => setDeliveryMethod(e.target.value)}
        >
          <FormControlLabel
            value="egypt"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography>{t('checkout.delivery.egypt')}</Typography>
                <Chip label={t('checkout.delivery.standard')} size="small" />
                <Typography variant="caption" color="text.secondary">
                  {t('checkout.delivery.estimatedDelivery')}: 3-5 days
                </Typography>
              </Box>
            }
          />
          <FormControlLabel
            value="uae"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography>{t('checkout.delivery.uae')}</Typography>
                <Chip label={t('checkout.delivery.express')} size="small" color="primary" />
                <Typography variant="caption" color="text.secondary">
                  {t('checkout.delivery.estimatedDelivery')}: 1-2 days
                </Typography>
              </Box>
            }
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );

  const renderPaymentStep = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('checkout.payment.title')}
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        This is a demo checkout. No real payment will be processed.
      </Alert>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={t('checkout.payment.cardNumber')}
            placeholder="1234 5678 9012 3456"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label={t('checkout.payment.expiryDate')}
            placeholder="MM/YY"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label={t('checkout.payment.cvv')}
            placeholder="123"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label={t('checkout.payment.cardholderName')}
            required
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderReviewStep = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('checkout.review.title')}
      </Typography>
      
      {/* Order Summary */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('checkout.review.orderSummary')}
          </Typography>
          <List dense>
            {items.map((item) => (
              <ListItem key={item.id} sx={{ px: 0 }}>
                <ListItemIcon>
                  <ShoppingCart fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  secondary={`${t('common.quantity')}: ${item.qty} | ${t('common.price')}: ${formatCurrency(currency === 'AED' ? item.priceAED : item.priceEGP, currency)}`}
                />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">{t('cart.cartTotal')}:</Typography>
            <Typography variant="h6" color="primary">
              {formatCurrency(getTotal(), currency)}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('checkout.review.shippingAddress')}
          </Typography>
          <Typography variant="body2">
            {shippingData.fullName}<br />
            {shippingData.address}<br />
            {shippingData.city}, {shippingData.state} {shippingData.zipCode}<br />
            {shippingData.country}
          </Typography>
        </CardContent>
      </Card>

      {/* Delivery Method */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('checkout.review.deliveryMethod')}
          </Typography>
          <Typography variant="body2">
            {deliveryMethod === 'egypt' ? t('checkout.delivery.egypt') : t('checkout.delivery.uae')} - {t('checkout.delivery.standard')}
          </Typography>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('checkout.review.paymentMethod')}
          </Typography>
          <Typography variant="body2">
            Credit Card
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return renderShippingStep();
      case 1:
        return renderDeliveryStep();
      case 2:
        return renderPaymentStep();
      case 3:
        return renderReviewStep();
      default:
        return 'Unknown step';
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return Object.values(shippingData).every(value => value.trim() !== '');
      case 1:
        return deliveryMethod !== '';
      case 2:
        return true; // Demo payment
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {t('checkout.title')}
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
              {t(`checkout.steps.${label}`)}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 3, mb: 3 }}>
        {getStepContent(activeStep)}
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          startIcon={isRTL ? <ArrowForward /> : <ArrowBack />}
        >
          {t('common.previous')}
        </Button>

        <Box>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handlePlaceOrder}
              startIcon={<CheckCircle />}
            >
              {t('checkout.review.placeOrder')}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!isStepValid(activeStep)}
              endIcon={isRTL ? <ArrowBack /> : <ArrowForward />}
            >
              {t('common.next')}
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Checkout;
