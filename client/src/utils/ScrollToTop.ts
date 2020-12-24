import { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const ScrollToTop: React.FC<RouteComponentProps> = ({ history }) => {
  useEffect(() =>
    history.listen(() => {
      window.scrollTo(0, 0);
    })
  );
  return null;
};

export default withRouter(ScrollToTop);
