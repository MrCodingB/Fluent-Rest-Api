import { Api, ApiSpecification } from 'fluent-rest-api';
import { HttpService } from './http.service';

const apiSpecification: ApiSpecification = {
    'farmers': {
        GET: Api.endpoint<'GET', { id: string; }[]>(),
        POST: Api.endpoint<'POST', string>(),
        DELETE: Api.endpoint<'DELETE'>(),
        'id': Api.param('string', {
            GET: Api.endpoint<'GET', { id: string; }>(),
            DELETE: Api.endpoint<'DELETE'>()
        })
    }
};

const api = Api.create('/api', new HttpService(), apiSpecification);

api.farmers.GET();
api.farmers.POST('12345');
api.farmers.id('1200').GET();
api.farmers.id('88237').DELETE();
