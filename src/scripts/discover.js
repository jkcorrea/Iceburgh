$(document).on('app_load', function() {
  app.swiper('#trending-gallery ', {
    grabCursor: true,
    simulateTouch: true,
    slidesPerView: 'auto',
    freeMode: true,
    parallax: true,
    spaceBetween: 20
  });

  app.searchbar('.searchbar', {
    searchList: '#explore-list',
    searchIn: '.explore-item span'
  });
});
