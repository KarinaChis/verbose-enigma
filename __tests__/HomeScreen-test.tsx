import HomeScreen from "@/app/(tabs)";
import { server } from "@/src/mocks/server";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { HttpResponse } from "msw";
import { graphql } from "msw";
import { customRender } from "@/src/mocks/urqlProvider";
import { handler } from "@/src/mocks/handlers";

describe("<HomeScreen />", () => {
  test("Post title renders correctly on HomeScreen", async () => {
    const { getByText } = customRender(<HomeScreen />);

    handler.withMocks({
      PostsPage: () => ({ data: [{}] }),
      Post: () => ({ id: "1", title: "awesome title" }),
    });

    await waitFor(() => getByText("awesome title"));
  });

  test("Post title renders correctly on HomeScreen second time", async () => {
    const { getByText } = customRender(<HomeScreen />);

    handler.withMocks({
      PostsPage: () => ({ data: [{}] }),
      Post: () => ({ id: "1", title: "awesome title 2" }),
    });

    await waitFor(() => getByText("awesome title 2"));
  });

  test("displays delete buttons for every post", async () => {
    const { getAllByText } = customRender(<HomeScreen />);

    handler.withMocks({ PostsPage: () => ({ data: [{}, {}] }) });

    await waitFor(() => expect(getAllByText("Remove")).toHaveLength(2));
  });

  describe("when delete button is pressed", () => {
    it("removes the post", async () => {
      const { findByTestId } = customRender(<HomeScreen />);
      const mutation = jest.fn();

      handler.withMocks({
        PostsPage: () => ({ data: [{}] }),
        Post: () => ({ id: "1" }),
      });

      server.use(
        graphql.mutation(
          "DeletePost",
          ({ variables }) => {
            if (variables.id === "1") {
              mutation();
            }

            return HttpResponse.json({});
          },
          { once: true }
        )
      );

      const button = await findByTestId("post_1_button");
      fireEvent.press(button);

      await waitFor(() => expect(mutation).toHaveBeenCalled());
    });
  });
});
