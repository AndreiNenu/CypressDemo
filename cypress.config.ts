import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

    },

    baseUrl: "https://parabank.parasoft.com/parabank/",

    env: {
      logLevel: "VERBOSE"
    },

    watchForFileChanges: false
  },
});
