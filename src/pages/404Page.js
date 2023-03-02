import { Link } from 'react-router-dom';
import notFound from '../img/no_results_found.png';

const ErrorPage = () => {
  return (
    <div style={{ marginTop: '50px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={notFound} alt="not found page" />
      </div>

      <Link to="/">
        <button className="button button__main" type="button">
          <div className="inner">go back</div>
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
