import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Destinations from './components/Destinations.jsx';
import Reviews from './components/Reviews.jsx';
import Contacts from './components/Contacts.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import TimewebAIEmbed from './components/TimewebAIEmbed.jsx';
import TimewebAIEventBridge from './components/TimewebAIEventBridge.jsx';
import { api } from './api';

export default function App() {
  const [adminMode, setAdminMode] = useState(false);
  useEffect(() => {
    api.recordVisit({ path: window.location.hash || '/', referrer: document.referrer || '-', ua: navigator.userAgent }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <TimewebAIEmbed />
      <TimewebAIEventBridge />
      {!adminMode ? (
        <>
          <Header goAdmin={() => setAdminMode(true)} />
          <Hero />
          <Destinations />
          <Reviews />
          <Contacts />
        </>
      ) : (
          <AdminPanel onExit={() => setAdminMode(false)} />
      )}
    </div>
  );
}
