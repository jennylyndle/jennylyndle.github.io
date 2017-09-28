(function($) {
	'use strict';
	
	var showGallery = function(event, val) {
		$('.overall').load();
		//setTimeout(function(){
		$('.overall').album({
			visible : false
		});
		$('.overall').gallery({
			data : val.value,
			showImage : showImage,
			visible : true
		});
		$('.overall').load('destroy');//},10000);
	}
	var showAlbums = function(event, val) {
		$('.overall').load();
	//	setTimeout(function(){
			$('.overall').gallery({
				visible : false
			});
			$('.overall').album({
				visible : true,
				selectedYear : val.selectedYear,
				data : val.data,
				albumOpened : showGallery
			});
			$('.overall').load('destroy');
		//},10000);
	}
	var showImage = function(event, data) {
		$('.overall').imageDetail({
			imgSrc : data.imgSrc,
			imgHeading : data.imgHeading,
			imgDescription : data.imgDescription,
			pics : data.pics,
			index : data.index,
			visibility : true
		});
	}
	$.get("https://jennylyndle.github.io/picGallery/orig/JS/custom/pic.json",
			function(data) {
				$('.timeLineContainer').timeline({
					data : data,
					yearChange : showAlbums
				});
			})
})(jQuery);
