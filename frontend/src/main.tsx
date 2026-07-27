import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";

axios.defaults.baseURL =
import.meta.env.VITE_BACKEND_URL;

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
  
)
