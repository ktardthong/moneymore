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

    'ngMaterial',
    'ngMdIcons',
    'pascalprecht.translate',
    'flow'
  ])


  /*
   * Material Theme
   */
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('cyan')
      .accentPalette('blue-grey');

  })


  /************************************************************
   * StateProvider Config
   *************************************************************/
  .config(function ($stateProvider, $urlRouterProvider,$locationProvider) {
    /*$locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });*/
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        resolve: {
          requireNoAuth: function($state, Auth){
            return Auth.auth.$requireAuth().then(function(auth){
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
            return Auth.auth.$requireAuth().then(function(auth){
              $state.go('home');
            }, function(error){
              return;
            });
          }
        }
      })

      .state('logout', {
        url: '/logout',
        templateUrl: 'home/home.html',
        resolve: {
          auth: function ($state, Users, Auth) {
            return Auth.auth.$unauth().catch(function () {
              $state.go('home');
            }, function (error) {
              $state.go('home');
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
            return Auth.auth.$requireAuth().then(function(auth){
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
            return Auth.auth.$requireAuth().catch(function(){
              $state.go('home');
            });
          },
          profile: function(Users, Auth,$state){
            return Auth.auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded().then(function (profile) {
                if (profile.userPlan.complete_setup == true) {
                  return profile;
                } else {
                  Users.userRef.child(auth.uid+'userPlan').set({
                    income:         0,
                    saving:         0,
                    bill:           0,
                    goal:           0,
                    mthSpendable:   0,
                    dailySpendable: 0,
                    complete_setup: false
                  });
                  $state.go('start');
                }
              });
            });
          }
        }
      })


      .state('start', {
        url: '/start',
        controller: 'DashboardCtrl as dashboardCtrl',
        templateUrl: 'setting/setting.html',
        resolve:{
          profile: function(Users, Auth,$state) {
            return Auth.auth.$requireAuth().then(function (auth) {
              return Users.getProfile(auth.uid).$loaded().then(function (profile) {
               if (profile.userPlan.complete_setup == true) {
                  $state.go('dashboard');
                }
                else{
                 Users.userRef.child(auth.uid+'/userPlan').set({
                   income:         0,
                   saving:         0,
                   bill:           0,
                   goal:           0,
                   mthSpendable:   0,
                   dailySpendable: 0,
                   complete_setup: false
                 });
                 return profile;
               }
              });
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
            return Auth.auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })


      .state('spending', {
        url: '/spending',
        controller: 'DashboardCtrl as dashboardCtrl',
        templateUrl: 'spending/index.html',
        resolve:{
          profile: function(Users, Auth){
            return Auth.auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })

      .state('bill', {
        url: '/bill',
        controller: 'DashboardCtrl as dashboardCtrl',
        templateUrl: 'bill/index.html',
        resolve:{
          profile: function(Users, Auth){
            return Auth.auth.$requireAuth().then(function(auth){
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
            return Auth.auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })


      .state('goalEdit',{
        url: '/goal/:goalID/:goalLocation',

        views:{

          '':{
            templateUrl: 'goal/edit.html',
            controller: 'DashboardCtrl as dashboardCtrl',
          },
          'body@goalEdit':{
            templateUrl: 'goal/edit_view.html',
            controller: 'GoalEdit as goalEdit',
            resolve:{
              edit: function(Goal, Auth,$stateParams){
                return Auth.auth.$requireAuth().then(function(auth) {
                  return Goal.getDetail(auth.uid,$stateParams.goalID).$loaded();
                });
              }
            }
          }
        },

        resolve:{
          profile: function(Goal, Auth,Users){
            return Auth.auth.$requireAuth().then(function(auth) {
              return Users.getProfile(auth.uid).$loaded();
            });
          },

        }
      })


      .state('creditcard', {
        url: '/creditcard',
        controller: 'DashboardCtrl as dashboardCtrl',
        templateUrl: 'creditcard/add.html',
        resolve:{
          profile: function(Users, Auth){
            return Auth.auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })

      .state('profile', {
        url: '/profile',
        controller: 'DashboardCtrl as dashboardCtrl',
        templateUrl: 'users/profile.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.auth.$requireAuth().catch(function(){
              $state.go('home');
            });
          },
          profile: function(Users, Auth){
            return Auth.auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      });

    //$locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

  })

  .constant('FirebaseUrl', 'https://mmxyz.firebaseio.com/');

