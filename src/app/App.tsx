import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { useUIStore } from '../stores/uiStore';
import Landing from '../pages/Landing';
import Catalog from '../pages/Catalog';
import Designer from '../pages/Designer';
import Checkout from '../pages/Checkout';
import PlaceholderPage from '../components/PlaceholderPage';

// Create RTL cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create LTR cache
const cacheLtr = createCache({
  key: 'muiltr',
});

const App: React.FC = () => {
  const { isRTL } = useUIStore();

  // Create theme with RTL support
  const theme = createTheme({
    direction: isRTL ? 'rtl' : 'ltr',
    typography: {
      fontFamily: isRTL ? 'Arial, sans-serif' : 'Roboto, Arial, sans-serif',
    },
    components: {
      MuiTextField: {
        defaultProps: {
          inputProps: {
            style: { textAlign: isRTL ? 'right' : 'left' },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            textAlign: isRTL ? 'right' : 'left',
          },
        },
      },
    },
  });

  return (
    <CacheProvider value={isRTL ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app/catalog" element={<Catalog />} />
          <Route path="/app/designer" element={<Designer />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pricing" element={<PlaceholderPage title="Pricing" message="Pricing information will be available soon!" />} />
          <Route path="/support" element={<PlaceholderPage title="Support" message="Support center is coming soon!" />} />
          <Route path="/legal/terms" element={<PlaceholderPage title="Terms of Service" message="Terms of service will be available soon!" />} />
          <Route path="/legal/privacy" element={<PlaceholderPage title="Privacy Policy" message="Privacy policy will be available soon!" />} />
          <Route path="/contact" element={<PlaceholderPage title="Contact" message="Contact information will be available soon!" />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
