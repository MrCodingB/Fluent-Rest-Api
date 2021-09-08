import { ApiProxyHandler } from './apiProxyHandler';
import { IHttpClient } from './httpClient';
import { RestMethod } from './restMethod';
import { ApiBody, ApiDefaultResult, ApiEndpoint, ApiParameter, ApiResult, ApiSpecification, RouteParams } from './types';

export abstract class Api {
    public static endpoint<
        K extends 'GET' | 'DELETE',
        TResult extends ApiResult<K> = ApiDefaultResult<K>
    >(): ApiEndpoint<K, TResult, ApiBody<K>>;
    public static endpoint<
        K extends 'PATCH' | 'PUT' | 'POST',
        TBody extends ApiBody<K> = ApiBody<K>,
        TResult extends ApiResult<K> = ApiDefaultResult<K>
    >(): ApiEndpoint<K, TResult, TBody>;
    public static endpoint<K extends RestMethod>(): ApiEndpoint<K, any, any> {
        return () => new Promise<any>((resolve) => resolve({}));
    }

    public static param
        <K extends keyof RouteParams, TApi extends ApiSpecification>
        (type: K, api: TApi): ApiParameter<RouteParams[K], TApi> {
        return () => api;
    }

    public static create<T extends ApiSpecification>(baseUrl: string, httpClient: IHttpClient, specification: T): T {
        return ApiProxyHandler.getProxy<T>(baseUrl, httpClient, specification);
    }
}
