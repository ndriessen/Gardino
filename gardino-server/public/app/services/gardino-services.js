var gardinoServices = angular.module('gardino.services', ['ngFileUpload']);

gardinoServices.factory('UploadService', ['Upload', function (Upload) {
    var UploadService = function () {
    };

    /**
     * Method to upload a file
     * @param files the files array from the browser
     */
    UploadService.prototype.upload = function (files) {

        Upload.upload({
            url: '/upload',
            method: 'POST',
            file: file
            //data: {file: file}
        }).success(function (data) {
            console.log('Upload succesful!');
        });
        //alert('uploaded')
    };

    return new UploadService();
}]);