import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const hello = functions
  .region('europe-west3')
  .https.onRequest((request, response) => {
    const name = request.query.name || 'world';

    response.json({ hello: name });
  });
