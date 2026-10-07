import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './app/store'
import { Provider } from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";

import AppRoutes from './routes/AppRoutes'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </StrictMode>,
)
