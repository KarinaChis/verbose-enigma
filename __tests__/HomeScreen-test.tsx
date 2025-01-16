import HomeScreen from "@/app/(tabs)";
import { server } from "@/src/mocks/server";
import { render, waitFor } from "@testing-library/react-native";
import { http, HttpResponse } from "msw";

describe("<HomeScreen />", () => {
  test("Name renders correctly on HomeScreen", async () => {
    server.use(
      http.get("https://dummyjson.com/users", () => {
        return HttpResponse.json({ users: [{ id: "1", username: "John111" }] });
      })
    );
    const { getByText } = render(<HomeScreen />);

    await waitFor(() => getByText("John111"));
  });

  test("Name renders correctly on HomeScreen second time", async () => {
    server.use(
      http.get("https://dummyjson.com/users", () => {
        return HttpResponse.json({ users: [{ id: "1", username: "John222" }] });
      })
    );
    const { getByText } = render(<HomeScreen />);

    await waitFor(() => getByText("John222"));
  });

  test("Name renders correctly on HomeScreen second time", async () => {
    server.use(
      http.get("https://dummyjson.com/users", () => {
        return HttpResponse.json({ users: [{ id: "1", username: "John222" }] });
      })
    );
    const { getByText } = render(<HomeScreen />);

    await waitFor(() => getByText("John222"));
  });
});
