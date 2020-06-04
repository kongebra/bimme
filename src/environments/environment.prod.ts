import { environment as secret } from './environment.secret';

export const environment = {
  production: true,
  firebase: secret.firebase,
};
