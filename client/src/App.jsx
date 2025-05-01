// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRouter';

const App = () => {
  return (
    <Router>
      <AppRoutes /> {/* Use AppRoutes to handle all the routing */}
    </Router>
  );
};

export default App;
