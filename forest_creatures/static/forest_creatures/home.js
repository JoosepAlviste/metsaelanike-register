var app = angular.module('animalsApp', []).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});

app.controller('HomeController', function ($scope, $http) {

    $scope.species = [];
    $scope.activeSpecies = null;
    $scope.activeSpeciesAnimals = [];

    $scope.init = function () {
        $http({
            method: 'GET',
            url: '/api/animals/species'
        }).then(function (data) {
            $scope.species = data.data;
            console.log($scope.species);
        });
    };

    $scope.selectSpecies = function (index) {
        $scope.activeSpecies = $scope.species[index];
        $http({
            method: 'GET',
            url: '/api/animals/species/' + $scope.activeSpecies.id + '/animals'
        }).then(function (data) {
            $scope.activeSpeciesAnimals = data.data;
            console.log(data.data);
        });
    };

    $scope.init();
});
