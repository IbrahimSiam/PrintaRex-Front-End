import React, { useRef, useState, useEffect } from 'react';
import { Rect } from 'react-konva';
import Konva from 'konva';
import { useDesignerStore } from '../../stores/designerStore';

interface SelectionMarqueeProps {
  layerRef: React.RefObject<Konva.Layer>;
  stageRef: React.RefObject<Konva.Stage>;
  printArea: { x: number; y: number; width: number; height: number };
}

export default function SelectionMarquee({
  layerRef,
  stageRef,
  printArea,
}: SelectionMarqueeProps) {
  const setSelection = useDesignerStore((s) => s.setSelection);
  const objects = useDesignerStore((s) => s.scene.objects);
  const [rect, setRect] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const isSelectingRef = useRef(false);
  const startRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onMouseDown = (e: any) => {
      if (e.target !== stage) return;
      isSelectingRef.current = true;
      const pos = stage.getPointerPosition();
      if (!pos) return;
      startRef.current = pos;
      setRect({ x: pos.x, y: pos.y, w: 0, h: 0 });
    };

    const onMouseMove = () => {
      if (!isSelectingRef.current || !startRef.current) return;
      const pos = stage.getPointerPosition();
      if (!pos) return;
      const x = Math.min(startRef.current.x, pos.x);
      const y = Math.min(startRef.current.y, pos.y);
      const w = Math.abs(pos.x - startRef.current.x);
      const h = Math.abs(pos.y - startRef.current.y);
      setRect({ x, y, w, h });
    };

    const onMouseUp = () => {
      if (!isSelectingRef.current) return;
      isSelectingRef.current = false;

      if (!rect || rect.w < 5 || rect.h < 5) {
        setSelection([]);
        setRect(null);
        startRef.current = null;
        return;
      }

      // Build selection list by checking intersection with selection rectangle
      const ids: string[] = [];
      objects.forEach((obj) => {
        // Simple bounding box intersection check
        const objRight = obj.x + (obj.width || 0);
        const objBottom = obj.y + (obj.height || 0);
        const rectRight = rect.x + rect.w;
        const rectBottom = rect.y + rect.h;

        const intersects =
          obj.x < rectRight &&
          objRight > rect.x &&
          obj.y < rectBottom &&
          objBottom > rect.y;

        if (intersects) {
          ids.push(obj.id);
        }
      });

      setSelection(ids);
      startRef.current = null;
      setRect(null);
    };

    stage.on('mousedown', onMouseDown);
    stage.on('mousemove', onMouseMove);
    stage.on('mouseup', onMouseUp);

    return () => {
      stage.off('mousedown', onMouseDown);
      stage.off('mousemove', onMouseMove);
      stage.off('mouseup', onMouseUp);
    };
  }, [objects, rect, setSelection, stageRef]);

  if (!rect) return null;

  return (
    <Rect
      x={rect.x}
      y={rect.y}
      width={rect.w}
      height={rect.h}
      stroke="#3b82f6"
      dash={[6, 4]}
      strokeWidth={1}
      fill="rgba(59, 130, 246, 0.1)"
      listening={false}
    />
  );
}
