import axios from 'axios';

class MarvelService {
  _apiKey = '70381b997b9c2b2a5b8c7c3c72ce286f';
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';

  getResours = async url => {
    try {
      const res = await axios.get(url);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  getAllCharacters = async () => {
    const res = await this.getResours(
      `${this._apiBase}characters?limit=9&offset=210&apikey=${this._apiKey}`
    );

    const data = res.data.data.results.map(this._transformCharsater);
    console.log(data);
  };

  getCharacter = async id => {
    const res = await this.getResours(
      `${this._apiBase}characters/${id}?apikey=${this._apiKey}`
    );
    return this._transformCharsater(res.data.data.results[0]);
  };

  _transformCharsater = charseter => {
    return {
      name: charseter.name,
      description: charseter.description,
      thumbnail: `${charseter.thumbnail.path}.${charseter.thumbnail.extension}`,
      homepage: charseter.urls[0].url,
      wiki: charseter.urls[1].url,
    };
  };
}

export default MarvelService;
