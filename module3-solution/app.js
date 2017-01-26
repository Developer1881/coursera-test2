(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems)
.directive('listFoundItems', ListFoundItems);



function FoundItems() {
  var ddo = {
    template: '{{ item.description }}'
  };

  return ddo;
}

function ListFoundItems() {
  var ddo = {
    templateUrl: 'list.html'
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var menu = this;

  menu.getCorrectItems = function () {
      MenuSearchService.getMatchedMenuItems(menu.itemName)
      .then(function (response){
        menu.found = response;
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });
  };


}



MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;



  service.getMatchedMenuItems = function (itemName) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
        var  foundItems = []
      for (var item in result.data.menu_items){
         if (result.data.menu_items[item].description.includes(itemName)){
           foundItems.push(result.data.menu_items[item])
           //console.log(result.data.menu_items[item]);
         }
      }
        // process result and only keep items that match
        // return processed items
        return foundItems;
    });
  };

}




})();
