/**
 * Created by sakharov on 10.04.17.
 */
'use strict';


export default class taskCtrl{
    'ngInject';
    constructor($rootScope, $scope, $location, $state, $http, $templateCache, Task) {
        this.res = new Task();
        this.list = this.res.fetch();
    }
};
