import React from 'react';
import { Box } from '@mui/material';
import { useDesignerStore } from '../../stores/designerStore';
import DesignView from './views/DesignView';
import MockupsView from './views/MockupsView';
import DetailsView from './views/DetailsView';
import PricesView from './views/PricesView';
import ReviewView from './views/ReviewView';

const DesignerContent: React.FC = () => {
  const { activeStep } = useDesignerStore();

  const renderStepContent = () => {
    switch (activeStep) {
      case 'design':
        return <DesignView />;
      case 'mockups':
        return <MockupsView />;
      case 'details':
        return <DetailsView />;
      case 'prices':
        return <PricesView />;
      case 'review':
        return <ReviewView />;
      default:
        return <DesignView />;
    }
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      {renderStepContent()}
    </Box>
  );
};

export default DesignerContent;
