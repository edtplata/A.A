
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { AppView } from '../types';
import Card from '../components/Card';
import { StepsIcon, TraditionsIcon, ServicesIcon, LiteratureIcon, SponsorIcon, CommunityIcon, ProgressIcon, JournalIcon } from '../components/Icons';

interface MenuItem {
  id: AppView;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const menuItems: MenuItem[] = [
  { id: AppView.VIRTUAL_SPONSOR, title: "Padrino Virtual", description: "Habla con un guía de IA.", icon: <SponsorIcon />, color: "bg-sky-500" },
  { id: AppView.STEPS, title: "12 Pasos", description: "Guía para la recuperación.", icon: <StepsIcon />, color: "bg-teal-500" },
  { id: AppView.TRADITIONS, title: "12 Tradiciones", description: "Principios de unidad.", icon: <TraditionsIcon />, color: "bg-indigo-500" },
  { id: AppView.PROGRESS, title: "Mi Progreso", description: "Rastrea tu camino.", icon: <ProgressIcon />, color: "bg-amber-500" },
  { id: AppView.GRATITUDE_JOURNAL, title: "Diario de Gratitud", description: "Anota tus bendiciones.", icon: <JournalIcon />, color: "bg-pink-500" },
  { id: AppView.COMMUNITY, title: "Comunidad", description: "Comparte y conecta.", icon: <CommunityIcon />, color: "bg-rose-500" },
  { id: AppView.LITERATURE, title: "Literatura", description: "Lecturas y recursos.", icon: <LiteratureIcon />, color: "bg-emerald-500" },
  { id: AppView.SERVICES, title: "Servicios AA", description: "Encuentra reuniones.", icon: <ServicesIcon />, color: "bg-slate-500" },
];


const HomeView: React.FC = () => {
  const { setView, user } = useAppContext();

  return (
    <div className="space-y-6">
       <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-secondary">Hola, {user?.name}</h2>
            <p className="text-slate-500 mt-1">¿En qué podemos ayudarte hoy?</p>
       </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {menuItems.map((item) => (
          <Card key={item.id} onClick={() => setView(item.id)} className="group">
            <div className="p-6 flex flex-col items-center text-center">
              <div className={`p-4 rounded-full ${item.color} mb-4`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-brand-secondary">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomeView;