'use strict';

export default class Task {
    'ngInject';
    constructor($resource, ResponseInterceptor) {
        return () => new $resource('/api/v1/task/:id/', {id: "@id"}, {
            get: {method: 'GET', interceptor: this.error_intercept},
            save: {
                method: 'POST',
                interceptor: this.full_intercept,
                url: '/api/v1/task/'
            },
            delete: {
                method: 'DELETE',
                interceptor: this.full_intercept
            },
            update: {method: 'PUT', interceptor: this.full_intercept},
            fetch: {
                method: 'GET',
                interceptor: this.error_intercept,
                url: '/api/v1/task/',
                isArray: true
            }
        });
    };
}

export var __useDefault = true;
