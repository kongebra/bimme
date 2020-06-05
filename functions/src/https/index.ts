import { Request, Response } from 'firebase-functions';

export const helloHandler = (request: Request, response: Response<any>) => {
    const name = request.query.name || 'world';

    response.json({ hello: name });
};