angular.module("App")
  .controller("UserPlanCtrl", function($state, md5, auth, profile){
  //.controller('ProfileCtrl', function($state, md5, auth, profile){

    var userPlanCtrl = this;

    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];

    $scope.data = [300, 500, 100];
});
