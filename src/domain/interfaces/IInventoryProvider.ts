export interface IInventoryProvider {
  getIngredients(kitchenId: number, token: string): Promise<string>;
}