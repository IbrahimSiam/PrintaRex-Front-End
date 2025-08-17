import React, { useState, useEffect } from 'react';
import { Box, Fade } from '@mui/material';

interface MainPictureProps {
  srcWebp: string;  // This will be the .webp source
  srcJpg?: string;  // Optional jpg fallback (not needed for .webp)
  alt: string;
}

export const MainPicture: React.FC<MainPictureProps> = ({
  srcWebp,
  srcJpg,
  alt
}) => {
  const [currentSrc, setCurrentSrc] = useState(srcWebp);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (srcWebp !== currentSrc) {
      setIsLoading(true);
      setCurrentSrc(srcWebp);
    }
  }, [srcWebp, currentSrc]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Fade in={!isLoading} timeout={150}>
        <Box>
          <picture>
            <source srcSet={srcWebp} type="image/webp" />
            {srcJpg && <source srcSet={srcJpg} type="image/jpeg" />}
            <img
              src={srcWebp}
              alt={alt}
              loading="eager"
              onLoad={handleImageLoad}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '12px',
                transition: 'opacity 0.15s ease-in-out'
              }}
            />
          </picture>
        </Box>
      </Fade>
    </Box>
  );
};
