import { Component } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    offset: 210,
    newLoading: false,
    charending: false,
  };

  marvelService = new MarvelService();

  async componentDidMount() {
    this.onRequest();
  }

  onRequest = async offset => {
    try {
      this.onCharListLoading();
      const res = await this.marvelService.getAllCharacters(offset);
      this.onCharListLoaded(res);
    } catch (error) {
      this.onError();
    }
  };

  onCharListLoaded = newCharList => {
    let ending = false;
    if (newCharList.length < 9) {
      ending = true;
    }

    this.setState(({ charList, offset }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      offset: offset + 9,
      newLoading: false,
      charending: ending,
    }));
  };

  onCharListLoading = () => {
    this.setState({ newLoading: true });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  renderItems(arr) {
    const items = arr.map(item => {
      let imgStyle = { objectFit: 'cover' };
      if (
        item.thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ) {
        imgStyle = { objectFit: 'unset' };
      }

      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => this.props.onCharSelected(item.id)}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { charList, loading, error, offset, newLoading, charending } =
      this.state;

    const items = this.renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? (
      <MutatingDots
        height="100"
        width="100"
        color="#344434"
        ariaLabel="mutating-dots-loading"
        wrapperClass="loader"
      />
    ) : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button
          className="button button__main button__long"
          disabled={newLoading}
          onClick={() => this.onRequest(offset)}
          style={{ display: `${charending ? 'none' : 'block'}` }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
