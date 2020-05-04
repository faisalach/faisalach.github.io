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
$('#contact').css({minHeight : $(window).height()+'px'});

$(window).on('scroll',function(){
	var scroll = $(this).scrollTop();

	if ( scroll < 10 ) {
		$('#navbar .navbar').removeClass('fixed');
	} else{
		$('#navbar .navbar').addClass('fixed');
	}

	if (scroll > $('#skill').offset().top-200) {
		$.each($('.skill .box'),function(i,j) {
			setTimeout(function() {
				j.classList.add('show');
			},(i+1)*500);
		})
	}
	if (scroll > $('#about').offset().top-200) {
		$('#about .about-content').addClass('show');	
	}

	if (scroll > $('#portfolio').offset().top-200) {
		$('#portfolio .boxThumbnail').addClass('show');	
		$('#portfolio .thumbnail').addClass('show');	
	}
	if (scroll > $('#contact').offset().top-200) {
		$.each($('.contact .box'),function(i,j) {
			setTimeout(function() {
				j.classList.add('show');
			},(i+1)*300);
		})
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
	}else if (scroll > $('#skill').offset().top-51) {
		$('.nav-link').removeClass('text-warning');
		$('.skill-link').addClass('text-warning');
	}else{
		$('.nav-link').removeClass('text-warning');
	}

});


$('.contact .box').hover(function() {
	if ($(this).children().hasClass('show')) {
		$(this).children().removeClass('show');
		$(this).children().removeClass('color');
		$(this).children()[0].classList.add('no-color');
	}else{
		$(this).children().addClass('show');
		$(this).children()[0].classList.add('color');
		$(this).children().removeClass('no-color');
	}
});

$('#portfolio .boxThumbnail').on('click','.thumbnail',function(e){
	e.preventDefault();
	$('#modal-portfolio').modal('show');
	var id = $(this).attr('href');
	$.getJSON('data/portfolio.json',function(data) {
		var portfolio = data.portfolio;
		for (var i = 0; i < portfolio.length; i++) {
			var index = portfolio[i].id;
			if (id == index) {
				var html 	= '<div class="row justify-content-center">';
				var loopImg = portfolio[i].files;			

				for (var k = 0; k < loopImg.length; k++) {
					html +=
					'<div class="col-lg-4 detailFoto">'+
					'<img src="img/portfolio/'+loopImg[k].foto+'">'+
					'<p>'+loopImg[k].keterangan+'</p>'+
					'</div>';
				}
				html +=
				'</div>'
				+ '<div class="text-justify">'
				+ portfolio[i].paragraf;
				+ '</div>';
				$('#titleModal').html(portfolio[i].title);
			}
		}
		$('.modal-body').html(html);
	})
});


$.getJSON('data/portfolio.json',function(data) {

	var portfolio = data.portfolio;
	html	= '';
	for (var i = 0; i < portfolio.length; i++) {
		var id 		= portfolio[i].id;
		var thumb 	= portfolio[i].thumbnail;
		var title 	= portfolio[i].title;
		var ket 	= portfolio[i].ket;

		html += `
		<a href="${id}"class="col-12 col-sm-6 col-lg-4 thumbnail p-2">
		<img src="img/portfolio/${thumb}">
		<div class="bg-white p-2 border-top boxTitle shadow">
		<p class="text-dark m-0 portfolio-title">
		${title}
		<br />
		<small>
		${ket}
		</small>
		</p>
		</div>
		</a>`;

	}
	$('#portfolio .boxThumbnail').html(html);
})

