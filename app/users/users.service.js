angular.module('App')
  .factory('Users', function($firebaseArray, $firebaseObject, FirebaseUrl, $q){

    var usersRef = new Firebase(FirebaseUrl+'users');
    var users = $firebaseArray(usersRef);

    var deferred = $q.defer();

    var Users = {

      spendable:function(uid){
        var spendable =  users.$getRecord(uid).userPlan.income - (users.$getRecord(uid).userPlan.saving - users.$getRecord(uid).userPlan.bill);
        return spendable;
      },

      userPlan:function(uid){
        return $firebaseObject(usersRef.child(uid).child("userPlan"));
      },

      userCard:function(uid){
        return $firebaseArray(usersRef.child(uid).child("creditcard"));
      },

      userGoal:function(uid){
        return $firebaseArray(usersRef.child(uid).child("Goal"));
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
