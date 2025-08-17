import React from 'react';
import { ToggleButtonGroup, ToggleButton, useTheme } from '@mui/material';

interface ViewToggleProps {
  value: 'front' | 'back';
  onChange: (view: 'front' | 'back') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({
  value,
  onChange
}) => {
  const theme = useTheme();

  const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: 'front' | 'back' | null) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      aria-label="View selection"
      size="small"
      sx={{
        '& .MuiToggleButton-root': {
          height: 36,
          minWidth: 64,
          fontSize: '0.875rem',
          px: 2,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: theme.shape.borderRadius,
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
          '&.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          },
        },
      }}
    >
      <ToggleButton value="front" aria-label="Front view">
        Front
      </ToggleButton>
      <ToggleButton value="back" aria-label="Back view">
        Back
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
