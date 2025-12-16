import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* The application is now wrapped with the Redux Provider, 
        making the global 'store' available to all components. */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)