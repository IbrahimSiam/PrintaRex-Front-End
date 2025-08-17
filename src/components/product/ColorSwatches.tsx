import React from 'react';
import { Box, ButtonBase, Tooltip, useTheme, useMediaQuery } from '@mui/material';

export interface TSHIRTVariant {
  key: 'black' | 'white';
  name: string;
  hex: string;
  front: string;
  back: string;
}

interface ColorSwatchesProps {
  value: 'black' | 'white';
  onChange: (color: 'black' | 'white') => void;
  variants: Record<'black' | 'white', TSHIRTVariant>;
}

export const ColorSwatches: React.FC<ColorSwatchesProps> = ({
  value,
  onChange,
  variants
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const swatchSize = isMobile ? 18 : 20; // Smaller swatches

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {Object.values(variants).map((variant) => {
        const isSelected = value === variant.key;
        
        return (
          <Tooltip 
            key={variant.key} 
            title={`${variant.name} (${variant.hex})`}
            placement="top"
            arrow
          >
            <ButtonBase
              onClick={() => onChange(variant.key)}
              aria-pressed={isSelected}
              aria-label={`${variant.name} color`}
              sx={{
                width: swatchSize,
                height: swatchSize,
                borderRadius: '50%',
                backgroundColor: variant.hex,
                border: '1px solid #ccc', // Always show border for visibility
                boxShadow: isSelected 
                  ? `0 0 0 2px ${theme.palette.primary.main}, 0 0 0 4px ${theme.palette.common.white}`
                  : 'none',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: `0 0 0 2px ${theme.palette.text.primary}`,
                },
                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: theme.palette.primary.main,
                  outlineOffset: 2,
                }
              }}
            />
          </Tooltip>
        );
      })}
    </Box>
  );
};
