var slideWrapper = $("#education-video"),
iframes = slideWrapper.find('.embed-player'),
lazyImages = slideWrapper.find('.slide-image'),
lazyCounter = 0;

function postMessageToPlayer(player, command){
	if (player == null || command == null) return;
	player.contentWindow.postMessage(JSON.stringify(command), "*");
}

function playPauseVideo(slick, control){
	var currentSlide, slideType, startTime, player, video;

	currentSlide = slick.find(".slick-current");
	slideType = currentSlide.attr("class").split(" ")[1];
	player = currentSlide.find("iframe").get(0);
	startTime = currentSlide.data("video-start");

	if (slideType === "vimeo") {
		switch (control) {
			case "play":
			if ((startTime != null && startTime > 0 ) && !currentSlide.hasClass('started')) {
				currentSlide.addClass('started');
				postMessageToPlayer(player, {
					"method": "setCurrentTime",
					"value" : startTime
				});
			}
			postMessageToPlayer(player, {
				"method": "play",
				"value" : 1
			});
			break;
			case "pause":
			postMessageToPlayer(player, {
				"method": "pause",
				"value": 1
			});
			break;
		}
	} else if (slideType === "youtube") {
		switch (control) {
			case "play":
			postMessageToPlayer(player, {
				"event": "command",
				"func": "mute"
			});
			postMessageToPlayer(player, {
				"event": "command",
				"func": "playVideo"
			});
			break;
			case "pause":
			postMessageToPlayer(player, {
				"event": "command",
				"func": "pauseVideo"
			});
			break;
		}
	} else if (slideType === "video") {
		video = currentSlide.children("video").get(0);
		if (video != null) {
			if (control === "play"){
				video.play();
			} else {
				video.pause();
			}
		}
	}
}

function resizePlayer(iframes, ratio) {
	if (!iframes[0]) return;
	var win = $("#education-video"),
	width = win.width(),
	playerWidth,
	height = win.height(),
	playerHeight,
	ratio = ratio || 16/9;

	iframes.each(function(){
		var current = $(this);
		if (width / ratio < height) {
			playerWidth = Math.ceil(height * ratio);
			current.width(playerWidth).height(height).css({
				left: (width - playerWidth) / 2,
				top: 0
			});
		} else {
			playerHeight = Math.ceil(width / ratio);
			current.width(width).height(playerHeight).css({
				left: 0,
				top: (height - playerHeight) / 2
			});
		}
	});
}

function changeTitleForm(){
	var this_width = $(window).width();
	var this_title = $('#title-form');
	if(this_title.length > 0){
		var thisTitleDesktop = $(this_title).data('desktop');
		var thisTitleMobile  = $(this_title).data('mobile');
		if(this_width > 557){
			$(this_title).text(thisTitleDesktop);
		} else {
			$(this_title).text(thisTitleMobile);
		}
	}
}

var delayInMilliseconds = 500;

$(function(){
	var this_slideshow 			= $('.slideshow');
	var countImages    			= $('img').size();
	var SITEURL                 = $('base').attr('href');
	var this_form               = $('#searching-domain');
	var this_input              = $('#searching-domain').find('#search');
	var this_keyword            = $('#searching-domain').find('#keyword');
	var this_prefix             = $('#searching-domain').find('#is_prefix');
	var this_suffix             = $('#searching-domain').find('#is_suffix');
	var this_click              = $('#searching-domain').find('#is_click');
	var this_icon_src           = $(this_form).find('.fa-search');
	var this_icon_load          = $(this_form).find('.fa-cog');
	var this_holder             = $('#holder');
	var this_thumbnail          = $('#thumbnail');
	var this_wrapper_container  = $('#wrapper-search-form');
	var this_result_container   = $('#result-search');
	var this_result_title       = $(this_result_container).find('#result-title');
	var this_result_domain      = $(this_result_container).find('#result-domain');
	var this_api                = '';
	var this_wrapper_click      = $('.wrapper-click');

	var this_my_modal            = $('#myModal');
	var this_my_result_container = $(this_my_modal).find('.result-search');
	var this_my_result_title     = $(this_my_result_container).find('.result-title');
	var this_my_result_domain    = $(this_my_result_container).find('.result-domain');

	var this_prefix_modal            = $('#prefix');
	var this_prefix_result_container = $(this_prefix_modal).find('.result-search');
	var this_prefix_result_title     = $(this_prefix_result_container).find('.result-title');
	var this_prefix_result_domain    = $(this_prefix_result_container).find('.result-domain');

	var this_seg1_modal            = $('#seg1');
	var this_seg1_result_container = $(this_seg1_modal).find('.result-search');
	var this_seg1_result_title     = $(this_seg1_result_container).find('.result-title');
	var this_seg1_result_domain    = $(this_seg1_result_container).find('.result-domain');

	var this_seg2_modal            = $('#seg2');
	var this_seg2_result_container = $(this_seg2_modal).find('.result-search');
	var this_seg2_result_title     = $(this_seg2_result_container).find('.result-title');
	var this_seg2_result_domain    = $(this_seg2_result_container).find('.result-domain');

	var this_seg3_modal            = $('#seg3');
	var this_seg3_result_container = $(this_seg3_modal).find('.result-search');
	var this_seg3_result_title     = $(this_seg3_result_container).find('.result-title');
	var this_seg3_result_domain    = $(this_seg3_result_container).find('.result-domain');

	var this_seg4_modal            = $('#seg4');
	var this_seg4_result_container = $(this_seg4_modal).find('.result-search');
	var this_seg4_result_title     = $(this_seg4_result_container).find('.result-title');
	var this_seg4_result_domain    = $(this_seg4_result_container).find('.result-domain');

	var this_seg5_modal            = $('#seg5');
	var this_seg5_result_container = $(this_seg5_modal).find('.result-search');
	var this_seg5_result_title     = $(this_seg5_result_container).find('.result-title');
	var this_seg5_result_domain    = $(this_seg5_result_container).find('.result-domain');

	var this_suffix_modal            = $('#suffix');
	var this_suffix_result_container = $(this_suffix_modal).find('.result-search');
	var this_suffix_result_title     = $(this_suffix_result_container).find('.result-title');
	var this_suffix_result_domain    = $(this_suffix_result_container).find('.result-domain');

	$('.lazy').Lazy({
		scrollDirection: 'vertical',
		effect: 'fadeIn',
		visibleOnly: true
	});

	$('.slideshow.desktop').slick({
	    infinite: true,
		autoplay: true,
		autoplaySpeed:4000,
		lazyLoad:"progressive",
		speed:600,
		arrows:false,
		dots: true,
		cssEase:"cubic-bezier(0.87, 0.03, 0.41, 0.9)",
		slidesToShow: 1,
		slidesToScroll: 1,
		appendDots: document.getElementById('dots'),
	});

	$('.slideshow.mobile').on("init", function(event, slick){
    	var getImage = $(event.target).find('.landing-mobile');
    	if(getImage.length > 0){
    		$.each(getImage,function(i,v){
    			var getSrc   = $(v).attr('src');
    			$(this).css({'background-image' : 'url(' + getSrc + ')'});
    		});
    	}
	});

	$('.slideshow.mobile').slick({
	    infinite: true,
		autoplay: true,
		autoplaySpeed:4000,
		lazyLoad:"progressive",
		speed:600,
		arrows:false,
		dots: false,
		cssEase:"cubic-bezier(0.87, 0.03, 0.41, 0.9)",
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		cssEase: 'linear'
	});

	$('body').imagesLoaded({background: true}).progress( function( instance, image ) {
		if(image.isLoaded) {
			setTimeout(function(){
				$(image.img).addClass('loaded');
				var countLoadedImages = $('body img.loaded').size();
				var result = 100 * (countLoadedImages / countImages);
				var width  = result.toFixed(0);
				if(width == 100){
					$('#preloader').fadeOut();
					$('body').removeClass('hidden-scroll');
				}
				new WOW().init();
			},100);
		}
	});

	var slideWrapper = $("#education-video"),
	iframes = slideWrapper.find('.embed-player'),
	lazyImages = slideWrapper.find('.slide-image'),
	lazyCounter = 0;

	slideWrapper.on("init", function(slick){
		slick = $(slick.currentTarget);
		setTimeout(function(){
			playPauseVideo(slick,"play");
		}, 1000);
	});
	slideWrapper.on("beforeChange", function(event, slick) {
		slick = $(slick.$slider);
		playPauseVideo(slick,"pause");
	});
	slideWrapper.on("afterChange", function(event, slick) {
		slick = $(slick.$slider);
		playPauseVideo(slick,"pause");
	});
	slideWrapper.on("lazyLoaded", function(event, slick, image, imageSource) {
		lazyCounter++;
		if (lazyCounter === lazyImages.length){
			lazyImages.addClass('show');
		}
	});

	slideWrapper.on('afterChange init', function(event, slick, direction){
		slick.$slides.removeClass('prevSlide').removeClass('nextSlide');
		for (var i = 0; i < slick.$slides.length; i++)
		{
			var $slide = $(slick.$slides[i]);
			if ($slide.hasClass('slick-current')) {
				$slide.prev().addClass('prevSlide');
				$slide.next().addClass('nextSlide');
				break;
			}
		}
	}
	)
	.on('beforeChange', function(event, slick) {
		slick.$slides.removeClass('prevSlide').removeClass('nextSlide');
	}).slick({
	    infinite: false,
		centerMode: true,
		autoplaySpeed:4000,
		lazyLoad:"progressive",
		speed:600,
		arrows:true,
		dots:true,
		cssEase:"cubic-bezier(0.87, 0.03, 0.41, 0.9)",
		slidesToShow: 1
	});

	$('.wrapper-click').find('a').on('click',function(e){
		e.preventDefault();
		var this_el     = $(this);
		var this_data   = $(this).data('sticky');
		var this_parent = $(this).closest('.wrapper-click');
		var this_sticky = $('#'+this_data);
		$(this_sticky).toggleClass("active");
		$(this_parent).toggleClass("active");
		setTimeout(function(){
			var this_hasclass = [];
			$.each(this_wrapper_click,function(i,v){
				var this_element = $(this);
				$(v).toggleClass('hidden'); 
				if($(v).hasClass('active')){
					$(v).toggleClass("hidden");
				}
				this_hasclass.push($(v).hasClass('active'));
				var count = this_hasclass.reduce(function(prevVal, currVal) {
					return prevVal + (!currVal ? 1 : 0);
				}, 0);
				if(count === 3){
					$('.wrapper-click').removeClass("hidden");
				}
			});
		});
	});

	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
			'X-NAMESUGGESTION-APIKEY': 'c7167278dfdcbd8cab72ea3c60182e93'
			//'X-NAMESUGGESTION-APIKEYS': $('meta[name="csrf-token"]').attr('content','c7167278dfdcbd8cab72ea3c60182e93')
		}
	});

	$('.container-item-element').scrollbar();

	$(this_form).on('submit',function(e){
		e.preventDefault();
		var getDataSearch   = $(this_input).val();
		var getDataKeyword  = $(this_keyword).val();
		var elOffset        = $(this_form).offset().top;
		var elHeight        = $(this_form).height();
		var windowHeight    = $(window).height();

		if (elHeight < windowHeight) {
			offset = elOffset - ((windowHeight / 2) - (elHeight / 2));
		}
		else {
			offset = elOffset;
		}

		$(this_suffix).val("");
		$(this_prefix).val("");
		$(this_keyword).val(getDataSearch);

		var this_data      = $(this).serializeArray();

		$.ajax({
			url: SITEURL + '/getdomain',
			type: 'GET',
			dataType: 'json',
			data: this_data,
			beforeSend: function(obj){
				$('#myModal').modal('hide');
				$('.header').removeClass('show-result');

				$('#prefix').modal('hide');
				$('#seg1').modal('hide');
				$('#seg2').modal('hide');
				$('#seg3').modal('hide');
				$('#seg4').modal('hide');
				$('#seg5').modal('hide');
				$('#suffix').modal('hide');
				$(this_my_result_container).slideUp();

				$(this_icon_src).hide();
				$(this_icon_load).fadeIn();

				$('#valid_message').html('');
				$('#valid_message').slideUp();
				$('html,body').animate({scrollTop: offset }, 400);
			},
			success: function(result){
				$(this_my_result_title).empty();
				$(this_my_result_domain).empty();

				$(this_seg1_result_title).empty();
				$(this_seg1_result_domain).empty();

				$(this_seg2_result_title).empty();
				$(this_seg2_result_domain).empty();

				$(this_seg3_result_title).empty();
				$(this_seg3_result_domain).empty();

				$(this_seg4_result_title).empty();
				$(this_seg4_result_domain).empty();

				$(this_seg5_result_title).empty();
				$(this_seg5_result_domain).empty();

				$(this_prefix_result_title).empty();
				$(this_prefix_result_domain).empty();

				$(this_suffix_result_title).empty();
				$(this_suffix_result_domain).empty();

				if(result.valid){
					if(result.redirect === undefined){
						setTimeout(function(){
							$(this_my_result_title).append(result.message);
							$(this_my_result_domain).append(result.prefix);

							if(result.getEndpoint !== undefined){
								$.each(result.getEndpoint,function(i,v){
									$(this_my_result_domain).append(v);
									var this_el_segs               = '#seg'+i;
									var this_segs_modal            = $('#seg'+i);
									var this_segs_result_container = $(this_segs_modal).find('.result-search');
									var this_segs_result_title     = $(this_segs_result_container).find('.result-title');
									var this_segs_result_domain    = $(this_segs_result_container).find('.result-domain');
									$(this_segs_result_domain).append(v);
								});
							}
							$(this_my_result_domain).append(result.suffix);
							$(this_prefix_result_domain).append(result.prefix);
							$(this_suffix_result_domain).append(result.suffix);
							setTimeout(function(){
								$('#myModal').modal('show');
								$(this_click).val(0);
								setTimeout(function(){
									var elOffset  = $(this_form).offset().top;
									$(document).find('.container-item-element').scrollbar();
									$('html,body').animate({scrollTop: elOffset }, 400);
									$('.header').addClass('show-result');
									$(document).find('.category-heading').matchHeight();
									$(document).find('.item-element').matchHeight();
								});
							});
						});
					} else {
						window.location.href = result.redirect;
					}
				} else {
					$('#valid_message').html(result.error_message.search[0]);
					$('#valid_message').slideDown();
				}
				$(this_icon_load).hide();
				$(this_icon_src).fadeIn();
			},
			error: function(xhr, ajaxOptions, thrownError){
				$('#valid_message').html(thrownError);
				$('#valid_message').slideDown();
				$(this_icon_load).hide();
				$(this_icon_src).fadeIn();
			},
		});
	});

	$(document).find('.result-search').on('click','.result-available',function(e){
		e.preventDefault();
		var domain    = $(this).data('domain').replace(".com","");
		var prefix    = $(this).data('prefix');
		var suffix    = $(this).data('suffix');
		$(this_prefix).val(prefix);
		$(this_suffix).val(suffix);
		$(this_input).val(domain);
		$(this_keyword).val(domain);
		var this_data = $(this_form).serializeArray();

		$.ajax({
			url: SITEURL + '/getdomain',
			type: 'GET',
			dataType: 'json',
			data: this_data,
			beforeSend: function(obj){
				$('#myModal').modal('hide');
				$('.header').removeClass('show-result');

				$('#prefix').modal('hide');
				$('#seg1').modal('hide');
				$('#seg2').modal('hide');
				$('#seg3').modal('hide');
				$('#seg4').modal('hide');
				$('#seg5').modal('hide');
				$('#suffix').modal('hide');

				$(this_icon_src).hide();
				$(this_icon_load).fadeIn();

				$(this_my_result_container).slideUp();

				$('#valid_message').html('');
				$('#valid_message').slideUp();
				$('html,body').animate({scrollTop: offset }, 400);
			},
			success: function(result){
				$(this_my_result_title).empty();
				$(this_my_result_domain).empty();

				$(this_seg1_result_title).empty();
				$(this_seg1_result_domain).empty();

				$(this_seg2_result_title).empty();
				$(this_seg2_result_domain).empty();

				$(this_seg3_result_title).empty();
				$(this_seg3_result_domain).empty();

				$(this_seg4_result_title).empty();
				$(this_seg4_result_domain).empty();

				$(this_seg5_result_title).empty();
				$(this_seg5_result_domain).empty();

				$(this_prefix_result_title).empty();
				$(this_prefix_result_domain).empty();

				$(this_suffix_result_title).empty();
				$(this_suffix_result_domain).empty();

				if(result.valid){
					if(result.redirect === undefined){
						setTimeout(function(){
							$(this_my_result_title).append(result.message);
							$(this_my_result_domain).append(result.prefix);

							if(result.getEndpoint !== undefined){
								$.each(result.getEndpoint,function(i,v){
									$(this_my_result_domain).append(v);
									var this_el_segs               = '#seg'+i;
									var this_segs_modal            = $('#seg'+i);
									var this_segs_result_container = $(this_segs_modal).find('.result-search');
									var this_segs_result_title     = $(this_segs_result_container).find('.result-title');
									var this_segs_result_domain    = $(this_segs_result_container).find('.result-domain');
									$(this_segs_result_domain).append(v);
								});
							}

							$(this_my_result_domain).append(result.suffix);
							$(this_prefix_result_domain).append(result.prefix);
							$(this_suffix_result_domain).append(result.suffix);
							setTimeout(function(){
								$('#myModal').modal('show');
								$(this_click).val(0);
								setTimeout(function(){
									var elOffset  = $(this_form).offset().top;
									$(document).find('.container-item-element').scrollbar();
									$('html,body').animate({scrollTop: elOffset }, 400);
									$('.header').addClass('show-result');
									$(document).find('.category-heading').matchHeight();
									$(document).find('.item-element').matchHeight();
								});
							});
						});
					} else {
						window.location.href = result.redirect;
					}
				} else {
					$('#valid_message').html(result.error_message.search[0]);
					$('#valid_message').slideDown();
				}
				$(this_icon_load).hide();
				$(this_icon_src).fadeIn();
			},
			error: function(xhr, ajaxOptions, thrownError){
				$('#valid_message').html(thrownError);
				$('#valid_message').slideDown();
				$(this_icon_load).hide();
				$(this_icon_src).fadeIn();
			},
		});
	});

	$(document).find('#result-search').on('click','#redirect-to',function(e){
		e.preventDefault();
		$(this_click).val(1);
		var this_data = $(this_form).serializeArray();

		$.ajax({
			url: SITEURL + '/getdomain',
			type: 'GET',
			dataType: 'json',
			data: this_data,
			beforeSend: function(obj){
				$('#myModal').modal('hide');
				$('.header').removeClass('show-result');
				$(this_icon_src).hide();
				$(this_icon_load).fadeIn();
				$(this_my_result_container).slideUp();

				$('#valid_message').html('');
				$('#valid_message').slideUp();
				$('html,body').animate({scrollTop: offset }, 400);
			},
			success: function(result){
				window.location.href = result.redirect;
				$(this_my_result_title).empty();
				$(this_my_result_domain).empty();
			},
			error: function(xhr, ajaxOptions, thrownError){
				$('#valid_message').html(thrownError);
				$('#valid_message').slideDown();
				$(this_icon_load).hide();
				$(this_icon_src).fadeIn();
			},
		});
	});

	$(document).find('.result-search').on('click','.btn-close-result',function(e){
		var this_collapse  = $(this).closest('.modal');
		var this_list      = $(this).closest('.row-list-item');
		$(this_list).fadeOut("normal", function() {
			$(this).remove();
			var this_segment = $(this_collapse).find('.btn-close-result');
			var this_keyword = [];
			if(this_segment.length > 0){
				$.each(this_segment,function(i,v){
					var this_data_segment = $(v).data('segment');
					this_keyword.push(this_data_segment);
				});
			}
			if(this_keyword.length > 0){
				var this_new_keyword= this_keyword.join("");
				var elOffset        = $(this_form).offset().top;
				var elHeight        = $(this_form).height();
				var windowHeight    = $(window).height();
				var this_keyword    = $('#searching-domain').find('#keyword');
				if (elHeight < windowHeight) {
					offset = elOffset - ((windowHeight / 2) - (elHeight / 2));
				}
				else {
					offset = elOffset;
				}

				$(this_suffix).val("");
				$(this_prefix).val("");
				$(this_keyword).val(this_new_keyword);
				$(this_input).val(this_new_keyword);

				$(this_form).trigger('submit');

			} else {
				var this_keyword    = $('#searching-domain').find('#keyword');
				$(this_suffix).val("");
				$(this_prefix).val("");
				$(this_keyword).val("");
				$(this_input).val("");
				$('#myModal').modal('hide');
				$(this_my_result_title).empty();
				$(this_my_result_domain).empty();

				$(this_seg1_result_title).empty();
				$(this_seg1_result_domain).empty();

				$(this_seg2_result_title).empty();
				$(this_seg2_result_domain).empty();

				$(this_seg3_result_title).empty();
				$(this_seg3_result_domain).empty();

				$(this_seg4_result_title).empty();
				$(this_seg4_result_domain).empty();

				$(this_seg5_result_title).empty();
				$(this_seg5_result_domain).empty();

				$(this_prefix_result_title).empty();
				$(this_prefix_result_domain).empty();

				$(this_suffix_result_title).empty();
				$(this_suffix_result_domain).empty();

				$('.header').removeClass('show-result');
			}
		});
	});

	var $el         = $(".header");
	var bottom      = $el.position().top + $el.offset().top + $el.outerHeight(true);
	var go_to_form  = $('.go-to-form');
	var scrollPos   = $(window).scrollTop();

	if(scrollPos > bottom){
		$(go_to_form).addClass('show');
	}

	$(window).scroll(function(){
		var scrollPos = $(this).scrollTop();
		if(scrollPos > bottom){
			$(go_to_form).addClass('show');
		} else {
			$(go_to_form).removeClass('show');
		}
	});

	$(go_to_form).on('click',function(e){
		e.preventDefault();
		$('html,body').animate({scrollTop: $el.offset().top }, 1000);
	});

	var cookiealert = $('.cookiealert');

	$(cookiealert).addClass('show');
	$(cookiealert).find('.close').on('click',function(e){
		e.preventDefault();
		$.get(SITEURL + '/setcookie', function( data ) {
			if(data.flag != undefined){
				var accepted = true;
			}
		});
		$(cookiealert).removeClass('show');
	});

	$('#myModal').on('show.bs.modal', function (e) {
		$(this_my_result_container).slideDown();
		$('.header').addClass('show-result');
	}).on('hide.bs.modal', function (e) {
		$('.header').removeClass('show-result');
	});

	$('#prefix').on('show.bs.modal', function (e) {
		$('#mask-collapse').addClass("show");
		$('html').addClass("overflow-hidden");
	}).on('hide.bs.modal', function (e) {
		$('#mask-collapse').removeClass("show");
		$('html').removeClass("overflow-hidden");
	});

	$('#seg1').on('show.bs.modal', function (e) {
		$('#mask-collapse').addClass("show");
		$('html').addClass("overflow-hidden");
	}).on('hide.bs.modal', function (e) {
		$('#mask-collapse').removeClass("show");
		$('html').removeClass("overflow-hidden");
	});

	$('#seg2').on('show.bs.modal', function (e) {
		$('#mask-collapse').addClass("show");
		$('html').addClass("overflow-hidden");
	}).on('hide.bs.modal', function (e) {
		$('#mask-collapse').removeClass("show");
		$('html').removeClass("overflow-hidden");
	});

	$('#seg3').on('show.bs.modal', function (e) {
		$('#mask-collapse').addClass("show");
		$('html').addClass("overflow-hidden");
	}).on('hide.bs.modal', function (e) {
		$('#mask-collapse').removeClass("show");
		$('html').removeClass("overflow-hidden");
	});

	$('#seg4').on('show.bs.modal', function (e) {
		$('#mask-collapse').addClass("show");
		$('html').addClass("overflow-hidden");
	}).on('hide.bs.modal', function (e) {
		$('#mask-collapse').removeClass("show");
		$('html').removeClass("overflow-hidden");
	});

	$('#seg5').on('show.bs.modal', function (e) {
		$('#mask-collapse').addClass("show");
		$('html').addClass("overflow-hidden");
	}).on('hide.bs.modal', function (e) {
		$('#mask-collapse').removeClass("show");
		$('html').removeClass("overflow-hidden");
	});

	$('#suffix').on('show.bs.modal', function (e) {
		$('#mask-collapse').addClass("show");
		$('html').addClass("overflow-hidden");
	}).on('hide.bs.modal', function (e) {
		$('#mask-collapse').removeClass("show");
		$('html').removeClass("overflow-hidden");
	});

	$("#myModal").on('shown.bs.modal', function () {
		$(document).find('.category-heading').matchHeight();
		$(document).find('.item-element').matchHeight();
	});

	$('.close-result').on('click',function(){
		$("#myModal").modal('hide');
	});

	changeTitleForm();

	$(window).on('resize',function(e){
		var this_width = $(window).width();
		if(this_width > 974){
			$('#prefix').modal('hide');
			$('#seg1').modal('hide');
			$('#seg2').modal('hide');
			$('#seg3').modal('hide');
			$('#seg4').modal('hide');
			$('#seg5').modal('hide');
			$('#suffix').modal('hide');
		}

		changeTitleForm();
	});

});