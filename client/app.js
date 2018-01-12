var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {

    $routeProvider
        .when('/users', {
            controller: 'usersController',
            templateURL: '/index.html'
        })
        .when('/users/add', {
            controller: 'usersController',
            templateURL: '/addUser.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});