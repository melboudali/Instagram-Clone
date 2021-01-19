import { useEffect, useState } from 'react';

const IsClickedAway = (ref: React.RefObject<HTMLDivElement>) => {
  const [clickedAway, setClickedAway] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (!clickedAway) {
          setClickedAway(true);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clickedAway, ref]);

  return clickedAway;
};

export default IsClickedAway;
