import { Suspense, lazy } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Syswin from './Components/Syswin/Syswin';

// Portfolio is code-split so Syswin visitors don't download it (and vice versa for its pages).
const Portfolio = lazy(() => import('./portfolio/Portfolio'));

function AppRoutes() {
  const location = useLocation();

  if (location.pathname.startsWith('/syswin')) {
    return <Syswin />;
  }

  return (
    <Suspense fallback={<div className="min-h-[100dvh] bg-paper" />}>
      <Portfolio />
    </Suspense>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
