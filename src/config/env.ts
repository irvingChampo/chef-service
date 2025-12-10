import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: process.env.PORT,
  inventoryServiceUrl: process.env.INVENTORY_SERVICE_URL || '',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
};

if (!env.geminiApiKey) {
  console.warn("ADVERTENCIA: GEMINI_API_KEY no está definida.");
}