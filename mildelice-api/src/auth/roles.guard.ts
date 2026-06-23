import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. On récupère les rôles demandés sur la route
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si la route n'a pas de décorateur @Roles, tout le monde connecté peut y accéder
    if (!requiredRoles) {
      return true;
    }

    // 2. On récupère l'utilisateur que l'AuthGuard a gentiment posé dans la requête
    const { user } = context.switchToHttp().getRequest();

    // 3. On vérifie si le rôle de l'utilisateur fait partie des rôles autorisés
    const hasRole = requiredRoles.includes(user?.role);

    if (!hasRole) {
      throw new ForbiddenException("Accès refusé : tu n'as pas les permissions nécessaires.");
    }

    return true;
  }
}