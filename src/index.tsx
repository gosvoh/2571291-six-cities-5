import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import {
  fetchFavoritesAction,
  fetchOffersAction,
  fetchUserAction,
} from './store/api-actions';

store.dispatch(fetchUserAction());
store.dispatch(fetchOffersAction());
store.dispatch(fetchFavoritesAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
