import React, { useRef } from 'react';
import { Rect, Circle, Line, RegularPolygon } from 'react-konva';
import { ShapeObject } from '../../stores/designerStore';
import { useDesignerStore } from '../../stores/designerStore';
import { useDesignerContext } from './DesignerProvider';

interface NodeShapeProps {
  object: ShapeObject;
  isSelected: boolean;
  onSelect: (id: string, isShiftKey: boolean) => void;
}

const NodeShape: React.FC<NodeShapeProps> = ({ object, isSelected, onSelect }) => {
  const shapeRef = useRef<any>(null);
  const { updateObject, clampToPrintArea } = useDesignerStore();
  const { registerObject, unregisterObject } = useDesignerContext();

  // Handle shape selection
  const handleClick = (e: any) => {
    e.cancelBubble = true;
    onSelect(object.id, e.shiftKey);
  };

  // Register/unregister node ref for transformer usage
  React.useEffect(() => {
    if (shapeRef.current) {
      registerObject(object.id, shapeRef.current);
    }
    return () => {
      unregisterObject(object.id);
    };
  }, [object.id, registerObject, unregisterObject]);

  // Handle shape dragging
  const handleDragEnd = (e: any) => {
    const node = e.target;
    updateObject(object.id, {
      x: node.x(),
      y: node.y()
    });
    
    // Clamp to print area after drag
    setTimeout(() => clampToPrintArea(object.id), 0);
  };

  // Handle shape transformation
  const handleTransformEnd = (e: any) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    
    // Reset scale and update dimensions
    node.scaleX(1);
    node.scaleY(1);
    
    updateObject(object.id, {
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
      rotation: node.rotation()
    });
    
    // Clamp to print area after transform
    setTimeout(() => clampToPrintArea(object.id), 0);
  };

  const commonProps = {
    ref: shapeRef,
    x: object.x,
    y: object.y,
    width: object.width,
    height: object.height,
    rotation: object.rotation || 0,
    scaleX: object.scaleX || 1,
    scaleY: object.scaleY || 1,
    opacity: object.opacity || 1,
    fill: object.fill,
    stroke: object.stroke,
    strokeWidth: object.strokeWidth || 0,
    draggable: !object.locked,
    onClick: handleClick,
    onTap: handleClick,
    onDragEnd: handleDragEnd,
    onTransformEnd: handleTransformEnd,
    listening: object.visible !== false
  };

  switch (object.shape) {
    case 'rect':
      return (
        <Rect
          {...commonProps}
          cornerRadius={object.cornerRadius || 0}
        />
      );
      
    case 'circle':
      return (
        <Circle
          {...commonProps}
          radius={(object.width || 50) / 2}
        />
      );
      
    case 'triangle':
      return (
        <RegularPolygon
          {...commonProps}
          sides={3}
          radius={(object.width || 50) / 2}
        />
      );
      
    case 'line':
      return (
        <Line
          {...commonProps}
          points={[0, 0, object.width || 100, 0]}
          stroke={object.stroke || object.fill || '#000'}
          strokeWidth={object.strokeWidth || 2}
        />
      );
      
    default:
      return (
        <Rect
          {...commonProps}
          fill="#ff0000"
          stroke="#000"
          strokeWidth={2}
        />
      );
  }
};

export default NodeShape;
