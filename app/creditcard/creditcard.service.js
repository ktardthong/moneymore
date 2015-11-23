angular.module('App')
  .factory('Creditcard', function($firebaseArray, $firebaseObject, FirebaseUrl){

    //Issuer
    var ref_issuer  = new Firebase(FirebaseUrl+'creditcard_issuer');
    var arr_issuer  = $firebaseArray(ref_issuer);

    //Types
    var ref_types  = new Firebase(FirebaseUrl+'creditcard_types');
    var arr_types  = $firebaseArray(ref_types);

    //Cards
    var ref         = new Firebase(FirebaseUrl+'creditcards');
    var arr         = $firebaseArray(ref);


    var Creditcard = {
      userCard:function(uid){
        return $firebaseObject(ref.child(uid));
      },
      all:    arr,
      issuer: arr_issuer,
      types:   arr_types

    };

    return Creditcard;
  });
