import { useState, useCallback, useEffect, useRef } from 'react';
import { HospitalAPI } from '../services/HospitalApi';

export const useServices = (refreshTrigger) => {
  const [services, setServices]         = useState(null);
  const [isLoadingSrv, setIsLoadingSrv] = useState(true);
  const [errorSrv, setErrorSrv]         = useState(null);
  const isFirstRender                   = useRef(true);
  const abortController                 = useRef(null);

  const fetchServices = useCallback(async () => {
    try {
      // Si hay una petición pendiente, se cancela
      if (abortController.current) {
        abortController.current.abort();
      }
      abortController.current = new AbortController();

      setIsLoadingSrv(true);
      setErrorSrv(null);

      console.log('Cargando datos...');
      const data = await HospitalAPI.getServices(abortController.current.signal);
      console.log('Datos cargados:', data);
      setServices(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error:', error);
        setErrorSrv(error.message || 'Ha ocurrido un error al cargar los servicios');
      }
    } finally {
      setIsLoadingSrv(false);
    }
  }, []);

  useEffect(() => {
    // Si es la primera renderización o hay un trigger de recarga, hace la petición
    if (isFirstRender.current || refreshTrigger) {
      fetchServices();
      isFirstRender.current = false;
    }

    // Cleanup function para cancelar peticiones pendientes
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, [fetchServices, refreshTrigger]);

  return { services, isLoadingSrv, errorSrv, fetchServices };
};