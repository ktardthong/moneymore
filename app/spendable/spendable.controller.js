angular.module('App')
  .controller('SpendableCtrl', function($state,$scope, $http,Auth,Users) {

    var spendableCtrl = this;

    //spendableCtrl.profile = profile;
    spendableCtrl.user        = Users;
    spendableCtrl.dashboard_view      = '/templates/dashboard.template.html';

    spendableCtrl.addTransaction = function(){
      console.log("test");
    }
    spendableCtrl.test = function(){
      console.log("test click");
    }

  })


