import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Container,
} from '@mui/material';
import {
  ColorSwatches,
  SizeSelector,
  ThumbnailRail,
  MainImage,
} from './ProductComponents';

// Demo data structure
const demoImages = [
  { id: 'front', webp: '/assets/img/tee.jpg', jpg: '/assets/img/tee.jpg', alt: 'Front view' },
  { id: 'back', webp: '/assets/img/tee.jpg', jpg: '/assets/img/tee.jpg', alt: 'Back view' },
  { id: 'side1', webp: '/assets/img/tee.jpg', jpg: '/assets/img/tee.jpg', alt: 'Side view 1' },
  { id: 'side2', webp: '/assets/img/tee.jpg', jpg: '/assets/img/tee.jpg', alt: 'Side view 2' },
  { id: 'detail1', webp: '/assets/img/tee.jpg', jpg: '/assets/img/tee.jpg', alt: 'Detail view 1' },
  { id: 'detail2', webp: '/assets/img/tee.jpg', jpg: '/assets/img/tee.jpg', alt: 'Detail view 2' },
];

const demoColors = [
  { key: 'white', name: 'White', hex: '#FFFFFF' },
  { key: 'black', name: 'Black', hex: '#000000' },
  { key: 'navy', name: 'Navy', hex: '#1e3a8a' },
  { key: 'gray', name: 'Gray', hex: '#6b7280' },
  { key: 'red', name: 'Red', hex: '#dc2626' },
  { key: 'blue', name: 'Blue', hex: '#2563eb' }
];
const demoSizes = ['S', 'M', 'L', 'XL', '2XL', '3XL'];

// Demo wrapper component
export const ProductComponentsDemo: React.FC = () => {
  // State management as specified
  const [selectedColor, setSelectedColor] = useState<string>('navy');
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedImage, setSelectedImage] = useState<string>('front');

  // Get current selected image
  const currentImage = demoImages.find(img => img.id === selectedImage);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Product Components Demo
      </Typography>

      <Grid container spacing={4}>
        {/* Left: Thumbnail Rail */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Product Views
            </Typography>
            <ThumbnailRail
              images={demoImages}
              value={selectedImage}
              onChange={setSelectedImage}
              maxVisible={4}
            />
          </Paper>
        </Grid>

        {/* Center: Main Image */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Main Image
            </Typography>
            <MainImage 
              image={currentImage} 
              aspectRatio="4/3"
            />
          </Paper>
        </Grid>

        {/* Right: Product Options */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Product Options
            </Typography>

            {/* Color Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5, color: '#374151' }}>
                Color
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {demoColors.map((color) => (
                  <Box
                    key={color.key}
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      backgroundColor: color.hex,
                      border: '1px solid #ccc',
                      cursor: 'pointer',
                      boxShadow: selectedColor === color.key 
                        ? '0 0 0 2px #1976d2, 0 0 0 4px white'
                        : 'none',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: '0 0 0 2px #424242',
                      }
                    }}
                    onClick={() => setSelectedColor(color.key)}
                  />
                ))}
              </Box>
            </Box>

            {/* Size Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5, color: '#374151' }}>
                Size
              </Typography>
              <SizeSelector
                sizes={demoSizes}
                value={selectedSize}
                onChange={setSelectedSize}
                disabledSizes={['2XL']} // Example of disabled size
              />
            </Box>

            {/* Current Selection Display */}
            <Box sx={{ p: 2, backgroundColor: '#f8f9fa', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Current Selection:
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Color: {demoColors.find(c => c.key === selectedColor)?.name}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Size: {selectedSize}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                View: {currentImage?.alt}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
