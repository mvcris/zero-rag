# Easy RAG

[![npm version](https://badge.fury.io/js/easy-rag.svg)](https://badge.fury.io/js/easy-rag)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

> ⚠️ **Development Status**: This project is currently under active development. The API and features are subject to change. We recommend using it only for experimental purposes at this stage.

Easy RAG is a TypeScript library that simplifies the implementation of Retrieval-Augmented Generation (RAG) systems. It provides a flexible and type-safe way to integrate different vector stores and embedding providers.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Configuration](#configuration)
- [Usage Examples](#usage-examples)
- [Development](#development)
- [Contributing](#contributing)
- [TODO](#todo)
- [License](#license)

## Features

- 🔄 Multiple Vector Store Support
  - Qdrant
  - PostgreSQL (pgvector) - Coming soon
- 🤖 Multiple Embedding Providers
  - OpenAI
  - HuggingFace
- 🛠️ Type-safe configuration
- 🚀 Easy to use and extend
- 📦 Zero dependencies (except for the providers you choose to use)

## Installation

```bash
npm install easy-rag
# or
yarn add easy-rag
```

## Quick Start

```typescript
import { ZeroRAG } from 'zero-rag';

// Configure your RAG system
const config = {
  store: {
    provider: 'qdrant',
    config: {
      url: 'http://localhost:6333',
      collectionName: 'my-collection',
      vectorSize: 1536
    }
  },
  embedding: {
    provider: 'openai',
    config: {
      apiKey: 'your-openai-api-key',
      model: 'text-embedding-3-small'
    }
  }
};

// Initialize ZeroRAG
const rag = new ZeroRAG(config);

// Use the store and embedding providers
const store = rag.store;
const embedding = rag.embedding;
```

## Architecture

ZeroRAG  follows a modular architecture that separates concerns between:
- Vector Store Providers (Qdrant, pgvector)
- Embedding Providers (OpenAI, HuggingFace)
- Core RAG functionality

This separation allows for:
- Easy addition of new providers
- Type-safe configuration
- Flexible integration with existing systems

## Configuration

### Vector Store Configuration

#### Qdrant
```typescript
type QdrantConfig = {
  url: string;
  collectionName: string;
  vectorSize: number;
};
```

#### PostgreSQL (pgvector) - Coming soon
```typescript
type PgVectorConfig = {
  url: string;
  port: number;
};
```

### Embedding Provider Configuration

#### OpenAI
```typescript
type OpenAIConfig = {
  apiKey: string;
  model: string;
};
```

#### HuggingFace
```typescript
type HuggingFaceConfig = {
  model: string;
  apiKey: string;
};
```

## Usage Examples

### Basic Usage with Qdrant and OpenAI

```typescript
import { ZeroRAG } from 'zero-rag';

const rag = new ZeroRAG({
  store: {
    provider: 'qdrant',
    config: {
      url: 'http://localhost:6333',
      collectionName: 'documents',
      vectorSize: 1536
    }
  },
  embedding: {
    provider: 'openai',
    config: {
      apiKey: process.env.OPENAI_API_KEY,
      model: 'text-embedding-3-small'
    }
  }
});

// Get the store and embedding providers
const store = rag.store;
const embedding = rag.embedding;
```

### Using with HuggingFace Embeddings

```typescript
const rag = new ZeroRAG({
  store: {
    provider: 'qdrant',
    config: {
      url: 'http://localhost:6333',
      collectionName: 'documents',
      vectorSize: 768 // HuggingFace model vector size
    }
  },
  embedding: {
    provider: 'huggingface',
    config: {
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      apiKey: process.env.HUGGINGFACE_API_KEY
    }
  }
});
```

## Development

### Prerequisites

- Node.js >= 16
- TypeScript >= 4.5
- Qdrant (if using Qdrant provider)
- PostgreSQL with pgvector extension (if using pgvector provider)

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to:
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Keep the development status warning in mind

## TODO

- [ ] Add PostgreSQL (pgvector) and Qdrant vector store support
- [ ] Add more embedding providers (e.g., Cohere, Google)
- [ ] Implement batch operations for vector stores
- [ ] Creating fragment system
- [ ] Add support for hybrid search (vector + keyword)
- [ ] Add caching layer for embeddings
- [ ] Improve error handling and logging
- [ ] Add more comprehensive tests
- [ ] Create detailed documentation with examples
- [ ] Add benchmarks and performance tests

## License

MIT © Cristiano Mattos