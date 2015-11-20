angular.module('App')
  .controller('DashboardCtrl', function($state, $scope, $http){

    var dashboardCtrl = this;


    $http.get('http://ipinfo.io/json').
    success(function(data) {
        dashboardCtrl.location = data;
    });



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

