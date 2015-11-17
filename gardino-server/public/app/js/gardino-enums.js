var enumModule = angular.module('gardino.enums', []);

enumModule.factory('EnumService', ['$http', function ($http) {

    var factory = {
        enum_data: {},
        loadData: function (key, url) {
            $http.get('json/enum-plant-types.json').success(function (resp) {
                factory.enum_data[key] = resp;
                console.log(angular.toJson(factory.enum_data));
            })
        }
    };
    factory.loadData('plantTypes', 'json/enum-plant-types.json');
    factory.loadData('plantMultiplyTypes', 'json/enum-plant-multiply-types.json');


    factory.getPlantTypes = function () {
        console.log(angular.toJson(factory.enum_data.plantTypes));
        return factory.enum_data.plantTypes;
    };

    factory.getPlantMultiplyTypes = function () {
        return factory.enum_data.plantMultiplyTypes;
    };

    return factory;
}]);

enumModule.factory('plantMultiplyTypeEnum', ['$http', function ($http) {
    var result;
    $http.get('json/enum-plant-multiply-types.json').success(function (data) {
        result = data;
    });
    return result;
}]);