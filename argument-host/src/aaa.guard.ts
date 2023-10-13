import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './role';

@Injectable()
export class AaaGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    context;
    const requireRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    if (!requireRoles) {
      return;
    }
    const { user } = context.switchToHttp().getRequest();
    return requireRoles.some((v) => user && user.roles.includes(v));
  }
}
