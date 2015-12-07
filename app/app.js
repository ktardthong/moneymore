'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
  .module('App', [
    'firebase',
    'angular-md5',
    'ui.router',
    'chart.js',
    'ng-mfb',
    'ngMaterial',
    'ngMdIcons'
  ])

  /*
   * Material Theme
   */
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('cyan')
      .accentPalette('blue-grey');

  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('dashboard');
            }, function(error){
              return;
            });
          }
        }
      })

      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('home');
            }, function(error){
              return;
            });
          }
        }
      })

      .state('logout', {
        url: '/logout',
        resolve: {
          auth: function ($state, Users, Auth) {
            return Auth.$unauth().catch(function () {
              $state.go('home');
            }, function (error) {
              return;
            });
          }
        }
      })

      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('home');
            }, function(error){
              return;
            });
          }
        }
      })

      .state('dashboard', {
        url: '/dashboard',
        controller: 'DashboardCtrl as dashboardCtrl',
        templateUrl: 'dashboard/index.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('home');
            });
          },
          profile: function(Users, Auth){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })

      .state('spendable', {
        url: '/spendable',

        controller: 'DashboardCtrl as dashboardCtrl',
        templateUrl: 'spendable/index.html',
        resolve:{
          profile: function(Users, Auth){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })

      .state('trends', {
        url: '/trends',
        controller: 'DashboardCtrl as dashboardCtrl',
        templateUrl: 'trends/index.html',
        resolve:{
          profile: function(Users, Auth){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })

      .state('goal', {
        url: '/goal',
        controller: 'DashboardCtrl as dashboardCtrl',
        templateUrl: 'goal/index.html',
        resolve:{
          profile: function(Users, Auth){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })

      .state('creditcard', {
        url: '/creditcard',
        controller: 'CreditcardCtrl as creditcardCtrl',
        templateUrl: 'creditcard/add.html',
        resolve:{
          profile: function(Users, Auth){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })

      .state('init_setup', {
        url: '/init_setup',
        templateUrl: 'init_setup/index.html'
      })


      .state('profile', {
        url: '/profile',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'users/profile.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('home');
            });
          },
          profile: function(Users, Auth){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
          /*userPlan:function(Userplan, Auth){
            return Auth.$requireAuth().then(function(auth){
              return Userplan.getPlan(auth.uid).$loaded();
            });
          }*/
        }
      });

    $urlRouterProvider.otherwise('/');
  })


  .constant('FirebaseUrl', 'https://mmxyz.firebaseio.com/');
