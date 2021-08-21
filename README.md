# Fluent Rest Api

This package provides a typesafe fluent API to make rest-requests.

## Example

```typescript
import { Api } from 'fluent-rest-api';
import { HttpService } from 'http-client-implementation';

const api = Api.create('/api', new HttpService(), {
  users: {
    GET: Api.endpoint<'GET', string[]>(),
    POST: Api.endpoint<'POST', { name: string }>(),
    id: Api.param('string', {
      GET: Api.endpoint<'GET', { id: string; name: string }>(),
      DELETE: Api.endpoint<'DELETE'>()
    })
  }
});

await api.users.POST({ name: 'Charles Dickens' });

const userIds = await api.users.GET();
const user = await api.users.id(userIds[0]).GET();
await api.users.id(user.id).DELETE();
```

# Documentation

Api path sections (parameters and api object keys) will be encoded with `encodeURIComponent()`.

## Api

- `Api.create`

  Create a new api.

  Parameters:

  - `baseUrl` The base url of the api. Does not need a trailing `"/"`.
  - `httpClient` An implementation of the [`IHttpClient`](#IHttpClient) interface.
  - `specification` Your api represented as a JavaScript object.

- `Api.endpoint`

  See [Endpoints](#Endpoints).

- `Api.param`

  See [Parameters](#Parameters).

## IHttpClient

This has to be provided to the api in order for it to make requests.

```typescript
export interface IHttpClient {
  makeRequest<
    TMethod extends RestMethod,
    TResult extends ApiResult<TMethod> = ApiDefaultResult<TMethod>
  >(
    method: TMethod,
    url: string
  ): Promise<TResult>;

  makeRequest<
    TMethod extends RestMethod,
    TBody extends ApiBody<TMethod> = ApiBody<TMethod>,
    TResult extends ApiResult<TMethod> = ApiDefaultResult<TMethod>
  >(
    method: TMethod,
    url: string,
    body: TBody
  ): Promise<TResult>;
}
```

## Endpoints

This defines an endpoint for your api object. Endpoints must have equivalent keys to their rest method (e.g. `GET` endpoints will have to have the key `GET`).

- **GET**

```typescript
Api.endpoint<'GET', ResultType = any>():
    () => Promise<ResultType>
```

- **PUT**

```typescript
Api.endpoint<'PUT', BodyType = any, ResultType = void>():
    (body: BodyType) => Promise<ResultType>
```

- **POST**

```typescript
Api.endpoint<'POST', BodyType = any, ResultType = void>():
    (body: BodyType) => Promise<ResultType>
```

- **PATCH**

```typescript
Api.endpoint<'PATCH', BodyType = any, ResultType = void>():
    (body: BodyType) => Promise<ResultType>
```

- **DELETE**

```typescript
Api.endpoint<'DELETE', ResultType = void>():
    () => Promise<ResultType>
```

## Parameters

Parameters require a type and the trailing api. All parameters except `date` will be inserted to the url by invoking the `String` constructor.

Valid types:

- `'string'`

- `'number'`

- `'boolean'`

- `'date'` This will require a `Date` object and will be formatted to an ISO date string

```typescript
Api.param('string', {
    GET: Api.endpoint<'GET', { id: string; name: string }>(),
    DELETE: Api.endpoint<'DELETE'>()
})
```
