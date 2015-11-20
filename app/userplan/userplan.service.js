angular.module('App')
  .factory('UserPlan', function($firebaseArray, FirebaseUrl){
    var ref = new Firebase(FirebaseUrl+'userPlan');
    var userplan = $firebaseArray(ref);

    return userplan;
  });
