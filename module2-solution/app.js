(function(){
	'use strict';
var app = angular.module('ShoppingListCheckOff',[]);
	app.service('ShoppingListCheckOffService',function(){
		this.listOfItems = [{ name: "cookies", quantity: '10' },
		                   { name: "milk", quantity: '1 gallon' },
		                   { name: "bread", quantity: '1' },
		                   { name: "carrots", quantity: '5' },
		                   { name: "spinach", quantity: '1 bunch' }];
		this.boughtItems = [];
		
		this.buy = function(item){
			for(var i=0;i<this.listOfItems.length;i++)
				{
				if(item.name==this.listOfItems[i].name)
					{
					var itemToInsert = this.listOfItems.splice(i,1);
					this.boughtItems.push(itemToInsert[0]);
					}
				}
		};
		
	});
	app.controller('ToBuyController',['$scope','ShoppingListCheckOffService',function($scope,ShoppingListCheckOffService){
		$scope.buy = ShoppingListCheckOffService.listOfItems;
		$scope.buyItem = function(item){
			ShoppingListCheckOffService.buy(item);
		}
	}]);
	app.controller('AlreadyBoughtController',['$scope','ShoppingListCheckOffService', function($scope,ShoppingListCheckOffService){
		$scope.bought = ShoppingListCheckOffService.boughtItems;
			}]);
		
})();
