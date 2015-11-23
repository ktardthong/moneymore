angular.module('App')
  .controller('ProfileCtrl', function($state, md5, auth, profile, Users,Currency){

    var profileCtrl = this;

    profileCtrl.profile   = profile;
    profileCtrl.user      = Users;
    profileCtrl.currency  = Currency;


    //Get the user plan
    profileCtrl.user.userPlan(profile.$id).$loaded().then(function(val){

      profileCtrl.income  = val.income;
      profileCtrl.saving  = val.saving;
      profileCtrl.bill    = val.bill;

      profileCtrl.doughValue();

    });

    profileCtrl.spendable = function(){
      return profileCtrl.income - (profileCtrl.saving - profileCtrl.bill);
    };


    /* Dough Setting*/
    profileCtrl.doughLabels = ["Income", "Saving", "Bills"];
    /* End Dough Setting */


    //Create User Plan
    profileCtrl.createUserplan = function(){
      profileCtrl.user.ref(profile.$id).child("userPlan").set({
        income:   profileCtrl.income,
        saving:   profileCtrl.saving,
        bill:     profileCtrl.bill,
        mthSpendable:profileCtrl.spendable(),
        dailySpendable:profileCtrl.spendable()/30
      });
      profileCtrl.user.ref(profile.$id).child("currency").set({
        currency: profileCtrl.currencySelected
      });
      console.log(profileCtrl.currencySelected);
    };


    /*Displaying Dough Value*/
    profileCtrl.doughValue = function(){

      profileCtrl.doughData   = [
        profileCtrl.income,
        profileCtrl.saving,
        profileCtrl.bill
      ];

    }


    /*Update profile*/
    profileCtrl.updateProfile = function(){

      profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
      profileCtrl.profile.$save();

    };



  });
