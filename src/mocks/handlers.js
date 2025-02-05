import { createHandler } from "@apollo/graphql-testing-library";
import { gql } from "graphql-tag";

const defaultPosts = {
  data: [
    { id: 1, title: "title" },
    { id: 2, title: "title" },
  ],
};

export const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
  }

  type PostsPage {
    data: [Post!]
  }

  type Query {
    posts: PostsPage!
  }

  type Mutation {
    deletePost(id: ID!): DeletePostPayload!
  }

  type DeletePostPayload {
    id: ID!
  }
`;

export const handler = createHandler({
  typeDefs,
  // Method to add general resolvers (e.g., for e2e testing)
  resolvers: {
    Query: {},
  },
  // Method to add general mocks (e.g., for e2e testing)
  // The returned value will be overwritten by the resolver’s value, if provided
  mocks: {
    PostsPage: () => defaultPosts,
  },
});

export const handlers = [handler];
