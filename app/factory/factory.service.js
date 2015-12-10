/*
* Anything that we just READ put it here
* */

angular.module('App')


  .factory('Currency', function($firebaseArray, $firebaseObject, FirebaseUrl) {

    var ref = new Firebase(FirebaseUrl + 'currency/list');
    var currency = $firebaseArray(ref);

    return currency;

  })


  .factory('Categories', function($firebaseArray, $firebaseObject, FirebaseUrl) {

    var ref = new Firebase(FirebaseUrl + 'categories');
    var categories = $firebaseArray(ref);

    return categories;

  })


  .factory('MoneyQuote', function($firebaseArray, $firebaseObject, FirebaseUrl) {

    var ref = new Firebase(FirebaseUrl + 'moneyquote');
    var arr = $firebaseArray(ref);

    var MoneyQuote = {
        quote:function(id){
          return $firebaseObject(ref.child(id));
        },
        all: arr
      };
    return MoneyQuote;

  });
