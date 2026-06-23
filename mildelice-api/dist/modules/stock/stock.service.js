"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let StockService = class StockService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createIngredient(dto) {
        var _a;
        const ingredient = await this.prisma.ingredient.create({
            data: {
                name: dto.name,
                currentStock: dto.currentStock,
                minThreshold: dto.minThreshold,
                unit: dto.unit,
                unitPrice: dto.unitPrice,
                supplierId: (_a = dto.supplierId) !== null && _a !== void 0 ? _a : null,
            },
        });
        return ingredient;
    }
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
    async consumeStock(dto) {
        const { menuItemId, quantity } = dto;
        const recipeItems = await this.prisma.recipeIngredient.findMany({
            where: { menuItemId },
            include: { ingredient: true },
        });
        if (recipeItems.length === 0) {
            throw new Error(`Aucune recette trouvée pour le plat avec id=${menuItemId}`);
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
    async getIngredientById(id) {
        return this.prisma.ingredient.findUnique({
            where: { id },
            include: { supplier: true },
        });
    }
    async updateIngredient(id, dto) {
        var _a, _b, _c, _d, _e;
        const existing = await this.prisma.ingredient.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new Error(`Ingrédient avec id=${id} introuvable`);
        }
        return this.prisma.ingredient.update({
            where: { id },
            data: {
                name: (_a = dto.name) !== null && _a !== void 0 ? _a : existing.name,
                currentStock: (_b = dto.currentStock) !== null && _b !== void 0 ? _b : existing.currentStock,
                minThreshold: (_c = dto.minThreshold) !== null && _c !== void 0 ? _c : existing.minThreshold,
                unit: (_d = dto.unit) !== null && _d !== void 0 ? _d : existing.unit,
                unitPrice: (_e = dto.unitPrice) !== null && _e !== void 0 ? _e : existing.unitPrice,
                supplierId: dto.supplierId !== undefined ? dto.supplierId : existing.supplierId,
            },
        });
    }
    async deleteIngredient(id) {
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
    async listCriticalStock() {
        return this.prisma.ingredient.findMany({
            where: {},
            include: { supplier: true },
            orderBy: {
                currentStock: 'asc',
            },
        });
    }
};
exports.StockService = StockService;
exports.StockService = StockService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StockService);
//# sourceMappingURL=stock.service.js.map