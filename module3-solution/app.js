(function() {
	angular.module('NarrowItDownApp', []).service('MenuSearchService',
			MenuSearchService).controller('NarrowItDownController',
			NarrowItDownController)
			.directive('foundItems', FoundItemsDirective);

	function FoundItemsDirective() {
		var ddo = {
			templateUrl : 'foundItems.html',
			scope : {
				filteredItems : '<',
				onRemove : '&',
				errorMessage : '<'
			},
		};

		return ddo;
	}

	MenuSearchService.$inject = [ '$http' ];
	function MenuSearchService($http) {
		this.getMatchedMenuItems = function(searchTerm) {
			var resp = $http({
				url : 'https://davids-restaurant.herokuapp.com/menu_items.json',
				params : searchTerm,
				method : 'GET',
			});
			return resp;
		}
	}

	NarrowItDownController.$inject = [ '$scope', 'MenuSearchService' ];
	function NarrowItDownController($scope, MenuSearchService) {
		$scope.searchTerm = '', $scope.foundItems = [];
		$scope.error = false;
		$scope.findItems = function() {
			var key = $scope.searchTerm;
			if (key && key.trim() != '') {
				var promise = MenuSearchService
						.getMatchedMenuItems($scope.searchTerm);

				promise.then(function(resp) {
					var list = resp.data, finalList = [];
					for (var i = 0; i < list.menu_items.length; i++) {
						if (list.menu_items[i].description
								.indexOf($scope.searchTerm) != -1) {
							finalList.push(list.menu_items[i]);
						}
					}
					$scope.foundItems = finalList;
					if ($scope.foundItems.length == 0) {
						$scope.error = true;
					} else {
						$scope.error = false;

					}
				}, function(resp) {
					$scope.error = true;
				});
			} else {
				$scope.error = true;
			}

		};
		$scope.removeItem = function(index) {
			$scope.foundItems.splice(index, 1);
		}
	}
})()