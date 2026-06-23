import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    // 1. Si aucun token n'est fourni, on bloque direct
    if (!token) {
      throw new UnauthorizedException("Accès refusé. Aucun jeton d'authentification fourni.");
    }

    try {
      // 2. On vérifie et décode le token JWT
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'MA_CLE_SUPER_SECRETE_MIL_DELICES', // La même clé que dans ton AuthModule
      });
      
      // 3. On attache les infos de l'utilisateur décodé à la requête pour y avoir accès plus tard
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Jeton invalide ou expiré.');
    }
    
    return true;
  }

  // Petite fonction utilitaire pour extraire le token du header 'Authorization: Bearer <TOKEN>'
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}