
import React, { useState, useEffect } from 'react';
import { JournalEntry } from '../types';
import Card from '../components/Card';

const GratitudeJournalView: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedEntries = localStorage.getItem('gratitudeJournalEntries');
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
    } catch (error) {
      console.error("Failed to load journal entries from local storage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.trim()) return;

    const entry: JournalEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
      text: newEntry.trim(),
    };

    const updatedEntries = [entry, ...entries];
    setEntries(updatedEntries);
    setNewEntry('');
    try {
        localStorage.setItem('gratitudeJournalEntries', JSON.stringify(updatedEntries));
    } catch (error) {
        console.error("Failed to save journal entries to local storage", error);
    }
  };
  
  const handleDeleteEntry = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta entrada? Esta acción no se puede deshacer.')) {
        const updatedEntries = entries.filter(entry => entry.id !== id);
        setEntries(updatedEntries);
        try {
            localStorage.setItem('gratitudeJournalEntries', JSON.stringify(updatedEntries));
        } catch (error) {
            console.error("Failed to update journal entries in local storage", error);
        }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-brand-secondary">Diario de Gratitud</h2>
        <p className="text-slate-500 mt-1">"La gratitud desbloquea la plenitud de la vida."</p>
      </div>

      <Card>
        <form onSubmit={handleSaveEntry} className="p-4 border-b">
          <label htmlFor="gratitude-entry" className="block text-lg font-semibold text-slate-700 mb-2">
            Hoy estoy agradecido/a por...
          </label>
          <textarea
            id="gratitude-entry"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Escribe al menos tres cosas por las que te sientas agradecido/a hoy."
            className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
            rows={4}
            required
          />
          <button
            type="submit"
            className="mt-3 bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-700 disabled:bg-slate-400 transition-colors"
            disabled={!newEntry.trim()}
          >
            Guardar Entrada
          </button>
        </form>
      </Card>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-brand-secondary">Mis Entradas Anteriores</h3>
        {isLoading ? (
            <p className="text-slate-500 text-center">Cargando entradas...</p>
        ) : entries.length > 0 ? (
          entries.map(entry => (
            <Card key={entry.id}>
              <div className="p-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                        <p className="text-sm font-semibold text-slate-500 mb-2">{entry.date}</p>
                        <p className="text-slate-800 whitespace-pre-wrap">{entry.text}</p>
                    </div>
                    <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1 flex-shrink-0"
                        aria-label="Eliminar entrada"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card>
            <p className="text-slate-500 text-center p-6">Aún no has escrito ninguna entrada. ¡Empieza hoy mismo a cultivar la gratitud!</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GratitudeJournalView;