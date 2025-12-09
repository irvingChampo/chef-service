import axios from 'axios';
import { IInventoryProvider } from '../../domain/interfaces/IInventoryProvider';
import { env } from '../../config/env';

export class InventoryHttpProvider implements IInventoryProvider {
  
  async getIngredients(kitchenId: number, token: string): Promise<string> {
    try {
      // Llamada al endpoint que definiste en tus rutas de inventario
      const url = `${env.inventoryServiceUrl}/kitchens/${kitchenId}/items`;
      
      // Pasamos el token para mantener la seguridad
      const response = await axios.get(url, {
        headers: { Authorization: token } 
      });

      if (!response.data.success || !response.data.items) {
        return "No se pudo obtener el inventario.";
      }

      const items = response.data.items;
      
      if (items.length === 0) {
        return "El inventario está vacío.";
      }

      // Formateamos la lista para que la IA la entienda mejor
      // Ejemplo: "- Arroz (10 kg)"
      return items.map((i: any) => `- ${i.product.name} (${i.quantity} ${i.product.unit})`).join('\n');

    } catch (error) {
      console.error("Error fetching inventory:", error);
      // En caso de error, no rompemos el chat, solo decimos que no hay datos
      return "No pude conectar con el inventario temporalmente.";
    }
  }
}