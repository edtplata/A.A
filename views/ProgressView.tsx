
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Card from '../components/Card';
import { STEPS } from '../data/content';

const ProgressView: React.FC = () => {
  const { completedSteps, sobrietyDate, setSobrietyDate } = useAppContext();
  const [daysSober, setDaysSober] = useState<number>(0);

  useEffect(() => {
    if (sobrietyDate) {
      const startDate = new Date(sobrietyDate);
      const today = new Date();
      // Reset time component to compare dates only
      startDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      
      const diffTime = Math.abs(today.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysSober(diffDays);
    } else {
      setDaysSober(0);
    }
  }, [sobrietyDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSobrietyDate(e.target.value);
  };
  
  const todayDateString = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-brand-secondary">Mi Progreso</h2>
        <p className="text-slate-500 mt-1">Celebra cada paso en tu camino.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="text-center p-6 bg-gradient-to-br from-sky-500 to-sky-600 text-white">
          <h3 className="text-5xl font-bold">{daysSober}</h3>
          <p className="text-lg opacity-90">{daysSober === 1 ? 'Día de Sobriedad' : 'Días de Sobriedad'}</p>
        </Card>
        <Card className="text-center p-6 bg-gradient-to-br from-amber-400 to-amber-500 text-white">
          <h3 className="text-5xl font-bold">{completedSteps.size} / {STEPS.length}</h3>
          <p className="text-lg opacity-90">Pasos Completados</p>
        </Card>
      </div>

      <Card>
        <div className="p-6">
          <h3 className="text-lg font-bold">Mi Fecha de Sobriedad</h3>
          <p className="text-slate-600 mb-4">Selecciona la fecha en que comenzaste tu viaje. Esto es solo para ti.</p>
          <input 
            type="date"
            value={sobrietyDate || ''}
            onChange={handleDateChange}
            max={todayDateString}
            className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>
      </Card>

      <Card>
        <div className="p-6">
            <h3 className="text-lg font-bold mb-4">Pasos Completados</h3>
            {STEPS.length > 0 ? (
                <ul className="space-y-2">
                    {STEPS.filter(step => completedSteps.has(step.id)).map(step => (
                        <li key={step.id} className="flex items-center gap-3 text-slate-700">
                             <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span><strong>{step.number}:</strong> {step.title}</span>
                        </li>
                    ))}
                    {completedSteps.size === 0 && <p className="text-slate-500">Aún no has marcado ningún paso. ¡Sigue adelante!</p>}
                </ul>
            ) : <p>No hay pasos para mostrar.</p>}
        </div>
      </Card>
    </div>
  );
};

export default ProgressView;
