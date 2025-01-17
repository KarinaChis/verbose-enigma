import { buildSchema } from "graphql";
import React from "react";
import { render } from "@testing-library/react-native";

import { Client, Provider, fetchExchange } from "urql";

export const mockedSchema = buildSchema(`
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
  `);

const client = new Client({
  url: "https://graphqlzero.almansi.me/api",
  exchanges: [fetchExchange],
  fetchOptions: () => ({ headers: { "Content-Type": "application/json" } }),
});

export function UrqlProvider({ children }) {
  return <Provider value={client}>{children}</Provider>;
}

export function customRender(ui) {
  return render(ui, {
    wrapper: ({ children }) => (
      <UrqlProvider value={client}>{children}</UrqlProvider>
    ),
  });
}
