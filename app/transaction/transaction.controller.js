angular.module('App')
  .controller('TransactionCtrl', function($state,$rootScope,$q, md5, Auth, Users,Creditcard,Transaction,Categories,PmtTypes,TransTypes) {

    var transactionCtrl = this;

    transactionCtrl.users = Users;
    transactionCtrl.transaction = Transaction;
    transactionCtrl.profile = $rootScope.profile;
    transactionCtrl.categories = Categories;
    transactionCtrl.pmtTypes = PmtTypes;
    transactionCtrl.transTypes = TransTypes;


    //All transaction
    transactionCtrl.userTransaction  = transactionCtrl.transaction.userTransaction(transactionCtrl.profile.$id);

    transactionCtrl.addTransaction = function(){
   		transactionCtrl.userTransaction.$add({
	        category:     transactionCtrl.category.toString().trim(),
	        amount:   transactionCtrl.amount,
	        location: transactionCtrl.location,
	        note:     transactionCtrl.note,
	        paymentType:      transactionCtrl.paymentType.toString().trim(),
	        transDate:     transactionCtrl.transDate,
	        transactionType:   transactionCtrl.transactionType.toString().trim(),
	        locationProvider:   "Google", //by default
	        createdAt:  moment().format('YYYY-MM-DD H:m:s')
      });
    };

  });
