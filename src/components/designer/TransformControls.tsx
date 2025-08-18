import React, { useRef, useEffect } from 'react';
import { Transformer } from 'react-konva';
import { SceneObject } from '../../stores/designerStore';
import { useDesignerStore } from '../../stores/designerStore';
import { useDesignerContext } from './DesignerProvider';

interface TransformControlsProps {
  objects: SceneObject[];
  selection: string[];
  printArea: { x: number; y: number; width: number; height: number };
}

const TransformControls: React.FC<TransformControlsProps> = ({
  objects,
  selection,
  printArea
}) => {
  const transformerRef = useRef<any>(null);
  const { updateObject, clampToPrintArea } = useDesignerStore();
  const { getObjectRef } = useDesignerContext();

  // Get selected objects
  const selectedObjects = objects.filter(obj => selection.includes(obj.id));

  // Update transformer when selection changes
  useEffect(() => {
    if (!transformerRef.current) return;
    if (selectedObjects.length === 0) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer()?.batchDraw();
      return;
    }

    // Attach to one or many nodes via registered refs
    const nodes = selectedObjects
      .map((obj) => getObjectRef(obj.id))
      .filter(Boolean);

    if (nodes.length > 0) {
      transformerRef.current.nodes(nodes);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selection, selectedObjects, getObjectRef]);

  // Handle transformer events
  const handleTransform = (e: any) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    
    // Reset scale to avoid accumulation
    node.scaleX(1);
    node.scaleY(1);
    
    // Update object dimensions
    const objectId = node.attrs['data-id'];
    if (objectId) {
      updateObject(objectId, {
        x: node.x(),
        y: node.y(),
        width: Math.max(5, node.width() * scaleX),
        height: Math.max(5, node.height() * scaleY),
        rotation: node.rotation()
      });
    }
  };

  const handleTransformEnd = (e: any) => {
    const node = e.target;
    const objectId = node.attrs['data-id'];
    
    if (objectId) {
      // Clamp to print area after transform
      setTimeout(() => clampToPrintArea(objectId), 0);
    }
  };

  // Handle multi-select transform end
  const handleMultiTransformEnd = () => {
    // Clamp all selected objects to print area
    selectedObjects.forEach(obj => {
      setTimeout(() => clampToPrintArea(obj.id), 0);
    });
  };

  // Don't render transformer if no selection
  if (selectedObjects.length === 0) {
    return null;
  }

  return (
    <Transformer
      ref={transformerRef}
      boundBoxFunc={(oldBox, newBox) => {
        // Limit resize
        const maxWidth = printArea.width * 0.8;
        const maxHeight = printArea.height * 0.8;
        
        if (newBox.width > maxWidth || newBox.height > maxHeight) {
          return oldBox;
        }
        
        return newBox;
      }}
      onTransform={handleTransform}
      onTransformEnd={handleMultiTransformEnd}
      rotateEnabled={true}
      enabledAnchors={['top-left','top-center','top-right','middle-left','middle-right','bottom-left','bottom-center','bottom-right']}
      anchorSize={8}
      anchorFill="#1976d2"
      anchorStroke="#ffffff"
      anchorStrokeWidth={2}
      borderStroke="#1976d2"
      borderStrokeWidth={2}
      anchorCornerRadius={4}
    />
  );
};

export default TransformControls;
