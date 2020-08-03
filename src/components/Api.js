export default class Api {
  constructor(baseUrl, options) {
    this._baseUrl = baseUrl;
    this._options = options;
  }

  _getResource(entity) {
    return fetch(`${this._baseUrl}/${entity}`, this._options);
  }

  _resetBody() {
    if (this._options.body) {
      delete this._options.body;
    }
  }

  handleData({entity, method="GET", ...rest}, callback = (res) => console.log(res)) {
    this._options.method = method;
    method === "POST" || method === "PATCH" ?
      this._options.body = rest.body :
      this._resetBody();

    this._getResource(entity)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  getFetchPromise(entity) {
    this._options.method = "GET";
    return this._getResource(entity);
  }

}

