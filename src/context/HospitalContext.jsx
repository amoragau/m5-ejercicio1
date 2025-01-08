import { createContext, useContext, useState, useCallback } from 'react';

// Crear el contexto
const HospitalContext = createContext();

// Hook personalizado para usar el contexto
export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital debe ser usado dentro de un HospitalProvider');
  }
  return context;
};

// Crear el Provider personalizado
export const HospitalProvider = ({ children }) => {
  const [currentPage, setCurrentPage]                       = useState('home');
  const [refreshTriggerServices, setRefreshTriggerServices] = useState(0);
  const [refreshTriggerDoctors, setRefreshTriggerDoctors]   = useState(0);

  const refreshServices = useCallback(() => {
    setRefreshTriggerServices(prev => prev + 1);
  }, []);

  const refreshDoctors = useCallback(() => {
    setRefreshTriggerDoctors(prev => prev + 1);
  }, []);
  
  const value = {
    currentPage,
    setCurrentPage,
    refreshTriggerServices,
    refreshServices,
    refreshDoctors,
    refreshTriggerDoctors
  };

  return (
    <HospitalContext.Provider value={value}>
      {children}
    </HospitalContext.Provider>
  );
};


