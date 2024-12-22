import './App.css'
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Tasks from './components/Task';


const App = () => {
  const [token, setToken] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/tasks" element={<Tasks token={token} />} />
      </Routes>
    </Router>
  );
};

export default App;
