import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import {positions, transitions, Provider as AlertProvider} from "react-alert"
import AlertTemplate from "react-alert-template-basic"
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_51O2UbwSBWQZvEvsb3LNs8mIFLfYkImooM7tSvf271xOQIh7kgqjo2PGF0EMSaAbPei8VtxDCjj91zFheR360iSOi00pt9QkzGW');
const root = ReactDOM.createRoot(document.getElementById('root'));

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}
root.render(
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
      <Elements stripe={stripePromise}>
        <App />
        </Elements>
      </AlertProvider>
    </Provider>

);
