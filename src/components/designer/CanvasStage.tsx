import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Stage, Layer } from 'react-konva';
import { useDesignerStore } from '../../stores/designerStore';
import { useDesignerUIStore } from '../../stores/designerUIStore';
import MockupLayer from './MockupLayer';
import PrintAreaGroup from './PrintAreaGroup';
import TransformControls from './TransformControls';
import SelectionMarquee from './SelectionMarquee';
import { Box } from '@mui/material';

interface CanvasStageProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const CanvasStage: React.FC<CanvasStageProps> = ({ containerRef }) => {
  const stageRef = useRef<any>(null);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  
  const { scene, selection, setSelection } = useDesignerStore();
  const { stage, setStageTransform, resetStageTransform } = useDesignerUIStore();

  // Calculate stage size and scale to fit container
  const updateStageSize = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Get mockup dimensions (assuming square for now, adjust based on actual mockup)
    const mockupSize = 1000; // This should come from the actual mockup image
    
    // Calculate scale to fit mockup in container while maintaining aspect ratio
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    
    const scaleX = containerWidth / mockupSize;
    const scaleY = containerHeight / mockupSize;
    const scale = Math.min(scaleX, scaleY) * 0.9; // 90% to add some padding
    
    const stageWidth = mockupSize * scale;
    const stageHeight = mockupSize * scale;
    
    setStageSize({ width: stageWidth, height: stageHeight });
    
    // Center the stage
    const x = (containerWidth - stageWidth) / 2;
    const y = (containerHeight - stageHeight) / 2;
    
    setStageTransform({ x, y, scale });
  }, [containerRef, setStageTransform]);

  // Update stage size on mount and window resize
  useEffect(() => {
    updateStageSize();
    
    const handleResize = () => {
      updateStageSize();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateStageSize]);

  // Handle stage wheel for zoom
  const handleWheel = useCallback((e: any) => {
    e.evt.preventDefault();
    
    const scaleBy = 1.02;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };
    
    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    
    // Limit zoom between 0.1 and 5
    const clampedScale = Math.max(0.1, Math.min(5, newScale));
    
    setStageTransform({
      scale: clampedScale,
      x: -(mousePointTo.x - stage.getPointerPosition().x / clampedScale) * clampedScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / clampedScale) * clampedScale,
    });
  }, [setStageTransform]);

  // Handle stage drag for panning
  const handleDragEnd = useCallback((e: any) => {
    setStageTransform({
      x: e.target.x(),
      y: e.target.y(),
    });
  }, [setStageTransform]);

  // Handle stage click to clear selection
  const handleStageClick = useCallback((e: any) => {
    if (e.target === e.target.getStage()) {
      setSelection([]);
    }
  }, [setSelection]);

  // Handle stage mouse down for marquee selection
  const handleStageMouseDown = useCallback((e: any) => {
    if (e.target === e.target.getStage()) {
      // Selection marquee will handle this
    }
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const { selection, removeObject, clearSelection } = useDesignerStore.getState();
        selection.forEach(id => removeObject(id));
        clearSelection();
      } else if (e.key === 'Escape') {
        setSelection([]);
      } else if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && !e.shiftKey) {
          // TODO: Implement undo
          console.log('Undo');
        } else if (e.key === 'Z' && e.shiftKey) {
          // TODO: Implement redo
          console.log('Redo');
        } else if (e.key === '0') {
          resetStageTransform();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelection, resetStageTransform]);

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        scaleX={stage.scale}
        scaleY={stage.scale}
        x={stage.x}
        y={stage.y}
        onWheel={handleWheel}
        onDragEnd={handleDragEnd}
        onClick={handleStageClick}
        onMouseDown={handleStageMouseDown}
        draggable
        style={{ cursor: 'grab' }}
      >
        {/* Mockup Layer - Base image */}
        <Layer>
          <MockupLayer mockupSrc={scene.mockupSrc} />
        </Layer>

        {/* Design Layer - Print area and objects */}
        <Layer>
          <PrintAreaGroup
            printArea={scene.printArea}
            objects={scene.objects}
            selection={selection}
            onSelectionChange={setSelection}
          />
        </Layer>

        {/* UI Layer - Transformers, guides, grid */}
        <Layer>
          <TransformControls
            objects={scene.objects}
            selection={selection}
            printArea={scene.printArea}
          />
          <SelectionMarquee
            layerRef={stageRef}
            stageRef={stageRef}
            printArea={scene.printArea}
          />
        </Layer>
      </Stage>
    </Box>
  );
};

export default CanvasStage;
