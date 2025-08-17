import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Checkbox,
  FormControlLabel,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Grid,
  Stack,
  Chip,
  Snackbar
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  Apple,
  Language,
  CheckCircle,
  Error as ErrorIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  rememberMe?: string;
  general?: string;
}

export default function Login() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from location state or default to dashboard
  const redirectTo = (location.state as any)?.redirectTo || '/dashboard';
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'info'
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleInputChange = (field: keyof LoginFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'rememberMe' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address.';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Enter your password.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Simulate API call - replace with your actual auth logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success - replace with actual auth success handling
      console.log('Sign in with:', formData);
      
      // Show success message briefly before redirect
      setSnackbar({
        open: true,
        message: 'Sign in successful! Redirecting...',
        severity: 'success'
      });
      
      // Redirect after a brief delay
      setTimeout(() => {
        navigate(redirectTo);
      }, 1000);
      
    } catch (error: any) {
      // Handle different error types
      let errorMessage = 'Sign in failed. Please try again.';
      
      if (error.code === 'invalid_credentials') {
        errorMessage = 'Email or password is incorrect.';
      } else if (error.code === 'rate_limited') {
        errorMessage = 'Too many attempts. Try again in a few minutes.';
      } else if (error.code === 'disabled_user') {
        errorMessage = 'Account is disabled. Contact support.';
      }
      
      setErrors({ general: errorMessage });
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: string) => {
    setIsLoading(true);
    
    try {
      // Simulate SSO call - replace with your actual SSO logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`Sign in with ${provider}`);
      
      // Mock success - replace with actual SSO success handling
      setSnackbar({
        open: true,
        message: `Signed in with ${provider}! Redirecting...`,
        severity: 'success'
      });
      
      setTimeout(() => {
        navigate(redirectTo);
      }, 1000);
      
    } catch (error) {
      setSnackbar({
        open: true,
        message: `${provider} sign in failed. Please try again.`,
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const SocialButton = ({ provider, icon, color, onClick }: { 
    provider: string; 
    icon: React.ReactNode; 
    color: string; 
    onClick: () => void;
  }) => (
    <Button
      variant="outlined"
      fullWidth
      startIcon={icon}
      onClick={onClick}
      disabled={isLoading}
      sx={{
        py: 1.5,
        border: `1px solid ${color}`,
        color: color,
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1rem',
        '&:hover': {
          border: `2px solid ${color}`,
          backgroundColor: `${color}08`
        },
        '&:disabled': {
          borderColor: 'grey.300',
          color: 'grey.500'
        }
      }}
    >
      Continue with {provider}
    </Button>
  );

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      alignItems: 'center',
      py: { xs: 4, md: 0 }
    }}>
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        <Grid container spacing={0} sx={{ 
          backgroundColor: theme.palette.background.paper,
          borderRadius: { xs: 0, md: 4 },
          overflow: 'hidden',
          boxShadow: { xs: 'none', md: '0 8px 32px rgba(0,0,0,0.1)' },
          minHeight: { xs: 'auto', md: '600px' }
        }}>
          {/* Left Panel - Auth Form */}
          <Grid item xs={12} md={6} sx={{ p: { xs: 3, md: 6 } }}>
            <Box sx={{ maxWidth: 520, mx: 'auto' }}>
              {/* Logo */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box 
                  onClick={() => navigate('/')} 
                  sx={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.8 }
                  }}
                >
                  <Box sx={{ 
                    width: 40, 
                    height: 40, 
                    backgroundColor: '#1976d2', 
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Typography sx={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>
                      PR
                    </Typography>
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2' }}>
                    PrintaRex
                  </Typography>
                </Box>
              </Box>

              {/* Welcome Heading */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  id="login-heading"
                  sx={{ 
                    fontWeight: 800, 
                    color: theme.palette.text.primary,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    mb: 1
                  }}
                >
                  Welcome back
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    fontSize: '1.1rem'
                  }}
                >
                  Sign in to your account to continue
                </Typography>
              </Box>

              {/* SSO Buttons */}
              <Stack spacing={2} sx={{ mb: 4 }}>
                <SocialButton
                  provider="Google"
                  icon={<Google />}
                  color="#DB4437"
                  onClick={() => handleSocialSignIn('Google')}
                />
                <SocialButton
                  provider="Facebook"
                  icon={<Facebook />}
                  color="#4267B2"
                  onClick={() => handleSocialSignIn('Facebook')}
                />
                <SocialButton
                  provider="Apple"
                  icon={<Apple />}
                  color="#000000"
                  onClick={() => handleSocialSignIn('Apple')}
                />
              </Stack>

              {/* Divider */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Divider sx={{ flex: 1 }} />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    px: 2, 
                    color: theme.palette.text.secondary,
                    fontWeight: 500
                  }}
                >
                  or
                </Typography>
                <Divider sx={{ flex: 1 }} />
              </Box>

              {/* General Error Alert */}
              {errors.general && (
                <Alert 
                  severity="error" 
                  icon={<ErrorIcon />}
                  sx={{ mb: 3 }}
                >
                  {errors.general}
                </Alert>
              )}

              {/* Email Field */}
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                variant="outlined"
                size="medium"
                error={!!errors.email}
                helperText={errors.email}
                disabled={isLoading}
                autoComplete="email"
                placeholder="Your email"
                sx={{ mb: 3 }}
                InputProps={{
                  sx: { 
                    py: 1.5,
                    fontSize: '1rem'
                  }
                }}
                InputLabelProps={{
                  sx: { 
                    fontSize: '1rem',
                    fontWeight: 500
                  }
                }}
              />

              {/* Password Field */}
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange('password')}
                variant="outlined"
                size="medium"
                error={!!errors.password}
                helperText={errors.password}
                disabled={isLoading}
                autoComplete="current-password"
                placeholder="Your password"
                sx={{ mb: 3 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "hide password" : "show password"}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        disabled={isLoading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { 
                    py: 1.5,
                    fontSize: '1rem'
                  }
                }}
                InputLabelProps={{
                  sx: { 
                    fontSize: '1rem',
                    fontWeight: 500
                  }
                }}
              />

              {/* Remember Me & Forgot Password */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 3 
              }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.rememberMe}
                      onChange={handleInputChange('rememberMe')}
                      disabled={isLoading}
                      color="primary"
                    />
                  }
                  label="Remember me"
                  sx={{ 
                    '& .MuiFormControlLabel-label': { 
                      fontSize: '0.9rem',
                      color: theme.palette.text.secondary
                    }
                  }}
                />
                <Button
                  variant="text"
                  onClick={handleForgotPassword}
                  disabled={isLoading}
                  sx={{ 
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    p: 0,
                    minWidth: 'auto'
                  }}
                >
                  Forgot password?
                </Button>
              </Box>

              {/* Sign In Button */}
              <Button
                fullWidth
                variant="contained"
                onClick={handleSignIn}
                disabled={isLoading}
                sx={{
                  py: 2,
                  backgroundColor: '#1976d2',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  borderRadius: 2,
                  boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                    boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                    transform: 'translateY(-1px)'
                  },
                  '&:disabled': {
                    backgroundColor: 'grey.400',
                    transform: 'none'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                {isLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={20} color="inherit" />
                    Signing in...
                  </Box>
                ) : (
                  'Sign in'
                )}
              </Button>

              {/* Sign Up Link */}
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                  Don't have an account?{' '}
                  <Link 
                    component="button"
                    variant="body1"
                    onClick={handleSignUp}
                    disabled={isLoading}
                    sx={{ 
                      color: 'primary.main', 
                      textDecoration: 'none', 
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline'
                      },
                      '&:disabled': {
                        color: 'grey.500',
                        cursor: 'not-allowed'
                      }
                    }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Box>

              {/* Footer Links */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mt: 6,
                pt: 3,
                borderTop: `1px solid ${theme.palette.divider}`
              }}>
                {/* Language Selector */}
                <Button
                  startIcon={<Language />}
                  variant="text"
                  size="small"
                  sx={{ 
                    textTransform: 'none',
                    color: theme.palette.text.secondary,
                    fontSize: '0.8rem'
                  }}
                >
                  English
                </Button>

                {/* Legal Links */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Link 
                    href="/terms" 
                    sx={{ 
                      color: theme.palette.text.secondary, 
                      textDecoration: 'none', 
                      fontSize: '0.8rem',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Terms
                  </Link>
                  <Link 
                    href="/privacy" 
                    sx={{ 
                      color: theme.palette.text.secondary, 
                      textDecoration: 'none', 
                      fontSize: '0.8rem',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Privacy
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Right Panel - Visual Content */}
          <Grid item xs={12} md={6} sx={{ 
            backgroundColor: '#f8fafc',
            p: { xs: 4, md: 6 },
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              position: 'relative', 
              zIndex: 2,
              width: '100%'
            }}>
              {/* Background Pattern */}
              <Box sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                backgroundColor: '#e0e7ff',
                borderRadius: '50%',
                opacity: 0.1,
                zIndex: 1
              }} />
              <Box sx={{
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: 150,
                height: 150,
                backgroundColor: '#fef3c7',
                borderRadius: '50%',
                opacity: 0.1,
                zIndex: 1
              }} />

              {/* Content */}
              <Box sx={{ maxWidth: 400, mx: 'auto' }}>
                {/* Headline Card */}
                <Paper sx={{ 
                  p: 4, 
                  backgroundColor: 'white',
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  mb: 4,
                  border: '1px solid #e5e7eb'
                }}>
                  <Typography 
                    variant="h2" 
                    component="h2" 
                    sx={{ 
                      fontWeight: 800, 
                      color: '#1a1a1a',
                      fontSize: { xs: '1.75rem', md: '2.25rem' },
                      mb: 2,
                      lineHeight: 1.2
                    }}
                  >
                    Making it starts here.
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: '1.1rem',
                      lineHeight: 1.6
                    }}
                  >
                    Sign in, set up and start selling.
                  </Typography>
                </Paper>

                {/* Hero Illustration */}
                <Box sx={{ 
                  textAlign: 'center',
                  mb: 4
                }}>
                  <Box
                    component="img"
                    src="/public/illustrations/login-hero.png"
                    alt="Creative workspace with print-on-demand products"
                    sx={{
                      width: '100%',
                      maxWidth: 400,
                      height: 'auto',
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                    }}
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  
                  {/* Fallback Content if Image Missing */}
                  <Box sx={{ 
                    display: 'none',
                    '&.fallback': { display: 'block' }
                  }} className="fallback">
                    <Box sx={{
                      width: '100%',
                      height: 300,
                      backgroundColor: '#e0e7ff',
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      gap: 2
                    }}>
                      <CheckCircle sx={{ fontSize: 60, color: '#6366f1' }} />
                      <Typography variant="h6" sx={{ color: '#6366f1', fontWeight: 600 }}>
                        Creative Workspace
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                        Your journey to success starts with a simple sign in
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Trust Indicators */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  gap: 3,
                  flexWrap: 'wrap'
                }}>
                  {[
                    { text: 'Secure Login', icon: '🔒' },
                    { text: '24/7 Support', icon: '🛟' },
                    { text: 'Trusted Platform', icon: '✅' }
                  ].map((item, index) => (
                    <Chip
                      key={index}
                      label={item.text}
                      icon={<span>{item.icon}</span>}
                      sx={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        fontWeight: 500,
                        fontSize: '0.9rem'
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
