import api from '../api/api';

class PlanetsApi {
  constructor() {
    this._path = '/planets'
  }

  async getPeople(search = '') {
    try {
      const res = await api.get(this._path, {
        search
      });

      const { results } = res?.data;

      return results;
    } catch (err) {
      return Promise.resolve(err);
    }
  }
}

export default new PlanetsApi();