angular.module('App')
  .controller('CreditcardCtrl', function($state, md5, auth, profile, Users,Creditcard) {

    var creditcardCtrl = this;

    creditcardCtrl.profile    = profile;
    creditcardCtrl.user       = Users;
    creditcardCtrl.creditcard = Creditcard;

    creditcardCtrl.creditcard.ref(profile.$id).child("card").set({
      currency: profileCtrl.currencySelected
    });


  }); //end
