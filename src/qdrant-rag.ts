import { EmbeddingProviderOptions } from '.';
import { BaseEmbedding } from './base-embedding';
import { BaseRag, BaseCreateCollectionOptions } from './base-rag';
import type { QdrantClient } from '@qdrant/js-client-rest';

export type QdrantConfig = {
  url: string;
  apiKey: string;
};

export type QdrantCreateCollectionOptions = BaseCreateCollectionOptions & {
  distance: 'cosine' | 'dot' | 'euclidean';
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
        host: this.qdrantConfig.url,
        apiKey: this.qdrantConfig.apiKey,
      });
    }
    return this.qdrantClient;
  }

  async addDocument(document: string): Promise<void> {
    const embeddings = await this.embeddingProvider.generateEmbeddings(document);
    throw new Error('Method not implemented.');
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
    console.log(`Creating Qdrant collection with distance metric: ${options.distance}`);
  }
}
