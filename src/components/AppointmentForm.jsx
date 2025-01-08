import PropTypes from 'prop-types';
import { useState } from 'react';

function AppointmentForm({ selectedDoctor, onSubmit }) {
  const initialState = {
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors]     = useState({});
  
  // Validaciones
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    // Validar nombre
    if (!formData.name.trim()) {
      tempErrors.name = 'El nombre es requerido';
      isValid = false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/.test(formData.name)) {
      tempErrors.name = 'Ingrese un nombre válido (3-50 caracteres)';
      isValid = false;
    }

    // Validar email
    if (!formData.email) {
      tempErrors.email = 'El email es requerido';
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      tempErrors.email = 'Ingrese un email válido';
      isValid = false;
    }

    // Validar teléfono
    if (!formData.phone) {
      tempErrors.phone = 'El teléfono es requerido';
      isValid = false;
    } else if (!/^[0-9]{8,9}$/.test(formData.phone.replace(/\D/g, ''))) {
      tempErrors.phone = 'Ingrese un número válido (8-9 dígitos)';
      isValid = false;
    }

    // Validar fecha
    if (!formData.date) {
      tempErrors.date = 'La fecha es requerida';
      isValid = false;
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      if (selectedDate < today) {
        tempErrors.date = 'La fecha no puede ser anterior a hoy';
        isValid = false;
      }
    }

    setErrors(tempErrors);
    return isValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Formulario válido:', formData);
      onSubmit({
        ...formData,
        doctor: selectedDoctor
      });
      setFormData(initialState);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-first-color">Agendar Cita</h2>
      {/* Información del doctor y servicio seleccionado */}
      {(selectedDoctor) && (
        <div className="bg-green-50 p-4 rounded-lg mb-5">
          {selectedDoctor && (
            <div className="mb-2">
              <span className="font-semibold">Doctor:</span> {selectedDoctor.name} - {selectedDoctor.specialty}
            </div>
          )}
        </div>
      )}
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre Completo</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${ errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${ errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${ errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs italic mt-1">{errors.phone}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Fecha</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${ errors.date ? 'border-red-500' : ''}`}
          />
          {errors.date && (
            <p className="text-red-500 text-xs italic mt-1">{errors.date}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Mensaje (opcional)</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows="4"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className='bg-third-color hover:bg-second-color w-full text-first-color py-2 rounded transition-colors'
          >
            Agendar Cita
          </button>
        </div>
      </form>
    </div>
  );
}
AppointmentForm.propTypes = {
  selectedDoctor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired
  }),
  onSubmit: PropTypes.func.isRequired
};

export default AppointmentForm;