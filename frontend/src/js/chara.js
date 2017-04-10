/**
 * Created by sakharov on 10.04.17.
 */

var app = angular.module('charaApp', ['ngResource', 'ngAnimate', 'ui.router', "ct.ui.router.extras", 'ngMaterial', 'ngSanitize'])

    .config(function ($stateProvider, $urlRouterProvider, $stickyStateProvider, $resourceProvider, $httpProvider) {
        $httpProvider.interceptors.push('HTTPErrorInterceptor');
        $resourceProvider.defaults.stripTrailingSlashes = false;
        $stateProvider
            .state('user', {
                sticky: false,
                deepStateRedirect: true,
                url: "/user",
                views: {
                    'userv': {
                        templateUrl: "./templates/user/index.html",
                        controller: 'userCtrl'
                    }
                }
            })
            .state('task', {
                sticky: false,
                deepStateRedirect: true,
                url: "/task",
                views: {
                    'taskv': {
                        templateUrl: "./templates/task/index.html",
                        controller: 'taskCtrl'
                    }
                }
            })
            .state('tree', {
                sticky: false,
                deepStateRedirect: true,
                url: "/tree",
                views: {
                    'treev': {
                        templateUrl: "./templates/tree/index.html",
                        controller: 'treeCtrl'
                    }
                }
            });
            $urlRouterProvider.otherwise('user');
    })
   .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    })
    .factory('HTTPErrorInterceptor', function ($q) {
        return {
            responseError: function (rejection) {
                console.log(rejection);
                return $q.reject(rejection);
            }
        }
    })
    .run(function run($rootScope, $state, $stateParams, $http, $templateCache) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });