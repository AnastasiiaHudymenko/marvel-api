import React, { useState, useEffect, useRef } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = props => {
  const [charList, setCharList] = useState([]);
  const [offset, setOffset] = useState(210);
  const [newLoading, setNewLoading] = useState(false);
  const [charending, setCharending] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line
  }, []);

  const onRequest = async (offset, initial) => {
    try {
      initial ? setNewLoading(false) : setNewLoading(true);
      const res = await getAllCharacters(offset);
      onCharListLoaded(res);
    } catch (error) {
      console.log(error);
    }
  };

  const onCharListLoaded = newCharList => {
    let ending = false;
    if (newCharList.length < 9) {
      ending = true;
    }
    setCharList(charList => [...charList, ...newCharList]);
    setOffset(offset => offset + 9);
    setNewLoading(false);
    setCharending(ending);
  };

  const itemsRef = useRef([]);

  const focusOnItem = id => {
    itemsRef.current.forEach(item =>
      item.classList.remove('char__item_selected')
    );
    itemsRef.current[id].classList.add('char__item_selected');
    itemsRef.current[id].focus();
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: 'cover' };
      if (
        item.thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ) {
        imgStyle = { objectFit: 'unset' };
      }

      return (
        <li
          ref={el => (itemsRef.current[i] = el)}
          className="char__item"
          key={item.id}
          onClick={() => {
            props.onCharSelected(item.id);
            focusOnItem(i);
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner =
    loading && !newLoading ? (
      <MutatingDots
        height="100"
        width="100"
        color="#344434"
        ariaLabel="mutating-dots-loading"
        wrapperClass="loader"
      />
    ) : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        className="button button__main button__long"
        disabled={newLoading}
        onClick={() => onRequest(offset)}
        style={{ display: `${charending ? 'none' : 'block'}` }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
