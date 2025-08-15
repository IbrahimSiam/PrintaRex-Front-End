import React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { FilterList, Clear, Search } from '@mui/icons-material';
import { useCatalogStore } from '../../stores/catalogStore';
import { ProductSize, ProductColor } from '../../stores/catalogStore';

interface FiltersPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const {
    filters,
    updateSearchQuery,
    toggleSize,
    toggleColor,
    updatePriceRange,
    setGender,
    toggleTechnology,
    resetFilters,
  } = useCatalogStore();

  const sizes: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
  const colors: ProductColor[] = ['White', 'Black', 'Green', 'Red', 'Blue', 'Yellow'];
  const technologies = ['DTG', 'DTF', 'Embroidery'];
  const genders = ['men', 'women', 'unisex'];

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    updatePriceRange(newValue as [number, number]);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.selectedSizes.length > 0) count++;
    if (filters.selectedColors.length > 0) count++;
    if (filters.selectedGender) count++;
    if (filters.selectedTechnology.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <Box
      sx={{
        width: isMobile ? '100%' : 300,
        backgroundColor: 'white',
        borderRight: isMobile ? 'none' : '1px solid #e5e7eb',
        borderBottom: isMobile ? '1px solid #e5e7eb' : 'none',
        height: isMobile ? 'auto' : '100%',
        overflowY: 'auto',
        p: 3,
        display: isOpen ? 'block' : 'none',
        position: isMobile ? 'static' : 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterList sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            Filters
          </Typography>
          {activeFiltersCount > 0 && (
            <Chip
              label={activeFiltersCount}
              size="small"
              color="primary"
              sx={{ ml: 1 }}
            />
          )}
        </Box>
        {isMobile && (
          <Button
            size="small"
            onClick={onClose}
            sx={{ minWidth: 'auto', p: 1 }}
          >
            ✕
          </Button>
        )}
      </Box>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search products..."
          value={filters.searchQuery}
          onChange={(e) => updateSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: '#f8f9fa',
            },
          }}
        />
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Gender Filter */}
      <Box sx={{ mb: 3 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>
            Gender
          </FormLabel>
          <FormGroup>
            {genders.map((gender) => (
              <FormControlLabel
                key={gender}
                control={
                  <Checkbox
                    checked={filters.selectedGender === gender}
                    onChange={() => setGender(filters.selectedGender === gender ? '' : gender)}
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                    {gender}
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        </FormControl>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Size Filter */}
      <Box sx={{ mb: 3 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>
            Size
          </FormLabel>
          <FormGroup>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {sizes.map((size) => (
                <FormControlLabel
                  key={size}
                  control={
                    <Checkbox
                      checked={filters.selectedSizes.includes(size)}
                      onChange={() => toggleSize(size)}
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {size}
                    </Typography>
                  }
                  sx={{ minWidth: 'auto', mr: 0 }}
                />
              ))}
            </Box>
          </FormGroup>
        </FormControl>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Color Filter */}
      <Box sx={{ mb: 3 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>
            Color
          </FormLabel>
          <FormGroup>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {colors.map((color) => (
                <FormControlLabel
                  key={color}
                  control={
                    <Checkbox
                      checked={filters.selectedColors.includes(color)}
                      onChange={() => toggleColor(color)}
                      size="small"
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          backgroundColor: color.toLowerCase(),
                          border: '1px solid #d1d5db',
                        }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {color}
                      </Typography>
                    </Box>
                  }
                  sx={{ minWidth: 'auto', mr: 0 }}
                />
              ))}
            </Box>
          </FormGroup>
        </FormControl>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Technology Filter */}
      <Box sx={{ mb: 3 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>
            Technology
          </FormLabel>
          <FormGroup>
            {technologies.map((tech) => (
              <FormControlLabel
                key={tech}
                control={
                  <Checkbox
                    checked={filters.selectedTechnology.includes(tech)}
                    onChange={() => toggleTechnology(tech)}
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {tech}
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        </FormControl>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Price Range Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
          Price Range
        </Typography>
        <Box sx={{ px: 1 }}>
          <Slider
            value={filters.priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={200}
            step={5}
            sx={{
              '& .MuiSlider-thumb': {
                backgroundColor: 'primary.main',
              },
              '& .MuiSlider-track': {
                backgroundColor: 'primary.main',
              },
              '& .MuiSlider-rail': {
                backgroundColor: 'grey.300',
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              ${filters.priceRange[0]}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ${filters.priceRange[1]}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Reset Filters Button */}
      {activeFiltersCount > 0 && (
        <Box sx={{ mt: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Clear />}
            onClick={resetFilters}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              py: 1.25,
              borderColor: 'grey.300',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'error.main',
                color: 'error.main',
                backgroundColor: 'rgba(211, 47, 47, 0.04)',
              },
            }}
          >
            Reset All Filters
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FiltersPanel;
