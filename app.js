var appModule = angular.module('myApp', []);

appModule.controller('MainCtrl', ['mainService','$scope','$http',
        function(mainService, $scope, $http) {
            $scope.greeting = 'Welcome to BookBuds';
            $scope.tagline = 'Books are better with Buds'
            $scope.token = null;
            $scope.error = null;

            $scope.login = function() {
                $scope.error = null;
                mainService.login($scope.username, $scope.password).then(function(token) {
                    $scope.token = token;
                    $http.defaults.headers.common.Authorization = 'Bearer ' + token;
                },
                function(error){
                    $scope.error = error
                    $scope.username = '';
                    $scope.password = '';
                });
            }

            $scope.logout = function() {
                $scope.username = '';
                $scope.password = '';
                $scope.token = null;
                $http.defaults.headers.common.Authorization = '';
            }

            $scope.loggedIn = function() {
                return $scope.token !== null;
            }
        } ]);



appModule.service('mainService', function($http) {
    return {
        login : function(username, password) {
            return $http.post('/user/login', {username, password}).then(function(response) {
                return response.data.token;
            });
        },
    };
});
