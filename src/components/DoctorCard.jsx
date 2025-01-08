import PropTypes from 'prop-types';
import { useState } from 'react';
import { ProfilerComponent } from './Profiler';
import DoctorDetailsModal from './DoctorDetailsModal';

function DoctorCard({ doctor, onSelect }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <ProfilerComponent id="DoctorCard">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <img 
          src={doctor.img}
          alt={doctor.name} 
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          loading="lazy"
        />
        <h3 className="text-xl font-semibold">{doctor.name}</h3>
        <p className="text-gray-600">{doctor.specialty}</p>
        <p className="text-sm text-gray-500 mt-2"> {doctor.experience} años de experiencia.</p>
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-third-color text-first-color py-2 rounded hover:bg-second-color"
        >
          Ver Detalles
        </button>
        <button 
          onClick={onSelect}
          className="w-full mt-4 bg-third-color text-first-color py-2 px-4 rounded hover:bg-second-color transition-colors"
        >
          Seleccionar Doctor
        </button>
      </div>
      
      <DoctorDetailsModal
        doctor={doctor}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </ProfilerComponent>
  );
}
DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    schedule: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.string.isRequired,
        hours: PropTypes.string.isRequired,
        available: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        doctoreId: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  onSelect: PropTypes.func.isRequired
};


export default DoctorCard;