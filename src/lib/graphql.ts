import { GraphQLClient } from "graphql-request";

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL;
if (!GRAPHQL_URL) throw new Error("Missing GRAPHQL_URL environment variable");

export const gqlClient = new GraphQLClient(GRAPHQL_URL);