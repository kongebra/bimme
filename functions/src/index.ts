import * as functions from 'firebase-functions';

import { config } from './config';

import { helloHandler } from './https';

export const hello = functions.region(config.region).https.onRequest(helloHandler);