/**
 * Created by sakharov on 12.04.17.
 */

class Intercept {
    constructor(full, error, $mdToast){
        this.full = full;
        this.error = error;
        this.$mdToast = $mdToast;
    }
}

export default class ResponseInterceptor {
    'ngInject';
    constructor($mdToast) {
        let full_intercept = {
            response: this.resourceHandler,
            responseError: this.resourceErrorHandler
        };
        let error_intercept = {responseError: this.resourceErrorHandler};
        this.$mdToast = $mdToast;
        return () => new Intercept(full_intercept, error_intercept, $mdToast);
    }

    resourceErrorHandler(response) {
        this.$mdToast.show({
            template: `<md-toast>
                        <span class="md-toast-text" flex>${response.data}</span>
                        <md-button class="md-highlight">Error</md-button>
                        </md-toast>`,
            position: 'top right',
            parent: document.body,
            hideDelay: 3000
        });
    };

    resourceHandler(response) {
        this.$mdToast.show({
            template: `<md-toast><span class="md-toast-text" flex>${response.data}</span></md-toast>`,
            position: 'top right',
            parent: document.body,
            hideDelay: 3000
        });
    };
}

export var __useDefault = true;