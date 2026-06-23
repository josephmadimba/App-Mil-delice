import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service'; // On l'importe ici

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService], // On ajoute PrismaService ici
})
export class UsersModule {}