import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
} from '@mui/material';
import { useDesignerStore } from '../../../stores/designerStore';
import DesignerSidebar from '../DesignerSidebar';

const DetailsView: React.FC = () => {
  const { 
    productDetails, 
    updateProductDetails, 
    setStepValidation 
  } = useDesignerStore();

  // Validate details step (title is required)
  useEffect(() => {
    const isValid = productDetails.title.trim().length > 0;
    setStepValidation('details', isValid);
  }, [productDetails.title, setStepValidation]);

  const handleTitleChange = (title: string) => {
    updateProductDetails({ title });
  };

  const handleDescriptionChange = (description: string) => {
    updateProductDetails({ description });
  };

  const handleCareInstructionsChange = (careInstructions: string) => {
    updateProductDetails({ careInstructions });
  };

  const handleSizeTableToggle = (metric: boolean) => {
    updateProductDetails({
      sizeTable: { ...productDetails.sizeTable, metric }
    });
  };

  const handleTagAdd = (tag: string) => {
    if (tag.trim() && !productDetails.tags.includes(tag.trim())) {
      updateProductDetails({
        tags: [...productDetails.tags, tag.trim()]
      });
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    updateProductDetails({
      tags: productDetails.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <>
      {/* Left Sidebar */}
      <DesignerSidebar />
      
      {/* Main Content - Product Details Form */}
      <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Product Details
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Fill in the essential information about your product.
        </Typography>
        
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Basic Information</Typography>
                
                <TextField
                  fullWidth
                  label="Product Title *"
                  value={productDetails.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  sx={{ mb: 3 }}
                  required
                  error={!productDetails.title.trim()}
                  helperText={!productDetails.title.trim() ? 'Title is required' : ''}
                />
                
                <TextField
                  fullWidth
                  label="Description"
                  value={productDetails.description}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                  multiline
                  rows={4}
                  sx={{ mb: 3 }}
                />
                
                <TextField
                  fullWidth
                  label="Care Instructions"
                  value={productDetails.careInstructions}
                  onChange={(e) => handleCareInstructionsChange(e.target.value)}
                  multiline
                  rows={3}
                  placeholder="e.g., Machine wash cold, tumble dry low"
                />
              </CardContent>
            </Card>
            
            {/* Tags */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Tags</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Add relevant tags to help customers find your product
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {productDetails.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => handleTagRemove(tag)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
                
                <TextField
                  fullWidth
                  label="Add Tag"
                  placeholder="Enter a tag and press Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleTagAdd((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                  size="small"
                />
              </CardContent>
            </Card>
          </Grid>
          
          {/* Size Chart */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Size Chart</Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={productDetails.sizeTable.metric}
                        onChange={(e) => handleSizeTableToggle(e.target.checked)}
                      />
                    }
                    label={productDetails.sizeTable.metric ? 'Metric (cm)' : 'Imperial (inches)'}
                  />
                </Box>
                
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Size</TableCell>
                        <TableCell align="center">
                          Chest ({productDetails.sizeTable.metric ? 'cm' : 'inches'})
                        </TableCell>
                        <TableCell align="center">
                          Length ({productDetails.sizeTable.metric ? 'cm' : 'inches'})
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productDetails.sizeTable.sizes.map((size) => (
                        <TableRow key={size.size}>
                          <TableCell sx={{ fontWeight: 600 }}>{size.size}</TableCell>
                          <TableCell align="center">
                            {productDetails.sizeTable.metric ? size.chest : size.chestInch}
                          </TableCell>
                          <TableCell align="center">
                            {productDetails.sizeTable.metric ? size.length : size.lengthInch}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Size chart helps customers choose the right fit for their body type.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Right Panel - Quick Actions */}
      <Box sx={{ width: 400, borderLeft: '1px solid #e0e0e0', overflow: 'auto' }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Quick Actions
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Required Fields</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: productDetails.title.trim() ? 'success.main' : 'error.main',
                  }}
                />
                <Typography variant="body2">Product Title</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'success.main',
                  }}
                />
                <Typography variant="body2">Size Chart</Typography>
              </Box>
            </Box>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Tips</Typography>
            <Typography variant="body2" color="text.secondary">
              • Write a clear, descriptive title that includes key features
              • Use the description to highlight benefits and use cases
              • Include care instructions to help customers maintain the product
              • Add relevant tags for better discoverability
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            fullWidth
            disabled={!productDetails.title.trim()}
            sx={{ mt: 2 }}
          >
            Continue to Pricing
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default DetailsView;
