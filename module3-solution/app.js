(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)

.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");







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

  // List of shopping items
  var items;

  service.getMenuCategories = function () {
  var response = $http({
    method: "GET",
    url: (ApiBasePath + "/menu_items.json")
  });
  return response;
  };


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


  service.getCorrectItems = function (itemName) {
    for (var item in items.menu_items){
      console.log(item);
    }
  };

  service.removeItem = function (itemIdex) {
    items.splice(itemIdex, 1);
  };

  service.getItems = function () {
    return items;
  };
}




})();
