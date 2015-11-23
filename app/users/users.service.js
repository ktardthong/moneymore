angular.module('App')
  .factory('Users', function($firebaseArray, $firebaseObject, FirebaseUrl){

    var usersRef = new Firebase(FirebaseUrl+'users');
    var users = $firebaseArray(usersRef);

    var Users = {

      userPlan:function(uid){
        return $firebaseObject(usersRef.child(uid).child("userPlan"));
      },

      userCard:function(uid){
        return $firebaseArray(usersRef.child(uid).child("creditcard"));
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

      all: users,
      getGravatar: function(uid){
        return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
      }
    };

    return Users;
  });
