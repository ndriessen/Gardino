var gardinoFilters = angular.module('gardino.filters', []);

gardinoFilters.filter('summarize', function () {
    // Create the return function and set the required parameter as well as an optional paramater
    return function (input, length) {
        if (!input) input = '';
        if (!length) length = 150;
        if (input.length > length) {
            return input.substring(0, length - 3) + '...';
        }
        return input;
    }

});