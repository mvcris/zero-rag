import { BaseEmbedding } from './base-embedding';
import { OpenAIConfig, OpenAIEmbeddingProvider } from './open-ai';
import { QdrantRag, QdrantConfig } from './qdrant-rag';

export type ProviderType = 'qdrant' | 'pgvector';

export type EmbeddingProviderType = 'openai' | 'huggingface';

type PgVectorConfig = {
  url: string;
  port: number;
};

type StoreConfig<T extends ProviderType> = {
  provider: T;
  config: ProviderOptions<T>;
};

type EmbeddingConfig<T extends EmbeddingProviderType> = {
  provider: T;
  config: EmbeddingProviderOptions<T>;
};

export type EasyRagConfig<T extends ProviderType, E extends EmbeddingProviderType> = {
  store: StoreConfig<T>;
  embedding: EmbeddingConfig<E>;
};

type HuggingFaceConfig = {
  model: string;
  apiKey: string;
};

type ProviderOptions<T extends ProviderType> = T extends 'qdrant'
  ? QdrantConfig
  : T extends 'pgvector'
    ? PgVectorConfig
    : never;

export type EmbeddingProviderOptions<T extends EmbeddingProviderType> = T extends 'openai'
  ? OpenAIConfig
  : T extends 'huggingface'
    ? HuggingFaceConfig
    : never;

type ProviderClass<T extends ProviderType> = T extends 'qdrant'
  ? QdrantRag
  : T extends 'pgvector'
    ? never
    : never;

export class EasyRag<T extends ProviderType, E extends EmbeddingProviderType> {
  private _store: ProviderClass<T>;
  private _embeddingProvider: BaseEmbedding<EmbeddingProviderOptions<E>>;

  constructor(private config: EasyRagConfig<T, E>) {
    this._store = this.setupStore() as ProviderClass<T>;
    this._embeddingProvider = this.setupEmbeddingProvider() as BaseEmbedding<
      EmbeddingProviderOptions<E>
    >;
  }

  get store(): ProviderClass<T> {
    return this._store;
  }

  get embedding(): BaseEmbedding<EmbeddingProviderOptions<E>> {
    return this._embeddingProvider;
  }

  private setupStore(): ProviderClass<T> {
    if (this.config.store.provider === 'qdrant') {
      return new QdrantRag(
        this.config.store.config as QdrantConfig,
        this.embedding
      ) as ProviderClass<T>;
    }
    throw new Error('Provider not supported');
  }

  private setupEmbeddingProvider(): BaseEmbedding<EmbeddingProviderOptions<E>> {
    if (this.config.embedding.provider === 'openai') {
      return new OpenAIEmbeddingProvider(
        this.config.embedding.config as OpenAIConfig
      ) as unknown as BaseEmbedding<EmbeddingProviderOptions<E>>;
    }
    throw new Error('Provider not supported');
  }
}
