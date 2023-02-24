import { useState, useEffect } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import useMarvelService from '../../services/MarvelService';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { truncateString } from '../auxiliaryFunctions/truncateString';
import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss';

const RandomChar = () => {
  const [char, setChar] = useState({});
  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, []);

  const onCharLoaded = char => {
    setChar(char);
  };

  const handlChooseChar = () => {
    updateChar();
  };

  const updateChar = async () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    try {
      const res = await getCharacter(id);
      onCharLoaded(res);
    } catch (error) {
      console.log(error);
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
  console.log(thumbnail);
  let isImage = '';
  const errorImg =
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
  isImage = errorImg === thumbnail ? 'randomchar__no-image' : 'randomchar__img';

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className={isImage} />
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
