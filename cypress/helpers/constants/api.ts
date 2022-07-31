export const API_LAST_FM = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${Cypress.env(
  "LAST_FM_USER",
)}&api_key=${Cypress.env(
  "LAST_FM",
)}&format=json`;
