angular.module('App')
  .controller('CreditcardCtrl', function($state, md5, Auth, profile, Users,Creditcard) {

    var creditcardCtrl = this;

    creditcardCtrl.profile    = profile;
    creditcardCtrl.user       = Users;
    creditcardCtrl.creditcard = Creditcard;


    /* Credit cards */
    creditcardCtrl.cardIssuer  = creditcardCtrl.creditcard.issuer;
    creditcardCtrl.cardTypes   = creditcardCtrl.creditcard.types;
    creditcardCtrl.userCards   = creditcardCtrl.user.userCard(profile.$id);


    //Credit card input
    creditcardCtrl.cardAdd = function(){
      creditcardCtrl.user.userCard(profile.$id).$add({
        Issuer:   creditcardCtrl.cardIssuerSelected,
        Type:     creditcardCtrl.cardTypeSelected,
        CardLimit:creditcardCtrl.cardLimit,
        Note:     !creditcardCtrl.cardNote?'':creditcardCtrl.cardNote
      });
    };

  }); //end
