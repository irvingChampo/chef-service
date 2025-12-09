// Contrato para obtener datos del inventario
export interface IInventoryProvider {
  getIngredients(kitchenId: number, token: string): Promise<string>;
}