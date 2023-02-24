import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import { MutatingDots } from 'react-loader-spinner';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import './comicsList.scss';

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(8);
  const [newLoading, setNewLoading] = useState(false);
  const [charending, setCharending] = useState(false);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line
  }, []);

  const onRequest = async (offset, init) => {
    init ? setNewLoading(false) : setNewLoading(true);

    const res = await getAllComics(offset);

    loadedComics(res);
  };

  const loadedComics = newComics => {
    let ending = false;
    if (newComics.length < 8) {
      ending = true;
    }
    setComics(comics => [...comics, ...newComics]);
    setOffset(offset => offset + 8);
    setNewLoading(false);
    setCharending(ending);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? (
    <MutatingDots
      height="100"
      width="100"
      color="#344434"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
    />
  ) : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      <ul className="comics__grid">
        {comics.map(({ title, price, thumbnail }, i) => {
          return (
            <li key={i} className="comics__item">
              <a href={thumbnail}>
                <img
                  src={thumbnail}
                  alt="ultimate war"
                  className="comics__item-img"
                />
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{price}</div>
              </a>
            </li>
          );
        })}
      </ul>
      <button
        disabled={newLoading}
        onClick={() => onRequest(offset)}
        className="button button__main button__long"
        style={{ display: `${charending ? 'none' : 'block'}` }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
