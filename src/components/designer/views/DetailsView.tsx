import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Grid,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useDesignerStore } from '../../../stores/designerStore';
import { useSidebarStore } from '../../../stores/sidebarStore';
import EnhancedDesignerSidebar from '../EnhancedDesignerSidebar';
import ProfessionalToolPanel from '../ProfessionalToolPanel';

const DetailsView: React.FC = () => {
  const { details, updateDetails } = useDesignerStore();
  const { activeTool } = useSidebarStore();
  const [newTag, setNewTag] = useState('');
  const [useMetric, setUseMetric] = useState(true);

  const handleAddTag = () => {
    if (newTag.trim() && !details.tags.includes(newTag.trim())) {
      updateDetails({ tags: [...details.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    updateDetails({ tags: details.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleInputChange = (field: keyof typeof details, value: any) => {
    updateDetails({ [field]: value });
  };

  const sizeChart = useMetric ? [
    { size: 'XS', chest: '86-91', length: '66', shoulders: '38' },
    { size: 'S', chest: '91-96', length: '68', shoulders: '39' },
    { size: 'M', chest: '96-101', length: '70', shoulders: '40' },
    { size: 'L', chest: '101-106', length: '72', shoulders: '41' },
    { size: 'XL', chest: '106-111', length: '74', shoulders: '42' },
    { size: 'XXL', chest: '111-116', length: '76', shoulders: '43' },
  ] : [
    { size: 'XS', chest: '34-36', length: '26', shoulders: '15' },
    { size: 'S', chest: '36-38', length: '27', shoulders: '15.5' },
    { size: 'M', chest: '38-40', length: '28', shoulders: '16' },
    { size: 'L', chest: '40-42', length: '29', shoulders: '16.5' },
    { size: 'XL', chest: '42-44', length: '30', shoulders: '17' },
    { size: 'XXL', chest: '44-46', length: '31', shoulders: '17.5' },
  ];

  return (
    <>
      {/* Enhanced Left Sidebar */}
      <EnhancedDesignerSidebar />

      {/* Professional Tool Panel - Only show when a tool is selected */}
      {activeTool && <ProfessionalToolPanel isVisible={true} />}

      {/* Main Content - Now centered and clean */}
      <Box sx={{ 
        flex: 1, 
        p: 3,
        ml: '64px', // Account for collapsed sidebar width
      }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
            Product Details
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure your product information, sizing, and care instructions
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Basic Information */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: 'fit-content' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Basic Information
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Product Title"
                  value={details.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter product title..."
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={details.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your product..."
                  sx={{ mb: 2 }}
                />
                
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {details.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => handleRemoveTag(tag)}
                      deleteIcon={<Delete />}
                      size="small"
                    />
                  ))}
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <TextField
                    size="small"
                    placeholder="Add tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    sx={{ flex: 1 }}
                  />
                  <Button
                    variant="outlined"
                    onClick={handleAddTag}
                    disabled={!newTag.trim()}
                    startIcon={<Add />}
                  >
                    Add
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Size Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: 'fit-content' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Size Chart
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={useMetric}
                      onChange={(e) => setUseMetric(e.target.checked)}
                    />
                  }
                  label={useMetric ? 'Metric (cm)' : 'Imperial (inches)'}
                />
              </Box>
              
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Size</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Chest</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Length</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Shoulders</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sizeChart.map((row) => (
                      <TableRow key={row.size}>
                        <TableCell sx={{ fontWeight: 600 }}>{row.size}</TableCell>
                        <TableCell>{row.chest}</TableCell>
                        <TableCell>{row.length}</TableCell>
                        <TableCell>{row.shoulders}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Care Instructions */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Care Instructions
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Washing Instructions"
                    value={details.careInstructions.washing}
                    onChange={(e) => handleInputChange('careInstructions', {
                      ...details.careInstructions,
                      washing: e.target.value
                    })}
                    placeholder="e.g., Machine wash cold, gentle cycle..."
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Drying Instructions"
                    value={details.careInstructions.drying}
                    onChange={(e) => handleInputChange('careInstructions', {
                      ...details.careInstructions,
                      drying: e.target.value
                    })}
                    placeholder="e.g., Tumble dry low, or air dry..."
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Ironing Instructions"
                    value={details.careInstructions.ironing}
                    onChange={(e) => handleInputChange('careInstructions', {
                      ...details.careInstructions,
                      ironing: e.target.value
                    })}
                    placeholder="e.g., Iron on low heat if needed..."
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Additional Care Notes"
                    value={details.careInstructions.additional}
                    onChange={(e) => handleInputChange('careInstructions', {
                      ...details.careInstructions,
                      additional: e.target.value
                    })}
                    placeholder="Any additional care information..."
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DetailsView;
