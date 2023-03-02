import RandomChar from '../components/RandomChar/RandomChar';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import CharList from '../components/CharList/CharList';
import CharInfo from '../components/CharInfo/CharInfo';
import decoration from '../resources/img/vision.png';

export const MainPage = ({ onCharSelected, charId }) => {
  return (
    <main>
      <RandomChar />
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <ErrorBoundary>
          <CharInfo charId={charId} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </main>
  );
};
