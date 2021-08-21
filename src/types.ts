import { RestMethod } from './restMethod';

type ApiArgs = {
    GET: {
        body: undefined;
        resultConstrait: any;
        defaultResult: any;
    },
    PATCH: {
        body: any;
        resultConstrait: any;
        defaultResult: void;
    },
    PUT: {
        body: any;
        resultConstrait: any;
        defaultResult: void;
    },
    POST: {
        body: any;
        resultConstrait: any;
        defaultResult: void;
    },
    DELETE: {
        body: undefined;
        resultConstrait: any;
        defaultResult: void;
    };
};

export type ApiBody<TMethod extends RestMethod> = ApiArgs[TMethod]['body'];
export type ApiResult<TMethod extends RestMethod> = ApiArgs[TMethod]['resultConstrait'];
export type ApiDefaultResult<TMethod extends RestMethod> = ApiArgs[TMethod]['defaultResult'];

export type ApiEndpoint<TMethod extends RestMethod, TResult extends ApiResult<TMethod>, TBody extends ApiBody<TMethod>> = TBody extends void
    ? () => Promise<TResult>
    : (body: TBody) => Promise<TResult>;

export type ApiEndpoints = { [TMethod in RestMethod]?: ApiEndpoint<TMethod, ApiResult<TMethod>, ApiBody<TMethod>> };

export type ApiSpecification = { [urlPart: string]: ApiSpecification; } | ApiEndpoints;

export type RouteParams = {
    'string': string,
    'number': number,
    'boolean': boolean,
    'date': Date;
};
