import React from 'react';
import { Group, Rect } from 'react-konva';
import { SceneObject } from '../../stores/designerStore';
import NodeText from './NodeText';
import NodeImage from './NodeImage';
import NodeShape from './NodeShape';
import { useDesignerStore } from '../../stores/designerStore';

interface PrintAreaGroupProps {
  printArea: { x: number; y: number; width: number; height: number };
  objects: SceneObject[];
  selection: string[];
  onSelectionChange: (ids: string[]) => void;
}

const PrintAreaGroup: React.FC<PrintAreaGroupProps> = ({
  printArea,
  objects,
  selection,
  onSelectionChange
}) => {
  const { addToSelection, setSelection } = useDesignerStore();
  
  // Sort objects by zIndex for proper layering
  const sortedObjects = [...objects].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

  const handleSelect = (id: string, isShiftKey: boolean) => {
    if (isShiftKey) {
      // Toggle selection: add if not selected, remove if selected
      if (selection.includes(id)) {
        onSelectionChange(selection.filter(selectedId => selectedId !== id));
      } else {
        onSelectionChange([...selection, id]);
      }
    } else {
      // Single selection
      onSelectionChange([id]);
    }
  };

  return (
    <Group>
      {/* Print Area Boundary - Dashed rectangle */}
      <Rect
        x={printArea.x}
        y={printArea.y}
        width={printArea.width}
        height={printArea.height}
        fill="transparent"
        stroke="#1976d2"
        strokeWidth={2}
        dash={[8, 4]}
        listening={false}
      />
      
      {/* Clipped Group for Design Objects */}
      <Group
        x={printArea.x}
        y={printArea.y}
        clipFunc={(ctx) => {
          ctx.rect(0, 0, printArea.width, printArea.height);
        }}
      >
        {/* Render all design objects */}
        {sortedObjects.map((object) => {
          const isSelected = selection.includes(object.id);
          
          switch (object.type) {
            case 'text':
              return (
                <NodeText
                  key={object.id}
                  object={object}
                  isSelected={isSelected}
                  onSelect={(id, isShiftKey) => handleSelect(id, isShiftKey)}
                />
              );
              
            case 'image':
              return (
                <NodeImage
                  key={object.id}
                  object={object}
                  isSelected={isSelected}
                  onSelect={(id, isShiftKey) => handleSelect(id, isShiftKey)}
                />
              );
              
            case 'shape':
              return (
                <NodeShape
                  key={object.id}
                  object={object}
                  isSelected={isSelected}
                  onSelect={(id, isShiftKey) => handleSelect(id, isShiftKey)}
                />
              );
              
            default:
              return null;
          }
        })}
      </Group>
    </Group>
  );
};

export default PrintAreaGroup;
