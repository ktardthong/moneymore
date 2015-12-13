angular.module('App')
  .config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('Eng', {
    'KEY_SPENDABLE':  'Spendable',
    'KEY_GOAL':       'Goal',
    'KEY_TRANSACTION':'Transaction',
    'KEY_BILL':       'Bill',
    'KEY_TRENDS':     'Trends',
    'KEY_CREDITCARD': 'Credit cards',
    'KEY_SETTING':    'Setting',
    'KEY_CATEGORIES': 'Categories',
    'KEY_AMOUNT':     'Amount',
    'KEY_TRANSTYPE':     'Transaction Type',
    'KEY_PMTTYPE':     'Payment Type',
    'KEY_TRANSDATE':     'Transaction Date',
    'KEY_LOCATION':     'Location',
    'KEY_ADDTRANS':     'Add Transaction',


    'KEY_ADDBILL':    'Add Bill',
    'KEY_BILL_DUE':   'Bill Due',
    'KEY_BILL_AMT':   'Bill Amount',
    'KEY_BILL_NAME':  'Bill Name',


    'KEY_NOBILL':     'No bills, yet',
    'KEY_NOCARD':     'No cards, yet',
    'KEY_NOTRANS':    'No transaction, yet',

    'KEY_NOTE':       'Note',
    'KEY_AND':        'and',
    'KEY_ADD':        'Add',
    'KEY_MOREGOAL':   'more goals',

    'TITLE':          'Hello',
    'FOO':            'This is a paragraph'
  });

  $translateProvider.translations('ไทย', {
    'KEY_SPENDABLE': 'งบวันนี้',
    'TITLE': 'Hallo',
    'FOO': 'Dies ist ein Absatz'
  });

  $translateProvider.preferredLanguage('en');
}])
