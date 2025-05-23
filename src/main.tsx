import './index.css'; 
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  HashRouter,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom'

import StartPage from './pages/StartPage'
import Home from './pages/Home'
import ResultPage from './pages/ResultPage'
import ClosetPage from './pages/ClosetPage'

const StartPageWrapper = () => {
  const navigate = useNavigate()
  return <StartPage onStart={() => navigate('/home')} />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<StartPageWrapper />} />
        <Route path="/home" element={<Home />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="/closet" element={<ClosetPage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
