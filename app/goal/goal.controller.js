angular.module('App')
  .controller('GoalCtrl', function($rootScope, $state,$scope, $http,Auth,Creditcard,
                                        Users,
                                        $mdDialog) {

    var goalCtrl  = this;
    goalCtrl.user = Users;


    goalCtrl.profile = $rootScope.profile;


    goalCtrl.userGoals = goalCtrl.user.userGoal(goalCtrl.profile.$id);

    /*Travel variables*/
    goalCtrl.travel = {
      whereto: '',
      amount: '',
      travelDailySaving:0,
      travelSavingDays:'',
      travelSavingMonths:'',
      travelSpendableChange: ''
    };


    /* Daily Saving Travel */
    goalCtrl.travel.dailySaving = function(date){

      var data = goalCtrl.checkTargetDate(date);
      goalCtrl.travel.goalDate           = data.targetDate;
      goalCtrl.travel.travelDailySaving  = goalCtrl.travel.amount/data.diffDays;
      goalCtrl.travel.travelMthlySaving  = isFinite(goalCtrl.travel.amount/data.diffMonths)?goalCtrl.travel.amount/data.diffMonths:0;
      goalCtrl.travel.travelSavingDays   = data.diffDays;
      goalCtrl.travel.travelSavingMonths = data.diffMonths;
      goalCtrl.travel.travelSpendableChange = goalCtrl.profile.userPlan.dailySpendable - goalCtrl.travel.travelDailySaving;
    };


    /*Check for days and months diff for target date*/
    goalCtrl.checkTargetDate = function(date){

      var now         = moment();
      var target      = moment(date);

      var data = {
        diffDays: Math.abs(now.diff(target, 'Days')),
        diffMonths: Math.abs(now.diff(target, 'Months')),
        targetDate: moment(date,"MM-DD-YYYY")
      };
      return data;
    };

    /*Submit Travel Goal*/
    goalCtrl.travel.submitGoal = function(){
      console.log(goalCtrl.travel.goalDate);
      console.log(goalCtrl.travel.targetDate);

      goalCtrl.user.userGoal(profile.$id).$add({
        type:         'travel',
        destination:  goalCtrl.travel.whereto,
        budget:       goalCtrl.travel.amount,
        dailySaving:  goalCtrl.travel.travelDailySaving,
        duration_day: goalCtrl.travel.travelSavingDays,
        duration_mth: goalCtrl.travel.travelSavingMonths,
        flg:          1,
        targetDate:   moment(goalCtrl.travel.targetDate).format('YYYY-MM-DD'),
        created:      moment().format('YYYY-MM-DD H:m:s')
      });

      goalCtrl.user.ref(profile.$id).child("userPlan").set({
        income:         goalCtrl.profile.userPlan.income,
        saving:         goalCtrl.profile.userPlan.saving,
        bill:           goalCtrl.profile.userPlan.bill,
        goalSaving:     goalCtrl.profile.userPlan.goalSaving + goalCtrl.travel.travelMthlySaving,
        mthSpendable:   goalCtrl.user.spendable(profile.$id) - goalCtrl.travel.travelMthlySaving,
        dailySpendable: goalCtrl.profile.userPlan.dailySpendable - goalCtrl.travel.travelDailySaving,
        updated:        Date.now()
      });


    }



  });
