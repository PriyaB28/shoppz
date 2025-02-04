import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, RouterProvider } from 'react-router'
import router from './route/routes'
import { Provider } from 'react-redux'
import { store } from './redux/store.jsx'
import { persistor } from './redux/store.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <StrictMode>
          <GoogleOAuthProvider clientId="933048299435-cig2t48q8pol9guqa1rg2q1tm2amq28i.apps.googleusercontent.com">
            {/* <RouterProvider router={router} /> */}
            <App />
          </GoogleOAuthProvider>
        </StrictMode>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
