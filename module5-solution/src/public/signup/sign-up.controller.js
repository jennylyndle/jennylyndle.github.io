(function(){
	'use strict';
	
	angular.module('public')
	.controller('signUpController',signUpController);
	
	signUpController.$inject=['ApiPath','userInfoService','MenuService'];
	
	function signUpController(ApiPath,userInfoService, MenuService){
		var reg = this;
			reg.menuInvalid = '';
			reg.success = false;
			reg.submit = function(){
			console.log('signing up:'+reg.user);
			var promise = MenuService.getMenuItem(reg.user.favitem);
			promise.then(function(response){
				console.log('menu info: '+response.data);
				reg.user.favitemInfo = response.data;
				reg.user.imgsrc = ApiPath+'/images/'+reg.user.favitem+'.jpg';
				userInfoService.setUserInfo(reg.user);
				reg.success = true;
			},
			function(){
				reg.menuInvalid = true;
			});
		}
		
	}
})();