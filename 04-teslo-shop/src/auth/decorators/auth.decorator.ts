import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//* custom decorators *//
import { RoleProtected } from './';

//* custom guards *//
import { UserRoleGuard } from '../guards';

//* interface *//
import { IValidRoles } from '../interfaces/validRoles.interface';

export const Auth = (...roles: IValidRoles[]) => {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
};
