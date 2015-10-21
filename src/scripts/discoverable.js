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

  var query = new Parse.Query(Discoverable);
  query.get(get_params()['id']).then(function(d) {
    $("#title h3").text(d.get("name"));
    $("#title h2").text(d.get("neighborhood"));
    $("#description").text(d.get("description"));
    $("#web").text(d.get("url"));
    $("#web").attr('href', d.get("url"));
    $("#street").text(d.get("street_address"));
    $("#street").attr('href', d.get("maps_link"));
    $("#title .point-value").text(d.get("points"));
    $("#cover-photo").css({
      backgroundImage: 'url("' + d.get("photo").url() + '")',
      webkitFilter: 'blur(6px) brightness(0.5) contrast(1.7) grayscale(0.7)'
    });
    $("#photo-gallery .swiper-wrapper").append("<div class='swiper-slide'><div class='photo'><img src='"+d.get("photo").url()+"'></div></div>");
    $("#photo-gallery .swiper-wrapper").append("<div class='swiper-slide'><div class='photo'><img src='"+d.get("photo").url()+"'></div></div>");
    $("#photo-gallery .swiper-wrapper").append("<div class='swiper-slide'><div class='photo'><img src='"+d.get("photo").url()+"'></div></div>");
    swp.update()
  });


});
