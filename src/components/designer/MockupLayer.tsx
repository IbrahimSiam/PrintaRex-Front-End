import React, { useState, useEffect } from 'react';
import { Image, Text, Rect } from 'react-konva';

interface MockupLayerProps {
  mockupSrc: string;
}

const MockupLayer: React.FC<MockupLayerProps> = ({ mockupSrc }) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mockupSrc) {
      setImage(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      setImage(img);
      setLoading(false);
    };
    
    img.onerror = () => {
      setError('Failed to load mockup image');
      setLoading(false);
    };

    img.src = mockupSrc;
  }, [mockupSrc]);

  if (loading) {
    return (
      <>
        <Rect
          x={0}
          y={0}
          width={1000}
          height={1000}
          fill="#f5f5f5"
          stroke="#ddd"
          strokeWidth={2}
          dash={[10, 5]}
        />
        <Text
          x={500}
          y={500}
          text="Loading mockup..."
          fontSize={16}
          fill="#666"
          align="center"
          offsetX={-50}
          offsetY={-8}
        />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Rect
          x={0}
          y={0}
          width={1000}
          height={1000}
          fill="#fff3cd"
          stroke="#ffc107"
          strokeWidth={2}
          dash={[10, 5]}
        />
        <Text
          x={500}
          y={500}
          text={error}
          fontSize={16}
          fill="#856404"
          align="center"
          offsetX={-80}
          offsetY={-8}
        />
      </>
    );
  }

  if (!image) {
    return (
      <>
        <Rect
          x={0}
          y={0}
          width={1000}
          height={1000}
          fill="#f8f9fa"
          stroke="#dee2e6"
          strokeWidth={2}
          dash={[10, 5]}
        />
        <Text
          x={500}
          y={500}
          text="No mockup selected"
          fontSize={16}
          fill="#666"
          align="center"
          offsetX={-70}
          offsetY={-8}
        />
      </>
    );
  }

  return (
    <Image
      image={image}
      x={0}
      y={0}
      width={1000}
      height={1000}
      listening={false}
    />
  );
};

export default MockupLayer;
