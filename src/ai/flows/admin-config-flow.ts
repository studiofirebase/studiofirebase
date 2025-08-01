'use server';
/**
 * @fileOverview Fluxo administrativo para gerenciar as configurações do ambiente.
 * - updateEnvFile: Atualiza as variáveis de ambiente no arquivo .env do servidor.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as fs from 'fs/promises';
import * as path from 'path';

const EnvUpdateSchema = z.object({
  key: z.string(),
  value: z.string(),
});

const UpdateEnvInputSchema = z.object({
  updates: z.array(EnvUpdateSchema),
});
export type UpdateEnvInput = z.infer<typeof UpdateEnvInputSchema>;

const UpdateEnvOutputSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
});
export type UpdateEnvOutput = z.infer<typeof UpdateEnvOutputSchema>;


/**
 * Fluxo Genkit que atualiza o arquivo .env no servidor.
 */
const updateEnvFileFlow = ai.defineFlow(
  {
    name: 'updateEnvFileFlow',
    inputSchema: UpdateEnvInputSchema,
    outputSchema: UpdateEnvOutputSchema,
  },
  async ({ updates }) => {
    const envFilePath = path.resolve(process.cwd(), '.env');

    try {
      let envFileContent = '';
      try {
        envFileContent = await fs.readFile(envFilePath, 'utf-8');
      } catch (error: any) {
        // Se o arquivo não existir, criaremos um novo.
        if (error.code !== 'ENOENT') {
          throw error;
        }
      }

      let envLines = envFileContent.split('\n');
      
      updates.forEach(({ key, value }) => {
        const newEntry = `${key}="${value}"`;
        const entryIndex = envLines.findIndex(line => line.startsWith(`${key}=`));

        if (entryIndex !== -1) {
          // Atualiza a linha existente
          envLines[entryIndex] = newEntry;
        } else {
          // Adiciona a nova linha
          envLines.push(newEntry);
        }
      });
      
      // Remove linhas em branco do final
      while (envLines.length > 0 && envLines[envLines.length - 1].trim() === '') {
        envLines.pop();
      }

      await fs.writeFile(envFilePath, envLines.join('\n'), 'utf-8');
      console.log(`Arquivo .env atualizado com sucesso em: ${envFilePath}`);

      return { success: true };

    } catch (error: any) {
      console.error('Erro ao atualizar o arquivo .env:', error);
      return { success: false, error: `Não foi possível atualizar as configurações. Motivo: ${error.message}` };
    }
  }
);


/**
 * Função exportada para ser chamada do lado do cliente.
 */
export async function updateEnvFile(input: UpdateEnvInput): Promise<UpdateEnvOutput> {
  return updateEnvFileFlow(input);
}
