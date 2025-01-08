import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';
import { ProfilerComponent } from '../components/Profiler';
import { useHospital } from '../context/HospitalContext';
import AppointmentForm from '../components/AppointmentForm';
import { useDoctors } from '../hooks/useDoctors'

const AppointmentView = ({ selectedDoctor, onDoctorSelect }) => {
  const { doctors, isLoadingDoc, errorDoc, fetchDoctors } = useDoctors();
  const selectRef = useRef(null);
  const handleSubmit = (formData) => {
    alert('Cita agendada con éxito');
    console.log('Datos del formulario:', formData);
    selectRef.current.focus();
  };
  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  }, []); 

  if (isLoadingDoc) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 flex items-center justify-center">
        <p className="text-gray-600">Cargando doctores...</p>
      </div>
    );
  }

  if (errorDoc) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-red-600 mb-3">Error: {errorDoc}</p>
              <button
                onClick={fetchDoctors}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <ProfilerComponent id="AppointmentView">
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Seleccionar Doctor</label>
              <select
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 bg-white"
                onChange={(e) => {
                  const doctor = doctors.find(d => d.id === parseInt(e.target.value));
                  onDoctorSelect(doctor);
                }}
                value={selectedDoctor ? selectedDoctor.id : ''}
                ref={selectRef}
                required
              >
                <option value="">Seleccione un doctor</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>
            <AppointmentForm
              selectedDoctor={selectedDoctor}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </ProfilerComponent>
  );
};
AppointmentView.propTypes = {
  selectedDoctor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    schedule: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.string.isRequired,
        hours: PropTypes.string.isRequired,
        available: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        doctoreId: PropTypes.string.isRequired
      })
    ).isRequired
  }),
  onDoctorSelect: PropTypes.func.isRequired
};
export default AppointmentView;