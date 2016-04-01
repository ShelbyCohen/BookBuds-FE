var appModule = angular.module('myApp', []);

appModule.controller('MainCtrl', ['mainService','$scope','$http',
        function(mainService, $scope, $http) {
            $scope.greeting = 'BookBuddaroos';
            $scope.token = null;
            $scope.error = null;
//            $scope.roleUser = false;
//            $scope.roleAdmin = false;
//            $scope.roleFoo = false;

            $scope.login = function() {
                $scope.error = null;
                mainService.login($scope.userName, $scope.password).then(function(token) {
                    $scope.token = token;
                    $http.defaults.headers.common.Authorization = 'Bearer ' + token;
                    //$scope.checkRoles();
                },
                function(error){
                    $scope.error = error
                    $scope.userName = '';
                });
            }

            $scope.checkRoles = function() {
                mainService.hasRole('user').then(function(user) {$scope.roleUser = user});
                mainService.hasRole('admin').then(function(admin) {$scope.roleAdmin = admin});
                mainService.hasRole('foo').then(function(foo) {$scope.roleFoo = foo});
            }

            $scope.logout = function() {
                $scope.userName = '';
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
            var data = "name="+username+"&password="+password;

            //var data = 'name='+username+'&password=ugh';
            
            //var data = "name="+username"&password="password;
            console.log(data)
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";


            return $http.post('http://localhost:8080/users/login', data ).then(function(response) {
                return response.data.token;
            });
            
            return $http.post('http://localhost:8080/users/login', data).then(function(response){
                $scope.myWelcome = response;
                return response.data.token;
            })
        },

        hasRole : function(role) {
            return $http.get('/api/role/' + role).then(function(response){
                console.log(response);
                return response.data;
            });
        }
    };
});
