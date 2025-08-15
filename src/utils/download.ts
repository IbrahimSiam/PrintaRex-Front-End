import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import * as fabric from 'fabric';

export interface ExportOptions {
  format: 'png' | 'pdf';
  quality?: number;
  scale?: number;
  filename?: string;
}

export interface DesignData {
  id: string;
  name: string;
  productId: string | null;
  canvasJSON: string;
  previewDataURL: string;
  frontCanvasJSON?: string;
  backCanvasJSON?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Export current design as PNG using html2canvas
 */
export const exportAsPNG = async (
  canvas: fabric.Canvas,
  options: Partial<ExportOptions> = {}
): Promise<string> => {
  const {
    quality = 1,
    scale = 2,
    filename = `design_${Date.now()}.png`
  } = options;

  try {
    // Render canvas to ensure all changes are applied
    canvas.renderAll();
    
    // Get canvas element
    const canvasElement = canvas.getElement();
    if (!canvasElement) {
      throw new Error('Canvas element not found');
    }

    // Create a wrapper div for better export
    const wrapper = document.createElement('div');
    wrapper.style.position = 'absolute';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '-9999px';
    wrapper.style.width = `${canvasElement.width}px`;
    wrapper.style.height = `${canvasElement.height}px`;
    wrapper.style.backgroundColor = 'white';
    wrapper.style.border = '1px solid #e0e0e0';
    
    // Clone the canvas
    const clonedCanvas = canvasElement.cloneNode(true) as HTMLCanvasElement;
    wrapper.appendChild(clonedCanvas);
    document.body.appendChild(wrapper);

    // Use html2canvas to capture the design
    const result = await html2canvas(wrapper, {
      scale: scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: canvasElement.width,
      height: canvasElement.height,
      logging: false,
    });

    // Clean up
    document.body.removeChild(wrapper);

    // Convert to blob and save
    const blob = await new Promise<Blob>((resolve) => {
      result.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          throw new Error('Failed to create blob');
        }
      }, 'image/png', quality);
    });

    // Save the file
    saveAs(blob, filename);
    
    // Return data URL for preview
    return result.toDataURL('image/png', quality);
  } catch (error) {
    console.error('Error exporting PNG:', error);
    throw error;
  }
};

/**
 * Export current design as mock PDF (single-page)
 * This creates a PDF-like experience using html2canvas
 */
export const exportAsPDF = async (
  canvas: fabric.Canvas,
  options: Partial<ExportOptions> = {}
): Promise<string> => {
  const {
    quality = 1,
    scale = 2,
    filename = `design_${Date.now()}.pdf`
  } = options;

  try {
    // Render canvas to ensure all changes are applied
    canvas.renderAll();
    
    // Get canvas element
    const canvasElement = canvas.getElement();
    if (!canvasElement) {
      throw new Error('Canvas element not found');
    }

    // Create a PDF-style wrapper
    const wrapper = document.createElement('div');
    wrapper.style.position = 'absolute';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '-9999px';
    wrapper.style.width = '595px'; // A4 width in pixels (72 DPI)
    wrapper.style.height = '842px'; // A4 height in pixels (72 DPI)
    wrapper.style.backgroundColor = 'white';
    wrapper.style.padding = '40px';
    wrapper.style.boxSizing = 'border-box';
    
    // Add title
    const title = document.createElement('h1');
    title.textContent = 'Design Export';
    title.style.margin = '0 0 20px 0';
    title.style.fontSize = '24px';
    title.style.color = '#333';
    title.style.textAlign = 'center';
    wrapper.appendChild(title);
    
    // Add canvas with proper scaling
    const canvasContainer = document.createElement('div');
    canvasContainer.style.textAlign = 'center';
    canvasContainer.style.marginBottom = '20px';
    
    const clonedCanvas = canvasElement.cloneNode(true) as HTMLCanvasElement;
    const maxWidth = 500; // Max width within PDF margins
    const maxHeight = 600; // Max height within PDF margins
    
    // Calculate scale to fit within PDF bounds
    const scaleX = maxWidth / canvasElement.width;
    const scaleY = maxHeight / canvasElement.height;
    const finalScale = Math.min(scaleX, scaleY, 1);
    
    clonedCanvas.style.width = `${canvasElement.width * finalScale}px`;
    clonedCanvas.style.height = `${canvasElement.height * finalScale}px`;
    clonedCanvas.style.border = '1px solid #e0e0e0';
    
    canvasContainer.appendChild(clonedCanvas);
    wrapper.appendChild(canvasContainer);
    
    // Add metadata
    const metadata = document.createElement('div');
    metadata.style.fontSize = '12px';
    metadata.style.color = '#666';
    metadata.style.textAlign = 'center';
    metadata.style.borderTop = '1px solid #e0e0e0';
    metadata.style.paddingTop = '20px';
    metadata.innerHTML = `
      <p>Exported on: ${new Date().toLocaleDateString()}</p>
      <p>Canvas dimensions: ${canvasElement.width} × ${canvasElement.height}px</p>
      <p>Scale: ${finalScale.toFixed(2)}x</p>
    `;
    wrapper.appendChild(metadata);
    
    document.body.appendChild(wrapper);

    // Use html2canvas to capture the PDF layout
    const result = await html2canvas(wrapper, {
      scale: scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 595,
      height: 842,
      logging: false,
    });

    // Clean up
    document.body.removeChild(wrapper);

    // Convert to blob and save
    const blob = await new Promise<Blob>((resolve) => {
      result.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          throw new Error('Failed to create blob');
        }
      }, 'image/png', quality);
    });

    // Save the file with .pdf extension (it's actually a PNG but looks like PDF)
    saveAs(blob, filename);
    
    // Return data URL for preview
    return result.toDataURL('image/png', quality);
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw error;
  }
};

