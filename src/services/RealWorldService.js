export default class RealWorldService {
  _apiBase = 'https://blog.kata.academy/api/';

  // eslint-disable-next-line class-methods-use-this
  getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Запрос ${url} не узался. Код ошибки ${res.status}`);
    }

    // eslint-disable-next-line no-return-await
    return await res.json();
  };

  getArticles = (page = 1) => {
    return this.getResource(
      `${this._apiBase}articles?limit=5&offset=${(page - 1) * 5}`
    );
  };

  getArticle = (slug) => {
    return this.getResource(`${this._apiBase}articles/${slug}`);
  };
}
