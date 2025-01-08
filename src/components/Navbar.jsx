import { useHospital } from '../context/HospitalContext';
import hopitalLogo from '../assets/Las casitas.png'

const Navbar = () => {
  const { currentPage, setCurrentPage } = useHospital();
  return (
    <nav className="bg-third-color text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
      <img src={hopitalLogo} className="logo" alt="Imagen hospital" />
        <span className="text-2xl font-bold text-first-color">Hospital Las Casitas</span>
        <div className="space-x-4">
          <button 
            onClick={() => setCurrentPage('home')} 
            className="text-first-color hover:text-second-color"
          >
            Inicio
          </button>
          <button 
            onClick={() => setCurrentPage('medical-team')} 
            className="text-first-color hover:text-second-color"
          >
            Equipo Médico
          </button>
          <button 
            onClick={() => setCurrentPage('appointment')} 
            className="text-first-color hover:text-second-color"
          >
            Agendar Cita
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;