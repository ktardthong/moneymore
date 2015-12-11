angular.module('App')
  .controller('CreditcardCtrl', function($rootScope, $state, md5, Auth, Users,Creditcard) {

    var creditcardCtrl = this;

    creditcardCtrl.profile    = $rootScope.profile;
    creditcardCtrl.user       = Users;
    creditcardCtrl.creditcard = Creditcard;


    /* Credit cards */
    creditcardCtrl.cardIssuer  = creditcardCtrl.creditcard.issuer;
    creditcardCtrl.cardTypes   = creditcardCtrl.creditcard.types;
    creditcardCtrl.userCards   = creditcardCtrl.user.userCard(creditcardCtrl.profile.$id);


    //Credit card input
    creditcardCtrl.cardAdd = function(){
      creditcardCtrl.user.userCard(creditcardCtrl.profile.$id).$add({
        Issuer:   creditcardCtrl.cardIssuerSelected,
        Type:     creditcardCtrl.cardTypeSelected,
        CardLimit:creditcardCtrl.cardLimit,
        Note:     !creditcardCtrl.cardNote?'':creditcardCtrl.cardNote
      });
    };

    //Remove Credit card
    creditcardCtrl.removeBill = function($id){

      creditcardCtrl.creditcard.getCard(creditcardCtrl.profile.$id,$id).update({flg:0});
    }

  }); //end
