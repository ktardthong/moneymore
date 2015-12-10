angular.module('App')
  .controller('TransactionCtrl', function($state,$rootScope,$q, md5, Auth, Users,Creditcard,Transaction) {

    var transactionCtrl = this;

    transactionCtrl.users = Users;
    transactionCtrl.transaction = Transaction;
    transactionCtrl.profile = $rootScope.profile;


    //All transaction
    transactionCtrl.userTransaction  = transactionCtrl.transaction.userTransaction(transactionCtrl.profile.$id);

  });
