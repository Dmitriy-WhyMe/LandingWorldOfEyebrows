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
				1024: {
					slidesPerView: 4,
				}
			},
		});
	});
})(jQuery);