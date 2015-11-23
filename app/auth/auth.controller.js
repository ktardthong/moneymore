angular.module('App')
  .controller('AuthCtrl', function(Auth, $state, MoneyQuote){

    var authCtrl = this;

    console.log(MoneyQuote.length);
    authCtrl.moneyquote = MoneyQuote;

    authCtrl.user = {
      email: '',
      password: '',
      firstname:'',
      lastname:'',
      b_day:'',
      b_month:'',
      b_year:''
    }

    authCtrl.days     = [1,	2,	3,	4,	5,	6,	7,	8,	9,	10,	11,	12,	13,	14,	15,	16,	17,	18,	19,	20,	21,	22,	23,	24,	25,	26,	27,	28,	29,	30,	31];
    authCtrl.months   = [
                        {id: 1, month: "Jan"}, {id: 2,month: 'Feb'},{id: 3,month: 'Mar'},{id: 4,month: 'Apr'},{id: 5,month: 'May'}, {id: 6,month: 'Jun'},{id: 7,month: 'Jul'},{id: 8,month: 'Aug'},
                        {id: 9,month: 'Sept'},{id: 10,month: 'Oct'},{id: 11,month: 'Nov'},{id: 12,month: 'Dec'}
                        ];

    var year = new Date().getFullYear();
    var range = [];
    range.push(year);
    for(var i=1;i<100;i++) {
      range.push(year - i);
    }
    authCtrl.years = range;

    //Randome Money Quote
    authCtrl.moneyquote.all.$loaded().then(function(val){
      var randQuote = Math.floor((Math.random() * authCtrl.moneyquote.all.length ) + 1);
      if (authCtrl.moneyquote.$id = randQuote){
        authCtrl.randQuote = authCtrl.moneyquote.quote(randQuote);
      }
    });


    authCtrl.login = function (){
      Auth.$authWithPassword(authCtrl.user).then(function (auth){
        $state.go('home');
      }, function (error){
        authCtrl.error = error;
      });
    };;

    authCtrl.register = function (){
      Auth.$createUser(authCtrl.user).then(function (user){
        authCtrl.login();
      }, function (error){
        authCtrl.error = error;
      });
    };

  });
