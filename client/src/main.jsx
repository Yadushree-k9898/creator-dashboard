import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import the Provider
import store from './redux/store'; // Import your Redux store
import './index.css';
import App from './App.jsx';

// Use StrictMode for development environment
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap App in the Provider */}
      <App />
    </Provider>
  </StrictMode>
);
