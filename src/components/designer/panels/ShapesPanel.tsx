import React, { useState } from 'react';
import {
  Box, Typography, Button, Grid, TextField, FormControl, InputLabel,
  Select, MenuItem, Slider, Divider, Alert
} from '@mui/material';
import {
  CropSquare, RadioButtonUnchecked, Star, ShowChart, Rectangle,
  Circle, Star as StarIcon, ShowChart as LineIcon
} from '@mui/icons-material';
import { useCanvasService } from '../../../services/canvasService';

const ShapesPanel: React.FC = () => {
  const canvasService = useCanvasService();
  
  const [selectedShape, setSelectedShape] = useState('rect');
  const [shapeProps, setShapeProps] = useState({
    width: 100,
    height: 100,
    radius: 50,
    fill: '#3B82F6',
    stroke: '#1E40AF',
    strokeWidth: 2
  });

  const shapes = [
    { id: 'rect', label: 'Rectangle', icon: <CropSquare /> },
    { id: 'circle', label: 'Circle', icon: <RadioButtonUnchecked /> },
    { id: 'star', label: 'Star', icon: <Star /> },
    { id: 'line', label: 'Line', icon: <ShowChart /> }
  ];

  const handleAddShape = () => {
    canvasService.addShape({
      type: selectedShape,
      props: shapeProps
    });
  };

  const handlePropertyChange = (property: string, value: number | string) => {
    setShapeProps(prev => ({
      ...prev,
      [property]: value
    }));
  };

  const isSelectionShape = canvasService.getSelection().type === 'shape';

  return (
    <Box sx={{ p: 3 }}>
      {/* Shape Selection */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Add Shapes
        </Typography>
        
        <Grid container spacing={1} sx={{ mb: 2 }}>
          {shapes.map((shape) => (
            <Grid item xs={6} key={shape.id}>
              <Button
                fullWidth
                variant={selectedShape === shape.id ? 'contained' : 'outlined'}
                startIcon={shape.icon}
                onClick={() => setSelectedShape(shape.id)}
                sx={{ py: 2 }}
              >
                {shape.label}
              </Button>
            </Grid>
          ))}
        </Grid>
        
        <Button
          fullWidth
          variant="contained"
          onClick={handleAddShape}
          sx={{ mb: 2 }}
        >
          Add {shapes.find(s => s.id === selectedShape)?.label} to Canvas
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Shape Properties */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Shape Properties
        </Typography>
        
        {/* Size Properties */}
        {selectedShape === 'rect' && (
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Width"
                type="number"
                value={shapeProps.width}
                onChange={(e) => handlePropertyChange('width', parseInt(e.target.value) || 0)}
                inputProps={{ min: 10, max: 500 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Height"
                type="number"
                value={shapeProps.height}
                onChange={(e) => handlePropertyChange('height', parseInt(e.target.value) || 0)}
                inputProps={{ min: 10, max: 500 }}
              />
            </Grid>
          </Grid>
        )}
        
        {selectedShape === 'circle' && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Radius: {shapeProps.radius}px
            </Typography>
            <Slider
              value={shapeProps.radius}
              onChange={(_, value) => handlePropertyChange('radius', value as number)}
              min={10}
              max={200}
              step={1}
              marks={[
                { value: 10, label: '10' },
                { value: 100, label: '100' },
                { value: 200, label: '200' }
              ]}
            />
          </Box>
        )}
        
        {/* Style Properties */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Fill Color
          </Typography>
          <TextField
            fullWidth
            type="color"
            value={shapeProps.fill}
            onChange={(e) => handlePropertyChange('fill', e.target.value)}
            sx={{ '& input': { height: 40 } }}
          />
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Stroke Color
          </Typography>
          <TextField
            fullWidth
            type="color"
            value={shapeProps.stroke}
            onChange={(e) => handlePropertyChange('stroke', e.target.value)}
            sx={{ '& input': { height: 40 } }}
          />
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Stroke Width: {shapeProps.strokeWidth}px
          </Typography>
          <Slider
            value={shapeProps.strokeWidth}
            onChange={(_, value) => handlePropertyChange('strokeWidth', value as number)}
            min={0}
            max={20}
            step={1}
            marks={[
              { value: 0, label: '0' },
              { value: 5, label: '5' },
              { value: 10, label: '10' },
              { value: 20, label: '20' }
            ]}
          />
        </Box>
      </Box>

      {/* Quick Presets */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Quick Presets
        </Typography>
        
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setShapeProps({
                  ...shapeProps,
                  fill: '#3B82F6',
                  stroke: '#1E40AF',
                  strokeWidth: 2
                });
              }}
              sx={{ mb: 1 }}
            >
              Blue Theme
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setShapeProps({
                  ...shapeProps,
                  fill: '#10B981',
                  stroke: '#059669',
                  strokeWidth: 2
                });
              }}
              sx={{ mb: 1 }}
            >
              Green Theme
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setShapeProps({
                  ...shapeProps,
                  fill: '#F59E0B',
                  stroke: '#D97706',
                  strokeWidth: 2
                });
              }}
              sx={{ mb: 1 }}
            >
              Orange Theme
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setShapeProps({
                  ...shapeProps,
                  fill: '#EF4444',
                  stroke: '#DC2626',
                  strokeWidth: 2
                });
              }}
              sx={{ mb: 1 }}
            >
              Red Theme
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Selection Helper */}
      {isSelectionShape && (
        <Alert severity="info" sx={{ mt: 3 }}>
          <Typography variant="body2">
            Shape element selected. You can modify its properties using the controls above.
          </Typography>
        </Alert>
      )}
    </Box>
  );
};

export default ShapesPanel;
