import React from 'react';
import {
  Box,
  ButtonBase,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
  Fade,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

// Color variants type
type ColorVariants = {
  [key: string]: {
    key: string;
    name: string;
    hex: string;
    filter: string;
    assets: {
      front: string;
      back: string;
    };
  };
};

// Color swatches component with compact, premium look
interface ColorSwatchesProps {
  colors: Array<{ key: string; name: string; hex: string }>;
  value: string;
  onChange: (key: string) => void;
}

export const ColorSwatches: React.FC<ColorSwatchesProps> = ({
  colors,
  value,
  onChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const swatchSize = isMobile ? 24 : 28;

  // Auto-contrast border logic
  const getBorderColor = (hex: string) => {
    const hexCode = hex.replace('#', '');
    const r = parseInt(hexCode.substr(0, 2), 16);
    const g = parseInt(hexCode.substr(2, 2), 16);
    const b = parseInt(hexCode.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#e0e0e0' : 'transparent';
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {colors.map((color) => {
        const isSelected = value === color.key;
        
        return (
          <Tooltip key={color.key} title={`${color.name}, ${color.hex}`}>
            <ButtonBase
              onClick={() => onChange(color.key)}
              disableRipple
              sx={{
                width: swatchSize,
                height: swatchSize,
                borderRadius: '50%',
                backgroundColor: color.hex,
                border: `1px solid ${getBorderColor(color.hex)}`,
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  outline: `2px solid ${theme.palette.text.primary}`,
                  outlineOffset: 2,
                },
                '&:focus-visible': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: 2,
                },
                '&::before': isSelected ? {
                  content: '""',
                  position: 'absolute',
                  top: -4,
                  left: -4,
                  right: -4,
                  bottom: -4,
                  borderRadius: '50%',
                  border: `2px solid ${theme.palette.primary.main}`,
                  zIndex: 1,
                } : undefined,
                '&::after': isSelected ? {
                  content: '""',
                  position: 'absolute',
                  top: -2,
                  left: -2,
                  right: -2,
                  bottom: -2,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  zIndex: 2,
                } : undefined,
              }}
              aria-label={`Color: ${color.name}`}
              aria-pressed={isSelected}
            />
          </Tooltip>
        );
      })}
    </Box>
  );
};

// Size selector component with consistent styling
interface SizeSelectorProps {
  sizes: string[];
  value: string;
  onChange: (size: string) => void;
  disabledSizes?: string[];
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  value,
  onChange,
  disabledSizes = [],
}) => {
  const theme = useTheme();

  const handleChange = (_event: React.MouseEvent<HTMLElement>, newSize: string | null) => {
    if (newSize !== null) {
      onChange(newSize);
    }
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      aria-label="Size selection"
      sx={{
        gap: 0.75,
        '& .MuiToggleButton-root': {
          minWidth: 44,
          height: 36,
          fontSize: '0.875rem',
          px: 1.25,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          textTransform: 'none',
          fontWeight: 400,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
          '&.Mui-selected': {
            backgroundColor: `rgba(${theme.palette.primary.main}, 0.08)`,
            borderColor: theme.palette.primary.main,
            fontWeight: 600,
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: `rgba(${theme.palette.primary.main}, 0.12)`,
            },
          },
          '&.Mui-disabled': {
            opacity: 0.4,
            cursor: 'not-allowed',
          },
        },
      }}
    >
      {sizes.map((size) => {
        const disabled = disabledSizes.includes(size);
        return (
          <ToggleButton
            key={size}
            value={size}
            disabled={disabled}
            aria-label={`Size ${size}`}
            disableRipple
          >
            {size}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};

// New image interface for variants
interface VariantImage {
  id: 'front' | 'back';
  webp: string;
  jpg: string;
  alt: string;
}

// Thumbnail rail component
interface ThumbnailRailProps {
  images: Array<{
    id: string;
    webp: string;
    jpg: string;
    alt: string;
  }>;
  value: string;
  onChange: (id: string) => void;
  maxVisible?: number;
}

export const ThumbnailRail: React.FC<ThumbnailRailProps> = ({
  images,
  value,
  onChange,
  maxVisible = 4,
}) => {
  const theme = useTheme();
  const [showAll, setShowAll] = React.useState(false);
  const shouldShowCollapse = images.length > maxVisible;

  const visibleImages = showAll ? images : images.slice(0, maxVisible);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {visibleImages.map((image) => {
        const isSelected = value === image.id;
        
        return (
          <Tooltip key={image.id} title={image.alt} placement="right">
            <ButtonBase
              onClick={() => onChange(image.id)}
              sx={{
                width: '100%',
                aspectRatio: '4/2',
                borderRadius: theme.shape.borderRadius,
                border: `2px solid`,
                borderColor: isSelected ? 'primary.main' : 'divider',
                overflow: 'hidden',
                position: 'relative',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  borderColor: 'text.primary',
                  boxShadow: theme.shadows[4],
                },
                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: 2,
                },
              }}
              aria-label={image.alt}
              aria-selected={isSelected}
            >
              <picture>
                <source srcSet={image.webp} type="image/webp" />
                <img
                  src={image.jpg}
                  alt={image.alt}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'all 0.2s ease-in-out',
                  }}
                />
              </picture>
              
              {/* Selection indicator */}
              {isSelected && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    border: '2px solid white',
                    boxShadow: theme.shadows[2],
                  }}
                />
              )}
            </ButtonBase>
          </Tooltip>
        );
      })}
      
      {/* Show more/less button */}
      {shouldShowCollapse && (
        <ButtonBase
          onClick={() => setShowAll(!showAll)}
          sx={{
            width: '100%',
            py: 1,
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: 'background.paper',
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: 'action.hover',
              color: 'text.primary',
            },
          }}
          aria-label={showAll ? 'Show fewer images' : 'Show more images'}
        >
          {showAll ? <ExpandLess /> : <ExpandMore />}
        </ButtonBase>
      )}
    </Box>
  );
};

// Main image component
interface MainImageProps {
  image: {
    id: string;
    webp: string;
    jpg: string;
    alt: string;
    colorFilter?: string;
    backgroundColor?: string;
  } | undefined;
  aspectRatio?: string;
}

export const MainImage: React.FC<MainImageProps> = ({ 
  image, 
  aspectRatio = '4/3'
}) => {
  const theme = useTheme();

  if (!image) {
    return (
      <Box
        sx={{
          width: '100%',
          aspectRatio,
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.grey[100],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ color: theme.palette.text.secondary }}>
          No image selected
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio,
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: image.backgroundColor || 'transparent',
      }}
    >
      <picture>
        <source srcSet={image.webp} type="image/webp" />
        <img
          src={image.jpg}
          alt={image.alt}
          loading="eager"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: image.colorFilter || 'none',
            transition: 'filter 0.3s ease',
            padding: '16px'
          }}
        />
      </picture>
    </Box>
  );
};
