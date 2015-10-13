$(document).on('app_load', function() {
  // Do any work with FB API here

  FB.api('/me/picture?type=large', function(res) {
    $("#profile-pic").css({backgroundImage: 'url("' + res.data.url + '")'});
  });

  FB.api('/me', function(res) {
    $("#user-details .name").text(res.name);
  });
});

$("#checkin").click(function() {
  Parse.GeoPoint.current(function(pos) {
    var query = new Parse.Query("Discoverable");
    query.withinKilometers("location", pos, 0.300);
    query.find({ success: checkinPopup });
  });
});

function checkinPopup(discoverables) {
  var d = discoverables[0];
  alert("Congratulations! You have received " + d.get("points") + " points for discovering " + d.get("name") + "!");
}
