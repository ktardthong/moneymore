angular.module('App')

  /*
   *
   * DASHBOARD DIRECTIVES
   *
   */

  .directive('dailySpendableDough', function() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: '/templates/dailySpendable.template.html',
      link: function (dashboardCtrl, element) {
        dashboardCtrl.spent           = 100;
        dashboardCtrl.dailySpendable  = 200;
        dashboardCtrl.doughData       = [dashboardCtrl.spent,dashboardCtrl.dailySpendable];
        dashboardCtrl.doughLabels     = ["Spent", "Remaining"];
        dashboardCtrl.doughColors     = ["#8D8D8D","#87D2DA"];
        dashboardCtrl.option          = {
          responsive: true,
          showTooltips: false,
          percentageInnerCutout : 80
        };
      }
    };
  })

  .directive('transactionTrend', function() {
    return {
      restrict: 'E',
      transclude: true,
      controller: 'TransactionCtrl as transactionCtrl',
      templateUrl: '/dashboard/templates/trend_dashboard.html',
      link: function (transactionCtrl, element) {
        transactionCtrl.line_options      = {responsive: true};
        transactionCtrl.line_dailyLabels  = [ "January", "February", "March", "April", "May", "June", "July",
          "February", "March", "April", "May", "June", "July"];
        transactionCtrl.line_dailySeries  = [ 'Spendable', 'Series B'];
        transactionCtrl.line_dailyData    = [
          [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 ],
          [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90]
        ];
      }
    };
  })

  .directive('billDashboard', function() {
    return {
      restrict: 'E',
      transclude: true,
      controller: 'BillCtrl as billCtrl',
      templateUrl: '/dashboard/templates/bill_dashboard.html'
    };
  })

  .directive('creditcardDashboard', function() {
    return {
      restrict: 'E',
      transclude: true,
      controller: 'CreditcardCtrl as creditcardCtrl',
      templateUrl: '/dashboard/templates/creditcard_dashboard.html'
    };
  })

  .directive('goalDashboard', function() {
    return {
      restrict: 'E',
      transclude: true,
      controller: 'GoalCtrl as goalCtrl',
      templateUrl: '/dashboard/templates/goal_dashboard.html'
    };
  })
  //-- END DASHBOARD DIRECTIVES --



  /*Google place search*/
  .directive('googleplace', function() {
    return {
      require: 'ngModel',

      link: function (scope, element, attrs, model) {
        var options = {
          types: []
        };
        scope.gPlace = new google.maps.places.Autocomplete(element[0],
          options);


        google.maps.event.addListener(scope.gPlace, 'place_changed',
          function () {
            scope.$apply(function () {
              model.$setViewValue(element.val());

            });
          });
      }
    }
  })


  .directive('transactionAdd', function() {
    return {
      restrict: 'E',
      transclude: true,
      controller: 'SpendableCtrl as spendableCtrl',
      templateUrl: '/templates/addTransaction.template.html',
    };
  })



  .directive('billAdd', function() {
    return {
      restrict: 'E',
      transclude: true,
      controller: 'BillCtrl as billCtrl',
      templateUrl: '/bill/add.html'
    };
  })

  .directive('creditcardAdd', function() {
    return {
      restrict: 'E',
      transclude: true,
      controller: 'CreditcardCtrl as creditcardCtrl',
      templateUrl: '/creditcard/add_new.html'
    };
  })


  //Spendable Dough
  .directive('userPlanSpendable', function() {
    return {
      restrict: 'E',
      transclude: true,
      controller: 'ProfileCtrl as profileCtrl',
      templateUrl: '/templates/userPlan.template.html',
      link: function (profileCtrl, element) {

        profileCtrl.income           = 100;
        profileCtrl.dailySpendable  = 200;
        profileCtrl.doughData       = [profileCtrl.spent,profileCtrl.dailySpendable];

        profileCtrl.doughColors     = ["#8D8D8D","#87D2DA"];
        profileCtrl.option          = {
          responsive: true,
          showTooltips: false,
          percentageInnerCutout : 80
        };
      }
    };
  })

  .directive('transactionList', function() {
    return {
      restrict: 'E',
      transclude: true,
      controller: 'TransactionCtrl as transactionCtrl',
      templateUrl: '/templates/transactionList.template.html',
    };
  });
