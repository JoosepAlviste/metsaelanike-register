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
                controller: 'OneAnimalController',
                activeLink: 'animals'
            })
            .when('/animals/:id/edit', {
                templateUrl: '/animals/templates/edit/',
                controller: 'AnimalEditController',
                controllerAs: 'AnimalEditController',
                activeLink: 'animals'
            })
            .when('/species', {
                templateUrl: '/animals/templates/species/',
                controller: 'SpeciesListController',
                activeLink: 'species'
            })
            .when('/species/:id', {
                templateUrl: '/animals/templates/one_species/',
                controller: 'OneSpeciesController',
                activeLink: 'species'
            })
            .when('/locations', {
                templateUrl: '/animals/templates/locations/',
                controller: 'LocationListController',
                activeLink: 'locations'
            })
            .when('/locations/:id', {
                templateUrl: '/animals/templates/one_location/',
                controller: 'OneLocationController',
                activeLink: 'locations'
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


app.controller('AnimalEditController', function ($scope, $http, $q, $routeParams, $location, $timeout) {

    var $self = this;

    $scope.sightings = [];
    $scope.animal = {};
    $scope.errors = {};

    $self.simulateQuery = true;
    $self.species = [];
    $self.locations = [];
    $self.noCache = true;
    $self.selectedItem = null;
    $self.selectedItemLocationList = [];
    $self.searchText = null;
    $self.searchTextLocationList = [];

    $self.selectedItemChange = function (item) {
        if (typeof item !== 'undefined' && item !== null) {
            if ($scope.animal.species === null) {
                $scope.animal.species = {
                    id: item.value
                };
            } else {
                $scope.animal.species.id = item.value;
            }
        }
    };
    $self.selectedItemChangeLocation = function (item, index) {
        if (typeof item !== 'undefined') {
            $scope.sightings[index].location.id = item.value;
            $scope.sightings[index].location.name = item.display;
        }
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
    $self.querySearchLocation = function (keyword) {
        var result = keyword ? $self.locations.filter(function (locations) {
            return locations.display.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        }) : $self.locations,
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
    $self.createNewLocation = function (name) {
        $http({
            method: 'POST',
            url: '/api/locations/',
            data: {
                name: name
            }
        }).then(function (data) {
            $self.locations.push({
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
    $self.loadAllLocations = function () {
        $http({
            method: 'GET',
            url: '/api/locations/'
        }).then(function (data) {
            $self.locations = data.data.map(function (location) {
                return {
                    value: location.id,
                    display: location.name
                };
            });
        });
    };


    $scope.init = function () {
        $http({
            method: 'GET',
            url: '/api/animals/' + $routeParams.id + '/'
        }).then(function (data) {
            $scope.animal = data.data;
            $self.selectedItem = {
                'value': $scope.animal.species.id,
                'display': $scope.animal.species.name
            };
        });
        $http({
            method: 'GET',
            url: '/api/animals/' + $routeParams.id + '/sightings/'
        }).then(function (data) {
            $scope.sightings = data.data;
            angular.forEach($scope.sightings, function(entry, index) {
                $self.selectedItemLocationList[index] = entry.location.name;
            })
        });
    };

    $scope.saveEditedAnimal = function () {
        var $sightingsInfo = [];
        angular.forEach($scope.sightings, function (entry, key) {
            if (typeof entry.id === 'undefined') {
                $sightingsInfo.push({
                    'location_id': entry.location.id,
                    'time': entry.time
                });
            } else {
                $sightingsInfo.push({
                    'id': entry.id,
                    'location_id': entry.location.id,
                    'time': entry.time
                });
            }
        });
        $http({
            method: 'PUT',
            url: '/api/animals/' + $routeParams.id + '/',
            data: {
                'name': $scope.animal.name,
                'species_id': $scope.animal.species.id,
                'sightings': $sightingsInfo
            }
        }).then(function (data) {
            $location.path('/animals/' + $routeParams.id + '/');
        }).catch(function (error) {
            $scope.errors = error.data;
        });
    };

    $scope.deleteAnimal = function () {
        $http({
            method: 'DELETE',
            url: '/api/animals/' + $routeParams.id + '/'
        }).then(function (data) {
            $location.path('/animals');
        });
    };

    $scope.addSightingInput = function () {
        $scope.sightings.push({
            location: {},
            "new": true
        });
        $timeout(function() {
            document.body.scrollTop = document.body.scrollHeight;
        }, 0, false);
    };

    $scope.deleteSighting = function (index) {
        $scope.sightings.splice(index, 1);
    };

    $scope.hasErrors = function (field, index, listField) {
        var hasFieldError = $scope.errors.hasOwnProperty(field);

        if (hasFieldError && typeof index !== 'undefined') {
            if ($scope.errors[field].length >= index) {
                hasFieldError = $scope.errors[field][index].hasOwnProperty(listField)
                    && $scope.errors[field][index][listField].length > 0;
            } else {
                hasFieldError = false;
            }
        } else if (hasFieldError) {
            hasFieldError = $scope.errors[field].length > 0;
        }

        return hasFieldError;
    };

    $scope.getError = function (field, index, listField) {

        if ($scope.hasErrors(field, index, listField)) {
            if (typeof index !== 'undefined') {
                return $scope.errors[field][index][listField][0];
            }
            return $scope.errors[field][0];
        }
        return '';
    };

    $scope.clearErrors = function (field, index, listField) {
        console.log($scope.errors);
        if (typeof index !== 'undefined') {
            $scope.errors[field][index][listField] = [];
        } else {
            $scope.errors[field] = [];
        }
        console.log($scope.errors);
    };

    $scope.init();
    $self.loadAllSpecies();
    $self.loadAllLocations();
});


app.controller('AnimalAddController', function ($scope, $http, $q, $location) {

    var $self = this;

    $scope.animal = {};
    $scope.errors = {};

    $self.simulateQuery = true;
    $self.species = [];
    $self.noCache = true;
    $self.selectedItem = null;
    $self.searchText = null;

    $self.selectedItemChange = function (item) {
        $scope.animal.species_id = item.value;
        $scope.clearErrors('species_id');
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
        }).catch(function (error) {
            $scope.errors = error.data;
        });
    };

    $scope.hasErrors = function (field) {
        return $scope.errors.hasOwnProperty(field) && $scope.errors[field].length > 0;
    };

    $scope.getError = function (field) {
        if ($scope.hasErrors(field)) {
            return $scope.errors[field][0];
        }
        return '';
    };

    $scope.clearErrors = function (field) {
        $scope.errors[field] = [];
    };

    $self.loadAllSpecies();
});
