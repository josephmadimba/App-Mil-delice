// DTO = Data Transfer Object
// Ce fichier décrit les données attendues quand on crée un ingrédient via l'API.
// Nest créera cette classe à partir du JSON de la requête, donc on peut utiliser "!" pour
// indiquer à TypeScript que les champs seront bien remplis.

export class CreateIngredientDto {
  // Nom de l'ingrédient (ex : "Tomate", "Steak haché")
  name!: string;

  // Quantité initiale en stock (peut être décimale, ex : 10.5 kg)
  currentStock!: number;

  // Seuil minimum avant alerte (ex : 2 kg)
  minThreshold!: number;

  // Unité de mesure : doit être une des valeurs de l'enum Unit (KG, LITER, UNIT)
  unit!: 'KG' | 'LITER' | 'UNIT';

  // Prix d'achat unitaire de cet ingrédient (ex : 3.5 / kg)
  unitPrice!: number;

  // Identifiant du fournisseur (optionnel)
  supplierId?: number;
}