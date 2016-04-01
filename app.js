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
                    console.log("token="+token);
                    $http.defaults.headers.common.Authorization = 'Bearer ' + token;
                    //$scope.checkRoles();
                },
                function(error){
                    $scope.error = error;
                    $scope.userName = '';
                    $scope.password = '';
                });
            }
            $scope.createAccount = function() {
                $scope.error = null;
                mainService.createAccount($scope.userName, $scope.password, $scope.question, $scope.answer).then(function(token){
                    $scope.token = token;
                    console.log("token="+token);
                    
                    $http.defaults.headers.common.Autorization = 'Bearer ' + token;
                },
				function(error){
					$scope.error = error;
					$scope.userName = '';
					$scope.password = '';
					$scope.question = '';
					$scope.answer = '';
                });
            }

          

            $scope.logout = function() {
                $scope.userName = '';
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
            var data = "name="+username+"&password="+password;

            //var data = 'name='+username+'&password=ugh';
            
            //var data = "name="+username"&password="password;
            console.log(data)
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";


            return $http.post('http://localhost:8080/users/login', data).then(function(response) {
                return response.data.token;
            });
            
            return $http.post('http://localhost:8080/users/login', data).then(function(response){
                $scope.myWelcome = response;
                return response.data.token;
            })
        },
		
		createAccount : function(username, password, question, answer) {
            var data = "name="+username+"&password="+password+"&question="+question+"answer="+answer;
			
			console.log(data)
            $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";


            return $http.post('http://localhost:8080/users/login', data).then(function(response) {
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
