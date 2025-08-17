import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Fab,
  Card,
  CardContent,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useDesignerStore } from '../../../stores/designerStore';
import DesignerSidebar from '../DesignerSidebar';

const DesignView: React.FC = () => {
  const { printAreas, togglePrintArea } = useDesignerStore();

  return (
    <>
      {/* Left Sidebar */}
      <DesignerSidebar />
      
      {/* Canvas Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        {/* Canvas */}
        <Box
          sx={{
            flex: 1,
            bgcolor: '#f8f9fa',
            border: '2px dashed #dee2e6',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            position: 'relative',
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Design Canvas
          </Typography>
          <Fab
            color="primary"
            size="small"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
          >
            <Add />
          </Fab>
        </Box>

        {/* Print Areas Footer */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Print Areas
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {printAreas.map((area) => (
              <Chip
                key={area.id}
                label={area.name}
                color={area.active ? 'primary' : 'default'}
                variant={area.active ? 'filled' : 'outlined'}
                onClick={() => togglePrintArea(area.id)}
                size="small"
              />
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Right Panel - Design Tips */}
      <Box sx={{ width: 400, borderLeft: '1px solid #e0e0e0', overflow: 'auto' }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Design Your Product
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Use the tools on the left to add text, graphics, and customize your design.
          </Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>Design Tips</Typography>
              <Typography variant="body2" color="text.secondary">
                • Keep text readable and appropriately sized
                • Use high-quality images (300 DPI minimum)
                • Consider print area limitations
                • Test different color combinations
              </Typography>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>Print Areas</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Select which areas of your product will have printing:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {printAreas.map((area) => (
                  <Chip
                    key={area.id}
                    label={area.name}
                    color={area.active ? 'primary' : 'default'}
                    onClick={() => togglePrintArea(area.id)}
                    size="small"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default DesignView;
