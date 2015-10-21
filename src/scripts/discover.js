$(document).on('app_load', function() {
  var swp = app.swiper('#trending-gallery ', {
    grabCursor: true,
    simulateTouch: true,
    slidesPerView: 'auto',
    freeMode: true,
    spaceBetween: 20
  });

  app.searchbar('.searchbar', {
    searchList: '#explore-list',
    searchIn: '.explore-item span',
    onEnable: function() { $("#trending").hide(); },
    onDisable: function() { $("#trending").show(); }
  });

  new Parse.Query(Discoverable)
      .each(function(d) {
        $("#explore-list").append(
            "<li class='item-content link' data-href='/discoverable.html\?id="+d.id+"'>"
            + "<div class='explore-item' style='background-image: url(\""+d.get("photo").url()+"\")'>"
              + "<div class='label'><span>"+d.get("name")+"</span></div>"
            + "</div>"
          + "</li>");
      });

  var visited = []; // Keep track of discoverables we've visited
  new Parse.Query(Discovery)
      .include("discoverable")
      .each(function(discovery) {
        var d = discovery.get("discoverable");
        if ($.inArray(d.id, visited) !== -1) return;
        visited.push(d.id);
        swp.appendSlide(
            "<div class='swiper-slide link' data-href='/discoverable.html?id="+d.id+"' style='background-image: url(\""+d.get("photo").url()+"\");'>"
            + "<div class='label'><span>"+d.get("name")+"</span></div>"
          + "</div>");
      });

  $(document).on('click', '.link', function() { redirect_to($(this).data('href')); });
});
