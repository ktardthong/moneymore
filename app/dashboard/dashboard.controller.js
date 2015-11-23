angular.module('App')
  .controller('DashboardCtrl', function($state, $http,Auth,profile,Creditcard,Users,$mdDialog){

    var dashboardCtrl = this;

    dashboardCtrl.profile     = profile;
    dashboardCtrl.creditcard  = Creditcard;
    dashboardCtrl.user        = Users;

    dashboardCtrl.creditcardContainer = false;

    /*
    * Get User location
    * */
    $http.get('http://ipinfo.io/json').
    success(function(data) {
        dashboardCtrl.location = data;
    });

    dashboardCtrl.reCall = function(){
      dashboardCtrl.user        = Users;
    };


    dashboardCtrl.showAlert = function(ev) {
      $mdDialog.show({
        controller:  'dashboardCtrl',
        templateUrl: 'creditcard/add_new.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        resolve: dashboardCtrl.resolve

      })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };

    dashboardCtrl.tabs = [
                          { title: 'Overall Spending',  content: '/templates/lineChartTransaction.template.html'},
                          { title: 'Goal',              content: '/goal/index.html'},
                          { title: 'Bill',              content: "You can bind the selected tab via the selected attribute on the md-tabs element."},
                          { title: 'Credit card',       content: '/creditcard/add.html'},
                          { title: 'Setting',           content: '/setting/setting.html'}
      ];


    /* Credit cards */
    dashboardCtrl.cardIssuer  = dashboardCtrl.creditcard.issuer;
    dashboardCtrl.cardTypes   = dashboardCtrl.creditcard.types;
    dashboardCtrl.userCards   = dashboardCtrl.user.userCard(profile.$id);

    console.log(dashboardCtrl.user.userCard(profile.$id));

    //Credit card input
    dashboardCtrl.cardAdd = function(){
      dashboardCtrl.user.userCard(profile.$id).$add({
        Issuer:   dashboardCtrl.cardIssuerSelected,
        Type:     dashboardCtrl.cardTypeSelected,
        CardLimit:dashboardCtrl.cardLimit,
        Note:     !dashboardCtrl.cardNote?'':dashboardCtrl.cardNote
      });
    };
    //End card


    /*
     * Daily Dough Setting
     */
    dashboardCtrl.spent       = 300;
    dashboardCtrl.spendable   = 500;
    dashboardCtrl.doughLabels = ["Spent", "Remaining"];
    dashboardCtrl.doughColors = ["#8D8D8D","#87D2DA"];

    dashboardCtrl.option      = { responsive: true,
                                  percentageInnerCutout : 80
                                };

    /*
    * Line graph for daily transaction
    * */

    dashboardCtrl.line_dailyLabels  = [ "January", "February", "March", "April", "May", "June", "July",
                                        "February", "March", "April", "May", "June", "July"];
    dashboardCtrl.line_dailySeries  = [ 'Spendable', 'Series B'];
    dashboardCtrl.line_dailyData    = [
                                          [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50 ],
                                          [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90]
                                        ];

    /*
     *Displaying Dough Value
    */
    dashboardCtrl.doughValue = function(){

      dashboardCtrl.doughData   = [
        dashboardCtrl.spent,
        dashboardCtrl.spendable,
      ];

    }

    /*
     * Displaying Dough Value
     */
    dashboardCtrl.monthlyDoughValue = function(){

      dashboardCtrl.montlyDoughData   = [
        dashboardCtrl.spent,
        dashboardCtrl.spendable,
      ];

    }




  });

