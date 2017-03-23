var app = angular.module('animalsApp', []).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});

app.controller('ShowAnimalController', function ($scope, $http) {

    $scope.sightings = [];

    $scope.init = function () {
        $http({
            method: 'GET',
            url: '/api/animals/' + window.animal_id + '/sightings'
        }).then(function (data) {
            $scope.sightings = data.data;
        });
    };

    $scope.init();
});
