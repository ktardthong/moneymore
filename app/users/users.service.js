angular.module('App')
  .factory('Users', function($firebaseArray, $firebaseObject, FirebaseUrl){

    var usersRef = new Firebase(FirebaseUrl+'users');
    var users = $firebaseArray(usersRef);

    var Users = {

      spendable:function(uid){
        var spendable =  users.$getRecord(uid).userPlan.income - (users.$getRecord(uid).userPlan.saving - users.$getRecord(uid).userPlan.bill);
        return spendable;
      },

      userBill:function(uid){
        return $firebaseArray(usersRef.child(uid).child("bill").orderByChild("flg").equalTo(1));
      },

      userPlan:function(uid){
        return $firebaseObject(usersRef.child(uid).child("userPlan"));
      },

      userCard:function(uid){
        return $firebaseArray(usersRef.child(uid).child("creditcard"));
      },

      userGoal:function(uid){
        var userGoal = usersRef.child(uid).child("Goal").orderByChild("flg").equalTo(1);
        return $firebaseArray(userGoal);
      },

      getProfile: function(uid){
          return $firebaseObject(usersRef.child(uid));
      },

      getArrProfile: function(uid){
        return $firebaseArray(usersRef.child(uid));
      },

      getDisplayName: function(uid){
        return users.$getRecord(uid).displayName;
      },

      ref:function(uid){
        return usersRef.child(uid);
      },
      objRef: $firebaseObject(usersRef),
      arrRef: $firebaseArray(usersRef),
      all: users,
      userRef: usersRef,

      getGravatar: function(uid){
        return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
      }
    };

    return Users;
  });
