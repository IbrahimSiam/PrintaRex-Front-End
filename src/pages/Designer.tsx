import React, { useEffect, useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Save,
  Preview,
  ArrowBack,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import DesignerStepTabs from '../components/designer/DesignerStepTabs';
import EnhancedDesignerSidebar from '../components/designer/EnhancedDesignerSidebar';
import DesignerContent from '../components/designer/DesignerContent';
import RightPanel from '../components/designer/RightPanel';
import { useDesignerStore } from '../stores/designerStore';
import { ProductData } from '../stores/designerStore';
import DesignerProvider from '../components/designer/DesignerProvider';

// Default product data for when navigating directly to designer
const DEFAULT_PRODUCT_DATA: ProductData = {
  productId: 'default-tshirt',
  productName: 'Short Sleeve T-Shirt',
  color: 'black',
  sizeRange: ['S', 'M', 'L', 'XL', 'XXL'],
  technology: 'DTG',
  assetsByColor: {
    black: [
      {
        view: 'front',
        src: '/images/tshirts/black-front.webp',
        printArea: { x: 25, y: 25, width: 200, height: 200 }
      },
      {
        view: 'back',
        src: '/images/tshirts/black-back.webp',
        printArea: { x: 25, y: 25, width: 200, height: 200 }
      },
      {
        view: 'leftSleeve',
        src: '/images/tshirts/black-side-left.webp',
        printArea: { x: 22, y: 28, width: 10, height: 10 }
      },
      {
        view: 'rightSleeve',
        src: '/images/tshirts/black-side-right.webp',
        printArea: { x: 64, y: 28, width: 10, height: 10 }
      },
      {
        view: 'innerNeck',
        src: '/images/tshirts/black-closeup.webp',
        printArea: { x: 41, y: 22, width: 14, height: 8 }
      },
      {
        view: 'outerNeck',
        src: '/images/tshirts/black-lifestyle.webp',
        printArea: { x: 38, y: 18, width: 20, height: 8 }
      }
    ],
    white: [
      {
        view: 'front',
        src: '/images/tshirts/white-front.webp',
        printArea: { x: 25, y: 25, width: 200, height: 200 }
      },
      {
        view: 'back',
        src: '/images/tshirts/white-back.webp',
        printArea: { x: 25, y: 25, width: 200, height: 200 }
      },
      {
        view: 'leftSleeve',
        src: '/images/tshirts/white-side-left.webp',
        printArea: { x: 22, y: 28, width: 10, height: 10 }
      },
      {
        view: 'rightSleeve',
        src: '/images/tshirts/white-side-right.webp',
        printArea: { x: 64, y: 28, width: 10, height: 10 }
      },
      {
        view: 'innerNeck',
        src: '/images/tshirts/white-closeup.webp',
        printArea: { x: 41, y: 22, width: 14, height: 8 }
      },
      {
        view: 'outerNeck',
        src: '/images/tshirts/white-lifestyle.webp',
        printArea: { x: 38, y: 18, width: 20, height: 8 }
      }
    ]
  },
  initialView: 'front'
};

const Designer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const { initFromProduct, setView, setColor, scene } = useDesignerStore();
  
  // Get product data from navigation state or use default
  const productData = location.state?.product || DEFAULT_PRODUCT_DATA;

  useEffect(() => {
    console.log('Designer component mounted');
    console.log('Product data:', productData);
    
    // Always initialize the designer store with product data (either from navigation or default)
    initFromProduct(productData as ProductData);
    
    setIsLoaded(true);
  }, [productData, initFromProduct]);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePreview = () => {
    console.log('Preview design');
  };

  const handleSave = () => {
    console.log('Save design');
  };

  if (!isLoaded) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">Loading Designer...</Typography>
      </Box>
    );
  }

  return (
    <DesignerProvider>
      <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f5f5f5' }}>
        {/* Enhanced Left Sidebar */}
        <EnhancedDesignerSidebar productData={productData} />

        {/* Main Content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Top App Bar */}
          <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary' }}>
            <Toolbar>
              <IconButton edge="start" onClick={handleBack} sx={{ mr: 2 }}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h6" sx={{ flex: 1, fontWeight: 600 }}>
                Designer - {productData?.productName || 'Short Sleeve T-Shirt'}
              </Typography>
              
              {/* View and Color Selectors */}
              <Box sx={{ display: 'flex', gap: 2, mr: 2 }}>
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <Select
                    value={scene.view}
                    onChange={(e) => setView(e.target.value as any)}
                    displayEmpty
                    sx={{ bgcolor: 'background.paper' }}
                  >
                    {['front','back','leftSleeve','rightSleeve','innerNeck','outerNeck'].map((v) => {
                      const hasView = !!(scene && (scene as any) && (useDesignerStore.getState().productData?.assetsByColor[scene.color] || []).find(a => a.view === v));
                      return (
                        <MenuItem key={v} value={v} disabled={!hasView}>
                          {v === 'front' ? 'Front' : v === 'back' ? 'Back' : v === 'leftSleeve' ? 'Left Sleeve' : v === 'rightSleeve' ? 'Right Sleeve' : v === 'innerNeck' ? 'Inner Neck' : 'Outer Neck'}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={scene.color}
                    onChange={(e) => setColor(e.target.value)}
                    displayEmpty
                    sx={{ bgcolor: 'background.paper' }}
                  >
                    <MenuItem value="black">Black</MenuItem>
                    <MenuItem value="white">White</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Button variant="outlined" startIcon={<Preview />} onClick={handlePreview} sx={{ mr: 1 }}>
                Preview
              </Button>
              <Button variant="contained" startIcon={<Save />} onClick={handleSave}>
                Save
              </Button>
            </Toolbar>
          </AppBar>

          {/* Design Steps */}
          <DesignerStepTabs />

          {/* Main Design Content Area */}
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <DesignerContent productData={productData} />
          </Box>
        </Box>

        {/* Right Panel for Tool Options */}
        <RightPanel productData={productData} />
      </Box>
    </DesignerProvider>
  );
};

export default Designer;
