import React from 'react';
import { Box, Typography, Paper, Button, Grid, Card, CardContent, Chip } from '@mui/material';
import { useSidebarStore } from '../../../stores/sidebarStore';
import EnhancedDesignerSidebar from '../EnhancedDesignerSidebar';
import ProfessionalToolPanel from '../ProfessionalToolPanel';

const DesignView: React.FC = () => {
  const { activeTool } = useSidebarStore();

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {/* Left Sidebar */}
      <EnhancedDesignerSidebar />
      
      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Design Canvas */}
        <Box sx={{ flex: 1, p: 3 }}>
          <Paper 
            elevation={2} 
            sx={{ 
              height: '100%', 
              bgcolor: '#f8f9fa',
              border: '2px dashed #dee2e6',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ mb: 2, color: '#6c757d' }}>
                Design Canvas
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Use the tools on the left to create your t-shirt design
              </Typography>
              <Button variant="contained" size="large">
                Start Designing
              </Button>
            </Box>
          </Paper>
        </Box>
        
        {/* Print Areas Footer */}
        <Paper sx={{ p: 2, mx: 3, mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Print Areas
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {['Front', 'Back', 'Inner Neck', 'Outer Neck', 'Left Sleeve', 'Right Sleeve'].map((area) => (
              <Chip key={area} label={area} size="small" variant="outlined" />
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Right Tool Panel */}
      {activeTool && <ProfessionalToolPanel />}
    </Box>
  );
};

export default DesignView;
