
import React from 'react';
import { STEPS } from '../data/content';
import Card from '../components/Card';
import { useAppContext } from '../context/AppContext';

const StepsView: React.FC = () => {
    const { completedSteps, toggleStepCompletion } = useAppContext();

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-brand-secondary">Los 12 Pasos</h2>
                <p className="text-slate-500 mt-1">Una guía para la recuperación espiritual.</p>
            </div>
            <div className="space-y-4">
                {STEPS.map((step) => (
                    <Card key={step.id}>
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-brand-primary">{step.number}: {step.title}</h3>
                                    <p className="mt-2 text-lg font-semibold text-slate-700">"{step.text}"</p>
                                </div>
                                <div className="flex items-center ml-4">
                                    <input
                                        type="checkbox"
                                        id={`step-${step.id}`}
                                        className="h-6 w-6 rounded border-gray-300 text-brand-primary focus:ring-brand-primary cursor-pointer"
                                        checked={completedSteps.has(step.id)}
                                        onChange={() => toggleStepCompletion(step.id)}
                                    />
                                    <label htmlFor={`step-${step.id}`} className="sr-only">Marcar como completado</label>
                                </div>
                            </div>
                            <p className="mt-4 text-slate-600 border-l-4 border-slate-200 pl-4">{step.commentary}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default StepsView;
