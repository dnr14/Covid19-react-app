import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import GlobalStyled from 'components/styled';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyled />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

