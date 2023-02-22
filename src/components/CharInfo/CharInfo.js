import { Component } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import Skeleton from '../Skeleton/Skeleton';
import { truncateString } from '../auxiliaryFunctions/truncateString';
import { trimArr } from '../auxiliaryFunctions/trimArr';

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate({ charId }) {
    if (charId !== this.props.charId) {
      this.updateChar();
    }
  }

  onCharLoaded = char => {
    this.setState({ char, loading: false });
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  updateChar = async () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }
    try {
      this.setState({ loading: true });
      const res = await this.marvelService.getCharacter(charId);
      this.onCharLoaded(res);
    } catch (error) {
      this.onError();
    }
  };

  render() {
    const { error, loading, char } = this.state;

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
  }
}

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
