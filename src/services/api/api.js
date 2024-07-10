import axios from 'axios';

class Api {
  constructor() {
    this.baseUrl = 'https://swapi.dev/api';
    this.instance = axios.create({
      baseURL: 'https://swapi.dev/api',
    })
  }

  async #request(method, path, searchParams = {}, body = null) {
    try {
      const response = await this.instance({
        method,
        url: path,
        params: searchParams,
        data: body,
      });

      return {
        data: response.data,
      };
    } catch (err) {
      throw new Error(`Request failed with status ${error.response?.status}: ${error.message}`);
    }
  }

  async get(path, searchPar) {
    return await this.#request('GET', path, searchPar);
  }
}

export default new Api();