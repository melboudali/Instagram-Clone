import { useEffect, useState } from 'react';
import { useMeQuery } from '../generated/graphql';

const IsAuth = () => {
  const { data, loading } = useMeQuery();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (data?.me && !loading) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [data?.me, loading]);
  return isAuth;
};

export default IsAuth;
