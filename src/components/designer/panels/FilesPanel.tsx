import React, { useState, useRef, useCallback } from 'react';
import {
  Box, Button, Typography, TextField, Chip, Grid, Card, CardContent,
  IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent,
  DialogActions, FormControl, InputLabel, Select, Switch, FormControlLabel,
  Alert, Snackbar, LinearProgress
} from '@mui/material';
import {
  CloudUpload, Search, MoreVert, Visibility, Edit, Delete, Add,
  Cloud, CloudQueue, FileCopy, Image, PictureAsPdf, Brush
} from '@mui/icons-material';
import { useDesignerUIStore } from '../../../stores/designerUIStore';
import { useDesignerContext } from '../DesignerProvider';

const FilesPanel: React.FC = () => {
  const { assets, addAsset, removeAsset, updateAsset } = useDesignerUIStore();
  const { addImage } = useDesignerContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [hideUsed, setHideUsed] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showCloudModal, setShowCloudModal] = useState(false);
  const [cloudService, setCloudService] = useState<'drive' | 'dropbox'>('drive');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [contextMenu, setContextMenu] = useState<{
    anchorEl: HTMLElement | null;
    assetId: string | null;
  }>({ anchorEl: null, assetId: null });

  // Filter assets based on search and hide used
  const filteredAssets = assets.images.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesHideUsed = !hideUsed || asset.usedCount === 0;
    return matchesSearch && matchesHideUsed;
  });

  // Handle file upload
  const handleFileUpload = useCallback(async (files: FileList) => {
    setUploading(true);
    setUploadProgress(0);
    
    const validFiles = Array.from(files).filter(file => {
      const validTypes = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.pdf'];
      const extension = '.' + file.name.split('.').pop()?.toLowerCase();
      return validTypes.includes(extension) && file.size <= 25 * 1024 * 1024; // 25MB limit
    });

    if (validFiles.length === 0) {
      setUploading(false);
      return;
    }

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      
      try {
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          setUploadProgress(progress);
          await new Promise(resolve => setTimeout(resolve, 50));
        }

        // Create object URL for the file
        const url = URL.createObjectURL(file);
        
        // Determine file type
        let type: 'image' | 'vector' | 'pdf' = 'image';
        if (file.name.endsWith('.svg')) type = 'vector';
        else if (file.name.endsWith('.pdf')) type = 'pdf';

        // Add asset to store
        addAsset({
          name: file.name,
          type,
          url,
          tags: [],
          size: file.size,
        });

        // Track analytics (stub)
        console.log('Asset uploaded:', { count: 1, source: 'local' });
        
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
    
    setUploading(false);
    setUploadProgress(0);
  }, [addAsset]);

  // Handle drag and drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  // Handle asset insertion
  const handleInsertAsset = useCallback((asset: any) => {
    // Insert into canvas via designer store
    addImage({ src: asset.url });
  }, [addImage]);

  // Handle asset actions
  const handleAssetAction = useCallback((action: string, asset: any) => {
    switch (action) {
      case 'insert':
        handleInsertAsset(asset);
        break;
      case 'rename':
        // TODO: Implement rename dialog
        break;
      case 'delete':
        if (asset.usedCount > 0) {
          if (window.confirm(`This asset is used ${asset.usedCount} time(s). Are you sure you want to delete it?`)) {
            removeAsset(asset.id);
          }
        } else {
          removeAsset(asset.id);
        }
        break;
      case 'preview':
        window.open(asset.url, '_blank');
        break;
    }
    setContextMenu({ anchorEl: null, assetId: null });
  }, [handleInsertAsset, removeAsset]);

  // Cloud service stubs
  const handleCloudImport = useCallback(async () => {
    setShowCloudModal(false);
    
    try {
      if (cloudService === 'drive') {
        // Stub for Google Drive
        console.log('Connecting to Google Drive...');
        // In production, this would integrate with Google Drive API
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Google Drive import completed');
      } else {
        // Stub for Dropbox
        console.log('Connecting to Dropbox...');
        // In production, this would integrate with Dropbox API
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Dropbox import completed');
      }
    } catch (error) {
      console.error('Cloud import error:', error);
    }
  }, [cloudService]);

  // Get file type icon
  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'vector':
        return <Brush />;
      case 'pdf':
        return <PictureAsPdf />;
      default:
        return <Image />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Upload Section */}
      <Box sx={{ mb: 3 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<CloudUpload />}
          onClick={() => fileInputRef.current?.click()}
          sx={{ mb: 2 }}
        >
          Upload Files
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".png,.jpg,.jpeg,.webp,.svg,.pdf"
          style={{ display: 'none' }}
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        />

        {/* Drag & Drop Zone */}
        <Box
          sx={{
            border: '2px dashed #d1d5db',
            borderRadius: 2,
            p: 3,
            textAlign: 'center',
            backgroundColor: '#f9fafb',
            cursor: 'pointer',
            '&:hover': {
              borderColor: '#2563eb',
              backgroundColor: '#eff6ff'
            }
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <CloudUpload sx={{ fontSize: 48, color: '#6b7280', mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Drag & drop files here, or click to browse
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Supports PNG, JPG, JPEG, WebP, SVG, PDF (max 25MB)
          </Typography>
        </Box>

        {/* Cloud Import Buttons */}
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Cloud />}
            onClick={() => {
              setCloudService('drive');
              setShowCloudModal(true);
            }}
            sx={{ flex: 1 }}
          >
            Google Drive
          </Button>
          <Button
            variant="outlined"
            startIcon={<CloudQueue />}
            onClick={() => {
              setCloudService('dropbox');
              setShowCloudModal(true);
            }}
            sx={{ flex: 1 }}
          >
            Dropbox
          </Button>
        </Box>
      </Box>

      {/* Upload Progress */}
      {uploading && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Uploading... {uploadProgress}%
          </Typography>
          <LinearProgress variant="determinate" value={uploadProgress} />
        </Box>
      )}

      {/* Controls */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            size="small"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
            }}
            sx={{ flex: 1 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={hideUsed}
                onChange={(e) => setHideUsed(e.target.checked)}
                size="small"
              />
            }
            label="Hide used"
          />
        </Box>
      </Box>

      {/* Assets Grid */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Assets ({filteredAssets.length})
        </Typography>
        
        {filteredAssets.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
            <Image sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
            <Typography variant="body2">
              {searchTerm ? 'No assets match your search' : 'No assets uploaded yet'}
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={1}>
            {filteredAssets.map((asset) => (
              <Grid item xs={6} key={asset.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: 2,
                      transform: 'translateY(-1px)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <CardContent sx={{ p: 1.5 }}>
                    {/* Asset Preview */}
                    <Box
                      sx={{
                        width: '100%',
                        height: 80,
                        backgroundColor: '#f3f4f6',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 1,
                        position: 'relative'
                      }}
                    >
                      {asset.type === 'image' ? (
                        <img
                          src={asset.url}
                          alt={asset.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 4
                          }}
                        />
                      ) : (
                        getFileTypeIcon(asset.type)
                      )}
                      
                      {/* Used indicator */}
                      {asset.usedCount > 0 && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            backgroundColor: '#10b981',
                            color: 'white',
                            borderRadius: '50%',
                            width: 20,
                            height: 20,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.7rem',
                            fontWeight: 600
                          }}
                        >
                          {asset.usedCount}
                        </Box>
                      )}
                    </Box>

                    {/* Asset Info */}
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        fontWeight: 500,
                        mb: 0.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {asset.name}
                    </Typography>

                    {/* Asset Actions */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleAssetAction('insert', asset)}
                        sx={{ fontSize: '0.7rem', py: 0.5 }}
                      >
                        Insert
                      </Button>
                      
                      <IconButton
                        size="small"
                        onClick={(e) => setContextMenu({ anchorEl: e.currentTarget, assetId: asset.id })}
                      >
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Context Menu */}
      <Menu
        anchorEl={contextMenu.anchorEl}
        open={Boolean(contextMenu.anchorEl)}
        onClose={() => setContextMenu({ anchorEl: null, assetId: null })}
      >
        <MenuItem onClick={() => {
          const asset = assets.images.find(a => a.id === contextMenu.assetId);
          if (asset) handleAssetAction('preview', asset);
        }}>
          <Visibility sx={{ mr: 1 }} /> Preview
        </MenuItem>
        <MenuItem onClick={() => {
          const asset = assets.images.find(a => a.id === contextMenu.assetId);
          if (asset) handleAssetAction('rename', asset);
        }}>
          <Edit sx={{ mr: 1 }} /> Rename
        </MenuItem>
        <MenuItem onClick={() => {
          const asset = assets.images.find(a => a.id === contextMenu.assetId);
          if (asset) handleAssetAction('delete', asset);
        }}>
          <Delete sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Cloud Import Modal */}
      <Dialog open={showCloudModal} onClose={() => setShowCloudModal(false)}>
        <DialogTitle>
          Connect to {cloudService === 'drive' ? 'Google Drive' : 'Dropbox'}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {cloudService === 'drive' 
              ? 'Connect your Google Drive account to import files directly.'
              : 'Connect your Dropbox account to import files directly.'
            }
          </Typography>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select files</InputLabel>
            <Select
              value=""
              label="Select files"
              onChange={() => {}}
            >
              <MenuItem value="">Choose files to import</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCloudModal(false)}>Cancel</Button>
          <Button onClick={handleCloudImport} variant="contained">
            Import
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FilesPanel;
