import { EmbeddingProviderOptions } from '../../index';
import { Document } from '../../types/document';
import { BaseEmbedding } from '../base-embedding';
import { BaseRag, BaseCreateCollectionOptions } from '../base-rag';
import type { QdrantClient } from '@qdrant/js-client-rest';

export type QdrantConfig = {
  host: string;
  port: string;
};

export type QdrantCreateCollectionOptions = BaseCreateCollectionOptions & {
  distance: 'Cosine' | 'Euclid' | 'Dot' | 'Manhattan';
};

export class QdrantRag extends BaseRag<QdrantCreateCollectionOptions, QdrantConfig> {
  private qdrantClient: QdrantClient | null = null;
  constructor(
    private qdrantConfig: QdrantConfig,
    protected embeddingProvider: BaseEmbedding<EmbeddingProviderOptions<any>>
  ) {
    super(qdrantConfig, embeddingProvider);
    this.getQdrantClient();
  }

  private async getQdrantClient() {
    if (!this.qdrantClient) {
      const { QdrantClient } = await import('@qdrant/js-client-rest');
      this.qdrantClient = new QdrantClient({
        host: this.qdrantConfig.host,
        port: parseInt(this.qdrantConfig.port),
      });
    }
    return this.qdrantClient;
  }

  async addDocument(document: Document): Promise<void> {
    const embeddings = await this.embeddingProvider.generateEmbeddings(document.content);
    await this.getQdrantClient();
    await this.qdrantClient?.upsert(document.collectionName, {
      points: [
        {
          id: document.id ?? crypto.randomUUID(),
          vector: embeddings,
          payload: document.metadata,
        },
      ],
    });
  }

  async query(query: string): Promise<string> {
    await this.getQdrantClient();
    throw new Error('Method not implemented.');
  }

  async createCollection(
    collectionName: string,
    options: QdrantCreateCollectionOptions
  ): Promise<void> {
    await this.getQdrantClient();
    await this.qdrantClient?.createCollection(collectionName, {
      vectors: {
        config: {
          size: options.vectorSize,
          distance: options.distance,
        },
      },
    });
  }
}
