# github-apis-bevy-backend


This backend is built using Node.js and uses MongoDB as the database. It provides three main API endpoints:

1. /search

   This API accepts a keyword to search repositories on GitHub.

   It fetches matching repositories from GitHub and saves them into the MongoDB database.

2. /repos

   This API serves paginated repository data from the MongoDB database.

   Clients can request repositories page by page to avoid loading all data at once.

3. /clear-repos

   This API clears all repository data from the database.

   Useful for resetting or clearing stale data.