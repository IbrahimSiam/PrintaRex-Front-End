import React from 'react';
import { Box, IconButton, Typography, Slide } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { useDesignerUIStore } from '../../stores/designerUIStore';
import FilesPanel from './panels/FilesPanel';
import ColorPalettePanel from './panels/ColorPalettePanel';
import TextPanel from './panels/TextPanel';
import TemplatesPanel from './panels/TemplatesPanel';
import GraphicsPanel from './panels/GraphicsPanel';
import PersonalizePanel from './panels/PersonalizePanel';
import LayersPanel from './panels/LayersPanel';
import LayoutsPanel from './panels/LayoutsPanel';
import StockPanel from './panels/StockPanel';
import ShapesPanel from './panels/ShapesPanel';
import EffectsPanel from './panels/EffectsPanel';
import BrushesPanel from './panels/BrushesPanel';
import ProductPanel from './panels/ProductPanel';
import SettingsPanel from './panels/SettingsPanel';
import HelpPanel from './panels/HelpPanel';
import SelectedInspector from './SelectedInspector';

interface ProductData {
  id: number;
  name: string;
  type: string;
  color: string;
  size: string;
  technology: string;
  image: string;
  printAreas: string[];
}

interface RightPanelProps {
  productData?: ProductData;
}

const RightPanel: React.FC<RightPanelProps> = ({ productData }) => {
  const { panels, closePanel } = useDesignerUIStore();
  const { tool } = panels;

  if (!tool) return null;

  const renderPanel = () => {
    switch (tool) {
      case 'product':
        return <ProductPanel />;
      case 'files':
        return <FilesPanel />;
      case 'text':
        return <TextPanel />;
      case 'templates':
        return <TemplatesPanel />;
      case 'graphics':
        return <GraphicsPanel />;
      case 'personalize':
        return <PersonalizePanel />;
      case 'layers':
        return <LayersPanel />;
      case 'layouts':
        return <LayoutsPanel />;
      case 'stock':
        return <StockPanel />;
      case 'shapes':
        return <ShapesPanel />;
      case 'effects':
        return <EffectsPanel />;
      case 'brushes':
        return <BrushesPanel />;
      case 'palette':
        return <ColorPalettePanel />;
      case 'settings':
        return <SettingsPanel />;
      case 'help':
        return <HelpPanel />;
      default:
        return <SelectedInspector />;
    }
  };

  const getPanelTitle = () => {
    const titles: Record<string, string> = {
      product: 'Product',
      files: 'Files & Uploads',
      text: 'Text',
      templates: 'Templates',
      graphics: 'Graphics & Images',
      personalize: 'Personalize',
      layers: 'Layers',
      layouts: 'Layouts',
      stock: 'Stock Images',
      shapes: 'Shapes',
      effects: 'Effects',
      brushes: 'Brushes',
      palette: 'Color Palette',
      settings: 'Settings',
      help: 'Help'
    };
    return titles[tool] || 'Properties';
  };

  return (
    <Slide direction="left" in={!!tool} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          right: 0,
          top: 0,
          width: 320,
          height: '100vh',
          backgroundColor: 'white',
          borderLeft: '1px solid #e5e7eb',
          boxShadow: '-2px 0 12px rgba(0,0,0,0.08)',
          zIndex: 1200,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Panel Header */}
        <Box
          sx={{
            p: 2.5,
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: '#2563EB',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {getPanelTitle()}
          </Typography>
          <IconButton
            size="small"
            onClick={closePanel}
            sx={{ color: 'inherit' }}
          >
            <ChevronLeft />
          </IconButton>
        </Box>

        {/* Panel Content */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {renderPanel()}
        </Box>
      </Box>
    </Slide>
  );
};

export default RightPanel;
