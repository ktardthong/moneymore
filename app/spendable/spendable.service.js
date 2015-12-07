angular.module('App')
.factory('Spendable', function($firebaseAuth, FirebaseUrl){

var ref = new Firebase(FirebaseUrl);
var spenndable = $firebaseAuth(ref);


return spendable;
});
