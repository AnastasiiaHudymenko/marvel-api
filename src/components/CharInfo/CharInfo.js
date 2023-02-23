import { useEffect, useState } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import Skeleton from '../Skeleton/Skeleton';
import { truncateString } from '../auxiliaryFunctions/truncateString';
import { trimArr } from '../auxiliaryFunctions/trimArr';

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  useEffect(() => {
    updateChar();
  }, [charId]);

  const onCharLoaded = char => {
    setChar(char);
    setLoading(false);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const updateChar = async () => {
    if (!charId) {
      return;
    }
    try {
      setLoading(true);
      const res = await marvelService.getCharacter(charId);
      onCharLoaded(res);
    } catch (error) {
      onError();
    }
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const loader = loading ? (
    <MutatingDots
      height="100"
      width="100"
      color="#344434"
      ariaLabel="mutating-dots-loading"
      wrapperClass="loader"
    />
  ) : null;
  const content = !(error || loader || !char) ? <View char={char} /> : null;
  const skeleton = error || char || loader ? null : <Skeleton />;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {loader}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { thumbnail, name, description, homepage, wiki, comics } = char;

  const isImage = thumbnail.includes('available');
  let imgStyle = isImage ? `contain` : 'cover';

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={{ objectFit: `${imgStyle}` }} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      {description ? (
        <div className="char__descr">{truncateString(description)}</div>
      ) : (
        <p className="char__descr">No description found for this character</p>
      )}

      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {!comics.length ? (
          <p>Did not find comics with this hero</p>
        ) : (
          trimArr(comics).map((el, i) => (
            <li key={i} className="char__comics-item">
              {el.name}
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default CharInfo;
