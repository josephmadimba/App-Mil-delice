// Ce DTO représente une "consommation" de stock.
// Nest va créer cette classe à partir du JSON reçu, donc on utilise "!" pour
// dire à TypeScript que ces champs seront bien fournis au runtime.

export class ConsumeStockDto {
  // Identifiant du plat vendu (MenuItem.id)
  menuItemId!: number;

  // Nombre de portions vendues (ex : 3 burgers)
  quantity!: number;
}