(function(){
	'use strict';
	angular.module('public')
	.controller('myInfoController', myInfoController);
	
	myInfoController.$inject = ['info'];
	function myInfoController(info)
	{
		var myInfoCtrl = this;
		if(info&&info!=null&&info!='')
			{
			myInfoCtrl.signup = false;
			myInfoCtrl.info = info;

			}
		else{
			myInfoCtrl.signup = true;
		}
		console.log(myInfoCtrl.info);
	}
})();