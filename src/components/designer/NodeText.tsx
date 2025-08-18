import React, { useRef, useEffect } from 'react';
import { Text } from 'react-konva';
import { TextObject } from '../../stores/designerStore';
import { useDesignerStore } from '../../stores/designerStore';
import { useDesignerContext } from './DesignerProvider';

interface NodeTextProps {
  object: TextObject;
  isSelected: boolean;
  onSelect: (id: string, isShiftKey: boolean) => void;
}

const NodeText: React.FC<NodeTextProps> = ({ object, isSelected, onSelect }) => {
  const textRef = useRef<any>(null);
  const { registerObject, unregisterObject } = useDesignerContext();
  const { updateObject, clampToPrintArea } = useDesignerStore();

  // Handle text selection
  const handleClick = (e: any) => {
    e.cancelBubble = true;
    if (e.evt.shiftKey) {
      onSelect(object.id, true);
    } else {
      onSelect(object.id, false);
    }
  };

  // Register/unregister node ref for transformer usage
  useEffect(() => {
    if (textRef.current) {
      registerObject(object.id, textRef.current);
    }
    return () => {
      unregisterObject(object.id);
    };
  }, [object.id, registerObject, unregisterObject]);

  // Handle text dragging
  const handleDragEnd = (e: any) => {
    const node = e.target;
    updateObject(object.id, {
      x: node.x(),
      y: node.y()
    });
    
    // Clamp to print area after drag
    setTimeout(() => clampToPrintArea(object.id), 0);
  };

  // Handle text transformation
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

  // Handle text editing (double click)
  const handleDblClick = (e: any) => {
    e.cancelBubble = true;
    
    // Create textarea over the canvas
    const textPosition = textRef.current.absolutePosition();
    const stage = textRef.current.getStage();
    const areaPosition = {
      x: stage.container().offsetLeft + textPosition.x,
      y: stage.container().offsetTop + textPosition.y,
    };

    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    textarea.value = object.text;
    textarea.style.position = 'absolute';
    textarea.style.top = areaPosition.y + 'px';
    textarea.style.left = areaPosition.x + 'px';
    textarea.style.width = textRef.current.width() - textRef.current.padding() * 2 + 'px';
    textarea.style.height = textRef.current.height() - textRef.current.padding() * 2 + 'px';
    textarea.style.fontSize = textRef.current.fontSize() + 'px';
    textarea.style.border = 'none';
    textarea.style.padding = '0px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'none';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.lineHeight = textRef.current.lineHeight();
    textarea.style.fontFamily = textRef.current.fontFamily();
    textarea.style.transformOrigin = 'left top';
    textarea.style.textAlign = object.align;
    textarea.style.color = object.fill;
    textarea.style.fontStyle = object.fontStyle || 'normal';
    textarea.style.fontWeight = object.fontStyle?.includes('bold') ? 'bold' : 'normal';

    textarea.focus();

    const removeTextarea = () => {
      document.body.removeChild(textarea);
      textRef.current.show();
      textRef.current.getLayer().batchDraw();
    };

    textarea.addEventListener('blur', () => {
      updateObject(object.id, { text: textarea.value });
      removeTextarea();
    });

    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        textarea.blur();
      }
      if (e.key === 'Escape') {
        removeTextarea();
      }
    });

    textRef.current.hide();
    textRef.current.getLayer().batchDraw();
    textarea.focus();
  };

  return (
    <Text
      ref={textRef}
      x={object.x}
      y={object.y}
      text={object.text}
      fontSize={object.fontSize}
      fontFamily={object.fontFamily}
      fill={object.fill}
      align={object.align}
      fontStyle={object.fontStyle}
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
      onDblClick={handleDblClick}
      onDblTap={handleDblClick}
      listening={object.visible !== false}
    />
  );
};

export default NodeText;
