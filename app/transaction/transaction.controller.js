angular.module('App')
  .controller('TransactionCtrl', function($state, $rootScope, $q, md5, Auth, Users, Creditcard, Bill, Transaction, Core_categories, PmtTypes, TransTypes) {

    var transactionCtrl = this;

    transactionCtrl.users = Users;
    transactionCtrl.transaction = Transaction;
    transactionCtrl.profile = $rootScope.profile;
    transactionCtrl.core_categories = Core_categories;
    transactionCtrl.pmtTypes = PmtTypes;
    transactionCtrl.transTypes = TransTypes;
    transactionCtrl.creditCard = Creditcard;
    transactionCtrl.bill = Bill;
    transactionCtrl.bills = transactionCtrl.users.userBill(transactionCtrl.profile.$id);
    transactionCtrl.creditCards   = transactionCtrl.users.userCard(transactionCtrl.profile.$id);

    transactionCtrl.transactionType = {};
    transactionCtrl.transactionType.name = 'Expense';

    transactionCtrl.paymentType = {};
    transactionCtrl.paymentType.name = 'Cash';

    transactionCtrl.selectedBill = {};
    transactionCtrl.selectedCC = {};

    console.log(transactionCtrl.creditCards);

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
	        transactionType:   transactionCtrl.transactionType.name,
	        locationProvider:   "Google", //by default
	        createdAt:  moment().format('YYYY-MM-DD H:m:s'),
          bill_id: transactionCtrl.selectedBill.$id,
          cc_id: transactionCtrl.selectedCC.$id
      });
    };

    transactionCtrl.log = function(text){
      console.log(text);
    }

  });
