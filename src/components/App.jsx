import { Component } from 'react';
import { ErrorBoundary } from './ErrorBoundary/ErrorBoundary';
import AppHeader from '../components/AppHeader/AppHeader';
import RandomChar from '../components/RandomChar/RandomChar';
import CharList from '../components/CharList/CharList';
import CharInfo from '../components/CharInfo/CharInfo';

import decoration from '../resources/img/vision.png';

class App extends Component {
  state = {
    selectedChar: null,
  };

  onCharSelected = id => {
    this.setState({ selectedChar: id });
  };

  render() {
    const { onCharSelected } = this;
    const { selectedChar } = this.state;
    return (
      <div className="app">
        <AppHeader />
        <main>
          <RandomChar />

          <div className="char__content">
            <ErrorBoundary>
              <CharList onCharSelected={onCharSelected} />
            </ErrorBoundary>

            <ErrorBoundary>
              <CharInfo charId={selectedChar} />
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;
