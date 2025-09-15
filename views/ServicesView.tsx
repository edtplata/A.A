
import React from 'react';
import { SERVICES } from '../data/content';
import Card from '../components/Card';

const ServicesView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-brand-secondary">Servicios AA</h2>
        <p className="text-slate-500 mt-1">Encuentra ayuda y reuniones cerca de ti.</p>
      </div>
      <div className="space-y-4">
        {SERVICES.map((service) => (
          <Card key={service.id}>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-700">{service.name}</h3>
              <p className="text-slate-500 mt-1">Ubicación: {service.location}</p>
              <p className="text-slate-500">Contacto: {service.contact}</p>
              <a
                href={service.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-700 transition-colors"
              >
                Visitar Sitio Web
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesView;
