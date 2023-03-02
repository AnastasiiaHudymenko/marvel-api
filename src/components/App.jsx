import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from '../pages/MainPage';
import { ComicsPage } from '../pages/ComicsPage';
import { AppHeader } from '../components/AppHeader/AppHeader';
import { SingleComicPage } from '../pages/SinglComicPage';
import NotFoundPage from '../pages/404Page.js';

const App = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = id => {
    setSelectedChar(id);
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<AppHeader />}>
          <Route
            index
            element={
              <MainPage onCharSelected={onCharSelected} charId={selectedChar} />
            }
          />
          <Route path="/comics" element={<ComicsPage />} />
          <Route path="/comics/:comicId" element={<SingleComicPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
