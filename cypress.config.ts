import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3002/",
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
