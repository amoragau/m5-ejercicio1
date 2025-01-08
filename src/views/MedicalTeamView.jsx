import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import DoctorCard from "../components/DoctorCard";
import { useHospital } from '../context/HospitalContext';
import { ProfilerComponent } from '../components/Profiler';
import ServiceListWithLoading  from '../components/ServiceListWithLoading';
import { useServices } from '../hooks/useServices';
import { useDoctors } from '../hooks/useDoctors';

function MedicalTeamView({ onDoctorSelect }) {
  const { refreshTriggerServices, refreshTriggerDoctors }   = useHospital();
  const [selectedSpecialty, setSelectedSpecialty]           = useState('');
  const { services, isLoadingSrv, errorSrv, fetchServices } = useServices(refreshTriggerServices);
  const { doctors, isLoadingDoc, errorDoc, fetchDoctors }   = useDoctors(refreshTriggerDoctors);


  const filteredDoctors = useMemo(() => {
    if (!doctors) return [];
    if (!selectedSpecialty) return doctors;
    return doctors.filter(doctor => doctor?.specialty === selectedSpecialty);
  }, [doctors, selectedSpecialty]);

  const specialties = useMemo(() => {
    if (!doctors) return [];
    return [...new Set(doctors.map(d => d?.specialty).filter(Boolean))];
  }, [doctors]);

  if (isLoadingDoc) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Cargando doctores...</p>
      </div>
    );
  }
  return (
    <ProfilerComponent id="MedicalTeamView">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <select 
            className="w-full md:w-auto px-4 py-2 border rounded-lg bg-white"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            <option value="">Todas las especialidades</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-[2fr_1fr] gap-8">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredDoctors.map((doctor, index) => (
              <DoctorCard
                key={doctor?.id || index}
                doctor={doctor}
                onSelect={() => onDoctorSelect(doctor)}
              />
            ))}
          </div>
          <div className="grid md:grid-cols-1">
            {errorSrv ? (
                <div className="p-4 mb-4 text-red-500 bg-red-50 rounded-lg border border-red-200">
                  <p className="font-medium">Error: {errorSrv}</p>
                  <button 
                    onClick={fetchServices}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Recargar
                  </button>
                </div>
              ) : (
                <ServiceListWithLoading
                  isLoading={isLoadingSrv}
                  services={services || []}
                />
              )
            }
          </div>
        </div>
      </div>
    </ProfilerComponent>
  );
}
MedicalTeamView.propTypes = {
  onDoctorSelect: PropTypes.func.isRequired
};
export default MedicalTeamView;