(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('AlreadyBoughtController', AlreadyBoughtController)
.controller('ToBuyController', ToBuyController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var showList = this;

  showList.items = ShoppingListCheckOffService.getItems2();

  var test1 = ShoppingListCheckOffService.getItems2();
  console.log(test1.length);


  showList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
}


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var showList = this;

  showList.items = ShoppingListCheckOffService.getItems();

  showList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };

}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var items = []
  var items2 = []

  var foo = new Array(10);

  for(var i=0;i<foo.length;i++){
    var item = {
      name: "itemName",
      quantity: i
    };
    items.push(item);
    }


  service.removeItem = function (itemIdex) {
    items2.push(items[itemIdex]);
    items.splice(itemIdex, 1);
  };

  service.getItems = function () {
    return items;
  };
  service.getItems2 = function () {
    return items2;
  };

  service.responce = function () {
    if(items2.length == 0){
      var responce = 'Nothing bought yet';
    }
    else {
      var responce = null;
    }
    return responce ;
  };

}

})();
