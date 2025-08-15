import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { LocalShipping } from '@mui/icons-material';
import { useUIStore } from '../../stores/uiStore';

const CountryBadge: React.FC = () => {
  const { shipFrom } = useUIStore();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        backgroundColor: 'rgba(25, 118, 210, 0.08)',
        borderRadius: 2,
        px: 2,
        py: 1,
        border: '1px solid rgba(25, 118, 210, 0.2)',
      }}
    >
      <LocalShipping
        sx={{
          fontSize: 18,
          color: 'primary.main',
        }}
      />
      <Typography
        variant="body2"
        sx={{
          color: 'primary.main',
          fontWeight: 500,
          fontSize: '0.875rem',
        }}
      >
        Ships from:
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Chip
          label="Egypt"
          size="small"
          variant={shipFrom === 'Egypt' ? 'filled' : 'outlined'}
          color={shipFrom === 'Egypt' ? 'primary' : 'default'}
          sx={{
            height: 24,
            fontSize: '0.75rem',
            fontWeight: 500,
            '& .MuiChip-label': {
              px: 1,
            },
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontWeight: 400,
            mx: 0.5,
          }}
        >
          •
        </Typography>
        <Chip
          label="UAE"
          size="small"
          variant={shipFrom === 'UAE' ? 'filled' : 'outlined'}
          color={shipFrom === 'UAE' ? 'primary' : 'default'}
          sx={{
            height: 24,
            fontSize: '0.75rem',
            fontWeight: 500,
            '& .MuiChip-label': {
              px: 1,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default CountryBadge;
