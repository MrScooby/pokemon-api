# Pokemon API

Recruitment task.

Simple API meant to work with simple app: (placeholder)

Spent way to much time on this part compared to frontend side.

## Tech Stack

- TypeScript
- Nest
- GraphQL
- PostgreSQL with Prisma

## Tech Stack

Few todos still present in code.

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pokemon-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.template .env
   ```

   Update `.env` with your database connection:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/pokemon_db"
   JWT_SECRET="your-secret-key"
   ```

4. **Database Setup**

   ```bash
   # Generate Prisma client
   npm run db:generate

   # Run migrations
   npm run db:migrate

   # Seed database (optional)
   npm run db:seed
   ```

5. **Start the application**
   ```bash
   npm run start:dev
   ```

The API will be available at:

- **GraphQL Playground**: http://localhost:3000/graphql

## API Usage

### Authentication

First, register a user and get a JWT token:

```graphql
mutation {
  register(input: { username: "username", password: "password" }) {
    accessToken
    user {
      id
      username
    }
  }
}
```

### Creating Pokemon (Requires Authentication)

```graphql
mutation {
  createPokemon(
    input: {
      name: "Pikachu"
      height: 0.4
      weight: 6.0
      image: "https://example.com/pikachu.png"
    }
  ) {
    id
    name
    height
    weight
    image
  }
}
```

**Headers:**

```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```

### Querying Pokemon with Filters and Pagination

```graphql
query {
  getAllPokemon(
    query: {
      filter: {
        name: "pika"
        height: { min: 0.3, max: 0.6 }
        weight: { min: 5.0, max: 10.0 }
      }
      pagination: { page: 1, limit: 10 }
    }
  ) {
    items {
      id
      name
      height
      weight
      image
    }
    pagination {
      currentPage
      totalItems
      totalPages
      hasNextPage
      hasPrevPage
    }
  }
}
```

### User Profile (Requires Authentication)

```graphql
query {
  me {
    id
    username
    createdAt
  }
}
```
