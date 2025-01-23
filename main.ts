import "@expo/metro-runtime";

import { App } from "expo-router/build/qualified-entry";
import { renderRootComponent } from "expo-router/build/renderRootComponent";

require("./msw.polyfills");

async function enableMocking() {
  if (!__DEV__) {
    return;
  }

  const { server } = require("./src/mocks/server");

  server.listen();
}

enableMocking().then(() => renderRootComponent(App));
