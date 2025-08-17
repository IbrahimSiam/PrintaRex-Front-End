import React from 'react';
import { Box, Typography, Button, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Visibility, Lock, MoreVert, ArrowUpward, ArrowDownward } from '@mui/icons-material';

const LayersPanel: React.FC = () => {
  const layers = [
    { id: '1', name: 'Background', visible: true, locked: false },
    { id: '2', name: 'Text Layer', visible: true, locked: false },
    { id: '3', name: 'Image Layer', visible: true, locked: false },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Layers
      </Typography>
      
      <Grid container spacing={1} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Button variant="outlined" size="small" fullWidth startIcon={<ArrowUpward />}>
            Bring Forward
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" size="small" fullWidth startIcon={<ArrowDownward />}>
            Send Backward
          </Button>
        </Grid>
      </Grid>
      
      <List>
        {layers.map((layer) => (
          <ListItem key={layer.id} divider>
            <ListItemText primary={layer.name} />
            <ListItemSecondaryAction>
              <IconButton size="small">
                <Visibility />
              </IconButton>
              <IconButton size="small">
                <Lock />
              </IconButton>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LayersPanel;
