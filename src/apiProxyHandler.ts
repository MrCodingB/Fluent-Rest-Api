import { IHttpClient } from './httpClient';
import { isRestMethod } from './restMethod';
import { ApiSpecification } from './types';

export class ApiProxyHandler<T extends ApiSpecification> implements ProxyHandler<T> {
    private get url(): string {
        return this.baseUrl + this.pathParts.map(encodeURIComponent).join('/');
    }

    private constructor(
        private readonly baseUrl: string,
        private readonly httpClient: IHttpClient,
        private readonly specification: T,
        private readonly apiLocation: any = specification,
        private readonly pathParts: string[] = []
    ) {
    }

    public static getProxy<T extends ApiSpecification>(baseUrl: string, httpService: IHttpClient, specification: T): T {
        return new Proxy<T>({} as T, new ApiProxyHandler(baseUrl + (baseUrl.endsWith('/') ? '' : '/'), httpService, specification));
    }

    public get(_: T, key: string) {
        const location = this.apiLocation[key];
        if (typeof location === 'function') {
            if (isRestMethod(key)) {
                switch (key) {
                    case 'DELETE': case 'GET':
                        return () => this.httpClient.makeRequest(key, this.url);
                    case 'PATCH': case 'PUT': case 'POST':
                        return (body: any) => this.httpClient.makeRequest(key, this.url, body);
                }
            }

            return (param: any) => this.getProxy(location(this.stringifyParameter(param)), this.joinPath(this.stringifyParameter(param)));
        }

        return this.getProxy(location, this.joinPath(key));
    }

    private joinPath(key: string): string[] {
        return [...this.pathParts, key];
    }

    private getProxy(apiLocation: any, path: string[]): T {
        return new Proxy<T>({} as T, new ApiProxyHandler(this.baseUrl, this.httpClient, this.specification, apiLocation, path));
    }

    private stringifyParameter(param: any): string {
        return param instanceof Date ? param.toISOString() : String(param);
    }
}
