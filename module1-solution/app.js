(function (){
'use strict';

angular.module('LunchCheck',[])
.controller('FoodController', FoodController);

FoodController.$inject = ['$scope'];

function FoodController($scope) {
  $scope.menu_list = ""
  $scope.lunch_advice = ""
  $scope.giveAdvice = function(){
    var advice = getNumberOfDishes($scope.menu_list)
    $scope.lunch_advice = advice;
  }

  function getNumberOfDishes(string){
    var res = ""
    var n_dishes = string.split(',').length
    if (n_dishes <= 0 || string.length == 0) {
      res = "Enter data first"
    }
    else if (n_dishes >= 1 && n_dishes <= 3 ){
      res = "Enjoy!"
    }
    else if (n_dishes >= 4) {
      res = "Too Much"
    }
        return res
  }

}

})();
