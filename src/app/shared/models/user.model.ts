import { Roles } from '@app/shared/models/roles.model';

export interface User {
  uid: string;
  email: string;
  roles: Roles;
}
