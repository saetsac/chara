/**
 * Created by sakharov on 10.04.17.
 */
export default class taskCtrl {
    constructor($rootScope, $scope, $location, $state, $http, $templateCache, Task) {
        this.task = new Task().resource();
    }
};

taskCtrl.$inject = ['$rootScope', '$scope', '$location', '$state', '$http', '$templateCache', 'Task'];