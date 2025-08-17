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
import TShirts from '../pages/TShirts';
import ShortSleeveTShirt from '../pages/ShortSleeveTShirt';
import OversizeTShirt from '../pages/OversizeTShirt';
import PoloShirt from '../pages/PoloShirt';
import SoftstyleComfortTShirt from '../pages/SoftstyleComfortTShirt';
import SlimFitTShirt from '../pages/SlimFitTShirt';
import WomensTShirts from '../pages/WomensTShirts';
import WomensShortSleeveCropTop from '../pages/WomensShortSleeveCropTop';
import WomensLongSleeveCropTop from '../pages/WomensLongSleeveCropTop';
import WomensShortSleeve from '../pages/WomensShortSleeve';
import WomensOversize from '../pages/WomensOversize';
import WomensPolo from '../pages/WomensPolo';
import WomensSoftstyleComfort from '../pages/WomensSoftstyleComfort';
import WomensSlimFit from '../pages/WomensSlimFit';
import WomensClassicTShirt from '../pages/WomensClassicTShirt';
import WomensFashionTShirt from '../pages/WomensFashionTShirt';
import WomensComfortTShirt from '../pages/WomensComfortTShirt';
import WomensPremiumTShirt from '../pages/WomensPremiumTShirt';
import WomensSportTShirt from '../pages/WomensSportTShirt';
import SalesChannels from '../pages/SalesChannels';
import BrandedPackaging from '../pages/BrandedPackaging';
import Insights from '../pages/Insights';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';

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
          <Route path="/app/t-shirts" element={<TShirts />} />
          <Route path="/app/short-sleeve-t-shirt" element={<ShortSleeveTShirt />} />
          <Route path="/app/oversize-t-shirt" element={<OversizeTShirt />} />
          <Route path="/app/polo-shirt" element={<PoloShirt />} />
          <Route path="/app/softstyle-comfort-t-shirt" element={<SoftstyleComfortTShirt />} />
          <Route path="/app/slim-fit-t-shirt" element={<SlimFitTShirt />} />
          <Route path="/app/womens-t-shirts" element={<WomensTShirts />} />
          <Route path="/app/womens-classic-t-shirt" element={<WomensClassicTShirt />} />
          <Route path="/app/womens-fashion-t-shirt" element={<WomensFashionTShirt />} />
          <Route path="/app/womens-comfort-t-shirt" element={<WomensComfortTShirt />} />
          <Route path="/app/womens-premium-t-shirt" element={<WomensPremiumTShirt />} />
          <Route path="/app/womens-sport-t-shirt" element={<WomensSportTShirt />} />
          <Route path="/app/womens-short-sleeve-crop-top" element={<WomensShortSleeveCropTop />} />
          <Route path="/app/womens-long-sleeve-crop-top" element={<WomensLongSleeveCropTop />} />
          <Route path="/app/womens-short-sleeve" element={<WomensShortSleeve />} />
          <Route path="/app/womens-oversize" element={<WomensOversize />} />
          <Route path="/app/womens-polo" element={<WomensPolo />} />
          <Route path="/app/womens-softstyle-comfort" element={<WomensSoftstyleComfort />} />
          <Route path="/app/womens-slim-fit" element={<WomensSlimFit />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/stores" element={<SalesChannels />} />
          <Route path="/branded-packing" element={<BrandedPackaging />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
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
