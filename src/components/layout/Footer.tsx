import React from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Footer: React.FC = () => {
  const navigate = useNavigate()

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'T-Shirts', path: '/app/designer?product=tshirt' },

        { label: 'Catalog', path: '/app/catalog' },
        { label: 'Designer', path: '/app/designer' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', path: '/about' },
        { label: 'Pricing', path: '/pricing' },
        { label: 'Contact', path: '/contact' },
        { label: 'Support', path: '/support' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of Service', path: '/legal/terms' },
        { label: 'Privacy Policy', path: '/legal/privacy' },
        { label: 'Cookie Policy', path: '/legal/cookies' },
      ],
    },
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e9ecef',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 2,
              }}
            >
              PrintaRex
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Create and sell custom products. 100% free to use platform for designing 
              personalized t-shirts.
            </Typography>
          </Grid>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <Grid item xs={12} sm={6} md={2} key={section.title}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  fontSize: '1rem',
                }}
              >
                {section.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.path} sx={{ mb: 1 }}>
                    <Link
                      component="button"
                      variant="body2"
                      color="text.secondary"
                      onClick={() => handleNavigation(link.path)}
                      sx={{
                        textDecoration: 'none',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} PrintaRex. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link
              component="button"
              variant="body2"
              color="text.secondary"
              onClick={() => handleNavigation('/legal/terms')}
              sx={{
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Terms
            </Link>
            <Link
              component="button"
              variant="body2"
              color="text.secondary"
              onClick={() => handleNavigation('/legal/privacy')}
              sx={{
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Privacy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
