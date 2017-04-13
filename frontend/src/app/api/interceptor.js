/**
 * Created by sakharov on 12.04.17.
 */

class resourceErrorHandler {
    constructor($mdToast){
        this.mdToast = $mdToast;
    }

    serve(response) {
        this.mdToast.show({
            template: `<md-toast>
                        <span class="md-toast-text" flex>${response.data}</span>
                        <md-button class="md-highlight">Error</md-button>
                        </md-toast>`,
            position: 'top right',
            parent: document.body,
            hideDelay: 3000
        });
    };
}

class resourceHandler{
    constructor($mdToast){
        this.mdToast = $mdToast;
    }

    serve(response) {
      this.mdToast.show({
            template: `<md-toast><span class="md-toast-text" flex>${response.data}</span></md-toast>`,
            position: 'top right',
            parent: document.body,
            hideDelay: 3000
    });
    };
}

export default class ResponseInterceptor {
    'ngInject';
    constructor($mdToast) {
        this.full_intercept = {
            response: (resp) => new resourceHandler($mdToast).serve(resp),
            responseError: (resp) => new resourceErrorHandler($mdToast).serve(resp)
        };
        this.error_intercept = {responseError: (resp) => new resourceErrorHandler($mdToast).serve(resp)};
        this.mdToast = $mdToast;
        return () => this;
    }
}

export var __useDefault = true;