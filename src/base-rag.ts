import { EmbeddingProviderOptions } from '.';
import { BaseEmbedding } from './base-embedding';

type QdrantDistance = 'cosine' | 'dot' | 'euclidean';
type PgVectorDistance = 'cosine' | 'l2';

export type BaseCreateCollectionOptions = {
  name: string;
  vectorSize: number;
};

export abstract class BaseRag<T extends BaseCreateCollectionOptions, C = any> {
  constructor(
    protected config: C,
    protected embeddingProvider: BaseEmbedding<EmbeddingProviderOptions<any>>
  ) {
    this.embeddingProvider = embeddingProvider;
  }

  abstract addDocument(document: string): Promise<void>;
  abstract createCollection(collectionName: string, options: T): Promise<void>;
  abstract query(query: string): Promise<string>;
}
