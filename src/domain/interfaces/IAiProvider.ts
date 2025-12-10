export interface IAiProvider {
  askChef(prompt: string): Promise<string>;
}