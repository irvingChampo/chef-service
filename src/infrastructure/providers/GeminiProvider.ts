import { GoogleGenerativeAI } from "@google/generative-ai";
import { IAiProvider } from '../../domain/interfaces/IAiProvider';
import { env } from '../../config/env';

export class GeminiProvider implements IAiProvider {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(env.geminiApiKey);
    
    // CAMBIO CLAVE AQUÍ: Usamos "gemini-1.5-pro"
    // Si este falla, intenta con "gemini-1.0-pro" (la versión anterior más compatible)
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }

  async askChef(prompt: string): Promise<string> {
    try {
      if (!env.geminiApiKey || env.geminiApiKey.length < 10) {
        throw new Error("API Key inválida o no configurada.");
      }

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return text || "El chef se quedó mudo (respuesta vacía).";

    } catch (error: any) {
      console.error("Gemini Error:", error);
      
      // Manejo de errores específicos
      if (error.message?.includes('404') || error.message?.includes('not found')) {
        return "Error técnico: El nombre del modelo de IA no es válido. Prueba cambiar 'gemini-1.5-pro' por 'gemini-1.0-pro' en el código.";
      }

      if (error.message?.includes('API key')) {
        return "Error de configuración: Clave de API inválida.";
      }
      
      return "Lo siento, mi cerebro de Google está teniendo problemas técnicos en este momento.";
    }
  }
}