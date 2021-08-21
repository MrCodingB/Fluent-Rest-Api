import { RestMethod, IHttpClient } from 'fluent-rest-api';

export class HttpService implements IHttpClient {
    makeRequest(method: RestMethod, url: string, body?: any): Promise<any> {
        return new Promise<any>((resolve) => {
            console.log(`${method} ${url}`, body);
            resolve({});
        });
    }
}
