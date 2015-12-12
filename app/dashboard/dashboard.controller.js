angular.module('App')
  .controller('DashboardCtrl', function($state,$scope,$rootScope,$http,Auth,profile,Creditcard,
                                        Users,Transaction,
                                        $timeout, $mdSidenav, $mdUtil, $log,$translate,
                                        $mdDialog){

    var dashboardCtrl = this;




    $rootScope.profile = profile;
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

    //Call services
    dashboardCtrl.userCards = dashboardCtrl.user.userCard(profile.$id);
    dashboardCtrl.userGoals = dashboardCtrl.user.userGoal(profile.$id);
    dashboardCtrl.billTracker = dashboardCtrl.user.billTracker(profile.$id);
    //end services


    //Change language
    dashboardCtrl.toggleLang = function (langKey) {
      $translate.use(langKey);
      dashboardCtrl.user.ref(profile.$id).update({lang: langKey});
    };


    //Checkk user selected language
    if(!dashboardCtrl.profile.lang){
      dashboardCtrl.toggleLang('en');
    }
    else{
      dashboardCtrl.toggleLang(dashboardCtrl.profile.lang);
    }


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

  });






