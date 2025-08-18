import React, { createContext, useContext, useRef, useCallback } from 'react';
import { useDesignerStore, ShapeObject } from '../../stores/designerStore';

interface DesignerContextValue {
  // Refs for canvas objects
  objectRefs: Map<string, any>;
  registerObject: (id: string, ref: any) => void;
  unregisterObject: (id: string) => void;
  getObjectRef: (id: string) => any;
  
  // Canvas actions
  addText: () => void;
  addImage: (payload: { src: string; width?: number; height?: number }) => Promise<void>;
  addShape: (payload: Partial<ShapeObject> & { shape: 'rect' | 'circle' | 'triangle' | 'line' }) => void;
  deleteSelected: () => void;
  duplicateSelected: () => void;
  
  // View and color switching
  switchView: (view: 'front' | 'back' | 'leftSleeve' | 'rightSleeve' | 'innerNeck' | 'outerNeck') => void;
  switchColor: (color: string) => void;
}

const DesignerContext = createContext<DesignerContextValue | null>(null);

export const useDesignerContext = () => {
  const context = useContext(DesignerContext);
  if (!context) {
    throw new Error('useDesignerContext must be used within a DesignerProvider');
  }
  return context;
};

interface DesignerProviderProps {
  children: React.ReactNode;
}

export const DesignerProvider: React.FC<DesignerProviderProps> = ({ children }) => {
  const objectRefs = useRef<Map<string, any>>(new Map());
  
  const {
    addText,
    addImage,
    addShape,
    removeObject,
    setView,
    setColor,
    selection
  } = useDesignerStore();

  const registerObject = useCallback((id: string, ref: any) => {
    objectRefs.current.set(id, ref);
  }, []);

  const unregisterObject = useCallback((id: string) => {
    objectRefs.current.delete(id);
  }, []);

  const getObjectRef = useCallback((id: string) => {
    return objectRefs.current.get(id);
  }, []);

  const deleteSelected = useCallback(() => {
    selection.forEach(id => {
      removeObject(id);
    });
  }, [selection, removeObject]);

  const duplicateSelected = useCallback(() => {
    // TODO: Implement object duplication
    console.log('Duplicate selected objects:', selection);
  }, [selection]);

  const switchView = useCallback((view: 'front' | 'back' | 'leftSleeve' | 'rightSleeve' | 'innerNeck' | 'outerNeck') => {
    setView(view);
  }, [setView]);

  const switchColor = useCallback((color: string) => {
    setColor(color);
  }, [setColor]);

  const contextValue: DesignerContextValue = {
    objectRefs: objectRefs.current,
    registerObject,
    unregisterObject,
    getObjectRef,
    addText,
    addImage: (payload) => addImage(payload),
    addShape: (payload) => addShape(payload),
    deleteSelected,
    duplicateSelected,
    switchView,
    switchColor
  };

  return (
    <DesignerContext.Provider value={contextValue}>
      {children}
    </DesignerContext.Provider>
  );
};

export default DesignerProvider;
