import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../common/enums/rol.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!role) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if(user.role === Role.SUPERUSER) {
      return true;
    }

    if(user.role === Role.ADMIN&&role!==Role.SUPERUSER) {
      return true;
    }

    if(user.role === Role.USER&&role!==Role.ADMIN&&role!==Role.SUPERUSER) {
      return true;
    }
    
    /*if(user.role === Role.ADMIN) {
      return true;
    }
    */
    /*console.log('role',role);
    console.log('user.role',user.role);
    console.log('user',user);*/

    //return role === user.role?true:false;
    return role === user.role;
  }
}
