import HomeScreen from "@/app/(tabs)";
import { server } from "@/src/mocks/server";
import { render, waitFor } from "@testing-library/react-native";
import { http, HttpResponse } from "msw";
import { graphql } from "msw";
import { graphql as executeGraphQL } from "graphql";
import { customRender, mockedSchema } from "@/src/mocks/urqlProvider";

describe("<HomeScreen />", () => {
  test("Name renders correctly on HomeScreen", async () => {
    const { getByText } = customRender(<HomeScreen />);

    server.use(
      http.get("https://dummyjson.com/users", () => {
        return HttpResponse.json({ users: [{ id: "1", username: "John111" }] });
      })
    );

    await waitFor(() => getByText("John111"));
  });

  test("Name renders correctly on HomeScreen second time", async () => {
    const { getByText } = customRender(<HomeScreen />);

    server.use(
      http.get("https://dummyjson.com/users", () => {
        return HttpResponse.json({ users: [{ id: "1", username: "John222" }] });
      })
    );

    await waitFor(() => getByText("John222"));
  });

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
});
