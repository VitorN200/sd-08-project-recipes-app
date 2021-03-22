import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import RecipesContextProvider from './context/RecipesContextProvider';
import App from './App';

ReactDOM.render(
  <RecipesContextProvider>
    <Router>
      <App />
    </Router>
  </RecipesContextProvider>,
  document.getElementById('root'),
);
