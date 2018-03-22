import authStore from './authStore';
import bookStore from './bookStore';

class AppStore {
  constructor() {
    this.HOST = 'http://localhost:3001/';
    this.store = {
      authStore,
      bookStore
    }
  }

  get headers() {
    return { headers: { Authorization: localStorage.getItem('token') } };
  }

  initialize() {
    for (const key in this.store) {
      if (Object.keys(this.store[key]).length > 0) {
        this.store[key].initialState();
      }
    }
  }
}

const appStore = new AppStore();
export default appStore;

