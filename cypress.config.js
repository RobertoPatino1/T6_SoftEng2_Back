// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4001', // Adjust if necessary
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}', // Adjust the pattern if necessary
    supportFile: false, // or specify if you use a support file
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
