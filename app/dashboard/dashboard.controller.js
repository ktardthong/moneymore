angular.module('App')
  .controller('DashboardCtrl', function($state,$scope, $http,Auth,profile,Creditcard,
                                        Users,
                                        $mdDialog){

    var dashboardCtrl = this;

    dashboardCtrl.profile     = profile;
    dashboardCtrl.creditcard  = Creditcard;
    dashboardCtrl.user        = Users;

    dashboardCtrl.creditcardContainer = false;

    dashboardCtrl.date = new Date();

    /* Get User location */
    $http.get('http://ipinfo.io/json').
      success(function(data) {
        dashboardCtrl.location = data;
    });



    dashboardCtrl.userGoals = dashboardCtrl.user.userGoal(profile.$id);

    /*Travel variables*/
    dashboardCtrl.travel = {
      whereto: '',
      amount: '',
      travelDailySaving:0,
      travelSavingDays:'',
      travelSavingMonths:'',
      travelSpendableChange: ''
    };


    /* Daily Saving Travel */
    dashboardCtrl.travel.dailySaving = function(date){

      var data = dashboardCtrl.checkTargetDate(date);
      dashboardCtrl.travel.goalDate           = data.targetDate;
      dashboardCtrl.travel.travelDailySaving  = dashboardCtrl.travel.amount/data.diffDays;
      dashboardCtrl.travel.travelMthlySaving  = isFinite(dashboardCtrl.travel.amount/data.diffMonths)?dashboardCtrl.travel.amount/data.diffMonths:0;
      dashboardCtrl.travel.travelSavingDays   = data.diffDays;
      dashboardCtrl.travel.travelSavingMonths = data.diffMonths;
      dashboardCtrl.travel.travelSpendableChange = dashboardCtrl.profile.userPlan.dailySpendable - dashboardCtrl.travel.travelDailySaving;
    };


    /*Submit Goal*/
    dashboardCtrl.travel.submitGoal = function(){
      console.log(dashboardCtrl.travel.goalDate);
      console.log(dashboardCtrl.travel.targetDate);

      dashboardCtrl.user.userGoal(profile.$id).$add({
        type:         'travel',
        destination:  dashboardCtrl.travel.whereto,
        budget:       dashboardCtrl.travel.amount,
        dailySaving:  dashboardCtrl.travel.travelDailySaving,
        duration_day: dashboardCtrl.travel.travelSavingDays,
        duration_mth: dashboardCtrl.travel.travelSavingMonths,
        targetDate:   moment(dashboardCtrl.travel.targetDate).format('YYYY-MM-DD'),
        created:      moment().format('YYYY-MM-DD H:m:s')
      });

      dashboardCtrl.user.ref(profile.$id).child("userPlan").set({
        income:         dashboardCtrl.profile.userPlan.income,
        saving:         dashboardCtrl.profile.userPlan.saving,
        bill:           dashboardCtrl.profile.userPlan.bill,
        goalSaving:     dashboardCtrl.profile.userPlan.goalSaving + dashboardCtrl.travel.travelMthlySaving,
        mthSpendable:   dashboardCtrl.user.spendable(profile.$id) - dashboardCtrl.travel.travelMthlySaving,
        dailySpendable: dashboardCtrl.profile.userPlan.dailySpendable - dashboardCtrl.travel.travelDailySaving,
        updated:        Date.now()
      });


    }

    /*Check for days and months diff for target date*/
    dashboardCtrl.checkTargetDate = function(date){

      var now         = moment();
      var target      = moment(date);

      var data = {
        diffDays: Math.abs(now.diff(target, 'Days')),
        diffMonths: Math.abs(now.diff(target, 'Months')),
        targetDate: moment(date,"MM-DD-YYYY")
      };
      return data;
    };


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


    /*Collection of tabs*/
    dashboardCtrl.tabs = [
                          { title: 'Spendable',         content: '/templates/spendableCard.template.html'},
                          { title: 'Trends',            content: '/templates/lineChartTransaction.template.html'},
                          { title: 'Goal',              content: '/goal/index.html'},
                          { title: 'Bill',              content: "You can bind the selected tab via the selected attribute on the md-tabs element."},
                          { title: 'Credit card',       content: '/creditcard/add.html'},
                          { title: 'Setting',           content: '/setting/setting.html'}
      ];


    /* Credit cards */
    dashboardCtrl.cardIssuer  = dashboardCtrl.creditcard.issuer;
    dashboardCtrl.cardTypes   = dashboardCtrl.creditcard.types;
    dashboardCtrl.userCards   = dashboardCtrl.user.userCard(profile.$id);


    //Credit card input
    dashboardCtrl.cardAdd = function(){
      dashboardCtrl.user.userCard(profile.$id).$add({
        Issuer:   dashboardCtrl.cardIssuerSelected,
        Type:     dashboardCtrl.cardTypeSelected,
        CardLimit:dashboardCtrl.cardLimit,
        Note:     !dashboardCtrl.cardNote?'':dashboardCtrl.cardNote
      });
    };


    /* Daily Dough Setting */
    dashboardCtrl.doughLabels = ["Spent", "Remaining"];
    dashboardCtrl.doughColors = ["#8D8D8D","#87D2DA"];
    dashboardCtrl.option      = { responsive: true,
                                  percentageInnerCutout : 80
                                };


    dashboardCtrl.profile.$loaded().then(function(val) {
      dashboardCtrl.userFirstname = dashboardCtrl.profile.firstname;
      dashboardCtrl.userLastname  = dashboardCtrl.profile.lastname;
      dashboardCtrl.spent         = 100;
      dashboardCtrl.spendable     = dashboardCtrl.profile.userPlan.dailySpendable - dashboardCtrl.spent;
    });


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
});
