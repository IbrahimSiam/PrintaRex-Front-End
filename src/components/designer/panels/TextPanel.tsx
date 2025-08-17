import React, { useState } from 'react';
import {
  Box, Typography, Button, TextField, FormControl, InputLabel,
  Select, MenuItem, Grid, Slider, Divider, Alert
} from '@mui/material';
import {
  TextFields, FormatBold, FormatItalic, FormatUnderlined,
  FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatAlignJustify
} from '@mui/icons-material';
import { useCanvasService } from '../../../services/canvasService';

const TextPanel: React.FC = () => {
  const canvasService = useCanvasService();
  
  const [textContent, setTextContent] = useState('New Text');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [fontSize, setFontSize] = useState(32);
  const [fontWeight, setFontWeight] = useState<'normal' | 'bold'>('normal');
  const [fontStyle, setFontStyle] = useState<'normal' | 'italic'>('normal');
  const [textDecoration, setTextDecoration] = useState<'none' | 'underline'>('none');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right' | 'justify'>('left');
  const [textColor, setTextColor] = useState('#111827');

  const fontFamilies = [
    'Inter', 'Roboto', 'Arial', 'Helvetica', 'Times New Roman', 'Georgia',
    'Verdana', 'Tahoma', 'Trebuchet MS', 'Impact', 'Comic Sans MS'
  ];

  const handleAddText = () => {
    if (textContent.trim()) {
      canvasService.addText({
        content: textContent,
        font: fontFamily,
        size: fontSize,
        color: textColor
      });
    }
  };

  const handleApplyToSelection = () => {
    const selection = canvasService.getSelection();
    if (selection.type === 'text' && selection.id) {
      // Apply current text settings to selected text
      // This would require additional canvas service methods for updating text properties
      console.log('Applying text properties to selection:', selection.id);
    }
  };

  const isSelectionText = canvasService.getSelection().type === 'text';

  return (
    <Box sx={{ p: 3 }}>
      {/* Add Text Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Add Text
        </Typography>
        
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Enter your text here..."
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        
        <Button
          fullWidth
          variant="contained"
          startIcon={<TextFields />}
          onClick={handleAddText}
          sx={{ mb: 2 }}
        >
          Add Text to Canvas
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Text Properties Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Text Properties
        </Typography>
        
        {/* Font Family */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Font Family</InputLabel>
          <Select
            value={fontFamily}
            label="Font Family"
            onChange={(e) => setFontFamily(e.target.value)}
          >
            {fontFamilies.map((font) => (
              <MenuItem key={font} value={font} sx={{ fontFamily: font }}>
                {font}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Font Size */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Font Size: {fontSize}px
          </Typography>
          <Slider
            value={fontSize}
            onChange={(_, value) => setFontSize(value as number)}
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

        {/* Text Styling */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant={fontWeight === 'bold' ? 'contained' : 'outlined'}
              startIcon={<FormatBold />}
              onClick={() => setFontWeight(fontWeight === 'bold' ? 'normal' : 'bold')}
            >
              Bold
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant={fontStyle === 'italic' ? 'contained' : 'outlined'}
              startIcon={<FormatItalic />}
              onClick={() => setFontStyle(fontStyle === 'italic' ? 'normal' : 'italic')}
            >
              Italic
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant={textDecoration === 'underline' ? 'contained' : 'outlined'}
              startIcon={<FormatUnderlined />}
              onClick={() => setTextDecoration(textDecoration === 'underline' ? 'none' : 'underline')}
            >
              Underline
            </Button>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Color"
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              sx={{ '& input': { height: 40 } }}
            />
          </Grid>
        </Grid>

        {/* Text Alignment */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Text Alignment
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant={textAlign === 'left' ? 'contained' : 'outlined'}
                onClick={() => setTextAlign('left')}
                sx={{ minWidth: 'auto', p: 1 }}
              >
                <FormatAlignLeft />
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant={textAlign === 'center' ? 'contained' : 'outlined'}
                onClick={() => setTextAlign('center')}
                sx={{ minWidth: 'auto', p: 1 }}
              >
                <FormatAlignCenter />
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant={textAlign === 'right' ? 'contained' : 'outlined'}
                onClick={() => setTextAlign('right')}
                sx={{ minWidth: 'auto', p: 1 }}
              >
                <FormatAlignRight />
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant={textAlign === 'justify' ? 'contained' : 'outlined'}
                onClick={() => setTextAlign('justify')}
                sx={{ minWidth: 'auto', p: 1 }}
              >
                <FormatAlignJustify />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Apply to Selection */}
      {isSelectionText && (
        <Box sx={{ mb: 3 }}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            Apply to Selected Text
          </Typography>
          
          <Button
            fullWidth
            variant="outlined"
            onClick={handleApplyToSelection}
            sx={{ mb: 2 }}
          >
            Apply Current Settings
          </Button>
          
          <Alert severity="info">
            <Typography variant="body2">
              Text element selected. You can apply the current settings to modify it.
            </Typography>
          </Alert>
        </Box>
      )}

      {/* Text Presets */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Quick Presets
        </Typography>
        
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setFontSize(48);
                setFontWeight('bold');
                setFontFamily('Inter');
                setTextColor('#111827');
              }}
              sx={{ mb: 1 }}
            >
              Headline
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setFontSize(24);
                setFontWeight('normal');
                setFontFamily('Inter');
                setTextColor('#374151');
              }}
              sx={{ mb: 1 }}
            >
              Subtitle
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setFontSize(16);
                setFontWeight('normal');
                setFontFamily('Inter');
                setTextColor('#6b7280');
              }}
              sx={{ mb: 1 }}
            >
              Body
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setFontSize(14);
                setFontWeight('normal');
                setFontFamily('Inter');
                setTextColor('#9ca3af');
              }}
              sx={{ mb: 1 }}
            >
              Caption
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TextPanel;
