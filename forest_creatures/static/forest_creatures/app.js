var app = angular.module('animalsApp', ['ngRoute'])
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');
    })
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider
            .hashPrefix('');
    }])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/animals', {
                templateUrl: '/animals/templates/animals',
                controller: 'AnimalListController',
                activeLink: 'animals'
            })
            .when('/species', {
                templateUrl: '/animals/templates/species',
                controller: 'SpeciesListController',
                activeLink: 'species'
            })
            .when('/locations', {
                templateUrl: '/animals/templates/locations',
                controller: 'LocationListController',
                activeLink: 'locations'
            })
            .when('/search', {
                templateUrl: '/animals/templates/search',
                controller: 'SearchController',
                activeLink: 'search'
            })
            .otherwise({
                redirectTo: '/search'
            });
    }]);


app.controller('AppController', function ($scope, $route) {

    $scope.$route = $route;
});


app.controller('AnimalListController', function ($scope, $http) {

    $scope.animals = [];
    $scope.activeAnimal = null;

    $scope.init = function () {
        $http({
            method: 'GET',
            url: '/api/animals'
        }).then(function (data) {
            $scope.animals = data.data;
        });
    };

    $scope.selectAnimal = function (index) {
        $scope.activeAnimal = $scope.animals[index];
    };

    $scope.init();
});


app.controller('SpeciesListController', function ($scope, $http) {

    $scope.species = [];
    $scope.activeAnimal = null;
    $scope.activeSpeciesAnimals = [];

    $scope.init = function () {
        $http({
            method: 'GET',
            url: '/api/animals/species'
        }).then(function (data) {
            $scope.species = data.data;
        });
    };

    $scope.selectSpecies = function (index) {
        $scope.activeAnimal = $scope.species[index];
    };

    $scope.init();
});


app.controller('LocationListController', function ($scope, $http) {

});


app.controller('SearchController', function ($scope, $http) {

});
