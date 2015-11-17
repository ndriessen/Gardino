'use strict';

var directives = angular.module('gardino.directives', ['ngMaterial', 'ngFileUpload', 'checklist-model']);

directives.directive('gardinoPeriodSelect', function () {
    return {
        restrict: 'EA',
        //transclude: true,
        scope: {
            periodLabel: '@periodSelectLabel',
            periodModel: '=periodSelectModel'
        },
        controller: function ($scope) {
            $scope.months = [
                {name: 'Januari', code: 1},
                {name: 'Februari', code: 2},
                {name: 'Maart', code: 3},
                {name: 'April', code: 4},
                {name: 'Mei', code: 5},
                {name: 'Juni', code: 6},
                {name: 'Juli', code: 7},
                {name: 'Augustus', code: 8},
                {name: 'September', code: 9},
                {name: 'Oktober', code: 10},
                {name: 'November', code: 11},
                {name: 'December', code: 12}
            ];
        },
        templateUrl: 'views/partial/period-select-templ.html'
    };
});

/*directives.directive('gardinoMultiSelect', ['$parse', function ($parse) {
 return {
 restrict: 'EA',
 //transclude: true,
 scope: {
 multiSelectLabel: '@',
 multiSelectModel: '=',
 multiSelectItems: '='
 },
 link: function(scope, elem, attrs) {
 //get original model
 var multiSelectModel = attrs.multiSelectModel;
 var getter = $parse(multiSelectModel);
 var setter = getter.assign;

 scope.$watch(attrs.multiSelectModel, function(newVal, oldVal){
 console.log('model changed!');
 setter(scope.$parent, newVal);
 });
 },
 templateUrl: 'views/partial/multi-select-templ.html'
 };
 }]);*/


directives.directive('gardinoImageUpload', ['Upload', function (Upload) {
    return {
        templateUrl: 'views/partial/image-upload-templ.html',
        restrict: 'EA',
        transclude: true,
        scope: {
            emptyText: '@imageUploadEmptyText',
            infoText: '@imageUploadInfoText',
            imageModel: '=imageUploadModel',
            onUpload: '&onUpload',
            previewImage: '@previewImage'
        },
        link: function ($scope, elem, attrs) {
            if (!$scope.emptyText) {
                $scope.emptyText = 'Voeg een afbeelding toe...';
            }
            if (!$scope.infoText) {
                $scope.infoText = 'Sleep een afbeelding hierboven om te wijzigen.';
            }
            $scope.previewImage = ($scope.previewImage == undefined || ((typeof $scope.previewImage == String) && ($scope.previewImage.toLowerCase() == 'true')));
            if ($scope.previewImage) {
                $scope.previewUrl = $scope.imageModel;
            }
            //console.log('preview=' + (typeof $scope.previewImage) + ', value=' + $scope.previewImage);
            $scope.upload = function (file) {
                console.log('uploading...' + file.name);
                Upload.upload({
                    url: '/upload',
                    file: file
                }).then(function (resp) {
                    console.log('Success ' + file.name + 'uploaded. Response: ' + resp.data.url);
                    $scope.imageModel = resp.data.url;
                    if ($scope.onUpload) {
                        console.log('Using on-upload callback');
                        $scope.onUpload({url: $scope.imageModel});
                    }
                    if ($scope.previewImage === true) {
                        $scope.previewUrl = $scope.imageModel;
                    } else {
                        $scope.previewUrl = null;
                    }
                    //console.log('previewUrl' + $scope.previewUrl);
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + file.name);
                });
            };
        }
    }
}]);
