// Ce DTO sert à mettre à jour un ingrédient existant.
// Tous les champs sont optionnels : on peut changer juste le prix ou le stock, par exemple.

export class UpdateIngredientDto {
  // Nouveau nom (optionnel)
  name?: string;

  // Nouvelle quantité de stock (optionnel)
  currentStock?: number;

  // Nouveau seuil d'alerte (optionnel)
  minThreshold?: number;

  // Nouvelle unité (optionnel)
  unit?: 'KG' | 'LITER' | 'UNIT';

  // Nouveau prix unitaire (optionnel)
  unitPrice?: number;

  // Nouveau fournisseur (optionnel)
  supplierId?: number | null;
}