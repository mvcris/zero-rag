import { EmbeddingProviderOptions } from '../index';

export abstract class BaseEmbedding<T extends EmbeddingProviderOptions<any>> {
  protected config: T;

  constructor(config: T) {
    this.config = config;
  }

  abstract generateEmbeddings(text: string): Promise<number[]>;
}
