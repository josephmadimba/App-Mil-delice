import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { StockModule } from './modules/stock/stock.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [StockModule, UsersModule, AuthModule], // on importe le module Stock ici
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}