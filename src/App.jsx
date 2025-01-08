import { useState } from 'react'
import { HospitalProvider, useHospital } from './context/HospitalContext';
import './App.css'
import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import MedicalTeamView from './views/MedicalTeamView';
import AppointmentView from './views/AppointmentView';
import ContactView from './views/ContactView';

const HospitalWebsite = () => {
  const { currentPage, setCurrentPage }     = useHospital();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setCurrentPage('appointment');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {currentPage === 'home' && <HomeView />}
      {currentPage === 'medical-team' && <MedicalTeamView onDoctorSelect={handleDoctorSelect}/>}
      {currentPage === 'appointment' && <AppointmentView selectedDoctor={selectedDoctor} onDoctorSelect={setSelectedDoctor}/>}
      {currentPage === 'contact' && <ContactView />}
      
      <footer className="bg-third-color text-first-color py-8 mt-auto">
        <div className="container mx-auto grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Hospital Las Casitas</h3>
            <p className="text-sm">
              Comprometidos con tu salud y bienestar
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <div className="space-y-2">
              <button onClick={() => setCurrentPage('home')}>Inicio</button> ||
              <button onClick={() => setCurrentPage('medical-team')}>Equipo Médico</button> ||
              <button onClick={() => setCurrentPage('appointment')}>Agendar Cita</button> ||
              <button onClick={() => setCurrentPage('contact')}>Contacto</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <HospitalProvider>
      <HospitalWebsite />
    </HospitalProvider>
  );
};

export default App;