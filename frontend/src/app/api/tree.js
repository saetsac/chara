'use strict';

export default class Tree {
    'ngInject';
    constructor($resource, ResponseInterceptor) {
        return function() {
            let inter = new ResponseInterceptor();

            return new $resource('/api/v1/tree/:id/', {id: "@id"}, {
            get: {method: 'GET', interceptor: inter.error_intercept},
            save: {
                method: 'POST',
                interceptor: inter.full_intercept,
                url: '/api/v1/tree/'
            },
            delete: {
                method: 'DELETE',
                interceptor: inter.full_intercept
            },
            update: {method: 'PUT', interceptor: inter.full_intercept},
            fetch: {
                method: 'GET',
                interceptor: inter.error_intercept,
                url: '/api/v1/tree/',
                isArray: true
            }
        })};
    };
}

export var __useDefault = true;
