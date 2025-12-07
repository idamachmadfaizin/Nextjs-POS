import { DateTimeResolver, DateTimeTypeDefinition } from "graphql-scalars";

export const typeDefs = /* GraphQL */ `
  type User {
    id: String!
    name: String!
    email: String!
  }

  type Tag {
    id: String!
    name: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    greetings: String
    tags: [Tag]!
    users: [User!]!
    user(id: String!): User
  }
`;
