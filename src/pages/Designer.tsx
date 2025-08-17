import React, { useEffect, useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import {
  Save,
  Preview,
  ArrowBack,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DesignerStepTabs from '../components/designer/DesignerStepTabs';
import EnhancedDesignerSidebar from '../components/designer/EnhancedDesignerSidebar';
import DesignerContent from '../components/designer/DesignerContent';

const Designer: React.FC = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log('Designer component mounted');
    setIsLoaded(true);
  }, []);

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
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Enhanced Left Sidebar */}
      <EnhancedDesignerSidebar />

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top App Bar */}
        <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary' }}>
          <Toolbar>
            <IconButton edge="start" onClick={handleBack} sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" sx={{ flex: 1, fontWeight: 600 }}>
              Designer - Short Sleeve T-Shirt
            </Typography>
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
          <DesignerContent />
        </Box>
      </Box>
    </Box>
  );
};

export default Designer;
