import { useUI } from '@/context/ui-context';
import Loader from './loader';
import CustomAlert from './custom-alert';

export default function UIElements() {
  const { loaderState, alertState, hideAlert } = useUI();
  
  return (
    <>
      {/* Global Loader */}
      {loaderState.visible && (
        <Loader 
          type={loaderState.type} 
          text={loaderState.text}
          fullScreen={loaderState.fullScreen}
          size="large"
          color="primary"
        />
      )}
      
      {/* Global Alert */}
      <CustomAlert 
        show={alertState.visible}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
        onClose={hideAlert}
        autoClose={alertState.autoClose}
        autoCloseTime={alertState.autoCloseTime}
        position={alertState.position}
      />
    </>
  );
}