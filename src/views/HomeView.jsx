
import React from "react";
import PropTypes from 'prop-types';
import { ProfilerComponent } from '../components/Profiler';
import { useHospital } from '../context/HospitalContext';
import hopitalImagen from '../assets/hospital.svg'
import Card from '../components/Card'

const Header = () => (
  <React.Fragment>
    <h1 className="text-4xl font-bold text-first-color mb-4">
      Hospital Las Casitas
    </h1>
    <img src={hopitalImagen} className="imagen-inicio" alt="Imagen hospital" />
  </React.Fragment>
);

const ServiceCards = ({ items }) => (
  <React.Fragment>
    {items.map((item, i) => (
      <Card key={i} {...item} />
    ))}
  </React.Fragment>
);
ServiceCards.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      actionText: PropTypes.string.isRequired,
      onAction: PropTypes.func.isRequired
    })
  ).isRequired
};
const HomeView = () => {
  const { setCurrentPage } = useHospital();
  const items = [
    {
      title: 'Nuestros Servicios',
      description: 'Ofrecemos atención médica integral con los mejores especialistas.',
      actionText: 'Ver Equipo Médico',
      onAction: () => setCurrentPage('medical-team')
    },
    {
      title: 'Agende su Cita',
      description: 'Reserva tu consulta de manera rápida y sencilla.',
      actionText: 'Solicitar Cita',
      onAction: () => setCurrentPage('appointment')
    },
    {
      title: 'Atención 24/7',
      description: 'Estamos disponibles para ti en cualquier momento.',
      actionText: 'Contactar',
      onAction: () => setCurrentPage('contact')
    }
  ];

  return (
    <React.Fragment>
      <ProfilerComponent id="HomeView">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <Header />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCards items={items} />
          </div>
        </div>
      </ProfilerComponent>
    </React.Fragment>
  );
};

export default HomeView;