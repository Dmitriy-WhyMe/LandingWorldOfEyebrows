(function ($) {
	$(document).ready(function () {
		var swiper_1 = new Swiper(".mySwiper", {
			loop: true,
			slidesPerView: 4,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				310: {
					slidesPerView: 1,
				},
				640: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 2,
				},
				864: {
					slidesPerView: 3,
				},
				1024: {
					slidesPerView: 4,
				}
			},
		});
	});
	$('.link').click(function(){
		var volume = $(this);
		volume.toggleClass('on');
		if (volume.is('.on')) $('#video').prop("volume", 1);
		else $('#video').prop("volume", 0);
	});
	document.getElementById("video").oncontextmenu = function (e) {
		return false;
	};
})(jQuery);