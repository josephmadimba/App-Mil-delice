import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // 1. Vérifier si l'email existe déjà
      const userExists = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });

      if (userExists) {
        throw new ConflictException('Cet email est déjà utilisé par un autre compte.');
      }

      // 2. Création de l'utilisateur dans la base de données
      // On force le type à "any" pour que TypeScript ne bloque pas sur le rôle ou le mot de passe
      const userData: any = {
        email: createUserDto.email,
        password: createUserDto.password,
        name: createUserDto.name,
        role: 'MANAGER', // ⚠️ Si ton enum utilise 'USER', remplace 'CLIENT' par 'USER'
      };

      const newUser: any = await this.prisma.user.create({
        data: userData,
      });

      // 3. On retourne l'utilisateur créé en masquant son mot de passe
      const { password, ...result } = newUser;
      return result;
    } catch (error) {
      console.error("Erreur Prisma lors de la création :", error);
      throw error;
    }
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true },
    });
  }
}