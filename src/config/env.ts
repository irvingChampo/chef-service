import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: process.env.PORT || 4010,
  inventoryServiceUrl: process.env.INVENTORY_SERVICE_URL || 'http://localhost:4008/api/v1/inventory',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
};

if (!env.geminiApiKey) {
  console.warn("⚠️ ADVERTENCIA: GEMINI_API_KEY no está definida.");
}