import { Router } from 'express';
import { AskChefController } from '../controllers/AskChefController';
import { AskChefUseCase } from '../../../application/use-cases/AskChefUseCase';
import { InventoryHttpProvider } from '../../providers/InventoryHttpProvider';
// 1. Importamos Gemini
import { GeminiProvider } from '../../providers/GeminiProvider';

const router = Router();

// Inyección de dependencias
const inventoryProvider = new InventoryHttpProvider();

// 2. Instanciamos Gemini en lugar de OpenAI
const aiProvider = new GeminiProvider(); 

const askChefUseCase = new AskChefUseCase(aiProvider, inventoryProvider);
const askChefController = new AskChefController(askChefUseCase);

// Ruta con el ID en la URL (como acordamos en el paso anterior)
router.post('/kitchens/:kitchenId/ask', (req, res) => askChefController.handle(req, res));

export default router;