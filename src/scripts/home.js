var checkinButton = $("#checkin");


$(document).on('app_load', function() {
  // Do any work with FB or Parse here
  var user = User.current();
  user.fetch();

  $("#profile-pic").css({backgroundImage: 'url("' + user.get("photo_url") + '")'});
  $("#user-name").text(user.get("first_name") + " " + user.get("last_name"));
  function updateUserInfo() {
    // Retrieve user's current level
    user.level(function(lvl) {
      // Update points to level up
      lvl.pointsToNextLevel(user.get("points_earned"), function(pts) {
        $("#points-remaining").text(pts);
      });

      $("#user-level").text(lvl.get("priority"));
      $("#next-level").text(lvl.get("priority") + 1);
      $("#total-points").text(user.get("points_earned"));
    });

    // Retrieve user's badges
    user.badges(function(badges) {
      $("#user-badges").text(badges.length);
    })
  };
  updateUserInfo(); // invoke this on app_load

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
          user.save(null, { success: updateUserInfo });
          checkinButton.text("Check in");
          checkinButton.click(checkin);
        }
      }); // query.find
    }); // geopoint.current
  });

});
