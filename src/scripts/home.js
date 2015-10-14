var checkinButton = $("#checkin");


$(document).on('app_load', function() {
  // Do any work with FB or Parse here
  var user = User.current();

  function updateUserInfo() {
    // Retrieve user's current level
    user.level(function(lvl) {
      // Update points to level up
      lvl.pointsToNextLevel(user.get("points_earned"), function(pts) {
        $("#points-earned").text(pts);
      });

      $("#user-details .awards span").text(lvl.get("priority"));
    });

    $("#profile-pic").css({backgroundImage: 'url("' + user.get("photo_url") + '")'});
    $("#user-details .name").text(user.get("first_name") + " " + user.get("last_name"));
  };

  // Use checkin
  checkinButton.click(function checkin() {
    checkinButton.text("Loading...");
    checkinButton.off();

    // Get current geopoint and find nearby discoverables
    Parse.GeoPoint.current(function(pos) {
      var query = new Parse.Query(Discoverable);
      query.withinKilometers("location", pos, 0.300);
      query.find({
        success: function (discoverables) {
          var d = discoverables[0];
          alert("Congratulations! You have received " + d.get("points") + " points for discovering " + d.get("name") + "!");
          user.increment("points_earned", d.get("points"));
          user.save(null, { success: function(user) { updateUserInfo(); } });
          checkinButton.text("Check in");
          checkinButton.click(checkin);
        }
      }); // query.find
    }); // geopoint.current
  });

  updateUserInfo();
});
