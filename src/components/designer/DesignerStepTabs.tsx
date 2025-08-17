import React from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  useTheme,
} from '@mui/material';
import { useDesignerStore, DesignerStep } from '../../stores/designerStore';

const DESIGN_STEPS: Array<{ step: DesignerStep; label: string; description: string }> = [
  { step: 'design', label: 'Design', description: 'Create your design' },
  { step: 'mockups', label: 'Mockups', description: 'Choose product views' },
  { step: 'details', label: 'Details', description: 'Product information' },
  { step: 'prices', label: 'Prices', description: 'Set pricing & margins' },
  { step: 'review', label: 'Review', description: 'Finalize & save' },
];

const DesignerStepTabs: React.FC = () => {
  const theme = useTheme();
  const { activeStep, setActiveStep, canNavigateToStep, stepValidation } = useDesignerStore();

  const handleStepChange = (event: React.SyntheticEvent, newStep: DesignerStep) => {
    if (canNavigateToStep(newStep)) {
      setActiveStep(newStep);
    }
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#fafafa' }}>
      <Tabs
        value={activeStep}
        onChange={handleStepChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          '& .MuiTab-root': {
            minHeight: 64,
            textTransform: 'none',
            fontWeight: 500,
            opacity: 0.7,
            '&.Mui-selected': {
              opacity: 1,
            },
          },
          '& .MuiTabs-indicator': {
            height: 3,
          },
        }}
      >
        {DESIGN_STEPS.map((stepData, index) => {
          const isActive = activeStep === stepData.step;
          const canNavigate = canNavigateToStep(stepData.step);
          const isValid = stepValidation[stepData.step];
          
          return (
            <Tab
              key={stepData.step}
              value={stepData.step}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: isActive 
                        ? 'primary.main' 
                        : canNavigate 
                          ? 'grey.400' 
                          : 'grey.300',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      position: 'relative',
                    }}
                  >
                    {index + 1}
                    {isValid && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -2,
                          right: -2,
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: 'success.main',
                          border: '2px solid white',
                        }}
                      />
                    )}
                  </Box>
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {stepData.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stepData.description}
                    </Typography>
                  </Box>
                </Box>
              }
              disabled={!canNavigate}
              sx={{
                opacity: canNavigate ? 1 : 0.5,
                cursor: canNavigate ? 'pointer' : 'not-allowed',
              }}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default DesignerStepTabs;
