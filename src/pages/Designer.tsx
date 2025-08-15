import React, { useEffect, useRef, useState } from 'react';
import {
  Box, Typography, Button, IconButton, Paper,
  AppBar, Toolbar, Divider, Grid,
  FormControl, InputLabel, Select, MenuItem, Slider, Switch,
  FormControlLabel, TextField, Chip, Alert,
  Tabs, Tab, List, ListItem, ListItemText, ListItemIcon,
  Tooltip, Fab, Dialog, DialogTitle, DialogContent,
  DialogActions, Menu,
  ListItemButton, ListItemSecondaryAction,
  ToggleButtonGroup,
} from '@mui/material';
import {
  TextFields, Image, CropSquare, RadioButtonUnchecked,
  FormatAlignLeft, FormatAlignCenter, FormatAlignRight,
  VerticalAlignCenter, HorizontalRule, Layers, Delete,
  ZoomIn, ZoomOut, Fullscreen, Save, FileDownload,
  Keyboard, Undo, Redo, ContentCopy,
  Visibility, VisibilityOff, FolderOpen,
} from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { useDesignStore } from '../stores/designStore';
import {
  exportAsPNG, exportAsPDF, saveDesignToStorage,
  getDesignsFromStorage, createDesignData,
  exportMultiSidePNG, exportMultiSidePDF,
  DesignData
} from '../utils/download';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`properties-tabpanel-${index}`}
      aria-labelledby={`properties-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `properties-tab-${index}`,
    'aria-controls': `properties-tabpanel-${index}`,
  };
}

const Designer: React.FC = () => {

  const [searchParams] = useSearchParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [propertiesTabValue, setPropertiesTabValue] = useState(0);
  const [textInput, setTextInput] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<'headline' | 'subtitle' | 'body'>('body');
  
  // Save/Load state
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [designName, setDesignName] = useState('');
  const [savedDesigns, setSavedDesigns] = useState<DesignData[]>([]);
  const [exportMenuAnchor, setExportMenuAnchor] = useState<null | HTMLElement>(null);
  
  const {
    // State
    selectedTool, canvasState, printArea, safeArea,
    snapToGrid, snapToCenter, showGuides, activeSide,
    
    // Actions
    initializeCanvas, destroyCanvas, addText, addImage, addShape,
    deleteSelected, duplicateSelected, selectObject, updateSelectedObject,
    alignLeft, alignCenter, alignRight, centerHorizontally, centerVertically,
    bringForward, sendBackward, setZoom, resetZoom, fitToScreen,
    setSelectedTool, toggleSnapToGrid, toggleSnapToCenter, toggleGuides, handleKeyDown,
    switchSide, getCurrentElements,
  } = useDesignStore();

  // Initialize canvas on mount
  useEffect(() => {
    if (canvasRef.current) {
      initializeCanvas(canvasRef.current);
    }

    // Set up keyboard shortcuts
    const handleKeyDownEvent = (event: KeyboardEvent) => {
      handleKeyDown(event);
    };

    document.addEventListener('keydown', handleKeyDownEvent);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDownEvent);
      destroyCanvas();
    };
  }, [initializeCanvas, destroyCanvas, handleKeyDown]);

  // Get product ID from URL
    useEffect(() => {
    const productId = searchParams.get('productId');
    if (productId) {
      console.log('Designing product:', productId);
    }
  }, [searchParams]);

  const handleAddText = () => {
    if (textInput.trim()) {
      addText(textInput.trim(), selectedPreset);
      setTextInput('');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      addImage(file);
    }
  };

  const handleShapeAdd = (type: 'rect' | 'circle') => {
    addShape(type);
  };



  // Save/Load functions
  const handleSaveDesign = () => {
    if (!designName.trim()) return;
    
    const { canvas } = canvasState;
    if (!canvas) return;
    
    try {
      const design = createDesignData(designName.trim(), canvas, searchParams.get('productId') || null);
      saveDesignToStorage(design);
      setSaveDialogOpen(false);
      setDesignName('');
      
      // Update the design store
      // Note: This would integrate with the design store for cart functionality
      console.log('Design saved:', design);
    } catch (error) {
      console.error('Error saving design:', error);
    }
  };

  const handleLoadDesign = (design: DesignData) => {
    const { canvas } = canvasState;
    if (!canvas) return;
    
    try {
      // Load the design into the canvas
      canvas.loadFromJSON(design.canvasJSON, () => {
        canvas.renderAll();
        
        // Update the design store
        // Note: This would integrate with the design store for cart functionality
        console.log('Design loaded:', design);
        
        setLoadDialogOpen(false);
      });
    } catch (error) {
      console.error('Error loading design:', error);
    }
  };

  const loadSavedDesigns = () => {
    const designs = getDesignsFromStorage();
    setSavedDesigns(designs);
  };

  const renderToolbar = () => (
    <Paper sx={{ p: 1, mb: 2 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
        {/* Front/Back Toggle */}
        <Box sx={{ display: 'flex', borderRadius: 1, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
          <Button
            size="small"
            variant={activeSide === 'front' ? 'contained' : 'text'}
            onClick={() => switchSide('front')}
            sx={{ 
              minWidth: 60,
              borderRadius: 0,
              fontWeight: activeSide === 'front' ? 'bold' : 'normal',
              '&.MuiButton-contained': {
                backgroundColor: 'primary.main',
                color: 'white',
              }
            }}
          >
            Front
          </Button>
          <Button
            size="small"
            variant={activeSide === 'back' ? 'contained' : 'text'}
            onClick={() => switchSide('back')}
            sx={{ 
              minWidth: 60,
              borderRadius: 0,
              fontWeight: activeSide === 'back' ? 'bold' : 'normal',
              '&.MuiButton-contained': {
                backgroundColor: 'primary.main',
                color: 'white',
              }
            }}
          >
            Back
          </Button>
        </Box>
        
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        
        {/* Current Side Indicator */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          px: 2, 
          py: 0.5, 
          backgroundColor: activeSide === 'front' ? '#e3f2fd' : '#f3e5f5',
          borderRadius: 1,
          border: '1px solid',
          borderColor: activeSide === 'front' ? '#2196f3' : '#9c27b0'
        }}>
          <Typography variant="caption" sx={{ 
            fontWeight: 'bold',
            color: activeSide === 'front' ? '#1976d2' : '#7b1fa2'
          }}>
            {activeSide === 'front' ? '🎯 Front Side' : '🔄 Back Side'}
          </Typography>
        </Box>
        
        {/* Tool Selection */}
        <ToggleButtonGroup
          value={selectedTool}
          exclusive
          onChange={(_, newTool) => newTool && setSelectedTool(newTool)}
          size="small"
        >
          <IconButton
            size="small"
            onClick={() => setSelectedTool('text')}
            color={selectedTool === 'text' ? 'primary' : 'default'}
          >
            <TextFields />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setSelectedTool('image')}
            color={selectedTool === 'image' ? 'primary' : 'default'}
          >
            <Image />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setSelectedTool('shape')}
            color={selectedTool === 'shape' ? 'primary' : 'default'}
          >
            <CropSquare />
          </IconButton>
        </ToggleButtonGroup>

        {/* Text Tools */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <TextField
            size="small"
            placeholder="Enter text..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            sx={{ minWidth: 120 }}
          />
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select
              value={selectedPreset}
              onChange={(e) => setSelectedPreset(e.target.value as any)}
            >
              <MenuItem value="headline">Headline</MenuItem>
              <MenuItem value="subtitle">Subtitle</MenuItem>
              <MenuItem value="body">Body</MenuItem>
            </Select>
          </FormControl>
          <Button size="small" variant="contained" onClick={handleAddText}>
            Add
          </Button>
        </Box>

        {/* Image Tools */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <Button size="small" variant="outlined" onClick={() => fileInputRef.current?.click()}>
            Upload
          </Button>
        </Box>

        {/* Shape Tools */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <IconButton size="small" onClick={() => handleShapeAdd('rect')}>
            <CropSquare />
          </IconButton>
          <IconButton size="small" onClick={() => handleShapeAdd('circle')}>
            <RadioButtonUnchecked />
          </IconButton>
        </Box>

        <Divider orientation="vertical" flexItem />

        {/* Alignment Tools */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <IconButton size="small" onClick={alignLeft}>
            <FormatAlignLeft />
          </IconButton>
          <IconButton size="small" onClick={alignCenter}>
            <FormatAlignCenter />
          </IconButton>
          <IconButton size="small" onClick={alignRight}>
            <FormatAlignRight />
          </IconButton>
          <IconButton size="small" onClick={centerHorizontally}>
            <HorizontalRule />
          </IconButton>
          <IconButton size="small" onClick={centerVertically}>
            <VerticalAlignCenter />
          </IconButton>
        </Box>

        {/* Layer Tools */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <IconButton size="small" onClick={bringForward}>
            <Layers />
          </IconButton>
          <IconButton size="small" onClick={sendBackward}>
            <Layers />
          </IconButton>
        </Box>

        <Divider orientation="vertical" flexItem />

        {/* Action Tools */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <IconButton size="small" onClick={duplicateSelected}>
            <ContentCopy />
          </IconButton>
          <IconButton size="small" onClick={deleteSelected} color="error">
            <Delete />
          </IconButton>
        </Box>

        <Divider orientation="vertical" flexItem />

        {/* Canvas Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <IconButton size="small" onClick={() => setZoom(canvasState.zoom * 1.2)}>
            <ZoomIn />
          </IconButton>
          <IconButton size="small" onClick={() => setZoom(canvasState.zoom / 1.2)}>
            <ZoomOut />
          </IconButton>
          <IconButton size="small" onClick={resetZoom}>
            <Fullscreen />
          </IconButton>
          <IconButton size="small" onClick={fitToScreen}>
            <Fullscreen />
          </IconButton>
        </Box>

        <Divider orientation="vertical" flexItem />

        {/* Settings */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <FormControlLabel
            control={<Switch checked={snapToGrid} onChange={toggleSnapToGrid} size="small" />}
            label="Grid"
          />
          <FormControlLabel
            control={<Switch checked={snapToCenter} onChange={toggleSnapToCenter} size="small" />}
            label="Center"
          />
          <FormControlLabel
            control={<Switch checked={showGuides} onChange={toggleGuides} size="small" />}
            label="Guides"
          />
        </Box>
      </Box>
    </Paper>
  );

  const renderPropertiesPanel = () => {
    const selectedObject = canvasState.selectedObject;
    
    if (!selectedObject) {
      return (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Select an object to edit its properties
          </Typography>
        </Box>
      );
    }

    // Safe update function for selected object
    const safeUpdateObject = (updates: any) => {
      if (selectedObject) {
        updateSelectedObject(updates);
      }
    };

    return (
      <Box>
        <Tabs value={propertiesTabValue} onChange={(_, newValue) => setPropertiesTabValue(newValue)}>
          <Tab label="Properties" {...a11yProps(0)} />
          <Tab label="Text" {...a11yProps(1)} />
          <Tab label="Image" {...a11yProps(2)} />
          <Tab label="Layers" {...a11yProps(3)} />
        </Tabs>

        <TabPanel value={propertiesTabValue} index={0}>
          {/* Common Properties */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                label="X Position"
                type="number"
                value={Math.round(selectedObject.left || 0)}
                onChange={(e) => safeUpdateObject({ left: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                label="Y Position"
                type="number"
                value={Math.round(selectedObject.top || 0)}
                onChange={(e) => safeUpdateObject({ top: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" gutterBottom>Rotation</Typography>
              <Slider
                value={selectedObject.angle || 0}
                onChange={(_, value) => safeUpdateObject({ angle: value as number })}
                min={0}
                max={360}
                step={1}
                marks={[
                  { value: 0, label: '0°' },
                  { value: 90, label: '90°' },
                  { value: 180, label: '180°' },
                  { value: 270, label: '270°' },
                  { value: 360, label: '360°' },
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" gutterBottom>Opacity</Typography>
              <Slider
                value={(selectedObject.opacity || 1) * 100}
                onChange={(_, value) => safeUpdateObject({ opacity: (value as number) / 100 })}
                min={0}
                max={100}
                step={1}
                marks={[
                  { value: 0, label: '0%' },
                  { value: 50, label: '50%' },
                  { value: 100, label: '100%' },
                ]}
              />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={propertiesTabValue} index={1}>
          {/* Text Properties */}
          {selectedObject.type === 'i-text' && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Text"
                  value={(selectedObject as any).text || ''}
                  onChange={(e) => safeUpdateObject({ text: e.target.value })}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Font Family</InputLabel>
                  <Select
                    value={(selectedObject as any).fontFamily || 'Arial'}
                    onChange={(e) => safeUpdateObject({ fontFamily: e.target.value })}
                  >
                    <MenuItem value="Arial">Arial</MenuItem>
                    <MenuItem value="Helvetica">Helvetica</MenuItem>
                    <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                    <MenuItem value="Georgia">Georgia</MenuItem>
                    <MenuItem value="Verdana">Verdana</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Font Size"
                  type="number"
                  value={(selectedObject as any).fontSize || 16}
                  onChange={(e) => safeUpdateObject({ fontSize: Number(e.target.value) })}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Font Weight</InputLabel>
                  <Select
                    value={(selectedObject as any).fontWeight || 'normal'}
                    onChange={(e) => safeUpdateObject({ fontWeight: e.target.value })}
                  >
                    <MenuItem value="normal">Normal</MenuItem>
                    <MenuItem value="bold">Bold</MenuItem>
                    <MenuItem value="100">100</MenuItem>
                    <MenuItem value="200">200</MenuItem>
                    <MenuItem value="300">300</MenuItem>
                    <MenuItem value="400">400</MenuItem>
                    <MenuItem value="500">500</MenuItem>
                    <MenuItem value="600">600</MenuItem>
                    <MenuItem value="700">700</MenuItem>
                    <MenuItem value="800">800</MenuItem>
                    <MenuItem value="900">900</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Letter Spacing"
                  type="number"
                  value={(selectedObject as any).charSpacing || 0}
                  onChange={(e) => safeUpdateObject({ charSpacing: Number(e.target.value) })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel>Text Align</InputLabel>
                  <Select
                    value={(selectedObject as any).textAlign || 'left'}
                    onChange={(e) => safeUpdateObject({ textAlign: e.target.value })}
                  >
                    <MenuItem value="left">Left</MenuItem>
                    <MenuItem value="center">Center</MenuItem>
                    <MenuItem value="right">Right</MenuItem>
                    <MenuItem value="justify">Justify</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </TabPanel>

        <TabPanel value={propertiesTabValue} index={2}>
          {/* Image Properties */}
          {selectedObject.type === 'image' && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Scale X (%)"
                  type="number"
                  value={Math.round((selectedObject.scaleX || 1) * 100)}
                  onChange={(e) => safeUpdateObject({ scaleX: Number(e.target.value) / 100 })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Scale Y (%)"
                  type="number"
                  value={Math.round((selectedObject.scaleY || 1) * 100)}
                  onChange={(e) => safeUpdateObject({ scaleY: Number(e.target.value) / 100 })}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  onClick={() => safeUpdateObject({ flipX: !selectedObject.flipX })}
                >
                  Flip X
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  onClick={() => safeUpdateObject({ flipY: !selectedObject.flipY })}
                >
                  Flip Y
                </Button>
              </Grid>
            </Grid>
          )}
        </TabPanel>

        <TabPanel value={propertiesTabValue} index={3}>
          {/* Layers */}
          <List dense>
            {getCurrentElements().map((element) => (
              <ListItem
                key={element.id}
                button
                selected={canvasState.selectedObject === element.fabricObject}
                onClick={() => selectObject(element.fabricObject)}
                sx={{ py: 0.5 }}
              >
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {element.type === 'text' && <TextFields fontSize="small" />}
                  {element.type === 'image' && <Image fontSize="small" />}
                  {element.type === 'shape' && <CropSquare fontSize="small" />}
                </ListItemIcon>
                <ListItemText
                  primary={element.metadata.name}
                  secondary={element.type}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Toggle visibility
                    const newVisible = !element.fabricObject.visible;
                    updateSelectedObject({ visible: newVisible });
                  }}
                >
                  {element.fabricObject.visible ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                </IconButton>
              </ListItem>
            ))}
          </List>
        </TabPanel>
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Left Toolbar */}
      <Box sx={{ width: 300, backgroundColor: 'white', borderRight: '1px solid #e0e0e0', overflowY: 'auto' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" gutterBottom>
            Design Tools
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add and edit design elements
          </Typography>
        </Box>
        
        <Box sx={{ p: 2 }}>
          {renderToolbar()}
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Print Area
            </Typography>
            <Box sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 1, border: '1px solid #e0e0e0' }}>
              <Typography variant="body2" color="text.secondary">
                X: {printArea.x}, Y: {printArea.y}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                W: {printArea.width}, H: {printArea.height}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Safe Area
            </Typography>
            <Box sx={{ p: 2, bgcolor: '#fff3e0', borderRadius: 1, border: '1px solid #ff9800' }}>
              <Typography variant="body2" color="text.secondary">
                X: {safeArea.x}, Y: {safeArea.y}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                W: {safeArea.width}, H: {safeArea.height}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Center Canvas */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <AppBar position="static" sx={{ backgroundColor: 'white', color: 'text.primary' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, color: 'primary.main' }}>
              PrintaRex Designer
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                startIcon={<Undo />}
                variant="outlined"
                size="small"
                disabled
              >
                Undo
              </Button>
              <Button
                startIcon={<Redo />}
                variant="outlined"
                size="small"
                disabled
              >
                Redo
              </Button>
              <Button
                startIcon={<Save />}
                variant="outlined"
                size="small"
                onClick={() => setSaveDialogOpen(true)}
              >
                Save Design
              </Button>
              <Button
                startIcon={<FolderOpen />}
                variant="outlined"
                size="small"
                onClick={() => {
                  loadSavedDesigns();
                  setLoadDialogOpen(true);
                }}
              >
                Load Design
              </Button>
              <Button
                startIcon={<FileDownload />}
                variant="outlined"
                size="small"
                onClick={(e) => setExportMenuAnchor(e.currentTarget)}
              >
                Export
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Canvas Area */}
        <Box sx={{ flex: 1, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Paper
            elevation={3}
            sx={{
              position: 'relative',
              backgroundColor: 'white',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <canvas
              ref={canvasRef}
              style={{
                display: 'block',
                cursor: selectedTool === 'select' ? 'default' : 'crosshair',
              }}
            />
            
            {/* Zoom Controls */}
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
              <Paper sx={{ p: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <IconButton size="small" onClick={() => setZoom(canvasState.zoom * 1.2)}>
                    <ZoomIn fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => setZoom(canvasState.zoom / 1.2)}>
                    <ZoomOut fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={resetZoom}>
                    <Fullscreen fontSize="small" />
                  </IconButton>
                </Box>
              </Paper>
            </Box>
          </Paper>
        </Box>

        {/* Status Bar */}
        <Box sx={{ p: 1, backgroundColor: 'white', borderTop: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {getCurrentElements().length} elements | Zoom: {Math.round(canvasState.zoom * 100)}%
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip
                label={`Grid: ${snapToGrid ? 'ON' : 'OFF'}`}
                size="small"
                variant={snapToGrid ? 'filled' : 'outlined'}
                onClick={toggleSnapToGrid}
              />
              <Chip
                label={`Center: ${snapToCenter ? 'ON' : 'OFF'}`}
                size="small"
                variant={snapToCenter ? 'filled' : 'outlined'}
                onClick={toggleSnapToCenter}
              />
              <Chip
                label={`Guides: ${showGuides ? 'ON' : 'OFF'}`}
                size="small"
                variant={showGuides ? 'filled' : 'outlined'}
                onClick={toggleGuides}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Right Properties Panel */}
      <Box sx={{ width: 300, backgroundColor: 'white', borderLeft: '1px solid #e0e0e0', overflowY: 'auto' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" gutterBottom>
            Properties
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Edit selected object properties
          </Typography>
        </Box>
        
        {renderPropertiesPanel()}
      </Box>

      {/* Keyboard Shortcuts Help */}
      <Box sx={{ position: 'fixed', bottom: 16, left: 16 }}>
        <Tooltip title="Keyboard Shortcuts">
          <Fab size="small" color="primary">
            <Keyboard />
          </Fab>
        </Tooltip>
      </Box>

      {/* Export Menu */}
      <Menu
        anchorEl={exportMenuAnchor}
        open={Boolean(exportMenuAnchor)}
        onClose={() => setExportMenuAnchor(null)}
      >
        <MenuItem onClick={() => {
          exportAsPNG(canvasState.canvas!);
          setExportMenuAnchor(null);
        }}>
          Export PNG (Current Side)
        </MenuItem>
        <MenuItem onClick={() => {
          exportAsPDF(canvasState.canvas!);
          setExportMenuAnchor(null);
        }}>
          Export PDF (Current Side)
        </MenuItem>
        <Divider />
        <MenuItem onClick={async () => {
          if (canvasState.canvas) {
            try {
              const blob = await exportMultiSidePNG(canvasState.canvas, canvasState.canvas);
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'design-both-sides.zip';
              link.click();
              URL.revokeObjectURL(url);
            } catch (error) {
              console.error('Error exporting multi-side PNG:', error);
            }
          }
          setExportMenuAnchor(null);
        }}>
          Export Both Sides (ZIP)
        </MenuItem>
        <MenuItem onClick={async () => {
          if (canvasState.canvas) {
            try {
              const blob = await exportMultiSidePDF(canvasState.canvas, canvasState.canvas);
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'design-both-sides.pdf';
              link.click();
              URL.revokeObjectURL(url);
            } catch (error) {
              console.error('Error exporting multi-side PDF:', error);
            }
          }
          setExportMenuAnchor(null);
        }}>
          Export Both Sides (PDF)
        </MenuItem>
      </Menu>

      {/* Save Design Dialog */}
      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Save Design</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Design Name"
            fullWidth
            variant="outlined"
            value={designName}
            onChange={(e) => setDesignName(e.target.value)}
            placeholder="Enter a name for your design"
            onKeyPress={(e) => e.key === 'Enter' && handleSaveDesign()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveDesign} variant="contained" disabled={!designName.trim()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Load Design Dialog */}
      <Dialog open={loadDialogOpen} onClose={() => setLoadDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Load Design</DialogTitle>
        <DialogContent>
          {savedDesigns.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No saved designs found. Create and save a design first.
              </Typography>
            </Box>
          ) : (
            <List>
              {savedDesigns.map((design) => (
                <ListItem key={design.id} disablePadding>
                  <ListItemButton onClick={() => handleLoadDesign(design)}>
                    <ListItemIcon>
                      <Image />
                    </ListItemIcon>
                    <ListItemText
                      primary={design.name}
                      secondary={`Created: ${new Date(design.createdAt).toLocaleDateString()} | Updated: ${new Date(design.updatedAt).toLocaleDateString()}`}
                    />
                    <ListItemSecondaryAction>
                      <Chip
                        label={design.productId ? 'Product Design' : 'Custom Design'}
                        size="small"
                        color={design.productId ? 'primary' : 'default'}
                      />
                    </ListItemSecondaryAction>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoadDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Help Alert */}
      <Alert
        severity="info"
        sx={{
          position: 'fixed',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          maxWidth: 600,
        }}
      >
        <Typography variant="body2">
          <strong>Keyboard Shortcuts:</strong> Delete/Backspace to delete, Ctrl/Cmd+D to duplicate, 
          Arrow keys to move (Shift+Arrow for 10px), Tab to switch tools
        </Typography>
      </Alert>
    </Box>
  );
};

export default Designer;
