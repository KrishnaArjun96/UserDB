var myApp = angular.module('myApp');

myApp.controller('usersController', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
    
    $scope.getUsers = function () {
        $http.get('/users').then(function (response) {
            $scope.users = response.data;
        });
    }
    $scope.deleteUser = function (SSN) {
        $http.delete('/users/' + SSN).then(function (response) {
            for (var i = 0; i < $scope.users.length; i++) {
                if (SSN === $scope.users[i].SSN) {
                    $scope.users.splice(i, 1);
                }
            }
        });
    }

    $scope.addUser = function () {
        $http.post('/users', $scope.user).then(function (response) {
            $scope.user = {};
        });
    }

}]);
