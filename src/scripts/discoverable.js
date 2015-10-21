var query = Parse.Query(Discoverable);
query.find(get_params()['id'], {
  success: function(d) {
    $("#cover-photo").css({backgroundImage: d.get("photo")});
  }
});

$(document).on('app_load', function() {
  var swp = app.swiper('#photo-gallery ', {
    grabCursor: true,
    simulateTouch: true,
    slidesPerView: 2.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 50,
  });

  swp.on('onTap', function(e) { swp.slideTo(e.clickedIndex); });


});
