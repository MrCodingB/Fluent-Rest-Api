const REST_METHODS = [ 'GET', 'PATCH', 'PUT', 'POST', 'DELETE' ] as const;

export type RestMethod = typeof REST_METHODS[number];

export function isRestMethod(value: any): value is RestMethod {
    return typeof value === 'string' && REST_METHODS.includes(value as RestMethod);
}
