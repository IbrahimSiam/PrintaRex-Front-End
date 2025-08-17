import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Link } from '@mui/material';
import { Help, ExpandMore } from '@mui/icons-material';

const HelpPanel: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Help & Support
      </Typography>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle2">Getting Started</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            Learn the basics of using the designer tool to create your first design.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle2">Uploading Assets</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            How to upload and manage your images, graphics, and other assets.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle2">Text & Typography</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            Working with text elements and typography in your designs.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Need more help?
        </Typography>
        <Link href="#" underline="hover">
          Contact Support
        </Link>
      </Box>
    </Box>
  );
};

export default HelpPanel;
