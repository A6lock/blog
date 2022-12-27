/* eslint-disable class-methods-use-this */
export default class RealWorldService {
  _apiBase = 'https://blog.kata.academy/api/';

  getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Запрос ${url} не удался. Код ошибки ${res.status}`);
    }

    // eslint-disable-next-line no-return-await
    return res.json();
  };

  postResource = async (url, body, token = null) => {
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return res.json().then((text) => {
        throw text;
      });
    }
    return res.json();
  };

  putResource = async (url, body, token) => {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`Запрос ${url} не уlался. Код ошибки ${res.status}`);
    }
    return res.json();
  };

  deleteResource = async (url, token) => {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    });

    if (res.status > 300) {
      throw new Error(`Запрос ${url} не уlался. Код ошибки ${res.status}`);
    }
  };

  getArticles = (page = 1) => {
    return this.getResource(
      `${this._apiBase}articles?limit=5&offset=${(page - 1) * 5}`
    );
  };

  getArticle = (slug) => {
    return this.getResource(`${this._apiBase}articles/${slug}`);
  };

  registrationAccout = (body) => {
    return this.postResource(`${this._apiBase}users/`, body);
  };

  login = (body) => {
    return this.postResource(`${this._apiBase}users/login`, body);
  };

  updateUser = (body, token) => {
    return this.putResource(`${this._apiBase}user`, body, token);
  };

  createArticle = (body, token) => {
    return this.postResource(`${this._apiBase}articles`, body, token);
  };

  updateArticle = (slug, body, token) => {
    return this.putResource(`${this._apiBase}articles/${slug}`, body, token);
  };

  deleteArticle = (slug, token) => {
    return this.deleteResource(`${this._apiBase}articles/${slug}`, token);
  };
}
