'use strict';

var plantsModule = angular.module('gardino.plants', ['ngRoute', 'ngResource', 'ngMaterial', 'ngFileUpload', 'gardino.directives', 'gardino.filters', 'checklist-model']);

plantsModule.factory('PlantResource', ['$resource', function ($resource) {
    return $resource('/api/plants/:id', {id: '@_id'}, {
        'update': {method: 'PUT'}
    });
}]);

plantsModule.controller('PlantController', ['$scope', '$routeParams', '$location', 'PlantResource', "$mdDialog", "$mdToast", "$http",
    function ($scope, $routeParams, $location, PlantResource, $mdDialog, $mdToast, $http) {

        var enums = [
            {model: 'plantTypes', url: 'json/enum-plant-types.json'},
            {model: 'plantMultiplyTypes', url: 'json/enum-plant-multiply-types.json'},
            {model: 'plantAccidityTypes', url: 'json/enum-plant-accidity-types.json'},
            {model: 'plantHabitatTypes', url: 'json/enum-plant-habitat-types.json'},
            {model: 'plantLightingTypes', url: 'json/enum-plant-lighting-types.json'},
            {model: 'plantMoistureTypes', url: 'json/enum-plant-moisture-types.json'},
            {model: 'plantSoilTypes', url: 'json/enum-plant-soil-types.json'}
        ];
        angular.forEach(enums, function (item) {
            $http.get(item.url).success(function (resp) {
                console.log('response type=' + resp);
                $scope[item.model] = resp;
                //item.model = resp;
                console.log('loaded ' + item.url + ': ' + angular.toJson(item.model));
            });
        });

        $scope.plant = {};

        $scope.newPlantImage = null;

        $scope.maintenanceItems = function () {
            return [
                {label: 'Snoeien', model: $scope.plant.maintenance.pruning},
                {label: 'Bemesten', model: $scope.plant.maintenance.fertilize},
                {label: 'Kalk geven', model: $scope.plant.maintenance.chalk}
            ]
        };

        $scope.newPlantImage = null;
        if (!$scope.plant.images) {
            $scope.plant.images = [];
        }
        $scope.onUpload = function (url) {
            if (url) {
                if (!$scope.plant.images || !$scope.plant.images.length) {
                    $scope.plant.images = [];
                }
                $scope.plant.images.push(url);
                console.log('added: ' + angular.toJson($scope.plant.images));
            }
        };

        $scope.plants = PlantResource.query();
        console.log("finding plants in DB:" + $scope.plants.length);

        $scope.addPlant = function () {
            //console.log('selected plant: ' + index);
            //alert('selected: ' + $scope.plants[plantId]);
            $scope.resetSelection();
            $scope.showPlantDialog();
        };

        $scope.editPlant = function (index) {
            console.log('selected plant: ' + index);
            //alert('selected: ' + $scope.plants[plantId]);
            $scope.selectedPlant = index;
            $scope.plant = angular.copy($scope.plants[index]);
            $scope.showPlantDialog();
        };
        $scope.deletePlant = function (index) {
            var plant = new PlantResource($scope.plants[index]);

            plant.$delete(function () {
                //alert('deleted');
                $mdToast.show(
                    $mdToast.simple()
                        .content(plant.name + ' is verwijderd.')
                        .position('top right')
                        .hideDelay(3000)
                );
                $scope.plants.splice(index, 1);
            });
            $scope.resetSelection();
        };
        $scope.resetSelection = function () {
            $scope.selectedPlant = null;
            $scope.plant = {};
        };
        $scope.showPlantDialog = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: '/views/partial/plant-detail-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                scope: $scope,        // use parent scope in template
                preserveScope: true  //preserve when closing dialog
            });
        };
        function DialogController($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
                $scope.resetSelection();
            };
            $scope.cancel = function () {
                $mdDialog.hide();
                $scope.resetSelection();
            };
            $scope.save = function () {
                //alert('saving...');
                $mdDialog.hide();
                if ($scope.plant._id) {
                    console.log('updating : ' + $scope.plant._id);
                    console.log('data: ' + angular.toJson($scope.plant));
                    PlantResource.update({id: $scope.plant._id}, $scope.plant);
                    $scope.plants[$scope.selectedPlant] = angular.copy($scope.plant);
                } else {
                    //alert('creating new plant: ' + $scope.plant.name);
                    console.log('creating : ' + $scope.plant.name);
                    console.log('data: ' + angular.toJson($scope.plant));
                    $scope.plant = new PlantResource($scope.plant);
                    $scope.plant.$save(function success(value, resp) {
                        //alert('done saving: ' + value);
                        $scope.plants.push(angular.copy(value));
                    });
                }
                $mdToast.show(
                    $mdToast.simple()
                        .content($scope.plant.name + ' is bewaard.')
                        .position('top right')
                        .hideDelay(3000)
                );
                $scope.resetSelection();
            };
        }

    }]);