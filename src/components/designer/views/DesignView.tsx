import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Fab,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Add, Build } from '@mui/icons-material';
import { useDesignerStore } from '../../../stores/designerStore';
import { useSidebarStore } from '../../../stores/sidebarStore';
import EnhancedDesignerSidebar from '../EnhancedDesignerSidebar';
import ProfessionalToolPanel from '../ProfessionalToolPanel';
import FloatingMiniToolbar from '../FloatingMiniToolbar';

const DesignView: React.FC = () => {
  const { printAreas, togglePrintArea } = useDesignerStore();
  const { activeTool } = useSidebarStore();
  const [showMiniToolbar, setShowMiniToolbar] = useState(false);

  return (
    <>
      {/* Enhanced Left Sidebar */}
      <EnhancedDesignerSidebar />

      {/* Professional Tool Panel - Only show when a tool is selected */}
      {activeTool && <ProfessionalToolPanel isVisible={true} />}

      {/* Canvas Area - Now centered and clean */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        p: 2,
        ml: '64px', // Account for collapsed sidebar width
      }}>
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
            minHeight: '60vh',
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

      {/* Floating Mini Toolbar Toggle */}
      <Tooltip title="Toggle Mini Toolbar" placement="left">
        <IconButton
          onClick={() => setShowMiniToolbar(!showMiniToolbar)}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
            zIndex: 1000,
          }}
        >
          <Build />
        </IconButton>
      </Tooltip>

      {/* Floating Mini Toolbar */}
      <FloatingMiniToolbar
        isVisible={showMiniToolbar}
        onToggleVisibility={() => setShowMiniToolbar(false)}
      />
    </>
  );
};

export default DesignView;
