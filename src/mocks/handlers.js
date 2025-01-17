import { graphql, http, HttpResponse } from "msw";

export const handlers = [
  graphql.operation(() => {
    return HttpResponse.json({});
  }),
];
