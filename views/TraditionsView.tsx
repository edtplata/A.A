
import React from 'react';
import { TRADITIONS } from '../data/content';
import Card from '../components/Card';

const TraditionsView: React.FC = () => {
  return (
    <div className="space-y-6">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-brand-secondary">Las 12 Tradiciones</h2>
            <p className="text-slate-500 mt-1">Principios para la unidad y supervivencia del grupo.</p>
        </div>
        <div className="space-y-4">
            {TRADITIONS.map((tradition) => (
                <Card key={tradition.id}>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-indigo-600">{tradition.number}: {tradition.title}</h3>
                        <p className="mt-2 text-lg font-semibold text-slate-700">"{tradition.text}"</p>
                        <p className="mt-4 text-slate-600 border-l-4 border-indigo-100 pl-4">{tradition.application}</p>
                    </div>
                </Card>
            ))}
        </div>
    </div>
  );
};

export default TraditionsView;
