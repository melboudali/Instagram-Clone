import { useEffect, useState } from 'react';

const IsSticky = (top: number) => {
  const [sticky, setSticky] = useState<boolean>(false);

  useEffect(() => {
    const onScrollFunc = () => {
      window.scrollY >= top ? setSticky(true) : setSticky(false);
    };
    window.addEventListener('scroll', onScrollFunc);
    return () => window.removeEventListener('scroll', onScrollFunc);
  }, [top]);
  return sticky;
};

export default IsSticky;
