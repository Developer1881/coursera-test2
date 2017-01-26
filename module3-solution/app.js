(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.controller('ShowController', ShowController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var menu = this;

  var promise = MenuSearchService.getMenuCategories();

  promise.then(function (response) {
    menu.menu_items = response.data;
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

  menu.getCorrectItems = function () {
      menu.foundItems  = []
    for (var item in menu.menu_items.menu_items){
       if (menu.menu_items.menu_items[item].description.includes(menu.itemName)){
         menu.foundItems .push(menu.menu_items.menu_items[item])
       }
    }
  };


}

ShowController.$inject = ['MenuSearchService'];
function ShowController(MenuSearchService) {
  var showList = this;

  showList.items = MenuSearchService.getItems();

  showList.removeItem = function (itemName) {

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
