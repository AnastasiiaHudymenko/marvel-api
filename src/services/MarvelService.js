import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
  const { loading, error, request, clearError } = useHttp();
  const _apiKey = '70381b997b9c2b2a5b8c7c3c72ce286f';
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _baseOfFset = 210;

  const getAllCharacters = async (offset = _baseOfFset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`
    );

    const data = res.data.data.results.map(_transformCharsater);
    return data;
  };

  const getCharacter = async id => {
    const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`);

    return _transformCharsater(res.data.data.results[0]);
  };

  const getAllComics = async offset => {
    try {
      const res = await request(
        `${_apiBase}comics?limit=8&offset=${offset}&apikey=${_apiKey}`
      );
      const data = res.data.data.results.map(_transformComics);
      return data;
    } catch (error) {
      return error;
    }
  };

  const getComicId = async id => {
    try {
      const res = await request(`${_apiBase}comics/${id}?apikey=${_apiKey}`);
      console.log(res.data.data.results[0]);
      return _transformComicId(res.data.data.results[0]);
    } catch (error) {
      return error;
    }
  };

  const _transformCharsater = charseter => {
    return {
      name: charseter.name,
      description: charseter.description,
      thumbnail: `${charseter.thumbnail.path}.${charseter.thumbnail.extension}`,
      homepage: charseter.urls[0].url,
      wiki: charseter.urls[1].url,
      id: charseter.id,
      comics: charseter.comics.items,
    };
  };

  const _transformComics = comics => {
    return {
      title: comics.title,
      description: comics.description,
      price: comics.prices[0].price,
      thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,

      id: comics.id,
    };
  };

  const _transformComicId = comic => {
    return {
      id: comic.id,
      description: comic.description,
      image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      title: comic.title,
      prices: `${comic.prices[0].price}`,
      language: `${comic.textObjects[0].language}`,
      page: comic.pageCount,
    };
  };

  return {
    loading,
    error,
    clearError,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComicId,
  };
};

export default useMarvelService;
