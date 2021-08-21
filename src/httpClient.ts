import { RestMethod } from './restMethod';
import { ApiBody, ApiDefaultResult, ApiResult } from './types';

export interface IHttpClient {
    makeRequest<
        TMethod extends RestMethod,
        TResult extends ApiResult<TMethod> = ApiDefaultResult<TMethod>
    >(method: TMethod, url: string): Promise<TResult>;
    makeRequest<
        TMethod extends RestMethod,
        TBody extends ApiBody<TMethod> = ApiBody<TMethod>,
        TResult extends ApiResult<TMethod> = ApiDefaultResult<TMethod>
    >(method: TMethod, url: string, body: TBody): Promise<TResult>;
}
