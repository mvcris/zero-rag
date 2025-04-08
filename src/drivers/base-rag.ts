import { EmbeddingProviderOptions } from '../index';
import { BaseEmbedding } from './base-embedding';
import { Document } from '../types/document';
export type BaseCreateCollectionOptions = {
  vectorSize: number;
};

export abstract class BaseRag<T extends BaseCreateCollectionOptions, C = any> {
  constructor(
    protected config: C,
    protected embeddingProvider: BaseEmbedding<EmbeddingProviderOptions<any>>
  ) {
    this.embeddingProvider = embeddingProvider;
  }

  abstract addDocument(document: Document): Promise<void>;
  abstract createCollection(collectionName: string, options: T): Promise<void>;
  abstract query(query: string): Promise<string>;
}
