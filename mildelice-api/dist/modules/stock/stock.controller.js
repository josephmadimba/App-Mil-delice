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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../auth/auth.guard");
const roles_guard_1 = require("../../auth/roles.guard");
const roles_decorator_1 = require("../../auth/roles.decorator");
let StockController = class StockController {
    findAll() {
        return [
            { id: 1, name: 'Farine', quantity: 50, unit: 'kg' },
            { id: 2, name: 'Sucre', quantity: 20, unit: 'kg' }
        ];
    }
    create(body) {
        return { message: 'Ingrédient ajouté avec succès !', data: body };
    }
    update(id, body) {
        return { message: `Ingrédient ${id} mis à jour` };
    }
    remove(id) {
        return { message: `Ingrédient ${id} supprimé` };
    }
};
exports.StockController = StockController;
__decorate([
    (0, common_1.Get)('ingredients'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StockController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('ingredients'),
    (0, roles_decorator_1.Roles)('MANAGER'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StockController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('ingredients/:id'),
    (0, roles_decorator_1.Roles)('MANAGER'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], StockController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('ingredients/:id'),
    (0, roles_decorator_1.Roles)('MANAGER'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StockController.prototype, "remove", null);
exports.StockController = StockController = __decorate([
    (0, common_1.Controller)('stock'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard)
], StockController);
//# sourceMappingURL=stock.controller.js.map