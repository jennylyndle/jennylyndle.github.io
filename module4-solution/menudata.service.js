(function(){
	'use strict';
	angular.module('data')
	.service('MenuService', MenuService);

	MenuService.$inject = [ '$http' ];

	function MenuService($http) {
		this.getCategories = function() {
			var resp = $http({
				url : 'https://davids-restaurant.herokuapp.com/categories.json',
				method : 'GET',
			});
			return resp;
		};
		
		this.getItems = function(categoryName){
			var resp = $http({
				url : 'https://davids-restaurant.herokuapp.com/menu_items.json',
				method : 'GET',
				params:{category: categoryName}
			});
			return resp;
		}
	}


})
();