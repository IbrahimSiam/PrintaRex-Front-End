import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Chip,
  useTheme,
} from '@mui/material';
import { LocalShipping, Palette, Info } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../stores/catalogStore';
import { useUIStore } from '../../stores/uiStore';
import { formatUSDToCurrency } from '../../utils/currency';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currency, shipFrom } = useUIStore();

  const handleCustomize = () => {
    navigate(`/app/designer?productId=${product.id}&category=${product.category}`);
  };

  const handleDetails = () => {
    // TODO: Implement product details page
    console.log('Show product details for:', product.id);
  };

  const getFormattedPrice = () => {
    return formatUSDToCurrency(product.priceUSD, currency);
  };

  const getColorSwatches = () => {
    return product.colors.slice(0, 3).map((color, index) => (
      <Box
        key={index}
        sx={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: color.toLowerCase(),
          border: '2px solid white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'inline-block',
          mr: 0.5,
        }}
        title={color}
      />
    ));
  };

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid #f3f4f6',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.25)',
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        height="250"
        image={product.image}
        alt={`${product.name} - ${product.description}`}
        sx={{
          objectFit: 'cover',
          position: 'relative',
        }}
      />

      {/* Shipping Badge */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 2,
          px: 1.5,
          py: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <LocalShipping sx={{ fontSize: 16, color: 'primary.main' }} />
        <Typography
          variant="caption"
          sx={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'primary.main',
          }}
        >
          Ships from {shipFrom}
        </Typography>
      </Box>

      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Product Title */}
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: '#1f2937',
            fontSize: '1.125rem',
            lineHeight: 1.3,
            mb: 1,
          }}
        >
          {product.name}
        </Typography>

        {/* Product Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            color: '#6b7280',
            lineHeight: 1.5,
            flexGrow: 1,
          }}
        >
          {product.description}
        </Typography>

        {/* Price and Color Swatches */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: 'primary.main',
              fontSize: '1.5rem',
              mb: 1,
            }}
          >
            {getFormattedPrice()}
          </Typography>
          
          {/* Color Swatches */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                mr: 1,
              }}
            >
              Colors:
            </Typography>
            {getColorSwatches()}
            {product.colors.length > 3 && (
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                }}
              >
                +{product.colors.length - 3} more
              </Typography>
            )}
          </Box>
        </Box>

        {/* Available Sizes */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 500,
              mb: 1,
              display: 'block',
            }}
          >
            Available Sizes:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {product.sizes.map((size) => (
              <Chip
                key={size}
                label={size}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                  '& .MuiChip-label': {
                    px: 1,
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Technology Tags */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {product.technology.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                color="primary"
                variant="outlined"
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                  '& .MuiChip-label': {
                    px: 1,
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<Palette />}
            onClick={handleCustomize}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              py: 1.25,
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
                transform: 'translateY(-1px)',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Customize
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Info />}
            onClick={handleDetails}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              py: 1.25,
              minWidth: 'auto',
              px: 2,
              borderColor: theme.palette.grey[300],
              color: theme.palette.text.secondary,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
              },
            }}
          >
            Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
