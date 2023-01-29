import { SetMetadata } from '@nestjs/common';

export const META_ROLES = 'roles';

//* interface *//
import { IValidRoles } from '../interfaces/validRoles.interface';

export const RoleProtected = (...args: IValidRoles[]) => {
  return SetMetadata(META_ROLES, args);
};
