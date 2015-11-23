angular.module('App')
  .factory('Bill', function($firebaseArray, $firebaseObject, FirebaseUrl){

    var ref = new Firebase(FirebaseUrl+'bill');
    var arr = $firebaseArray(ref);

    var Bill = {

      userPlan:function(uid){
        return $firebaseObject(usersRef.child(uid).child("userPlan"));
      },

      getProfile: function(uid){
        return $firebaseObject(usersRef.child(uid));
      },

      getDisplayName: function(uid){
        return users.$getRecord(uid).displayName;
      },

      ref:function(uid){
        return usersRef.child(uid);
      },

      all: arr

    };

    return Bill;
  });
