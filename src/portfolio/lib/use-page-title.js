import { useEffect } from 'react';

const BASE = 'Immanuel Savio';

export function usePageTitle(title) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} | ${BASE}` : `${BASE} | Machine Learning Scientist`;
    return () => { document.title = prev; };
  }, [title]);
}
