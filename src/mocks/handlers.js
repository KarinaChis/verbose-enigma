import { graphql, HttpResponse } from "msw";

const defaultPosts = {
  data: [
    { id: 1, title: "title" },
    { id: 2, title: "title" },
  ],
};

export const handlers = [
  graphql.query("PostsQuery", async () => {
    return HttpResponse.json({ data: { posts: defaultPosts } });
  }),
];
