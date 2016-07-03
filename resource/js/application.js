$(document).ready(function(){
	//contact form boxes
	$('form#contact_form').submit(function(e){
		e.preventDefault();
		$('form#contact_form div.form-error').slideUp(100, function(){
			$(this).remove();
		});
		$.ajax({
			url: 'ajax.php',
			method: 'post',
			data: $(this).serialize(),
			success: function(resp){
				$('form#contact_form div.form-error').slideUp(100, function(){
					$(this).remove();
				});
				resp = resp.split('\n');
				if (typeof resp[1] == 'string') {
					var field = $('form#contact_form [name="'+resp[1]+'"]');
					var msg = $('<div class="form-error">'+resp[0]+'</div>');
					field.after(msg);
					msg.slideDown(200);
					field.focus();
				} else { //successful send
					alert(resp[0]);
					$('div#contact-block div.fields').fadeOut(500);
				}
			}
		});
	});
	$('div#contact-block div.fields input[type="text"], div#contact-block div.fields textarea').focus(function(e){
		if (this.value == this.getAttribute('data-default'))
			this.value = '';
	});
	$('div#contact-block div.fields input[type="text"], div#contact-block div.fields textarea').blur(function(e){
		if (this.value == '')
			this.value = this.getAttribute('data-default');
	});
	
	$('div#header a.logo, div#footer div.top').click(function(e){
		e.preventDefault();
		$('html, body').stop().animate({
			scrollTop: 0
		}, 500);
	});
	
	//parallax bg movement
	$(window).scroll(updateBgs);
	$(window).resize(updateBgs);
});

function toggleSmallMenu() {
	var sm = $('div#header ul.small-menu');
	if (!sm.is(':visible'))
		sm.slideDown(200);
	else
		sm.slideUp(200);
}

function updateBgs(){
	var st = $(this).scrollTop();
	//about-us
	$('div#main-content div.background').css('top', -st/2);
}
