
import React from 'react';
import { useAppContext } from './context/AppContext';
import { AppView } from './types';
import Header from './components/Header';
import WelcomeView from './views/WelcomeView';
import HomeView from './views/HomeView';
import StepsView from './views/StepsView';
import TraditionsView from './views/TraditionsView';
import ServicesView from './views/ServicesView';
import LiteratureView from './views/LiteratureView';
import VirtualSponsorView from './views/VirtualSponsorView';
import CommunityView from './views/CommunityView';
import ProgressView from './views/ProgressView';
import GratitudeJournalView from './views/GratitudeJournalView';
import { SerenityIcon } from './components/Icons';

const App: React.FC = () => {
  const { currentView, user } = useAppContext();

  const renderView = () => {
    if (!user) {
      return <WelcomeView />;
    }
    switch (currentView) {
      case AppView.HOME:
        return <HomeView />;
      case AppView.STEPS:
        return <StepsView />;
      case AppView.TRADITIONS:
        return <TraditionsView />;
      case AppView.SERVICES:
        return <ServicesView />;
      case AppView.LITERATURE:
        return <LiteratureView />;
      case AppView.VIRTUAL_SPONSOR:
        return <VirtualSponsorView />;
      case AppView.COMMUNITY:
        return <CommunityView />;
      case AppView.PROGRESS:
        return <ProgressView />;
      case AppView.GRATITUDE_JOURNAL:
        return <GratitudeJournalView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-background font-sans text-brand-secondary">
      <Header />
      <main className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
        {renderView()}
      </main>
      <footer className="text-center p-4 text-slate-400 text-sm mt-8 border-t border-slate-200">
        <div className="flex justify-center items-center gap-2">
            <SerenityIcon />
            <p>Un día a la vez.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;