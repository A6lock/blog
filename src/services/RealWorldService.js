/* eslint-disable class-methods-use-this */
export default class RealWorldService {
  _apiBase = 'https://blog.kata.academy/api/';

  getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Запрос ${url} не узался. Код ошибки ${res.status}`);
    }

    // eslint-disable-next-line no-return-await
    return res.json();
  };

  postResource = async (url, body) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`Запрос ${url} не узался. Код ошибки ${res.status}`);
    }
    return res.json();
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
