import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { ConsumeStockDto } from './dto/consume-stock.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
// Le service contient toute la logique métier liée au stock.
export class StockService {
  constructor(private readonly prisma: PrismaService) {}

  // 1) Créer un nouvel ingrédient dans la base
  async createIngredient(dto: CreateIngredientDto) {
    const ingredient = await this.prisma.ingredient.create({
      data: {
        name: dto.name,
        currentStock: dto.currentStock,
        minThreshold: dto.minThreshold,
        unit: dto.unit,
        unitPrice: dto.unitPrice,
        supplierId: dto.supplierId ?? null,
      },
    });

    return ingredient;
  }

  // 2) Lister tous les ingrédients avec leur stock actuel
  async listIngredients() {
    return this.prisma.ingredient.findMany({
      include: {
        supplier: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  // 3) Consommer du stock à partir d'un plat vendu
  async consumeStock(dto: ConsumeStockDto) {
    const { menuItemId, quantity } = dto;

    const recipeItems = await this.prisma.recipeIngredient.findMany({
      where: { menuItemId },
      include: { ingredient: true },
    });

    if (recipeItems.length === 0) {
      throw new Error(
        `Aucune recette trouvée pour le plat avec id=${menuItemId}`,
      );
    }

    const updates = recipeItems.map((recipeItem) => {
      const totalToConsume = recipeItem.quantityNeeded * quantity;

      return this.prisma.ingredient.update({
        where: { id: recipeItem.ingredientId },
        data: {
          currentStock: {
            decrement: totalToConsume,
          },
        },
      });
    });

    const updatedIngredients = await this.prisma.$transaction(updates);

    return {
      message: 'Stock mis à jour avec succès',
      updatedIngredients,
    };
  }

  // 4) Récupérer un ingrédient par son id
  async getIngredientById(id: number) {
    return this.prisma.ingredient.findUnique({
      where: { id },
      include: { supplier: true },
    });
  }

  // 5) Mettre à jour un ingrédient existant
  async updateIngredient(id: number, dto: UpdateIngredientDto) {
    const existing = await this.prisma.ingredient.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new Error(`Ingrédient avec id=${id} introuvable`);
    }

    return this.prisma.ingredient.update({
      where: { id },
      data: {
        name: dto.name ?? existing.name,
        currentStock: dto.currentStock ?? existing.currentStock,
        minThreshold: dto.minThreshold ?? existing.minThreshold,
        unit: dto.unit ?? existing.unit,
        unitPrice: dto.unitPrice ?? existing.unitPrice,
        supplierId:
          dto.supplierId !== undefined ? dto.supplierId : existing.supplierId,
      },
    });
  }

  // 6) Supprimer un ingrédient
  async deleteIngredient(id: number) {
    const existing = await this.prisma.ingredient.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new Error(`Ingrédient avec id=${id} introuvable`);
    }

    await this.prisma.ingredient.delete({
      where: { id },
    });

    return { message: `Ingrédient id=${id} supprimé avec succès` };
  }

  // 7) Lister les stocks critiques (currentStock <= minThreshold)
  async listCriticalStock() {
    // Version simple sans comparaison de colonnes, à adapter plus tard si besoin :
    // On récupère tous les ingrédients et on filtrera côté front ou dans un prochain refactor.
    return this.prisma.ingredient.findMany({
      where: {
        // TODO: affiner la requête si besoin (par exemple, en ajoutant une marge)
      },
      include: { supplier: true },
      orderBy: {
        currentStock: 'asc',
      },
    });
  }
}