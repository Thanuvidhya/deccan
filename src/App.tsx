import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Onboarding } from './components/Onboarding';
import { Assessment } from './components/Assessment';
import { Results } from './components/Results';
import { Learning } from './components/Learning';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/results" element={<Results />} />
          <Route path="/learning" element={<Learning />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
