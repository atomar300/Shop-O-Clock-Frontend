import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from "./store";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
      <ToastContainer position="bottom-center" autoClose={2000} />
      <App />
  </Provider>
);

