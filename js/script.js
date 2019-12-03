$('.nav-link').on('click',function(e) {
	e.preventDefault();

	var scroll = $(this).attr('href');
	var tujuan = $(scroll);

	$('html').animate({
		scrollTop: tujuan.offset().top - 50
	},1000,'swing');
	
});

$('.btnShow').on('click',function(e) {
	e.preventDefault();

	var alamat = $(this).attr('href');

});

$(window).on('scroll',function(){
	var scroll = $(this).scrollTop();
	if ( scroll < 10 ) {
		$('#navbar .navbar').removeClass('fixed');
	} else{
		$('#navbar .navbar').addClass('fixed');
	}

	if (scroll > 120) {
		$('#about .about-content').addClass('show');	
	}

	if (scroll > 500) {
		$('#portfolio .boxThumbnail').addClass('show');	
		$('#portfolio .thumbnail').addClass('show');	
	}

	if (scroll > $('#contact').offset().top-51) {
		$('.nav-link').removeClass('text-warning');
		$('.contact-link').addClass('text-warning');
	}else if(scroll > $('#portfolio').offset().top-51){
		$('.nav-link').removeClass('text-warning');
		$('.portfolio-link').addClass('text-warning');
	}else if(scroll > $('#about').offset().top-51){
		$('.nav-link').removeClass('text-warning');
		$('.about-link').addClass('text-warning');
	}else{
		$('.nav-link').removeClass('text-warning');
	}

});

function showTitle() {
	setTimeout(function(){
		$('.carousel h1').addClass('show');
		$('.carousel h3').addClass('show');
	},500);
}

$(window).on('load',showTitle());
$('.ctrl').on('click',function(){
	$('.carousel h1').removeClass('show');
	$('.carousel h3').removeClass('show');
	showTitle();
});

$('.thumbnail').on('click',function(e){
	e.preventDefault();
	var id = $(this).attr('href');
	$.getJSON('data/portfolio.json',function(data) {

		var portfolio = data.portfolio;
		for (var i = 0; i < portfolio.length; i++) {
			var index = portfolio[i].id;
			if (id == index) {
				var html = '<div class="row">';
				var loopImg = portfolio[i].files;			

				for (var k = 0; k < loopImg.length; k++) {
					html +=
					'<div class="col-lg-4 detailFoto">'+
					'<img src="img/portfolio/'+loopImg[k].thumbs+'">'+
					'<p>'+loopImg[k].keterangan+'</p>'+
					'</div>';
				}
				html +=
				'</div>'
				+ '<div class="text-justify">'
				+ portfolio[i].ket;
				+ '</div>';
			}
		}
		$('.modal-body').html(html);
	})
});

