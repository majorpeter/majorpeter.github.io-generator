/**
*	Major Péter
*	(c) MP 2014
*/

$(document).ready(function(){
	var hash = window.location.hash;
	if (hash)
		navigateToSection(hash);
	
	$('div.popuptitle').click(function(e){
		var id = $(this).parent().data('id');
		if (!id) return;
		
		if (!$('div#pd'+id).is(':visible'))
			openSection(id);
		else
			closeSection(id);
	}).mouseenter(function(e){
		$(this).children('span.toggle.hide').fadeIn(150);
	}).mouseleave(function(e){
		$(this).children('span.toggle.hide').stop().fadeOut(150);
	});
	
	$('div.popupcontainer').mouseenter(function(e){
		$(this).find('a.anchor').fadeIn(150);
	}).mouseleave(function(e){
		$(this).find('a.anchor').stop().fadeOut(150);
	});
	$('div.popuptitle > a.anchor').click(function(e){
		var selector = $(this).attr('href');
		navigateToSection(selector);
		
		e.stopPropagation();
		return false;
	});
});

function navigateToSection(selector) {
	$('html, body').stop().animate({
		scrollTop: $(selector).offset().top - 100
	}, 500, function(){
		if (!$('div#pd'+selector.substr(1)).is(':visible'))
			openSection(selector.substr(1), true);
		window.location.hash = selector;
	});
}

function openSection(id, scroll) {
	$('div#pd'+id).slideDown(300);
	$('div#'+id+' > span.toggle').animate({ borderSpacing: 90 }, {
	    step: function(now,fx) {
	      $(this).css('-webkit-transform','rotate('+now+'deg)'); 
	      $(this).css('-moz-transform','rotate('+now+'deg)');
	      $(this).css('transform','rotate('+now+'deg)');
	    },
	    duration: 300,
	    complete: function() {
			$(this).css('-webkit-transform','rotate(0deg)'); 
	      	$(this).css('-moz-transform','rotate(0deg)');
	     	$(this).css('transform','rotate(0deg)');
	     	$(this).css('background', 'url(img/tree_open.png)');
	     	
	     	if (scroll)
	     	$('html, body').stop().animate({
				scrollTop: $(this).offset().top - 100
			}, 500);
	    }
	},'linear');
}

function closeSection(id) {
	$('div#pd'+id).slideUp(300);
	var toggle = $('div#'+id+' span.toggle');
	toggle.css('-webkit-transform','rotate(90deg)'); 
  	toggle.css('-moz-transform','rotate(90deg)');
 	toggle.css('transform','rotate(90deg)');
	toggle.css('background', 'url(img/tree_closed.png)');
	toggle.animate({ borderSpacing: 0 }, {
	    step: function(now,fx) {
	      $(this).css('-webkit-transform','rotate('+now+'deg)'); 
	      $(this).css('-moz-transform','rotate('+now+'deg)');
	      $(this).css('transform','rotate('+now+'deg)');
	    },
	    duration: 300,
	    complete: function() {
			$(this).css('-webkit-transform','rotate(0deg)'); 
	      	$(this).css('-moz-transform','rotate(0deg)');
	     	$(this).css('transform','rotate(0deg)');
    	},
	},'linear');
}
