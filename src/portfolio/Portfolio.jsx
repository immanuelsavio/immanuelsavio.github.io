import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from './lib/theme';
import { SmoothScroll } from './lib/smooth-scroll';
import { usePageTitle } from './lib/use-page-title';
import Nav from './layout/Nav';
import Footer from './layout/Footer';
import CommandPalette from './layout/CommandPalette';
import Home from './pages/Home';

const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Playground = lazy(() => import('./pages/Playground'));
const JsonToToon = lazy(() => import('./pages/JsonToToon'));
const NotFound = lazy(() => import('./pages/NotFound'));

function HomeRoute() {
  usePageTitle(null);
  return <Home />;
}

function PageFallback() {
  return (
    <div className="shell pt-40" aria-busy="true" aria-label="Loading">
      <div className="h-24 w-3/4 animate-pulse rounded-panel bg-surface" />
      <div className="mt-6 h-5 w-1/2 animate-pulse rounded-full bg-surface" />
      <div className="mt-16 h-[40vh] animate-pulse rounded-panel bg-surface" />
    </div>
  );
}

export default function Portfolio() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <div className="pf-root pf-scroll relative flex min-h-[100dvh] flex-col">
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-palette focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
              Skip to content
            </a>
            <div aria-hidden className="pf-grain z-grain" />
            <Nav onOpenPalette={openPalette} />
            <main id="main" className="flex-1">
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path="/" element={<HomeRoute />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/playground" element={<Playground />} />
                  <Route path="/playground/json-to-toon" element={<JsonToToon />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <CommandPalette open={paletteOpen} onClose={closePalette} />
          </div>
        </SmoothScroll>
      </MotionConfig>
    </ThemeProvider>
  );
}
