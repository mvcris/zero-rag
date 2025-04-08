/**
 * Generic metadata type that can be used for filtering and searching
 */
export type DocumentMetadata = {
  [key: string]: string | number | boolean | null | undefined;
};

/**
 * Document as provided by the user - without embedding
 */
export interface UserDocument {
  /**
   * Unique identifier for the document
   */
  id?: string;

  /**
   * The collection name for the document
   */
  collectionName: string;

  /**
   * The actual content/text of the document
   */
  content: string;

  /**
   * Metadata for filtering and searching
   */
  metadata?: DocumentMetadata;
}

/**
 * Complete document with embedding - used internally by the RAG system
 */
export interface DocumentWithEmbedding extends UserDocument {
  /**
   * Vector embedding of the document content
   */
  embedding: number[];

  /**
   * Optional score for search results
   */
  score?: number;
}

/**
 * Document with required metadata - used when we need to ensure metadata is present
 */
export interface Document extends UserDocument {
  metadata: DocumentMetadata;
}

/**
 * Document with both required embedding and metadata
 */
export interface DocumentWithEmbeddingAndMetadata extends UserDocument {
  embedding: number[];
  metadata: DocumentMetadata;
}

/**
 * Type for document search results
 */
export interface DocumentSearchResult<T extends UserDocument = UserDocument> {
  document: T;
  score: number;
}

/**
 * Type for document batch operations
 */
export interface DocumentBatch<T extends UserDocument = UserDocument> {
  documents: T[];
  batchSize?: number;
}
