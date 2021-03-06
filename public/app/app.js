﻿angular.module('app', ['ngResource', 'ngRoute', 'ngAnimate']);

angular.module('app').config(function ($routeProvider, $locationProvider) {

    var routeRoleChecks = {
        admin: {
            auth: function (authService) {
                return authService.authorizeCurrentUserForRole('admin');
            }
        },
        user: {
            auth: function (authService) {
                return authService.authenticateCurrentUser();
            }
        }
    }

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: '/partials/home/main', controller: 'mainController' })
        .when('/profile', {
            templateUrl: '/partials/user/user-profile',
            controller: 'userProfileController',
            resolve: routeRoleChecks.user
        })
        .when('/login', {
            templateUrl: '/partials/auth/login',
            controller: 'authController'
        })
        .when('/signup', {
            templateUrl: '/partials/home/signup',
            controller: 'signupController'
        })
        .when('/connect/local', {
            templateUrl: '/partials/user/connect-local',
            resolve: routeRoleChecks.user
        })
        .when('/hiragana', {
            templateUrl: '/partials/learn/hiragana',
            controller: 'hiraganaController'
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/user-list',
            controller: 'adminUsersController',
            resolve: routeRoleChecks.admin
        })
        .when('/admin/users/:id', {
            templateUrl: '/partials/admin/user-details',
            controller: 'adminUserDetailsController',
            resolve: routeRoleChecks.admin
        })
        .when('/admin/hiragana', {
            templateUrl: '/partials/admin/kana-list',
            controller: 'adminHiraganaController',
            resolve: routeRoleChecks.admin
        })
        .when('/admin/hiragana/new', {
            templateUrl: '/partials/admin/kana-details',
            controller: 'adminHiraganaDetailsController',
            resolve: routeRoleChecks.admin
        })
        .when('/admin/hiragana/:id', {
            templateUrl: '/partials/admin/kana-details',
            controller: 'adminHiraganaDetailsController',
            resolve: routeRoleChecks.admin
        })
        .when('/admin/katakana', {
            templateUrl: '/partials/admin/kana-list',
            controller: 'adminKatakanaController',
            resolve: routeRoleChecks.admin
        })
        .when('/admin/katakana/new', {
            templateUrl: '/partials/admin/kana-details',
            controller: 'adminKatakanaDetailsController',
            resolve: routeRoleChecks.admin
        })
        .when('/admin/katakana/:id', {
            templateUrl: '/partials/admin/kana-details',
            controller: 'adminKatakanaDetailsController',
            resolve: routeRoleChecks.admin
        })
        .when('/admin/kanaGroups', {
            templateUrl: '/partials/admin/kanaGroup-list',
            controller: 'adminKanaGroupController',
            resolve: routeRoleChecks.admin
        })
        .when('/admin/kanaGroup/new', {
            templateUrl: '/partials/admin/kanaGroup-details',
            controller: 'adminKanaGroupDetailsController',
            resolve: routeRoleChecks.admin
        })
        .when('/admin/kanaGroup/:id', {
            templateUrl: '/partials/admin/kanaGroup-details',
            controller: 'adminKanaGroupDetailsController',
            resolve: routeRoleChecks.admin
        });
});


angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });
});
