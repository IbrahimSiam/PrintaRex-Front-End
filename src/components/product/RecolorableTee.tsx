import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Box, Skeleton, useTheme } from '@mui/material';

export interface RecolorableTeeProps {
  colorHex: string;            // e.g., '#25282A' (Black) or '#FFFFFF' (White)
  designSrc?: string;          // optional user design overlay (PNG/WebP with transparency)
  width?: number;              // render width in px (default 800)
  view?: 'front' | 'back';     // which view to show
}

interface LoadedImages {
  background: HTMLImageElement;
  tshirtBase: HTMLImageElement;
  tshirtShadow?: HTMLImageElement;
  design?: HTMLImageElement;
}

export const RecolorableTee: React.FC<RecolorableTeeProps> = ({
  colorHex,
  designSrc,
  width = 800,
  view = 'front'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<LoadedImages | null>(null);
  const [currentDataUrl, setCurrentDataUrl] = useState<string>('');

  // Asset paths based on view
  const getAssetPaths = useCallback(() => ({
    background: '/assets/mockups/bg_splash.webp',
    tshirtBase: `/assets/mockups/tshirt_base_${view}.webp`,
    tshirtShadow: '/assets/mockups/tshirt_shadow.webp',
    design: designSrc
  }), [view, designSrc]);

  // Preload all images
  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      const paths = getAssetPaths();
      
      try {
        const imagePromises = [
          loadImage(paths.background),
          loadImage(paths.tshirtBase),
          paths.tshirtShadow ? loadImage(paths.tshirtShadow) : Promise.resolve(null),
          paths.design ? loadImage(paths.design) : Promise.resolve(null)
        ];

        const [background, tshirtBase, tshirtShadow, design] = await Promise.all(imagePromises);
        
        setLoadedImages({
          background: background!,
          tshirtBase: tshirtBase!,
          tshirtShadow: tshirtShadow || undefined,
          design: design || undefined
        });
      } catch (error) {
        console.error('Failed to load images:', error);
        // Fallback to placeholder
        setLoadedImages(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [getAssetPaths]);

  // Helper function to load an image
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  // Render the recolored t-shirt to canvas
  const renderTee = useCallback(() => {
    if (!canvasRef.current || !loadedImages) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio for sharpness
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = width;
    const displayHeight = (width * loadedImages.background.height) / loadedImages.background.width;
    
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;
    
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    try {
      // Step 1: Draw background
      ctx.drawImage(loadedImages.background, 0, 0, displayWidth, displayHeight);

      // Step 2: Draw solid color fill (cover entire canvas)
      ctx.fillStyle = colorHex;
      ctx.fillRect(0, 0, displayWidth, displayHeight);

      // Step 3: Multiply blend mode to tint the shirt while preserving texture
      ctx.globalCompositeOperation = 'multiply';
      ctx.drawImage(loadedImages.tshirtBase, 0, 0, displayWidth, displayHeight);

      // Step 4: Clip the tint strictly to the shirt alpha
      ctx.globalCompositeOperation = 'destination-in';
      ctx.drawImage(loadedImages.tshirtBase, 0, 0, displayWidth, displayHeight);

      // Step 5: Reset composite operation and add shadow if available
      ctx.globalCompositeOperation = 'source-over';
      
      if (loadedImages.tshirtShadow) {
        ctx.globalAlpha = 0.3; // 30% opacity for shadow
        ctx.drawImage(loadedImages.tshirtShadow, 0, 0, displayWidth, displayHeight);
        ctx.globalAlpha = 1.0;
      }

      // Step 6: Add user design overlay if provided
      if (loadedImages.design) {
        // Calculate design position (centered on chest)
        const designWidth = displayWidth * 0.4; // 40% of canvas width
        const designHeight = (designWidth * loadedImages.design.height) / loadedImages.design.width;
        const designX = (displayWidth - designWidth) / 2;
        const designY = displayHeight * 0.3; // 30% from top (chest area)
        
        ctx.drawImage(
          loadedImages.design,
          designX, designY, designWidth, designHeight
        );
      }

      // Special handling for white color to avoid grayish result
      if (colorHex === '#FFFFFF' || colorHex === '#ffffff') {
        // Apply a gentle screen pass to lift brightness
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, displayWidth, displayHeight);
        ctx.globalAlpha = 1.0;
        ctx.globalCompositeOperation = 'source-over';
      }

      // Export canvas to data URL
      const newDataUrl = canvas.toDataURL('image/webp', 0.9);
      setCurrentDataUrl(newDataUrl);
    } catch (error) {
      console.error('Error rendering t-shirt:', error);
    }
  }, [loadedImages, colorHex, width]);

  // Re-render when dependencies change
  useEffect(() => {
    if (loadedImages) {
      renderTee();
    }
  }, [loadedImages, colorHex, designSrc, view, renderTee]);

  if (isLoading) {
    return (
      <Box sx={{ width: width, height: width * 0.75 }}>
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height="100%" 
          animation="wave"
          sx={{ borderRadius: theme.shape.borderRadius }}
        />
      </Box>
    );
  }

  if (!loadedImages) {
    return (
      <Box 
        sx={{ 
          width: width, 
          height: width * 0.75,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.grey[100],
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          color: theme.palette.text.secondary
        }}
      >
        Failed to load images
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Hidden canvas for rendering */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
      
      {/* Display image with fade transition */}
      <Box
        component="img"
        src={currentDataUrl}
        alt={`${colorHex} t-shirt ${view} view`}
        sx={{
          width: width,
          height: 'auto',
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          transition: 'opacity 150ms ease-in-out',
          opacity: currentDataUrl ? 1 : 0,
        }}
      />
    </Box>
  );
};
