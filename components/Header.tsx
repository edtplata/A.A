
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { AppView } from '../types';
import { HomeIcon, BackIcon, UserIcon } from './Icons';

const Header: React.FC = () => {
  const { currentView, setView, user } = useAppContext();
  const showBackButton = user && currentView !== AppView.HOME && currentView !== AppView.WELCOME;

  return (
    <header className="bg-brand-primary text-white shadow-md sticky top-0 z-10">
      <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
            {showBackButton ? (
            <button onClick={() => setView(AppView.HOME)} className="p-2 rounded-full hover:bg-sky-700 transition-colors">
                <BackIcon />
            </button>
            ) : (
                user && (
                    <button onClick={() => setView(AppView.HOME)} className="p-2 rounded-full hover:bg-sky-700 transition-colors">
                        <HomeIcon />
                    </button>
                )
            )}
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">App Padrino</h1>
        </div>
        {user && (
          <div className="flex items-center gap-2 text-sm bg-sky-700 px-3 py-1.5 rounded-full">
            <UserIcon />
            <span>{user.name}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
