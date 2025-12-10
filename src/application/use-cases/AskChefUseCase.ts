import { IAiProvider } from '../../domain/interfaces/IAiProvider';
import { IInventoryProvider } from '../../domain/interfaces/IInventoryProvider';
import { AskChefDto } from '../../domain/dtos/AskChefDto';

export class AskChefUseCase {
  constructor(
    private readonly aiProvider: IAiProvider,
    private readonly inventoryProvider: IInventoryProvider
  ) { }

  async execute(dto: AskChefDto, token: string): Promise<string> {
    const ingredientsList = await this.inventoryProvider.getIngredients(dto.kitchenId, token);

    const prompt = `
INFORMACIÓN DE CONTEXTO:
Inventario actual disponible en la cocina:
${ingredientsList}

PREGUNTA DEL USUARIO:
"${dto.question}"

INSTRUCCIONES:
Responde a la pregunta del usuario usando el inventario disponible. Si pide una receta, da los pasos. Si pregunta qué puede hacer, dale opciones.
    `;

    const answer = await this.aiProvider.askChef(prompt);

    return answer;
  }
}