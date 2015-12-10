angular.module('App')
  .factory('Bill', function($firebaseArray, $firebaseObject, FirebaseUrl){

    var ref = new Firebase(FirebaseUrl+'users');
    var arr = $firebaseArray(ref);

    var Bill = {

      getTracker:function(uid){
        //var userGoal = usersRef.child(uid).child("Goal").orderByChild("flg").equalTo(1);
        return $firebaseObject(ref.child(uid).child('bill_tracker'));
      },
      getBill:function(uid,$id){
        return ref.child(uid).child('bill').child($id);
      },
      userBill:function(uid){
        return $firebaseObject(ref.child(uid));
      },

      all: arr

    };

    return Bill;
  });
