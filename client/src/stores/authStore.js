import { extendObservable } from 'mobx';
import { asyncAction } from "mobx-utils"

import appStore from './appStore';
import authActions from '../actions/authActions';

class AuthStore {
  constructor() {
    this.initialState();
  }

  initialState() {
    extendObservable(this, {
      currentUser: {},
      authenticated: null
    });
  }

  signin = asyncAction('signin', function* (user) {
    try {
      const response = yield authActions.signin(user);
      this.setHeaders(response.data.auth_token);
      return response;
    } catch ({ response }) {
      return response;
    }
  });

  signup = asyncAction('signup', function* (user) {
    try {
      const response = yield authActions.signup(user);
      this.setHeaders(response.data.auth_token);
      return response;
    } catch ({ response }) {
      return response;
    }
  });

  setAuthenticated = asyncAction('setAuthenticated', function* () {
    try {
      const response = yield authActions.setAuthenticated(appStore.headers);
      this.currentUser = response.data.data;
      this.authenticated = true;
      return response;
    } catch ({ response }) {
      return response;
    }
  });

  signout() {
    this.deleteHeaders();
    appStore.initialize();
  }

  setHeaders(token) {
    localStorage.setItem('token', token);
  }

  deleteHeaders() {
    localStorage.removeItem('token');
  }
}

const authStore = new AuthStore();
export default authStore;