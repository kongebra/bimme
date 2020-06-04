import { environment as secret } from './environment.secret';

export const environment = {
  production: false,
  firebase: secret.firebase,
};
