
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { AppView, User } from '../types';

const WelcomeView: React.FC = () => {
  const { setUser, setView } = useAppContext();

  const handleAnonymousLogin = () => {
    const randomId = Math.random().toString(36).substring(2, 9);
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const user: User = {
      id: randomId,
      name: `Hermano_${randomNumber}`,
      isAnonymous: true,
    };
    setUser(user);
    setView(AppView.HOME);
  };

  const handleRegister = () => {
    // In a real app, this would lead to a registration form.
    // For this demo, we'll create a mock registered user.
    const user: User = {
        id: 'user_123',
        name: 'Miembro',
        isAnonymous: false,
    };
    setUser(user);
    setView(AppView.HOME);
  }

  return (
    <div className="flex flex-col items-center justify-center text-center mt-10 sm:mt-20">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-brand-primary mb-2">Bienvenido a App Padrino</h1>
        <p className="text-slate-600 mb-8">Tu compañero en el camino de la recuperación. Un día a la vez.</p>
        <div className="space-y-4">
          <button
            onClick={handleRegister}
            className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-700 transition-colors duration-300 shadow-md"
          >
            Registrarse
          </button>
          <button
            onClick={handleAnonymousLogin}
            className="w-full bg-slate-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors duration-300 shadow-md"
          >
            Ingresar como Anónimo
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-8">
            Tu privacidad es importante. El modo anónimo no guarda tu información personal.
        </p>
      </div>
    </div>
  );
};

export default WelcomeView;
