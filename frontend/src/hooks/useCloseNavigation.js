import { useEffect } from 'react';

function useCloseNavigation() {
  useEffect(() => {
    document.getElementById('englishNav').style.display = 'none';
    return () => {
      document.getElementById('englishNav')?.removeAttribute('style');
    };
  }, []);

  return null;
}

export default useCloseNavigation;
