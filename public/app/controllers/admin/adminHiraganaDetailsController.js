﻿angular.module('app').controller('adminHiraganaDetailsController', function ($scope, $routeParams, $location, hiraganaResource, hiraganaService, kanaGroupResource) {

    if (!!$routeParams.id) {
        $scope.kana = hiraganaResource.get({ id: $routeParams.id });
    }
    $scope.kanaGroups = kanaGroupResource.query();

    $scope.update = function () {

        if (!!$routeParams.id) {
            hiraganaService.updateHiragana($scope.kana).then(function () {
                $location.path('/admin/hiragana')
                Messenger().post('Kana details successfully updated');
            }, function (reason) {
                Messenger().post({
                    message: reason,
                    type: 'error'
                });
            });
        }

        else {
            hiraganaService.createHiragana($scope.kana).then(function () {
                $location.path('/admin/hiragana')
                Messenger().post('Kana successfully created');
            }, function (reason) {
                Messenger().post({
                    message: reason,
                    type: 'error'
                });
            });
        }
    };

    $scope.cancel = function () {
        $location.path('/admin/hiragana');
    };
});