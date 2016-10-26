(function(){
	'use strict';
	
	angular.module('MenuApp')
	.config(RoutesConfig)
	.controller('categoriesController', categoriesController)
	.controller('itemsController',itemsController);

	
	RoutesConfig.$inject = [ '$stateProvider', '$urlRouterProvider' ];

	function RoutesConfig($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider.state('home', {
			url : '/',
			templateUrl : 'home.html'
		}).state('categories', {
			url:'/categories',
			templateUrl : 'categories.html',
			controller : 'categoriesController as catCtrl',
			resolve : {
				allCategories : ['MenuService',
			                       function(MenuService){
					return MenuService.getCategories()
									  .then(function(resp){
										  return resp.data;
									  },
											  function(){})
				}]
			}
		}).state('home.items',{
			templateUrl : 'items.html',
			url:'items',
			controller: 'itemsController as itemCtrl',
			params:{
				categoryName: null
			},
			resolve : {
				allItems : ['MenuService','$stateParams',
			                       function(MenuService, $stateParams){
					return MenuService.getItems($stateParams.categoryName.short_name)
									  .then(function(resp){
										  return resp.data;
									  },
											  function(){})
				}]
			}
		})

	}
	;
	
	categoriesController.$inject = [ 'allCategories' ];
	function categoriesController(allCategories) {
		var catCtrl = this;
		catCtrl.allCategories = allCategories;
		console.log(catCtrl.allCategories);
	}

	itemsController.$inject = ['allItems'];
	function itemsController(allItems){
		var itemCtrl = this;
		itemCtrl.allItems = allItems.menu_items;
		console.log(itemCtrl.allItems);
	}


})
();