import React from 'react';
import { Toaster } from 'react-hot-toast';
import Dashboard from '../screen/dashBoard';
import './App.css';

function App() {
  return (
    <div className="app">
      <Toaster position="top-right" />
      <Dashboard />
    </div>
  );
}

export default App;
