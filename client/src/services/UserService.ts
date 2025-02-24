import { ApiClient } from '../utils/ApiClient';
import { LoginResponse} from "../types/api.ts";
import { handleErrors } from '../utils/errorHandler.ts';

export default class UserService {
  async authenticate(email: string, password: string): Promise<LoginResponse> {
    const response = await ApiClient(
      'login',
      { method: 'POST' },
      { email, password }
    );

    if (!response.ok) {
      throw await handleErrors(response);
    }

    return await response.json();
  }
}
