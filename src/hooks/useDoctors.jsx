import { useState, useCallback, useEffect, useRef } from 'react';
import { HospitalAPI } from '../services/HospitalApi';

export const useDoctors = (refreshTrigger) => {
  const [doctors, setDoctors]           = useState(null);
  const [isLoadingDoc, setIsLoadingDoc] = useState(true);
  const [errorDoc, setErrorDoc]         = useState(null);
  const isFirstRender                   = useRef(true);
  const abortController                 = useRef(null);

  const fetchDoctors = useCallback(async () => {
    try {
       // Si hay una petición pendiente, se cancela
       if (abortController.current) {
        abortController.current.abort();
      }
      abortController.current = new AbortController();

      setIsLoadingDoc(true);
      setErrorDoc(null);

      console.log('Cargando datos...');
      const data = await HospitalAPI.getDoctors(abortController.current.signal);
      console.log('Datos doctores cargados:', data);
      setDoctors(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error:', error);
        setErrorDoc(error.message || 'Ha ocurrido un error al cargar los servicios');
      }
    } finally {
      setIsLoadingDoc(false);
    }
  }, []);
  useEffect(() => {
    // Si es la primera renderización o hay un trigger de recarga, hace la petición
    if (isFirstRender.current || refreshTrigger) {
      fetchDoctors();
      isFirstRender.current = false;
    }

    // Cleanup function para cancelar peticiones pendientes
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, [fetchDoctors, refreshTrigger]);

  return { doctors, isLoadingDoc, errorDoc, fetchDoctors };
};