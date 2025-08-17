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
  useTheme,
  useMediaQuery,
  Grid,
  Stack,
  Chip
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  Apple,
  Star,
  CheckCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSignUp = () => {
    console.log('Sign up with:', formData);
    // Handle sign up logic here
  };

  const handleSocialSignUp = (provider: string) => {
    console.log(`Sign up with ${provider}`);
    // Handle social sign up logic here
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
        }
      }}
    >
      Continue with {provider}
    </Button>
  );

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#fafafa',
      display: 'flex',
      alignItems: 'center',
      py: { xs: 4, md: 0 }
    }}>
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        <Grid container spacing={0} sx={{ 
          backgroundColor: 'white',
          borderRadius: { xs: 0, md: 4 },
          overflow: 'hidden',
          boxShadow: { xs: 'none', md: '0 8px 32px rgba(0,0,0,0.1)' },
          minHeight: { xs: 'auto', md: '600px' }
        }}>
          {/* Left Column - Sign Up Form */}
          <Grid item xs={12} md={6} sx={{ p: { xs: 3, md: 6 } }}>
            <Box sx={{ maxWidth: 400, mx: 'auto' }}>
              {/* Header */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 800, 
                    color: '#1a1a1a',
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    mb: 1
                  }}
                >
                  Sign Up
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary',
                    fontSize: '1.1rem'
                  }}
                >
                  Join thousands of creators selling custom products
                </Typography>
              </Box>

              {/* Social Sign Up Buttons */}
              <Stack spacing={2} sx={{ mb: 4 }}>
                <SocialButton
                  provider="Google"
                  icon={<Google />}
                  color="#DB4437"
                  onClick={() => handleSocialSignUp('Google')}
                />
                <SocialButton
                  provider="Facebook"
                  icon={<Facebook />}
                  color="#4267B2"
                  onClick={() => handleSocialSignUp('Facebook')}
                />
                <SocialButton
                  provider="Apple"
                  icon={<Apple />}
                  color="#000000"
                  onClick={() => handleSocialSignUp('Apple')}
                />
              </Stack>

              {/* Divider */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Divider sx={{ flex: 1 }} />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    px: 2, 
                    color: 'text.secondary',
                    fontWeight: 500
                  }}
                >
                  OR
                </Typography>
                <Divider sx={{ flex: 1 }} />
              </Box>

              {/* Email Field */}
              <TextField
                fullWidth
                label="Email address"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                variant="outlined"
                size="large"
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
                size="large"
                sx={{ mb: 3 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
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

              {/* Sign Up Button */}
              <Button
                fullWidth
                variant="contained"
                onClick={handleSignUp}
                sx={{
                  py: 2,
                  backgroundColor: '#22c55e',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  borderRadius: 2,
                  boxShadow: '0 4px 14px rgba(34, 197, 94, 0.3)',
                  '&:hover': {
                    backgroundColor: '#16a34a',
                    boxShadow: '0 6px 20px rgba(34, 197, 94, 0.4)',
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                Create Account
              </Button>

              {/* Terms and Privacy */}
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block', 
                  textAlign: 'center', 
                  mt: 2, 
                  color: 'text.secondary',
                  lineHeight: 1.5
                }}
              >
                By signing up, you agree to our{' '}
                <Link href="/terms" sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600 }}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600 }}>
                  Privacy Policy
                </Link>
              </Typography>

              {/* Login Link */}
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Already have an account?{' '}
                  <Link 
                    href="/login" 
                    sx={{ 
                      color: 'primary.main', 
                      textDecoration: 'none', 
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Log in
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Column - Brand Content */}
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
                {/* Tagline */}
                <Typography 
                  variant="h2" 
                  component="h2" 
                  sx={{ 
                    fontWeight: 800, 
                    color: '#1a1a1a',
                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                    mb: 3,
                    lineHeight: 1.2
                  }}
                >
                  Start earning with PrintaRex — create, sell, and grow
                </Typography>

                {/* Trust Rating */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1, 
                  mb: 3,
                  backgroundColor: '#fef3c7',
                  p: 2,
                  borderRadius: 2,
                  width: 'fit-content'
                }}>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} sx={{ color: '#f59e0b', fontSize: 20 }} />
                    ))}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#92400e' }}>
                    4.8/5
                  </Typography>
                </Box>

                {/* Testimonial */}
                <Paper sx={{ 
                  p: 3, 
                  backgroundColor: 'white',
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  mb: 4,
                  border: '1px solid #e5e7eb'
                }}>
                  <Typography variant="body1" sx={{ 
                    fontStyle: 'italic', 
                    color: 'text.primary',
                    mb: 2,
                    fontSize: '1.1rem',
                    lineHeight: 1.6
                  }}>
                    "PrintaRex helped me turn my passion for design into a profitable business. I've made over $50,000 in my first year!"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                      width: 40, 
                      height: 40, 
                      backgroundColor: '#22c55e', 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <CheckCircle sx={{ color: 'white', fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        Sarah Chen
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Fashion Designer & Entrepreneur
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                {/* Product Mockups */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  {[
                    { name: 'T-Shirts', color: '#3b82f6' },
                    { name: 'Hoodies', color: '#8b5cf6' },
                    { name: 'Mugs', color: '#f59e0b' }
                  ].map((product, index) => (
                    <Chip
                      key={index}
                      label={product.name}
                      sx={{
                        backgroundColor: `${product.color}15`,
                        color: product.color,
                        fontWeight: 600,
                        px: 2,
                        py: 1,
                        fontSize: '0.9rem'
                      }}
                    />
                  ))}
                </Box>

                {/* Trust Indicators */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 3, 
                  mt: 4,
                  flexWrap: 'wrap'
                }}>
                  {[
                    { text: 'Free Setup', icon: '✓' },
                    { text: '24/7 Support', icon: '✓' },
                    { text: 'Secure Payments', icon: '✓' }
                  ].map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ 
                        width: 20, 
                        height: 20, 
                        backgroundColor: '#22c55e', 
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                      }}>
                        {item.icon}
                      </Box>
                      <Typography variant="body2" sx={{ 
                        color: 'text.secondary',
                        fontWeight: 500
                      }}>
                        {item.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
