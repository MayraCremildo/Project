import { useEffect, useState } from 'react';
import './App.css';
import Onboarding from './components/finance/Onboarding';
import Dashboard from './components/finance/Dashboard';
import { loadState, saveState, ensureMonth, getMonthKey } from './lib/storage';

function App() {
  const [state, setState] = useState(null);

  useEffect(() => {
    const s = loadState();
    setState(s);
  }, []);

  if (!state) {
    return <div className="min-h-screen bg-earth-bg" />;
  }

  const handleOnboarding = ({ name, currency }) => {
    const next = { ...state, userName: name, currency };
    ensureMonth(next, getMonthKey());
    saveState(next);
    setState(next);
  };

  const handleReset = () => {
    setState({ userName: '', currency: 'BRL', months: {} });
  };

  if (!state.userName) {
    return <Onboarding onSubmit={handleOnboarding} />;
  }

  return (
    <div className="App">
      <Dashboard initialState={state} onReset={handleReset} />
    </div>
  );
}

export default App;
