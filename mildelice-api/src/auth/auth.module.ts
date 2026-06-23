import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // 👈 On vérifie l'import
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [
    UsersModule, // 👈 On le passe bien ici pour donner accès au UsersService
    JwtModule.register({
      global: true,
      secret: 'MA_CLE_SUPER_SECRETE_MIL_DELICES',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}