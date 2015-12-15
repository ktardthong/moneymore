angular.module('App')
  .controller('TransactionCtrl', function($state,$rootScope,$q, md5, Auth, Users,Creditcard,Transaction,Core_categories,PmtTypes,TransTypes) {

    var transactionCtrl = this;

    transactionCtrl.users = Users;
    transactionCtrl.transaction = Transaction;
    transactionCtrl.profile = $rootScope.profile;
    transactionCtrl.core_categories = Core_categories;
    transactionCtrl.pmtTypes = PmtTypes;
    transactionCtrl.transTypes = TransTypes;

    transactionCtrl.transTypes.$loaded().then(function() {
          transactionCtrl.transactionType = transactionCtrl.transTypes[0];
          console.log(transactionCtrl.transactionType);
     });

    console.log(transactionCtrl.transactionType);

    //All transaction
    transactionCtrl.userTransaction  = transactionCtrl.transaction.userTransaction(transactionCtrl.profile.$id);

    transactionCtrl.addTransaction = function(){
   		//transactionCtrl.userTransaction.$add
      console.log({
	        category:     transactionCtrl.category.name,
	        amount:   transactionCtrl.amount,
	        location: transactionCtrl.location,
	        note:     transactionCtrl.note,
	        paymentType:      transactionCtrl.paymentType.name,
	        transDate:     transactionCtrl.transDate,
	        //transactionType:   transactionCtrl.transactionType.name,
	        locationProvider:   "Google", //by default
	        createdAt:  moment().format('YYYY-MM-DD H:m:s')
      });
    };

    transactionCtrl.log = function(text){
      console.log(text);
    }

  });
