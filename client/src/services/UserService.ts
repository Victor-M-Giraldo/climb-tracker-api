import { ApiClient } from '../utils/ApiClient';

export default class UserService {
  async authenticate(email: string, password: string) {
    const result = await ApiClient(
      'login',
      {
        method: 'POST',
      },
      {
        email: email,
        password: password,
      }
    );

    return result;
  }
}
