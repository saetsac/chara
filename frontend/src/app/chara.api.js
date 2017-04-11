/**
 * Created by sakharov on 10.04.17.
 */
import angular from 'angular';
import ngResource from "angular-resource"
import ngMaterial from "angular-material"

class ResponseInterceptor {
    constructor($mdToast, $resource) {
        this.resourceErrorHandler = function (response) {
            $mdToast.show({
                template: `<md-toast>
                            <span class="md-toast-text" flex>${response.data}</span>
                            <md-button class="md-highlight">Error</md-button>
                            </md-toast>`,
                position: 'top right',
                parent: document.body,
                hideDelay: 3000
            });
        };
        this.resourceHandler = function (response) {
            $mdToast.show({
                template: `<md-toast><span class="md-toast-text" flex>${response.data}</span></md-toast>`,
                position: 'top right',
                parent: document.body,
                hideDelay: 3000
            });
        };

        this.full_intercept = {
            response: this.resourceHandler,
            responseError: this.resourceErrorHandler
        };
        this.error_intercept = {responseError: this.resourceErrorHandler};
        this.$resource = $resource;
    }
}

ResponseInterceptor.$inject = ['$mdToast', '$resource'];

class Tree extends ResponseInterceptor {
    get resource() {
        return this.$resource('/api/v1/tree/:id/', {id: "@id"},
            {
                get: {method: 'GET', interceptor: this.error_intercept},
                save: {
                    method: 'POST',
                    interceptor: this.full_intercept,
                    url: '/api/v1/tree/'
                },
                delete: {
                    method: 'DELETE',
                    interceptor: this.full_intercept
                },
                update: {method: 'PUT', interceptor: this.full_intercept},
                fetch: {
                    method: 'GET',
                    interceptor: this.error_intercept,
                    url: '/api/v1/tree/',
                    isArray: true
                }
            })
    };
}

class Task extends ResponseInterceptor {
    get resource() {
        return this.$resource('/api/v1/task/:id/', {id: "@id"},
            {
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
            })
    };
}

export default angular.module('api', [ngResource, ngMaterial])
    .service('Task', Task)
    .service('Tree', Tree)
