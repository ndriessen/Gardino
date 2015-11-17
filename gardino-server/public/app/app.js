'use strict';

// Declare app level module which depends on views, and components
var gardino = angular.module('gardino', ['ngRoute', 'ngResource', 'ngMaterial', 'gardino.plants', 'pascalprecht.translate']);

//gardino.config(['$routeProvider', '$mdThemingProvider','$mdIconProvider', function ($routeProvider, $mdThemingProvider, $mdIconProvider)
gardino.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/plants', {
            templateUrl: 'views/plant-list-view.html',
            controller: 'PlantController'
        })
        .otherwise({redirectTo: '/plants'});
}]);

gardino.config(['$mdIconProvider', function ($mdIconProvider) {
    $mdIconProvider
        .icon("menu", "./menu.svg", 24);
    /*$mdIconProvider
     .defaultIconSet("./assets/svg/avatars.svg", 128)
     .icon("menu"       , "./assets/svg/menu.svg"        , 24)
     .icon("share"      , "./assets/svg/share.svg"       , 24)
     .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
     .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
     .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
     .icon("phone"      , "./assets/svg/phone.svg"       , 512);*/
}]);
gardino.config(['$mdThemingProvider', function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('green')
        .accentPalette('lime');
}]);

/*gardino.config(['$translateProvider', function ($translateProvider) {
 $translateProvider
 .translations('en', {
 APP_TITLE: 'Manage your garden',
 INTRO_TEXT: 'And it has i18n support!'
 })
 .translations('nl', {
 APP_TITLE: 'Beheer je tuin',
 INTRO_TEXT: 'Und sie untersützt mehrere Sprachen!'
 });
 $translateProvider.preferredLanguage('nl');
 }]);*/

gardino.controller('AppController', ['$scope', 'PlantResource', '$mdSidenav', function ($scope, PlantResource, $mdSidenav) {
    var vm = this;

    vm.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    var data = [
        {
            "name": "Helianthus annuus",
            "alt_name": "Zonnebloem",
            "description": "De zonnebloem (Helianthus annuus) is een tot 3 meter hoge, eenjarige plant uit de composietenfamilie (Asteraceae).",
            "image_url": "/assets/sample-images/plant-2.jpg",
            "type": "vasteplant"
        },
        {
            "name": "Philadelphus",
            "alt_name": "Boeren jasmijn",
            "description": "De Boerenjasmijn begint in mei te bloeien en is een geliefde heester in onze tuinen om zijn mooie, witte of roomwitte bloemen en zoete geur die je uit de slaap kan houden wanneer een dergelijke struik bij het slaapkamerraam staat. ",
            "type": "heester",
            "image_url": "/assets/sample-images/boerenjasmijn.jpg"
        },
        {
            "name": "Brunnera macrophylla",
            "alt_name": "Kaukasisch vergeet-mij-nietje",
            "description": "De plant wordt 30-60 cm hoog. Het zowel van boven als van onderen ruwe, 10-15 cm lange blad is niervormig en heeft lange stelen.\nHet Kaukasisch vergeet-mij-nietje bloeit van maart tot juni met lichtblauwe bloemen. De bloeiwijze is pluimvormig.",
            "type": "vasteplant",
            "image_url": "/assets/sample-images/brunella.jpg"
        },
        {
            "name": "Ocimum basilicum",
            "alt_name": "Basilicum (Kruiden)",
            "description": "Basilicum, met name de soort Ocimum basilicum is een kruid dat wordt gebruikt in de keuken. Basilicum heeft een sterke geur en aroma en wordt vooral veel in de Italiaanse keuken en bij tomaatgerechten gebruikt.",
            "type": "vasteplant",
            "image_url": "/assets/sample-images/basilicum.jpg"
        }
    ];
    $scope.loadSampleData = function () {
        data.forEach(function (d) {
            //alert('creating new plant: ' + d.name);
            new PlantResource(d).$save();
        });
    };

}]);

