/**
 * Created by sakharov on 10.04.17.
 */
export default class treeCtrl {
    'ngInject';
    constructor($rootScope, $scope, $location, $state, $http, $templateCache, Tree){
        this.tree = new Tree();
        this.list = this.tree.fetch();
    }
};