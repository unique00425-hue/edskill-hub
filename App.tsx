import React, { useState } from 'react';
import { AppView } from './types';
import { LoginView } from './components/LoginView';
import { DashboardView } from './components/DashboardView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOGIN);

  const handleLoginSuccess = () => {
    setCurrentView(AppView.DASHBOARD);
  };

  return (
    <div className="bg-[#0f172a] min-h-screen">
      {currentView === AppView.LOGIN ? (
        <LoginView onLoginSuccess={handleLoginSuccess} />
      ) : (
        <DashboardView />
      )}
    </div>
  );
};

export default App;