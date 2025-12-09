import { Request, Response } from 'express';
import { AskChefUseCase } from '../../../application/use-cases/AskChefUseCase';

export class AskChefController {
  constructor(private readonly useCase: AskChefUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      // CAMBIO: Extraer kitchenId de los parámetros de la URL
      const kitchenId = Number(req.params.kitchenId);
      
      // La pregunta sigue viniendo en el cuerpo
      const { question } = req.body;
      
      const token = req.headers.authorization || '';

      // Validaciones
      if (!kitchenId || isNaN(kitchenId)) {
        return res.status(400).json({ 
          success: false, 
          message: "El kitchenId en la URL debe ser un número válido." 
        });
      }

      if (!question) {
        return res.status(400).json({ 
          success: false, 
          message: "La pregunta (question) es requerida en el cuerpo de la petición." 
        });
      }

      // Ejecutar caso de uso
      const answer = await this.useCase.execute({ kitchenId, question }, token);

      return res.json({
        success: true,
        data: { answer }
      });

    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error interno del Chef Service"
      });
    }
  }
}