import { useEffect } from 'react';

// set title for component
function useTitle(title = 'English Website', isOverride = false) {
  useEffect(() => {
    if (isOverride) {
      document.title = title;
    } else {
      document.title = title !== 'English Website' ? `${title} - English Website` : title;
    }
  }, []);

  return null;
}

export default useTitle;
