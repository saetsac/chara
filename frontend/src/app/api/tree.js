'use strict';

export default class Tree {
    'ngInject';
    constructor($resource, ResponseInterceptor) {
        return function() {
            let inter = new ResponseInterceptor();

            return new $resource('/api/v1/tree/:id/', {id: "@id"}, {
            get: {method: 'GET', interceptor: inter.error},
            save: {
                method: 'POST',
                interceptor: inter.full,
                url: '/api/v1/tree/'
            },
            delete: {
                method: 'DELETE',
                interceptor: inter.full
            },
            update: {method: 'PUT', interceptor: inter.full},
            fetch: {
                method: 'GET',
                interceptor: inter.error,
                url: '/api/v1/tree/',
                isArray: true
            }
        })};
    };
}

export var __useDefault = true;
