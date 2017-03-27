app.controller('SpeciesController', function ($scope, $http) {

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
