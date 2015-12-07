angular.module('App')
  .controller('DashboardCtrl', function($state,$scope, $http,Auth,profile,Creditcard,
                                        Users,
                                        $timeout, $mdSidenav, $mdUtil, $log,
                                        $mdDialog){

    var dashboardCtrl = this;

    dashboardCtrl.profile     = profile;
    dashboardCtrl.creditcard  = Creditcard;
    dashboardCtrl.user        = Users;
    dashboardCtrl.view        = '/templates/dashboard.template.html';

    dashboardCtrl.creditcardContainer = false;

    dashboardCtrl.date = new Date();

    /* Get User location */
    $http.get('http://ipinfo.io/json').
      success(function(data) {
        dashboardCtrl.location = data;
    });

    dashboardCtrl.doughData   = dashboardCtrl.user.doughData;
    dashboardCtrl.doughLabels = dashboardCtrl.user.doughLabels;


    dashboardCtrl.userCards = dashboardCtrl.user.userCard(profile.$id);
    dashboardCtrl.userGoals = dashboardCtrl.user.userGoal(profile.$id);

    /* Update user profile */
    dashboardCtrl.profileUpdate = function(){
      dashboardCtrl.profile.firstname = dashboardCtrl.userFirstname;
      dashboardCtrl.profile.lastname  = dashboardCtrl.userLastname;
      dashboardCtrl.profile.$save();
    };


    /* Goals */
    dashboardCtrl.goals = [
                            {title: 'Travel', content:'/goal/travel.html', icon:'fa fa-plane'},
                            {title: 'Car',    content:'/goal/car.html', icon:'fa fa-car'},
                            {title: 'Home',   content:'/goal/home.html', icon:'fa fa-home'}
                          ];


    /* View */
    dashboardCtrl.dashboard_view      = '/templates/dashboard.template.html';
    dashboardCtrl.spendable_view      = '/spendable/index.html';
    dashboardCtrl.dailySpendable_view = '/templates/dailySpendable.template.html';
    dashboardCtrl.addTransaction_view = '/templates/addTransaction.template.html';
    dashboardCtrl.creditcard_view     = '/creditcard';


    dashboardCtrl.profile.$loaded().then(function(val) {
      dashboardCtrl.userFirstname = dashboardCtrl.profile.firstname;
      dashboardCtrl.userLastname  = dashboardCtrl.profile.lastname;
      dashboardCtrl.spent         = 100;
      dashboardCtrl.spendable     = dashboardCtrl.profile.userPlan.dailySpendable - dashboardCtrl.spent;
    });




    /*
     * Displaying Dough Value
     */
    dashboardCtrl.monthlyDoughValue = function(){

      dashboardCtrl.montlyDoughData   = [
        dashboardCtrl.spent,
        dashboardCtrl.spendable,
      ];

    }


    dashboardCtrl.addTransaction = function(){
      console.log("test");
    }

    dashboardCtrl.rightNavclose = function(){

        $mdSidenav('right').close()
          .then(function () {
            $log.debug("close RIGHT is done");
          });
    }
    dashboardCtrl.toggleRight = buildToggler('right');
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      },200);
      return debounceFn;
    }

  })






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
    };
})


  /*Daily Spendable dough*/
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

  /*
   * Line graph for daily transaction
   */
  .directive('transactionTrend', function() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: '/templates/lineChartTransaction.template.html',
      link: function (dashboardCtrl, element) {
        dashboardCtrl.line_options      = {responsive: true};
        dashboardCtrl.line_dailyLabels  = [ "January", "February", "March", "April", "May", "June", "July",
                                            "February", "March", "April", "May", "June", "July"];
        dashboardCtrl.line_dailySeries  = [ 'Spendable', 'Series B'];
        dashboardCtrl.line_dailyData    = [
          [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 ],
          [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90]
        ];
      }
    };
  })


  .directive('transactionAdd', function() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: '/templates/addTransaction.template.html',
    };
  });


