import React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
  Paper,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const Landing: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  const features = [
    '100% free to use',
    'T shirts',
    'Global delivery (soon)',
  ]

  const benefits = [
    {
      title: 'Easy Design',
      description: 'Drag and drop interface for quick customization',
      icon: '🎨'
    },
    {
      title: 'High Quality',
      description: 'Premium materials and professional printing',
      icon: '⭐'
    },
    {
      title: 'Fast Delivery',
      description: 'Quick turnaround times for your orders',
      icon: '🚀'
    }
  ]

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* Left Content */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                component="h1"
                gutterBottom
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  fontWeight: 800,
                  lineHeight: 1.2,
                  mb: 3,
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Create and sell custom products
              </Typography>

              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ mb: 4, fontWeight: 400, lineHeight: 1.4 }}
              >
                Design your own t-shirts with our powerful online editor. 
                Start selling custom products today!
              </Typography>

              {/* Feature Points */}
              <Box sx={{ mb: 4 }}>
                {features.map((feature, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                      gap: 1,
                    }}
                  >
                    <CheckCircleIcon
                      sx={{ color: 'success.main', fontSize: '1.5rem' }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: '1rem', md: '1.125rem' },
                        fontWeight: 500,
                      }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* CTA Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  mb: 4,
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => handleNavigation('/app/designer')}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    minHeight: '56px',
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                    },
                  }}
                  aria-label="Start customizing products"
                >
                  Start customizing
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => handleNavigation('/app/catalog')}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    minHeight: '56px',
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      borderColor: 'primary.dark',
                      backgroundColor: 'primary.main',
                      color: 'white',
                    },
                  }}
                  aria-label="Browse product catalog"
                >
                  Browse catalog
                </Button>
              </Box>
            </Grid>

            {/* Right Content - GIFs */}
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card
                    sx={{
                      borderRadius: '16px',
                      border: '1px solid #e5e7eb',
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.25)',
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f0f0f0',
                        overflow: 'hidden',
                        border: '1px solid #e5e7eb',
                      }}
                    >
                      <img
                        src="/assets/gifs/tee.gif"
                        alt="Customize a T Shirt - animated demonstration"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                    <CardContent sx={{ py: 1.5, textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary" fontWeight={500}>
                        Customize a T Shirt
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#fafafa' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Why Choose PrintaRex?
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Professional design tools, high-quality products, and excellent customer service
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    height: '100%',
                    borderRadius: '16px',
                    border: '1px solid #e0e0e0',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: '3rem',
                      mb: 2,
                      display: 'block',
                    }}
                  >
                    {benefit.icon}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {benefit.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                mb: 2,
              }}
            >
              How It Works
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Get started in just three simple steps
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                step: '1',
                title: 'Design',
                description: 'Use our powerful online editor to create your custom design',
                icon: '🎨'
              },
              {
                step: '2',
                title: 'Preview',
                description: 'See exactly how your design will look on the final product',
                icon: '👁️'
              },
              {
                step: '3',
                title: 'Order',
                description: 'Place your order and we\'ll handle the rest',
                icon: '🚀'
              }
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box sx={{ textAlign: 'center', position: 'relative' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      color: 'white',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: 'primary.main' }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                mb: 3,
              }}
            >
              Ready to Start Creating?
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 4, opacity: 0.9 }}
            >
              Join thousands of creators who are already designing amazing custom products
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => handleNavigation('/app/designer')}
              sx={{
                py: 2,
                px: 6,
                fontSize: '1.25rem',
                fontWeight: 600,
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              Get Started Now
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

export default Landing
