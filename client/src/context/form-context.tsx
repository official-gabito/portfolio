import { createContext, useState, useContext, ReactNode } from 'react';

interface FormContextType {
  selectedPackage: string | null;
  setSelectedPackage: (packageName: string) => void;
  resetSelectedPackage: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

export function FormProvider({ children }: FormProviderProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const resetSelectedPackage = () => {
    setSelectedPackage(null);
  };

  return (
    <FormContext.Provider value={{ selectedPackage, setSelectedPackage, resetSelectedPackage }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  
  return context;
}
