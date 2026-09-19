import { createContext, useContext } from 'react';

// Kept separate from Syswin.jsx so pages/layout can import it without a cycle.
export const SxContext = createContext({ dark: false, toggleTheme: () => {}, lenis: null });
export const useSx = () => useContext(SxContext);
