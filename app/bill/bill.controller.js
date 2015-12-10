angular.module('App')
  .controller('BillCtrl', function($state,$rootScope, $q, md5, Users,Categories,Bill) {

    var billCtrl = this;

    billCtrl.categories = Categories;
    billCtrl.bill       = Bill;
    billCtrl.user       = Users;
    billCtrl.profile    = $rootScope.profile;

    billCtrl.bills      = billCtrl.user.userBill(billCtrl.profile.$id);

    //If the values are not quire put them here, so that we can add them to FB eventhough it's empty
    billCtrl.billNote ='';
    //--- end above ---


    //Bill Date Range
    billCtrl.billDueRange = function(){
      var range = [];
      for(var i=1;i<=31;i++) {
        range.push(i);
      }
      return range;
    }


    //Create Bill
    billCtrl.createBill = function(){
      billCtrl.user.userBill(billCtrl.profile.$id).$add({
        name:     billCtrl.billName,
        amount:   billCtrl.billAmount,
        category: billCtrl.billCategories,
        note:     billCtrl.billNote,
        flg:      1,
        paid:     0,
        due_on:   billCtrl.billDue,
        created:  moment().format('YYYY-MM-DD H:m:s')
      });
    };


    //Remove Bill
    billCtrl.removeBill = function($id){
      billCtrl.bill.getBill(billCtrl.profile.$id,$id).update({flg:0});
    }


  });
