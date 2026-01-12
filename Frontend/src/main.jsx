import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import { store } from './redux/store.js'
export const serverUrl = "http://localhost:8000"

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <BrowserRouter>
  <Provider store={store}>
      <App />
  </Provider>
  
  </BrowserRouter>
)
