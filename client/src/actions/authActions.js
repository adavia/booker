import request from '../utils/config';

class AuthenticationActions {
  async signin(args) {
    const response = await request.post('auth/signin', args);
    return response;
  }

  async signup(args) {
    const response = await request.post('auth/signup', args);
    return response;
  }

  async setAuthenticated(args) {
    const response = await request.get('users/me', args);
    return response;
  }
}

const authActions = new AuthenticationActions();
export default authActions;

