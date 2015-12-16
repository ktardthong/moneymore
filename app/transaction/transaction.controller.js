angular.module('App')
  .controller('TransactionCtrl', function($state, $rootScope, $q, $filter, md5, Auth, Users, Creditcard, Bill, Transaction, Core_categories, PmtTypes, TransTypes) {

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
    transactionCtrl.selectedBill.$id = null;
    transactionCtrl.selectedCC = {};
    transactionCtrl.selectedCC.$id = null;

    transactionCtrl.transDate = new Date();

    transactionCtrl.note = null;
    transactionCtrl.location = null;

    //All transaction
    transactionCtrl.userTransaction  = transactionCtrl.transaction.userTransaction(transactionCtrl.profile.$id);

    transactionCtrl.addTransaction = function(){
   		transactionCtrl.userTransaction.$add({
	        category:     transactionCtrl.category.name,
	        amount:   transactionCtrl.amount,
	        location: transactionCtrl.location,
	        note:     transactionCtrl.note,
	        paymentType:      transactionCtrl.paymentType.name,
	        transDate:     $filter('date')(transactionCtrl.transDate, 'yyyy-MM-dd'),
	        transactionType:   transactionCtrl.transactionType.name,
	        locationProvider:   "Google", //by default
	        createdAt:  moment().format('YYYY-MM-DD HH:mm:ss'),
          bill_id: transactionCtrl.selectedBill.$id,
          cc_id: transactionCtrl.selectedCC.$id,
          flg: 1
      }).then(function(ref) {
          alert("Saved transaction " + ref.key() + " successfully!");
        });
    };

    transactionCtrl.log = function(text){
      console.log(text);
    }

  });
