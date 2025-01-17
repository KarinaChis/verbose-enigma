import HomeScreen from "@/app/(tabs)";
import { server } from "@/src/mocks/server";
import { waitFor } from "@testing-library/react-native";
import { HttpResponse } from "msw";
import { graphql } from "msw";
import { graphql as executeGraphQL } from "graphql";
import { customRender, mockedSchema } from "@/src/mocks/urqlProvider";

const defaultPosts = {
  data: [
    { id: 1, title: "title" },
    { id: 2, title: "title" },
  ],
};

describe("<HomeScreen />", () => {
  test("Post title renders correctly on HomeScreen", async () => {
    const { getByText } = customRender(<HomeScreen />);

    server.use(
      graphql.query("PostsQuery", async ({ query, variables }) => {
        const { errors, data } = await executeGraphQL({
          schema: mockedSchema,
          source: query,
          variableValues: variables,
          rootValue: {
            posts: { data: [{ id: "1", title: "awesome title" }] },
          },
        });

        return HttpResponse.json({ errors, data });
      })
    );

    await waitFor(() => getByText("awesome title"));
  });

  test("Post title renders correctly on HomeScreen second time", async () => {
    const { getByText } = customRender(<HomeScreen />);

    server.use(
      graphql.query("PostsQuery", async ({ query, variables }) => {
        const { errors, data } = await executeGraphQL({
          schema: mockedSchema,
          source: query,
          variableValues: variables,
          rootValue: {
            posts: { data: [{ id: "1", title: "awesome title 2" }] },
          },
        });

        return HttpResponse.json({ errors, data });
      })
    );

    await waitFor(() => getByText("awesome title 2"));
  });

  test("displays delete buttons for every post", async () => {
    const { getAllByText } = customRender(<HomeScreen />);

    server.use(
      graphql.query("PostsQuery", async ({ query, variables }) => {
        const { errors, data } = await executeGraphQL({
          schema: mockedSchema,
          source: query,
          variableValues: variables,
          rootValue: { posts: defaultPosts },
        });

        return HttpResponse.json({ errors, data });
      })
    );

    await waitFor(() => expect(getAllByText("Remove")).toHaveLength(2));
  });
});
