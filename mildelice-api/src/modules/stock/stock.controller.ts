import { Controller, Get, Post, Patch, Delete, UseGuards, Body, Param } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { RolesGuard } from '../../auth/roles.guard'; // 👈 Nouveau Guard
import { Roles } from '../../auth/roles.decorator'; // 👈 Nouveau Décorateur

@Controller('stock')
@UseGuards(AuthGuard, RolesGuard) // 👈 On enchaîne les deux : d'abord connecté, ensuite vérification du rôle
export class StockController {

  @Get('ingredients') // Accessible par n'importe qui de connecté (USER ou MANAGER)
  findAll() {
    return [
      { id: 1, name: 'Farine', quantity: 50, unit: 'kg' },
      { id: 2, name: 'Sucre', quantity: 20, unit: 'kg' }
    ];
  }

  @Post('ingredients')
  @Roles('MANAGER') // 👈 SEUL le MANAGER peut ajouter un ingrédient !
  create(@Body() body: any) {
    return { message: 'Ingrédient ajouté avec succès !', data: body };
  }

  @Patch('ingredients/:id')
  @Roles('MANAGER') // 👈 SEUL le MANAGER peut modifier !
  update(@Param('id') id: string, @Body() body: any) {
    return { message: `Ingrédient ${id} mis à jour` };
  }

  @Delete('ingredients/:id')
  @Roles('MANAGER') // 👈 SEUL le MANAGER peut supprimer !
  remove(@Param('id') id: string) {
    return { message: `Ingrédient ${id} supprimé` };
  }
}