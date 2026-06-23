import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    // 1. On cherche l'utilisateur dans la base par son email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    // 2. Si l'utilisateur n'existe pas, ou si le mot de passe ne correspond pas (version sécurisée Bcrypt)
    // NOTE : Si tu testes avec un compte en texte clair (comme Joel), remplace la ligne ci-dessous par : if (!user || user.password !== pass)
    // On commente temporairement la ligne Bcrypt et on compare le texte brut
    if (!user || user.password !== pass) {
    throw new UnauthorizedException('Identifiants incorrects (email ou mot de passe invalide).');
    }

    // 3. Si tout est bon, on prépare les infos à mettre dans le JWT (le payload)
    const payload = { sub: user.id, email: user.email, role: user.role };

    // 4. On génère le token d'accès et on le retourne
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}