import React, { useEffect } from 'react';
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
import { useDesignerStore } from '../stores/designerStore';
import DesignerStepTabs from '../components/designer/DesignerStepTabs';
import DesignerContent from '../components/designer/DesignerContent';

const Designer: React.FC = () => {
  const navigate = useNavigate();
  const { activeStep, setStepValidation } = useDesignerStore();

  // Initialize validation for details step
  useEffect(() => {
    // This will be updated by the DetailsView component
    setStepValidation('details', false);
  }, [setStepValidation]);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePreview = () => {
    console.log('Preview design');
    // Implementation for preview
  };

  const handleSave = () => {
    console.log('Save design');
    // Implementation for save
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
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

        {/* Main Content Area */}
        <DesignerContent />
      </Box>
    </Box>
  );
};

export default Designer;
