import { graphql, http, HttpResponse } from "msw";

export const handlers = [
  graphql.operation(() => {
    return HttpResponse.json({});
  }),
  http.get("https://dummyjson.com/users", () => {}),
];
