var app = angular.module('LunchCheck', []);
app.controller('LunchCheckController', [ '$scope', function($scope) {
	$scope.result = '';
	$scope.checkLunch = function() {
		var items = $scope.lunchItems;
		var removeInvalidItems = function(arr)
		{
			arr.sort();
			var first = arr.indexOf(''), last=arr.lastIndexOf(''),range=0;
			if(first!=-1)
				{
				range = last-first;
				arr.splice(first, range+1);
				//return finalArr;
				}
			return arr;
		}
		if (items && items.trim() != '' && items != null) {
			if (removeInvalidItems(items.replace(/\ +/g,'').split(',')).length > 3) {
				$scope.result = 'Too much!';
				$scope.resultClass = 'fontRed';

			} else {
				$scope.result = 'Enjoy!';
				$scope.resultClass = 'fontGreen';
			}
		}
		else{
			$scope.result = 'Please enter the items!';
			$scope.resultClass = 'fontRed';

		}

	}
} ]);