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
    menu.categories = response.data;
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });
}

ShowController.$inject = ['MenuSearchService'];
function ShowController(MenuSearchService) {
  var showList = this;

  showList.items = MenuSearchService.getItems();

  showList.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  // List of shopping items
  var items = [];

  service.getMenuCategories = function () {
  var response = $http({
    method: "GET",
    url: (ApiBasePath + "/menu_items.json")
  });

  return response;
  };



  service.getCorrectItems = function (itemName) {

  };

  service.removeItem = function (itemIdex) {
    items.splice(itemIdex, 1);
  };

  service.getItems = function () {
    return items;
  };
}





})();
