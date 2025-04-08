import { BaseEmbedding } from './drivers/base-embedding';

export type OpenAIConfig = {
  model: string;
};

export class OpenAIEmbeddingProvider extends BaseEmbedding<OpenAIConfig> {
  constructor(protected config: OpenAIConfig) {
    super(config);
  }

  async generateEmbeddings(text: string): Promise<number[]> {
    throw new Error('Not implemented');
  }
}
