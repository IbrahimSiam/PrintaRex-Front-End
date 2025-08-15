import React from 'react';
import {
  Card,
  CardContent,
  Skeleton,
  Box,
} from '@mui/material';

const ProductCardSkeleton: React.FC = () => {
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid #f3f4f6',
      }}
    >
      {/* Image Skeleton */}
      <Skeleton
        variant="rectangular"
        height={250}
        sx={{ backgroundColor: 'grey.200' }}
      />

      <CardContent sx={{ p: 3 }}>
        {/* Title Skeleton */}
        <Skeleton
          variant="text"
          width="80%"
          height={24}
          sx={{ mb: 1, backgroundColor: 'grey.200' }}
        />

        {/* Description Skeleton */}
        <Skeleton
          variant="text"
          width="100%"
          height={16}
          sx={{ mb: 0.5, backgroundColor: 'grey.200' }}
        />
        <Skeleton
          variant="text"
          width="90%"
          height={16}
          sx={{ mb: 2, backgroundColor: 'grey.200' }}
        />

        {/* Price Skeleton */}
        <Skeleton
          variant="text"
          width="60%"
          height={32}
          sx={{ mb: 1, backgroundColor: 'grey.200' }}
        />

        {/* Color Swatches Skeleton */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Skeleton
            variant="text"
            width={40}
            height={16}
            sx={{ backgroundColor: 'grey.200' }}
          />
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                variant="circular"
                width={20}
                height={20}
                sx={{ backgroundColor: 'grey.200' }}
              />
            ))}
          </Box>
        </Box>

        {/* Sizes Skeleton */}
        <Box sx={{ mb: 2 }}>
          <Skeleton
            variant="text"
            width={80}
            height={16}
            sx={{ mb: 1, backgroundColor: 'grey.200' }}
          />
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width={40}
                height={24}
                sx={{ borderRadius: 1, backgroundColor: 'grey.200' }}
              />
            ))}
          </Box>
        </Box>

        {/* Technology Skeleton */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {[1, 2].map((i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width={60}
                height={24}
                sx={{ borderRadius: 1, backgroundColor: 'grey.200' }}
              />
            ))}
          </Box>
        </Box>

        {/* Buttons Skeleton */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Skeleton
            variant="rectangular"
            width="70%"
            height={44}
            sx={{ borderRadius: 2, backgroundColor: 'grey.200' }}
          />
          <Skeleton
            variant="rectangular"
            width={44}
            height={44}
            sx={{ borderRadius: 2, backgroundColor: 'grey.200' }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCardSkeleton;
