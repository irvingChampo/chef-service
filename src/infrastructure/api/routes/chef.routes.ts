import { Router } from 'express';
import { AskChefController } from '../controllers/AskChefController';
import { AskChefUseCase } from '../../../application/use-cases/AskChefUseCase';
import { InventoryHttpProvider } from '../../providers/InventoryHttpProvider';
import { GeminiProvider } from '../../providers/GeminiProvider';
import { authenticate } from '../../../middleware/auth.middleware';

const router = Router();

const inventoryProvider = new InventoryHttpProvider();
const aiProvider = new GeminiProvider();

const askChefUseCase = new AskChefUseCase(aiProvider, inventoryProvider);
const askChefController = new AskChefController(askChefUseCase);

router.post(
  '/kitchens/:kitchenId/ask',
  authenticate,
  (req, res) => askChefController.handle(req, res)
);

export default router;