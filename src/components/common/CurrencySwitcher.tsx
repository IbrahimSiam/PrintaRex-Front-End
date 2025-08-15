import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import { CurrencyExchange } from '@mui/icons-material';
import { useUIStore } from '../../stores/uiStore';
import { getCurrencySymbol, getCurrencyName } from '../../utils/currency';
import { Currency } from '../../stores/uiStore';

const CurrencySwitcher: React.FC = () => {
  const { currency, setCurrency } = useUIStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title="Switch Currency">
        <IconButton
          onClick={handleClick}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
              color: 'primary.main',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CurrencyExchange sx={{ fontSize: 20 }} />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: 'primary.main',
                fontSize: '0.875rem',
              }}
            >
              {getCurrencySymbol(currency)}
            </Typography>
          </Box>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 120,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            borderRadius: 2,
          },
        }}
      >
        <MenuItem
          onClick={() => handleCurrencyChange('AED')}
          selected={currency === 'AED'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            py: 1.5,
            px: 2,
            '&.Mui-selected': {
              backgroundColor: 'primary.50',
              color: 'primary.main',
              fontWeight: 600,
            },
          }}
        >
          <span style={{ fontSize: '1rem' }}>🇦🇪</span>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {getCurrencyName('AED')}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              ml: 'auto',
              color: 'text.secondary',
              fontWeight: 600,
            }}
          >
            {getCurrencySymbol('AED')}
          </Typography>
        </MenuItem>

        <MenuItem
          onClick={() => handleCurrencyChange('EGP')}
          selected={currency === 'EGP'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            py: 1.5,
            px: 2,
            '&.Mui-selected': {
              backgroundColor: 'primary.50',
              color: 'primary.main',
              fontWeight: 600,
            },
          }}
        >
          <span style={{ fontSize: '1rem' }}>🇪🇬</span>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {getCurrencyName('EGP')}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              ml: 'auto',
              color: 'text.secondary',
              fontWeight: 600,
            }}
          >
            {getCurrencySymbol('EGP')}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default CurrencySwitcher;
