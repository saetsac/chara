/**
 * Created by sakharov on 10.04.17.
 */
const angular = require('angular');
const ngAnimate = require("angular-animate");
const ngMaterial = require("angular-material");
const ngResource = require("angular-resource");
const ngSanitize = require("angular-sanitize");
const ngUIRouter = require('angular-ui-router');

require("ui-router-extras");
const ngUIRouterExtras = 'ct.ui.router.extras';

import userCtrl from './chara.ctrl.user.js';
import taskCtrl from './chara.ctrl.task.js';
import treeCtrl from  './chara.ctrl.tree.js';
import config from './chara.config.js'
import api from './api'


export default angular.module('charaApp', [ngResource, ngAnimate, ngUIRouter, ngUIRouterExtras, ngMaterial, ngSanitize, api.name])
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
    .config(config)
    .controller('userCtrl', userCtrl)
    .controller('taskCtrl', taskCtrl)
    .controller('treeCtrl', treeCtrl)
    .run(function run($rootScope, $state, $stateParams, $http, $templateCache) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });
