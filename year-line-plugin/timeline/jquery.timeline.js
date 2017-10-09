$
		.widget(
				"jen.yearline",
				{

					options : {
						range : 1,
						startYear : 2013,
						endYear : 2017,
						selectedYear : 2017,
						arrowLeft:'<<',
						arrowRight:'>>'
					},

					_create : function() {
						var timeLineRow = $('<div class="row timeline"></div>')
						var leftArrow = $('<div class="arrow arrow-left col-lg-1 col-md-1 col-sm-1 col-xs-1">'+this.options.arrowLeft+'</div>');
						var rightArrow = $('<div class="arrow arrow-right col-lg-1 col-md-1 col-sm-1 col-xs-1 disabled">'+this.options.arrowRight+'</div>');
						timeLineRow.append(leftArrow).append(rightArrow);
						this.element.append(timeLineRow);
						this._on(this.element, {
							"click.arrow-left" : function(event) {
								this._changeTimelineState(event);
							},
							"click.arrow-right" : function(event) {
								this._changeTimelineState(event);
							},
							"click.yearContent" : function(event) {
								this.element.find('.year')
										.removeClass('active');
								this.options.selectedYear = $(event.target)
										.text();
								$(event.target).parent('.year').addClass(
										'active');
								this._trigger("yearChange", event, {
									selectedYear : this.options.selectedYear,
								});
							}
						});
						this._update();
						this._trigger("yearChange", null, {
							// Pass additional information unique to this event
							selectedYear : this.options.selectedYear,
						});
					},
					_setOption : function(key, value) {
						this.options[key] = value;
						this._update();
					},

					_update : function(target) {
						var outerDiv = '';
						var colSize = 3;
						var totalRange = this.options.endYear-this.options.startYear;
						if(totalRange<=2){
							this.element.find('.arrow').addClass('disabled');
							colSize = Math.floor(10/(totalRange+1));
						}
							for (var i = this.options.endYear,j=0; i >= this.options.startYear&&j<=2; i--,j++) {
								outerDiv = $('<div class="col-lg-'+colSize+' col-md-'+colSize+' col-sm-'+colSize+' col-xs-'+colSize+' year"></div>');
								var yearContent = $('<div class="yearContent">'
										+ i + '</div>');
								var yearSelectorClass = i;
								var selector = $('<div class="selector"></div>');
								if (yearSelectorClass == this.options.selectedYear) {
									outerDiv.addClass('active');
									selector.addClass('showSelector');
								} 
								if(j==0){
									yearContent.addClass('currMaxYear');
									currMaxYear = i;
								}
								else if (j == 2) {
									yearContent.addClass('currMinYear');
									currMinYear = i;
								}
								outerDiv.append(yearContent).append(selector);
								this.element.find('.arrow-left').after(outerDiv);

							}
						
					},

					_changeTimelineState : function(event) {
						var elem = this.element;
						var target = event.target;
						var prev = ($(target).hasClass('arrow-left') || $(
								target).parent().hasClass('arrow-left'));
						if (!($(target).hasClass('disabled') || $(target)
								.parent().hasClass('disabled'))) {
							elem.find('.year').hide();
							var changeYearBy = 0;
							if (prev) {
								changeYearBy = -1;
							} else {
								changeYearBy = 1;
							}
							this.element.find('.year')
									.each(
											function(index) {
												var elem = $(this).find(
														'.yearContent');
												elem.text(parseInt(elem.text())
														+ (changeYearBy));
											});
							elem.find('.year').fadeIn(500);
							currMaxYear = parseInt(this.element.find(
									'.currMaxYear').text());
							currMinYear = parseInt(this.element.find(
									'.currMinYear').text());
							if ((this.options.endYear - currMaxYear) < this.options.range) {
								this.element.find('.arrow-right').addClass(
										'disabled');
							} else
								this.element.find('.arrow-right').removeClass(
										'disabled');
							if ((currMinYear - this.options.startYear) < this.options.range) {
								this.element.find('.arrow-left').addClass(
										'disabled');
							} else
								this.element.find('.arrow-left').removeClass(
										'disabled');
							this._maintainYearSelection();

						}
					},

					_maintainYearSelection : function() {
						this.element.find('.year').removeClass('active');
						var elem = this.element.find(
								'.yearContent:contains('
										+ this.options.selectedYear + ')')
								.parent('.year');
						elem.addClass('active');
					},

					_destroy : function() {
						this.element.find(".timeline").remove();
					}

				});
