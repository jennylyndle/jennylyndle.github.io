(function() {
	'use strict';

	angular.module('MenuApp').component('items', {
		templateUrl : 'itemsTemplate.html',
		bindings : {
			allitems : '<'
		}
	})
})();