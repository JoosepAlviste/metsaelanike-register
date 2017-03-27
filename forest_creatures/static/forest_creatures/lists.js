var app = angular.module('animalsApp', []).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});

app.controller('TabController', function ($scope, $http) {

    $scope.activeTab = null;

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
        $http({
            method: 'GET',
            url: '/api/animals/species/' + $scope.activeAnimal.id + '/animals'
        }).then(function (data) {
            $scope.activeSpeciesAnimals = data.data;
        });
    };

    $scope.init();
});
