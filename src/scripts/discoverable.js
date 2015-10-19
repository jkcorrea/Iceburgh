$(document).on('app_load', function() {
  app.swiper('#photo-gallery ', {
    grabCursor: true,
    simulateTouch: true,
    slidesPerView: 3,
    centeredSlides: true,
    loop: true,
    parallax: true,
    spaceBetween: 50,
  });
});
