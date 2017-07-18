(function(){
	'use strict';
	
	var picJson = {};
	var selectedYear = 0;
	var yearRange = 1;
	var currMaxYear = 0;
	var currMinYear = 0;
	var maxYear = 0;
	var minYear = 0;
	
	var maintainYearSelection = function(){
		$('.year').removeClass('active');
		var elem = $('.yearContent:contains('+selectedYear+')');
		setTimeout(function(){elem.parent('.year').addClass('active')},200);
	};
	
	
	var showImage = function(){
		$('body').addClass('noScroll');
	    $(window).scrollTop(0);
		var imgSrc = $(this).data('full');
		var imgHeading = $(this).data('heading');
		var imgDescription = $(this).data('desc');
		var pics = $('.imageContainer').data('pics');
		var index = $(this).data('index');
		changePicNavigatorState(pics, index);
		$('.content img').attr('src',imgSrc).data('currImgIndex',index);
		$('.picHeading').text(imgHeading);
		$('.picDesc').text(imgDescription);
		$('.overlay, .content').show();
	};
	
	var createTimeLine = function(data){
		//var timeLineContainer = $('<div class="container-fluid"></div>');
		var timeLineRow = $('<div class="row timeline"></div>').data('year',data);
		var leftArrow = $('<div class="arrow arrow-left col-lg-1 col-md-1 col-sm-1 col-xs-1"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>');
		var rightArrow = $('<div class="arrow arrow-right col-lg-1 col-md-1 col-sm-1 col-xs-1 disabled"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>');
		timeLineRow.append(leftArrow);
		for(var i=2;i>=0;i--){
			var outerDiv = $('<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 year"></div>');
			
			//var yearRow = $('<div class="row yearRow"></div>');
			//var yearContent = $('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 yearContent">'+data.albums[i].year+'</div>');
			var yearContent = $('<div class="yearContent">'+data.albums[i].year+'</div>');
			//var selectorRow = $('<div class="row"></div>');
			var yearSelectorClass = data.albums[i].year;
			//var selector = $('<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 selector"></div>').addClass(yearSelectorClass);
			var selector = $('<div class="selector"></div>');
			
			if(i==0)
				{
				  outerDiv.addClass('active');
				  selector.addClass('showSelector');
				  yearContent.addClass('currMaxYear');
				}
			else if(i==2){
				  yearContent.addClass('currMinYear');
			}
			
			//yearRow.append(yearContent);
			//selectorRow.append(selector);
			
			outerDiv.append(yearContent)
					.append(selector);
			
			timeLineRow.append(outerDiv);
		}
		timeLineRow.append(rightArrow);
		currMaxYear = data.albums[0].year;
		currMinYear = data.albums[2].year;
		$('.timeLineContainer').append(timeLineRow);
	};
	
	var createPictureGallery = function(year,eventData){
		var albumContent = $('<div class="row"></div>');
		$('.imageContainer').html('');
		var data = eventData.pics;
		for(var i=0;i<data.length;i++){
			var imgsrc = data[i].thumbnail_url;
			var outerDiv = $('<div class="col-lg-3 col-md-4 col-sm-4 col-xs-6 mainDiv picDiv"></div>')
							.data('full', data[i].full_url)
							.data('index', i)
							.data('heading', data[i].title)
							.data('desc', data[i].desc);
			var albumImage = $('<img class="albumPic"></img>').attr('src',imgsrc);
			outerDiv.append(albumImage)
					.on('click', showImage);
			albumContent.append(outerDiv);
			//if(i%3==2 || (data.length-1==i))
			  // {
				   $('.imageContainer').append(albumContent);
				   //albumContent = $('<div class="row"></div>');
			   //}
		}
		$('.albumContainer').fadeOut('slow');
		$('#picsHeader').text(eventData.name);
		$('#albumSummary').text(eventData.summary);
		$('.albumBreadcrumbs').fadeIn("slow");
		$('#eventName').addClass('makeLink');
		$('.imageContainer').data('pics', data).fadeIn("slow")//.show();
	};
	
	var createAlbums = function(data, year){
		var galleryContent = $('<div class="row"></div>');
		$('.albumContainer').html('').hide();
		$('.albumBreadcrumbs').hide();
		for(var i=0;i<data.albums.length;i++)
			{
			 if(data.albums[i].year == year){
				 var events = data.albums[i].events;
				 for(var j=0;j<events.length;j++)
					 {
					   var imgsrc = events[j].pics[0].thumbnail_url;
					   var albumName = events[j].name;
					   var outerDiv = $('<div class="col-lg-3 col-md-4 col-sm-4 col-xs-6 mainDiv"></div>').data('pics', events[j]);
					   var albumImage = $('<img class="faceOfAlbum"></img>').attr('src',imgsrc);
					   var innerDiv = $('<div class="divOverlay"></div>');
					   var picDesc  = $('<div class="albumName"></div>').text(albumName);
					   outerDiv.append(albumImage)
					   		  // .append(innerDiv)
					   		   .append(picDesc)
					   		   .data('eventData', events[j])
					   		   .on('click', function(){
					   			   	createPictureGallery(year,$(this).data('pics'));
					   		   		});
					   galleryContent.append(outerDiv);
					   //if(j%3==2 || (events.length-1==j))
						 //  {
						   $('.albumContainer').append(galleryContent);
						   //galleryContent = $('<div class="row"></div>');
						   //}

					 }
			  break;	 
			 }
			 else
				 continue;
			}
		$('.imageContainer').fadeOut();
		$('#eventName').text("BAO Photo Gallery "+selectedYear);
		$('.albumContainer').fadeIn();
		//console.log(galleryContent);
	};
	
	$.get( "https://jennylyndle.github.io/picGallery/JS/custom/pic.json", function( data ) {
		picJson = data;
		selectedYear = data.albums[0].year;
		maxYear = data.albums[0].year;
		var noOfYears = data.albums.length;
		minYear = data.albums[noOfYears-1].year;
		createTimeLine(data);
		createAlbums(data, selectedYear);
		});
	
	$(document).click(function(e){
					if (e.target.class != 'content' && e.target.class!= 'mainDiv' && !$('.content').find(e.target).length && !$('.mainDiv').find(e.target).length) {
						$(".overlay, .content").hide();
						$('body').removeClass('noScroll');

				    }
				}).on('click', '.closeContainer', function(){
					$('.overlay, .content').hide();
					$('body').removeClass('noScroll');

				}).on('click', '.img-prev' ,function(){
					var currIndex = $('.content img').data('currImgIndex');
					var pics = $('.imageContainer').data('pics');
					if(pics[currIndex-1]){
						$('.content img').attr('src',pics[currIndex-1].full_url).data('currImgIndex',currIndex-1);
					}
					changePicNavigatorState(pics, currIndex-1);
				}).on('click', '.img-next' ,function(){
					var currIndex = $('.content img').data('currImgIndex');
					var pics = $('.imageContainer').data('pics');
					if(pics[currIndex+1]){
						$('.content img').attr('src',pics[currIndex+1].full_url).data('currImgIndex',currIndex+1);
					}
					changePicNavigatorState(pics, currIndex+1);
				}).on('click', '.year' ,function(){
					$('.year').removeClass('active')
					$(this).addClass('active');
					selectedYear = $(this).text();
					createAlbums(picJson, selectedYear);
				}).on('click', '.arrow-left' ,function(){
					if(!$(this).hasClass('disabled'))
					{
							$('.year').hide();
							$('.timeline .year').each(function(index){
								var elem = $(this).find('.yearContent');
								elem.text(parseInt(elem.text())-1);
							});
							$('.year').fadeIn(50);
							changeTimelineState('left');
							maintainYearSelection();

					}
				}).on('click', '.arrow-right' ,function(){
					if(!$(this).hasClass('disabled'))
					{
						$('.year').hide();
						$('.timeline .year').each(function(index){
							var elem = $(this).find('.yearContent');
							elem.text(parseInt(elem.text())+1);
						});
						$('.year').fadeIn(50);
						changeTimelineState('right');
						maintainYearSelection();
					}
				}).on('click', '.makeLink', function(){
					$('.imageContainer').fadeOut();
					$('#eventName').removeClass('makeLink');
					$('#picsHeader').html('');
					$('.albumContainer').fadeIn();

				});	
	var changeTimelineState = function(direction){

		currMaxYear = parseInt($('.currMaxYear').text());
		currMinYear = parseInt($('.currMinYear').text());
		if((maxYear - currMaxYear) < yearRange)
			{
				$('.arrow-right').addClass('disabled');
			}
		else
			$('.arrow-right').removeClass('disabled');
		if((currMinYear - minYear)<yearRange)
		{
			$('.arrow-left').addClass('disabled');
		}
		else
		$('.arrow-left').removeClass('disabled');

	}
	
	var changePicNavigatorState = function(pics, currIndex){
		if(pics[currIndex-1])
			$('.img-prev').removeClass('disabled');
		else
			$('.img-prev').addClass('disabled');
		if(pics[currIndex+1])
			$('.img-next').removeClass('disabled');
		else
			$('.img-next').addClass('disabled');
	}
	
})();