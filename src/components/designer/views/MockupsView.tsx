import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Star, StarBorder, CheckCircle } from '@mui/icons-material';
import { useDesignerStore } from '../../../stores/designerStore';
import { useSidebarStore } from '../../../stores/sidebarStore';
import EnhancedDesignerSidebar from '../EnhancedDesignerSidebar';
import ProfessionalToolPanel from '../ProfessionalToolPanel';

const MockupsView: React.FC = () => {
  const { mockups, setPrimaryMockup } = useDesignerStore();
  const { activeTool } = useSidebarStore();

  const handleSetPrimary = (mockupId: string) => {
    setPrimaryMockup(mockupId);
  };

  return (
    <>
      {/* Enhanced Left Sidebar */}
      <EnhancedDesignerSidebar />

      {/* Right Tool Panel */}
      {activeTool && <ProfessionalToolPanel />}

      {/* Main Content - Now centered and clean */}
      <Box sx={{ 
        flex: 1, 
        p: 3,
        ml: '64px', // Account for collapsed sidebar width
      }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
            Product Mockups
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Choose and customize mockups for your design
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {mockups.map((mockup) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={mockup.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 8,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={mockup.imageUrl}
                  alt={mockup.name}
                  sx={{ objectFit: 'cover' }}
                />
                
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {mockup.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      {mockup.isPrimary ? (
                        <CheckCircle color="primary" />
                      ) : (
                        <IconButton
                          size="small"
                          onClick={() => handleSetPrimary(mockup.id)}
                          sx={{ color: 'text.secondary' }}
                        >
                          <StarBorder />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {mockup.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    {mockup.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      fullWidth
                      onClick={() => handleSetPrimary(mockup.id)}
                      disabled={mockup.isPrimary}
                    >
                      {mockup.isPrimary ? 'Primary Mockup' : 'Set as Primary'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default MockupsView;
