import React from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Divider,
  Alert,
} from '@mui/material';
import { useDesignerStore } from '../../stores/designerStore';

export default function SelectedInspector() {
  const selection = useDesignerStore((s) => s.selection);
  const obj = useDesignerStore((s) => s.scene.objects.find((o) => o.id === selection[0]));
  const updateObject = useDesignerStore((s) => s.updateObject);

  if (!obj || selection.length !== 1) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Select one object to edit its properties.
        </Typography>
      </Box>
    );
  }

  if (obj.type === 'text') {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Text Properties
        </Typography>
        
        <TextField
          fullWidth
          label="Text Content"
          value={obj.text}
          onChange={(e) => updateObject(obj.id, { text: e.target.value })}
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          label="Font Family"
          value={obj.fontFamily}
          onChange={(e) => updateObject(obj.id, { fontFamily: e.target.value })}
          sx={{ mb: 2 }}
        />
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Font Size: {obj.fontSize}px
          </Typography>
          <Slider
            value={obj.fontSize}
            onChange={(_, value) => updateObject(obj.id, { fontSize: value as number })}
            min={8}
            max={200}
            step={1}
            marks={[
              { value: 8, label: '8' },
              { value: 32, label: '32' },
              { value: 64, label: '64' },
              { value: 128, label: '128' },
              { value: 200, label: '200' }
            ]}
          />
        </Box>
        
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Text Alignment</InputLabel>
          <Select
            value={obj.align}
            label="Text Alignment"
            onChange={(e) => updateObject(obj.id, { align: e.target.value as any })}
          >
            <MenuItem value="left">Left</MenuItem>
            <MenuItem value="center">Center</MenuItem>
            <MenuItem value="right">Right</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          fullWidth
          label="Text Color"
          type="color"
          value={obj.fill}
          onChange={(e) => updateObject(obj.id, { fill: e.target.value })}
          sx={{ mb: 2, '& input': { height: 40 } }}
        />
        
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Font Style</InputLabel>
          <Select
            value={obj.fontStyle || 'normal'}
            label="Font Style"
            onChange={(e) => updateObject(obj.id, { fontStyle: e.target.value as any })}
          >
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="bold">Bold</MenuItem>
            <MenuItem value="italic">Italic</MenuItem>
            <MenuItem value="bold italic">Bold Italic</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }

  if (obj.type === 'image') {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Image Properties
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Opacity: {Math.round((obj.opacity || 1) * 100)}%
          </Typography>
          <Slider
            value={obj.opacity || 1}
            onChange={(_, value) => updateObject(obj.id, { opacity: value as number })}
            min={0}
            max={1}
            step={0.05}
            marks={[
              { value: 0, label: '0%' },
              { value: 0.5, label: '50%' },
              { value: 1, label: '100%' }
            ]}
          />
        </Box>
        
        <TextField
          fullWidth
          label="Width"
          type="number"
          value={obj.width || 0}
          onChange={(e) => updateObject(obj.id, { width: Number(e.target.value) })}
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          label="Height"
          type="number"
          value={obj.height || 0}
          onChange={(e) => updateObject(obj.id, { height: Number(e.target.value) })}
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          label="Rotation"
          type="number"
          value={obj.rotation || 0}
          onChange={(e) => updateObject(obj.id, { rotation: Number(e.target.value) })}
          sx={{ mb: 2 }}
          inputProps={{ step: 1, min: 0, max: 360 }}
        />
      </Box>
    );
  }

  // Shape object
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Shape Properties
      </Typography>
      
      <TextField
        fullWidth
        label="Fill Color"
        type="color"
        value={obj.fill || '#000000'}
        onChange={(e) => updateObject(obj.id, { fill: e.target.value })}
        sx={{ mb: 2, '& input': { height: 40 } }}
      />
      
      <TextField
        fullWidth
        label="Stroke Color"
        type="color"
        value={obj.stroke || '#000000'}
        onChange={(e) => updateObject(obj.id, { stroke: e.target.value })}
        sx={{ mb: 2, '& input': { height: 40 } }}
      />
      
      <TextField
        fullWidth
        label="Stroke Width"
        type="number"
        value={obj.strokeWidth || 2}
        onChange={(e) => updateObject(obj.id, { strokeWidth: Number(e.target.value) })}
        sx={{ mb: 2 }}
        inputProps={{ min: 0, step: 1 }}
      />
      
      <TextField
        fullWidth
        label="Width"
        type="number"
        value={obj.width || 0}
        onChange={(e) => updateObject(obj.id, { width: Number(e.target.value) })}
        sx={{ mb: 2 }}
        inputProps={{ min: 1 }}
      />
      
      <TextField
        fullWidth
        label="Height"
        type="number"
        value={obj.height || 0}
        onChange={(e) => updateObject(obj.id, { height: Number(e.target.value) })}
        sx={{ mb: 2 }}
        inputProps={{ min: 1 }}
      />
      
      <TextField
        fullWidth
        label="Rotation"
        type="number"
        value={obj.rotation || 0}
        onChange={(e) => updateObject(obj.id, { rotation: Number(e.target.value) })}
        sx={{ mb: 2 }}
        inputProps={{ step: 1, min: 0, max: 360 }}
      />
      
      {obj.shape === 'rect' && (
        <TextField
          fullWidth
          label="Corner Radius"
          type="number"
          value={obj.cornerRadius || 0}
          onChange={(e) => updateObject(obj.id, { cornerRadius: Number(e.target.value) })}
          sx={{ mb: 2 }}
          inputProps={{ min: 0, step: 1 }}
        />
      )}
    </Box>
  );
}
