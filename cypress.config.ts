import { defineConfig } from "cypress";

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);

    },

    baseUrl: "https://parabank.parasoft.com/parabank/",

    env: {
      logLevel: "VERBOSE"
    },

    watchForFileChanges: false,

  },
});
