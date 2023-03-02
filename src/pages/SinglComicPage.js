import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './singleComic.scss';

import useMarvelService from '../services/MarvelService';

export const SingleComicPage = () => {
  const [comic, setComic] = useState(null);
  const { comicId } = useParams();
  const { getComicId } = useMarvelService();

  useEffect(() => {
    onRequest(comicId);
    // eslint-disable-next-line
  }, [comicId]);

  const onRequest = async id => {
    try {
      const res = await getComicId(id);
      setComic(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {comic && (
        <div className="single-comic">
          <img
            src={comic.image}
            alt={comic.title}
            className="single-comic__img"
          />
          <div className="single-comic__info">
            <h2 className="single-comic__name">{comic.title}</h2>
            {comic.description === '' ? (
              <p>Not found description</p>
            ) : (
              <p className="single-comic__descr">{comic.description}</p>
            )}

            <p className="single-comic__descr">{comic.page} pages</p>
            <p className="single-comic__descr">Language: {comic.language}</p>
            <div className="single-comic__price">{comic.prices}$</div>
          </div>
          <Link to="/comics" className="single-comic__back">
            Back to all
          </Link>
        </div>
      )}
    </>
  );
};
