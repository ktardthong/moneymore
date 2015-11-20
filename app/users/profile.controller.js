angular.module('App')
  .controller('ProfileCtrl', function($state, md5, auth, profile, UserPlan, Users){

    var profileCtrl = this;

    profileCtrl.profile   = profile;
    profileCtrl.userplan  = UserPlan;
    profileCtrl.user      = Users;

    console.log(profileCtrl.user);

    /* Dough Setting*/
    profileCtrl.income  = 300;
    profileCtrl.saving  = 300;
    profileCtrl.bill    = 300;
    profileCtrl.doughLabels = ["Income", "Saving", "Bills"];
    /* End Dough Setting */

    console.log(profileCtrl.userplan.income);
    console.log(profileCtrl.userplan);

    //Create User Plan
    profileCtrl.createUserplan = function(){
      profileCtrl.userplan.$add(profileCtrl.planData).then(function(){
        profileCtrl.planData = {
          uid:      profileCtrl.profile.$id,
          income:   profileCtrl.income,
          saving:   profileCtrl.saving,
          bill:     profileCtrl.bill
        };
      });
    };

    /*Displaying Dough Value*/
    profileCtrl.doughValue = function(){

      profileCtrl.doughData   = [
        profileCtrl.income,
        profileCtrl.saving,
        profileCtrl.bill
      ];

    }

    /*Update the userplan */
    profileCtrl.updateUserPlan = function(){

      profileCtrl.profile.income = profileCtrl.income;
      profileCtrl.profile.$save();
      console.log(profileCtrl.user);
    }

    /*Update profile*/
    profileCtrl.updateProfile = function(){

      profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
      profileCtrl.profile.$save();

    };



  });
