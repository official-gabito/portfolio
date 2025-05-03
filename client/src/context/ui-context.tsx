import { createContext, useContext, ReactNode, useState } from 'react';
import { AlertType } from '@/components/ui/custom-alert';

interface UIContextType {
  // Loader states
  isLoading: boolean;
  showLoader: (options?: {
    text?: string;
    type?: 'spinner' | 'dots' | 'pulse' | 'wave';
    fullScreen?: boolean;
  }) => void;
  hideLoader: () => void;
  
  // Alert states
  showAlert: (options: {
    type: AlertType;
    title: string;
    message: string;
    autoClose?: boolean;
    autoCloseTime?: number;
    position?: 'top' | 'bottom';
  }) => void;
  hideAlert: () => void;
  alertState: {
    visible: boolean;
    type: AlertType;
    title: string;
    message: string;
    autoClose: boolean;
    autoCloseTime: number;
    position: 'top' | 'bottom';
  };
  
  // Loader state
  loaderState: {
    visible: boolean;
    text: string;
    type: 'spinner' | 'dots' | 'pulse' | 'wave';
    fullScreen: boolean;
  };
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

interface UIProviderProps {
  children: ReactNode;
}

export function UIProvider({ children }: UIProviderProps) {
  // Loader state
  const [loaderState, setLoaderState] = useState<{
    visible: boolean;
    text: string;
    type: 'spinner' | 'dots' | 'pulse' | 'wave';
    fullScreen: boolean;
  }>({
    visible: false,
    text: '',
    type: 'spinner',
    fullScreen: true,
  });
  
  // Alert state
  const [alertState, setAlertState] = useState<{
    visible: boolean;
    type: AlertType;
    title: string;
    message: string;
    autoClose: boolean;
    autoCloseTime: number;
    position: 'top' | 'bottom';
  }>({
    visible: false,
    type: 'info',
    title: '',
    message: '',
    autoClose: true,
    autoCloseTime: 5000,
    position: 'top',
  });
  
  // Show loader
  const showLoader = (options?: {
    text?: string;
    type?: 'spinner' | 'dots' | 'pulse' | 'wave';
    fullScreen?: boolean;
  }) => {
    setLoaderState({
      visible: true,
      text: options?.text || '',
      type: options?.type || 'spinner',
      fullScreen: options?.fullScreen !== undefined ? options.fullScreen : true,
    });
  };
  
  // Hide loader
  const hideLoader = () => {
    setLoaderState(prev => ({
      ...prev,
      visible: false
    }));
  };
  
  // Show alert
  const showAlert = (options: {
    type: AlertType;
    title: string;
    message: string;
    autoClose?: boolean;
    autoCloseTime?: number;
    position?: 'top' | 'bottom';
  }) => {
    setAlertState({
      visible: true,
      type: options.type,
      title: options.title,
      message: options.message,
      autoClose: options.autoClose !== undefined ? options.autoClose : true,
      autoCloseTime: options.autoCloseTime || 5000,
      position: options.position || 'top',
    });
  };
  
  // Hide alert
  const hideAlert = () => {
    setAlertState(prev => ({
      ...prev,
      visible: false
    }));
  };

  const value = {
    isLoading: loaderState.visible,
    showLoader,
    hideLoader,
    loaderState,
    showAlert,
    hideAlert,
    alertState,
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
}