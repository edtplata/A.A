
import React from 'react';
import { LITERATURE } from '../data/content';
import Card from '../components/Card';

const LiteratureView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-brand-secondary">Literatura</h2>
        <p className="text-slate-500 mt-1">Lecturas recomendadas para la recuperación.</p>
      </div>
      <div className="space-y-4">
        {LITERATURE.map((book) => (
          <Card key={book.id}>
            <div className="p-6">
              <p className="text-sm font-semibold text-emerald-600">{book.type}</p>
              <h3 className="text-xl font-bold text-slate-800">{book.title}</h3>
              <p className="text-slate-500 mt-1">Autor: {book.author}</p>
              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Más Información
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LiteratureView;
