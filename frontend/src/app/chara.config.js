export default /*@ngInject*/ function config($stateProvider, $urlRouterProvider, $stickyStateProvider, $resourceProvider, $httpProvider) {
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
};