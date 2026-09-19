import { Suspense, lazy } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';

// Each site is its own chunk: Syswin visitors never download the portfolio, and vice versa.
const Portfolio = lazy(() => import('./portfolio/Portfolio'));
const Syswin = lazy(() => import('./syswin/Syswin'));

function AppRoutes() {
  const location = useLocation();

  if (location.pathname.startsWith('/syswin')) {
    return (
      <Suspense fallback={<div className="min-h-[100dvh]" />}>
        <Syswin />
      </Suspense>
    );
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
