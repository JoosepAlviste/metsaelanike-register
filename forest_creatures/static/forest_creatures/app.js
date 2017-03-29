var app = angular.module('animalsApp', ['ngRoute', 'ngMaterial'])
    .config(function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');
    })
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider
            .hashPrefix('');
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/animals', {
                templateUrl: '/animals/templates/animals/',
                controller: 'AnimalListController',
                activeLink: 'animals'
            })
            .when('/animals/add', {
                templateUrl: '/animals/templates/add',
                controller: 'AnimalAddController',
                controllerAs: 'AnimalAddController',
                activeLink: 'animals'
            })
            .when('/animals/:id', {
                templateUrl: '/animals/templates/one_animal/',
                controller: 'OneAnimalController'
            })
            .when('/animals/:id/edit', {
                templateUrl: '/animals/templates/edit/',
                controller: 'AnimalEditController'
            })
            .when('/species', {
                templateUrl: '/animals/templates/species/',
                controller: 'SpeciesListController',
                activeLink: 'species'
            })
            .when('/species/:id', {
                templateUrl: '/animals/templates/one_species/',
                controller: 'OneSpeciesController'
            })
            .when('/locations', {
                templateUrl: '/animals/templates/locations/',
                controller: 'LocationListController',
                activeLink: 'locations'
            })
            .when('/locations/:id', {
                templateUrl: '/animals/templates/one_location/',
                controller: 'OneLocationController'
            })
            .when('/search', {
                templateUrl: '/animals/templates/search/',
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
            url: '/api/animals/'
        }).then(function (data) {
            $scope.animals = data.data;
        });
    };

    $scope.selectAnimal = function (index) {
        $scope.activeAnimal = $scope.animals[index];
    };

    $scope.init();
});


app.controller('OneAnimalController', function ($scope, $http, $routeParams) {

    $scope.animal = null;
    $scope.sightings = [];

    $scope.init = function () {
        $http({
            method: 'GET',
            url: '/api/animals/' + $routeParams.id + '/'
        }).then(function (data) {
            $scope.animal = data.data;
        });
        $http({
            method: 'GET',
            url: '/api/animals/' + $routeParams.id + '/sightings/'
        }).then(function (data) {
            $scope.sightings = data.data;
        });
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
            url: '/api/animals/species/'
        }).then(function (data) {
            $scope.species = data.data;
        });
    };

    $scope.selectSpecies = function (index) {
        $scope.activeAnimal = $scope.species[index];
    };

    $scope.init();
});


app.controller('OneSpeciesController', function ($scope, $http, $routeParams) {

    $scope.species = null;
    $scope.speciesAnimals = [];

    $scope.init = function () {
        $http({
            method: 'GET',
            url: '/api/animals/species/' + $routeParams.id + '/'
        }).then(function (data) {
            $scope.species = data.data;
        });

        $http({
            method: 'GET',
            url: '/api/animals/species/' + $routeParams.id + '/animals/'
        }).then(function (data) {
            $scope.speciesAnimals = data.data;
        });
    };

    $scope.selectSpecies = function (index) {

    };

    $scope.init();
});


app.controller('LocationListController', function ($scope, $http) {

    $scope.locations = []

    $scope.init = function () {
        $http({
            method: 'GET',
            url: '/api/locations/'
        }).then(function (data) {
            $scope.locations = data.data;
        });
    };

    $scope.init();
});


app.controller('OneLocationController', function ($scope, $http, $routeParams) {

    $scope.location = null;
    $scope.locationSightings = [];

    $scope.init = function () {
        $http({
            method: 'GET',
            url: '/api/locations/' + $routeParams.id + '/'
        }).then(function (data) {
            $scope.location = data.data;
            $scope.locationSightings = data.data.sightings;
        });
    };

    $scope.init();
});


app.controller('SearchController', function ($scope, $http) {

});

app.controller('AnimalEditController', function ($scope, $http, $routeParams) {

    $scope.animal = null;
    $scope.sightings = [];

    $scope.init = function () {
        $http({
            method: 'GET',
            url: '/api/animals/' + $routeParams.id + '/'
        }).then(function (data) {
            $scope.animal = data.data;
        });
        $http({
            method: 'GET',
            url: '/api/animals/' + $routeParams.id + '/sightings/'
        }).then(function (data) {
            $scope.sightings = data.data;
        });
    };

    $scope.saveAnimal = function () {
        $http({
            method: 'PUT',
            url: '/api/animals/' + $routeParams.id + '/',
            data: {
                'name': $scope.animal.name
            }
        }).then(function (data) {
            console.log(data);
        });
    };

    $scope.deleteAnimal = function () {

    };

    $scope.init();

});


app.controller('AnimalAddController', function ($scope, $http, $q, $location) {

    var $self = this;

    $scope.animal = {};

    $self.simulateQuery = true;
    $self.species = [];
    $self.noCache = true;
    $self.selectedItem = null;
    $self.searchText = null;

    $self.selectedItemChange = function (item) {
        $scope.animal.species_id = item.value;
    };

    $self.querySearch = function (keyword) {
        var result = keyword ? $self.species.filter(function (species) {
            return species.display.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        }) : $self.species,
            deferred;

        deferred = $q.defer();
        deferred.resolve( result );

        return deferred.promise;
    };

    $self.createNewSpecies = function (name) {
        $http({
            method: 'POST',
            url: '/api/animals/species/',
            data: {
                name: name
            }
        }).then(function (data) {
            $self.species.push({
                value: data.data.id,
                display: data.data.name
            });
        });
    };

    $self.loadAllSpecies = function () {
        $http({
            method: 'GET',
            url: '/api/animals/species/'
        }).then(function (data) {
            $self.species = data.data.map(function (species) {
                return {
                    value: species.id,
                    display: species.name
                };
            });
        });
    };

    $scope.saveAnimal = function () {
        $http({
            method: 'POST',
            url: '/api/animals/',
            data: $scope.animal
        }).then(function (data) {
            $location.path('/animals/' + data.data.id);
        });
    };

    $self.loadAllSpecies();
});
