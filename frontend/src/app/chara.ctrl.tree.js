/**
 * Created by sakharov on 10.04.17.
 */
export default class treeCtrl {
    constructor($rootScope, $scope, $location, $state, $http, $templateCache, Tree){
        console.log(Tree);
        this.tree = new Tree().resource();
    }
};


treeCtrl.$inject = ['$rootScope', '$scope', '$location', '$state', '$http', '$templateCache', 'Tree'];