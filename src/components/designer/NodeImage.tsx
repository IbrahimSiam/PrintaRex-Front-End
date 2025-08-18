import React, { useRef, useState, useEffect } from 'react';
import { Image, Rect } from 'react-konva';
import { ImageObject } from '../../stores/designerStore';
import { useDesignerStore } from '../../stores/designerStore';
import { useDesignerContext } from './DesignerProvider';

interface NodeImageProps {
  object: ImageObject;
  isSelected: boolean;
  onSelect: (id: string, isShiftKey: boolean) => void;
}

const NodeImage: React.FC<NodeImageProps> = ({ object, isSelected, onSelect }) => {
  const imageRef = useRef<any>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const { updateObject, clampToPrintArea } = useDesignerStore();
  const { registerObject, unregisterObject } = useDesignerContext();

  // Load image
  useEffect(() => {
    if (!object.src) return;

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      setImage(img);
      
      // Update natural dimensions if not set
      if (!object.naturalWidth || !object.naturalHeight) {
        updateObject(object.id, {
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight
        });
      }
    };
    
    img.onerror = () => {
      console.error('Failed to load image:', object.src);
    };

    img.src = object.src;
  }, [object.src, object.id, object.naturalWidth, object.naturalHeight, updateObject]);

  // Handle image selection
  const handleClick = (e: any) => {
    e.cancelBubble = true;
    onSelect(object.id, e.shiftKey);
  };

  // Register/unregister node ref for transformer usage
  useEffect(() => {
    if (imageRef.current) {
      registerObject(object.id, imageRef.current);
    }
    return () => {
      unregisterObject(object.id);
    };
  }, [object.id, registerObject, unregisterObject]);

  // Handle image dragging
  const handleDragEnd = (e: any) => {
    const node = e.target;
    updateObject(object.id, {
      x: node.x(),
      y: node.y()
    });
    
    // Clamp to print area after drag
    setTimeout(() => clampToPrintArea(object.id), 0);
  };

  // Handle image transformation
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
      width: Math.max(10, node.width() * scaleX),
      height: Math.max(10, node.height() * scaleY),
      rotation: node.rotation()
    });
    
    // Clamp to print area after transform
    setTimeout(() => clampToPrintArea(object.id), 0);
  };

  if (!image) {
    return (
      <Rect
        x={object.x}
        y={object.y}
        width={object.width || 100}
        height={object.height || 100}
        fill="#f0f0f0"
        stroke="#ccc"
        strokeWidth={1}
        dash={[5, 5]}
        listening={false}
      />
    );
  }

  return (
    <Image
      ref={imageRef}
      image={image}
      x={object.x}
      y={object.y}
      width={object.width}
      height={object.height}
      rotation={object.rotation || 0}
      scaleX={object.scaleX || 1}
      scaleY={object.scaleY || 1}
      opacity={object.opacity || 1}
      draggable={!object.locked}
      onClick={handleClick}
      onTap={handleClick}
      onDragEnd={handleDragEnd}
      onTransformEnd={handleTransformEnd}
      listening={object.visible !== false}
    />
  );
};

export default NodeImage;
