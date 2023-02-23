import { useState, useEffect } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import MarvelService from '../../services/MarvelService';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { truncateString } from '../auxiliaryFunctions/truncateString';
import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss';

const RandomChar = () => {
  const [char, setChar] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  const onCharLoaded = char => {
    setChar(char);
    setLoading(false);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const handlChooseChar = () => {
    setLoading(true);
    setError(false);
    updateChar();
  };

  const updateChar = async () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    try {
      const res = await marvelService.getCharacter(id);
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
  const content = !(error || loader) ? <View char={char} /> : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {loader}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={handlChooseChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ char: { thumbnail, name, description, homepage, wiki } }) => {
  const isImage = thumbnail.includes('available');

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className={isImage ? 'randomchar__no-image' : 'randomchar__img'}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        {description ? (
          <p className="randomchar__descr">{truncateString(description)}</p>
        ) : (
          <p className="randomchar__descr">
            No description found for this character
          </p>
        )}

        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
