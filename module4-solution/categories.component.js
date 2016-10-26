(function() {
	'use strict';

	angular.module('MenuApp').component('categories', {
		templateUrl : 'categoriesTemplate.html',
		bindings : {
			allcategories : '<'
		}
	})
})();