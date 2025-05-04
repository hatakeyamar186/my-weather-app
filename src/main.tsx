import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom"

import StartPage from './pages/StartPage'
import Home from '@/pages/Home'
import ResultPage from '@/pages/ResultPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage onStart={() => window.location.href = "/home"} />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/result",
    element: <ResultPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