/**
 * Save design to localStorage
 */
export const saveDesignToStorage = (design: DesignData): void => {
  try {
    const designs = getDesignsFromStorage();
    const existingIndex = designs.findIndex(d => d.id === design.id);
    
    if (existingIndex >= 0) {
      designs[existingIndex] = design;
    } else {
      designs.push(design);
    }
    
    localStorage.setItem('printarex_designs', JSON.stringify(designs));
    console.log('Design saved to storage:', design.id);
  } catch (error) {
    console.error('Error saving design to storage:', error);
    throw error;
  }
};

/**
 * Load design from localStorage
 */
export const loadDesignFromStorage = (designId: string): DesignData | null => {
  try {
    const designs = getDesignsFromStorage();
    return designs.find(d => d.id === designId) || null;
  } catch (error) {
    console.error('Error loading design from storage:', error);
    return null;
  }
};

/**
 * Get all saved designs from localStorage
 */
export const getDesignsFromStorage = (): DesignData[] => {
  try {
    const designsJson = localStorage.getItem('printarex_designs');
    if (!designsJson) return [];
    
    const designs = JSON.parse(designsJson);
    return Array.isArray(designs) ? designs : [];
  } catch (error) {
    console.error('Error getting designs from storage:', error);
    return [];
  }
};

/**
 * Delete design from localStorage
 */
export const deleteDesignFromStorage = (designId: string): void => {
  try {
    const designs = getDesignsFromStorage();
    const filteredDesigns = designs.filter(d => d.id !== designId);
    localStorage.setItem('printarex_designs', JSON.stringify(filteredDesigns));
    console.log('Design deleted from storage:', designId);
  } catch (error) {
    console.error('Error deleting design from storage:', error);
    throw error;
  }
};

/**
 * Create a new design data object
 */
export const createDesignData = (
  name: string,
  canvas: fabric.Canvas,
  productId: string | null = null
): DesignData => {
  return {
    id: Date.now().toString(),
    name,
    productId: productId || null,
    canvasJSON: JSON.stringify(canvas.toJSON()),
    previewDataURL: canvas.toDataURL({ format: 'png', quality: 0.8, multiplier: 1 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

/**
 * Update existing design data
 */
export const updateDesignData = (
  design: DesignData,
  canvas: fabric.Canvas
): DesignData => {
  return {
    ...design,
    canvasJSON: JSON.stringify(canvas.toJSON()),
    previewDataURL: canvas.toDataURL({ format: 'png', quality: 0.8, multiplier: 1 }),
    updatedAt: new Date(),
  };
};

export const exportMultiSidePNG = async (frontCanvas: fabric.Canvas, backCanvas: fabric.Canvas): Promise<Blob> => {
  const frontDataURL = frontCanvas.toDataURL({ format: 'png', quality: 1, multiplier: 1 });
  const backDataURL = backCanvas.toDataURL({ format: 'png', quality: 1, multiplier: 1 });
  
  // Create a ZIP file with both PNGs
  const JSZip = await import('jszip');
  const zip = new JSZip.default();
  
  // Convert data URLs to blobs
  const frontBlob = await fetch(frontDataURL).then(res => res.blob());
  const backBlob = await fetch(backDataURL).then(res => res.blob());
  
  zip.file('front.png', frontBlob);
  zip.file('back.png', backBlob);
  
  return await zip.generateAsync({ type: 'blob' });
};

export const exportMultiSidePDF = async (frontCanvas: fabric.Canvas, backCanvas: fabric.Canvas): Promise<Blob> => {
  const frontDataURL = frontCanvas.toDataURL({ format: 'png', quality: 1, multiplier: 1 });
  const backDataURL = backCanvas.toDataURL({ format: 'png', quality: 1, multiplier: 1 });
  
  // Use html2canvas to create a multi-page PDF
  const html2canvas = await import('html2canvas');
  const jsPDF = await import('jspdf');
  
  // Create a temporary container for both sides
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  
  const frontImg = document.createElement('img');
  frontImg.src = frontDataURL;
  frontImg.style.width = '400px';
  frontImg.style.height = 'auto';
  frontImg.style.marginBottom = '20px';
  
  const backImg = document.createElement('img');
  backImg.src = backDataURL;
  backImg.style.width = '400px';
  backImg.style.height = 'auto';
  
  container.appendChild(frontImg);
  container.appendChild(backImg);
  document.body.appendChild(container);
  
  try {
    const canvas = await html2canvas.default(container, {
      width: 400,
      height: 800,
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF.default('p', 'mm', 'a4');
    
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    // Add first page (front)
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add second page (back) if needed
    if (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    }
    
    return pdf.output('blob');
  } finally {
    document.body.removeChild(container);
  }
};
