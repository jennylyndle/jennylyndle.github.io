(function(){
	'use strict';
	
	angular.module('common')
	.service('userInfoService', userInfoService);
	
	function userInfoService(){
		this.setUserInfo = function(userInfo){
							this.userInfo = userInfo;
							console.log('setting data:'+this.userInfo);
							
							};
		this.getUserInfo = function(){
			console.log('data return from service:'+this.userInfo);
			return this.userInfo;
		}					
	}
})();