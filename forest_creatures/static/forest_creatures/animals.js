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
