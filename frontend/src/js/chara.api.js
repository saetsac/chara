/**
 * Created by sakharov on 10.04.17.
 */
app
    .factory('FullResponseInterceptor', ['$mdToast', function ($mdToast) {
        function resourceErrorHandler(response) {
            $mdToast.show({
                template: `<md-toast>
                            <span class="md-toast-text" flex>${response.data}</span>
                            <md-button class="md-highlight">Error</md-button>
                            </md-toast>`,
                position: 'top right',
                parent: document.body,
                hideDelay: 3000
            });
        }

        function resourceHandler(response) {
            $mdToast.show({
                template: `<md-toast><span class="md-toast-text" flex>${response.data}</span></md-toast>`,
                position: 'top right',
                parent: document.body,
                hideDelay: 3000
            });
        }

        return {response: resourceHandler, responseError: resourceErrorHandler}
    }])
     .factory('ErrorResponseInterceptor', ['$mdToast', function ($mdToast) {
        function resourceErrorHandler(response) {
            $mdToast.show({
                template: `<md-toast>
                            <span class="md-toast-text" flex>${response.data}</span>
                            <md-button class="md-highlight">Error</md-button>
                            </md-toast>`,
                position: 'top right',
                parent: document.body,
                hideDelay: 3000
            });
        }

        return {responseError: resourceErrorHandler}
    }])
    .factory('Tree', ['$resource', 'FullResponseInterceptor', 'ErrorResponseInterceptor', function ($resource, FullResponseInterceptor, ErrorResponseInterceptor) {

        res = $resource('/api/v1/tree/:id/', {id: "@id"},
            {
                get: {method: 'GET', interceptor: ErrorResponseInterceptor},
                save: {
                    method: 'POST',
                    interceptor: FullResponseInterceptor,
                    url: '/api/v1/tree/'
                },
                delete: {
                    method: 'DELETE',
                    interceptor: FullResponseInterceptor
                },
                update: {method: 'PUT', interceptor: FullResponseInterceptor},
                fetch: {
                    method: 'GET',
                    interceptor: ErrorResponseInterceptor,
                    url: '/api/v1/tree/',
                    isArray: true
                }
            });

        return res
    }])
     .factory('Task', ['$resource', 'FullResponseInterceptor', 'ErrorResponseInterceptor', function ($resource, FullResponseInterceptor, ErrorResponseInterceptor) {

         res = $resource('/api/v1/tree/:id/', {id: "@id"},
            {
                get: {method: 'GET', interceptor: ErrorResponseInterceptor},
                save: {
                    method: 'POST',
                    interceptor: FullResponseInterceptor,
                    url: '/api/v1/tree/'
                },
                delete: {
                    method: 'DELETE',
                    interceptor: FullResponseInterceptor
                },
                update: {method: 'PUT', interceptor: FullResponseInterceptor},
                fetch: {
                    method: 'GET',
                    interceptor: ErrorResponseInterceptor,
                    url: '/api/v1/tree/',
                    isArray: true
                }
            });

        return res
    }]);