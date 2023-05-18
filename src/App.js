import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { auth } from './services/firebase';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user));
  }, []);

  return (
    <div className="App">
        <Header user={user} />
        <Main user={user} />
        {/* <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/jobs" element={<Index />} />
        </Routes> */}
        
    </div>
  );
}

export default App;
