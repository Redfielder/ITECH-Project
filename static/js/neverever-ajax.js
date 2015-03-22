$(document).ready(function() {
	
	$('#add_button').click(function(){
		$.get('/add_player/', function(data) {
			$('#answer_zone').html(data["rendered"]);
            if (data["nPlayers"] >= 6){
                $('#add_button').prop('disabled', true);
            }
			$('input:checkbox').bootstrapSwitch();
		});
	});

	setInterval(function(){
		$.get('/update_count/', function(data) {
			$("#session_footer").html(data);
		})
	}, 2500);

	$('#likes').click(function(){
	    var title;
	    title = $(this).attr("data-title");
	    $.get('/like_statement/', {title: title}, function(data){
	               $('#like_count').html(data);
	               $('#likes').prop('disabled', true);
	    });
	});

	//initialise popover when page is loaded
	$(function() {
		$("[data-toggle='popover']").popover();
	});
	
	//reinitalise popover after ajax content is loaded
	$(document).ajaxComplete(function() {
		$(function() {
			$("[data-toggle='popover']").popover();
		});
	});

	$("body").on('keypress', '.editable_name', function(event) {
		if(event.keyCode == 13) {
			event.preventDefault();
			var playernum;
			playernum = $(this).attr("data-playernum");
			var thisname;
			thisname = $(this).html();
			$.get('/set_name/', {stamp: playernum, name: thisname}, function(data) {
				$('#answer_zone').html(data);
				$('input:checkbox').bootstrapSwitch();
			});
		}
	});

	$("body").on('click', '.editable_name', function(event) {
		$(this).html("");
		$(this).attr('contenteditable', true);
		$(this).focus();
	});


	/*$('.menu > li').mouseover(function() {
		//alert("bla");
		$(this).find('ul').css('visibility', 'visible');
	});*/

	$("body").on('mouseover', '#catlist', function() {
		//alert("bla");
		$(this).find('ul').css('visibility', 'visible');
	});

	$("body").on('mouseout', '.menu > li', function() {
		$(this).find('ul').css('visibility', 'hidden');
	});

	/*$('.cat_list_item').click(function() {
		var cat_name
		cat_name = $(this).html();
		$.get('/stats_test/', {cat_name: cat_name}, function(data) {
			$("body").html(data);
		});
	});*/

	$("body").on('click', '.cat_list_item', function() {
		//alert("come on");
		var cat_name
		cat_name = $(this).html();
		$.get('/stats_test/', {cat_name: cat_name}, function(data) {
			$('#statements').html(data);
		});
	});

});