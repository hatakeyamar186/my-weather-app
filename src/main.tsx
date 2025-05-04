import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

import StartPage from '@/pages/StartPage';
import GamePage from '@/pages/GamePage';
import ResultPage from '@/pages/ResultPage';

const RouterSetup = () => {
  const navigate = useNavigate();

  return (
    <>
      <StartPage onStart={() => navigate('/game')} />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouterSetup />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/game",
    element: <GamePage />,
  },
  {
    path: "/result",  
    element: <ResultPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
