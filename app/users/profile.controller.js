angular.module('App')
  .controller('ProfileCtrl', function($state,$rootScope, $q, md5, Users,Currency){

    var profileCtrl = this;

    profileCtrl.profile   = $rootScope.profile;
    profileCtrl.user      = Users;
    profileCtrl.currency  = Currency;

    //Userplan
    profileCtrl.income  = profileCtrl.profile.userPlan.income;
    profileCtrl.saving  = profileCtrl.profile.userPlan.saving;
    profileCtrl.bill    = profileCtrl.profile.userPlan.bill;
    profileCtrl.doughLabels     = ["Income", "Saving","Bill"];


    profileCtrl.spendable = function(){
      return profileCtrl.income - (profileCtrl.saving - profileCtrl.bill);
    };


    /* Dough Setting*/
    profileCtrl.doughLabels = ["Income", "Saving", "Bills"];
    /* End Dough Setting */


    //Create User Plan
    profileCtrl.createUserplan = function(){
      profileCtrl.user.ref(profileCtrl.profile.$id).child("userPlan").set({
        income:   profileCtrl.income,
        saving:   profileCtrl.saving,
        bill:     profileCtrl.bill,
        mthSpendable:profileCtrl.spendable(),
        dailySpendable:profileCtrl.spendable()/30
      });
      profileCtrl.user.ref(profileCtrl.profile.$id).child("currency").set({
        currency: profileCtrl.currencySelected
      });
    };

    profileCtrl.doughData   = [
      profileCtrl.income,
      profileCtrl.saving,
      profileCtrl.bill
    ];



    /*Update profile*/
    profileCtrl.updateProfile = function(){

      profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
      profileCtrl.profile.$save();

    };



  });
