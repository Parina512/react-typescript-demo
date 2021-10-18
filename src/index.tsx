import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PostDataContextProvider } from './postDataContext';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <PostDataContextProvider>
        <App />
      </PostDataContextProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
