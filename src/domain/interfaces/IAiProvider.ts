// Contrato para cualquier proveedor de IA (OpenAI, Anthropic, etc)
export interface IAiProvider {
  askChef(prompt: string): Promise<string>;
}