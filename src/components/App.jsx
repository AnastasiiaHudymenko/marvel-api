import AppHeader from '../components/AppHeader/AppHeader';
import RandomChar from '../components/RandomChar/RandomChar';
import CharList from '../components/CharList/CharList';
import CharInfo from '../components/CharInfo/CharInfo';

import decoration from '../resources/img/vision.png';

const App = () => {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <RandomChar />
        <div className="char__content">
          <CharList />
          <CharInfo />
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
};

export default App;
