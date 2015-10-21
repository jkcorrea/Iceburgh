var checkinButton = $("#checkin")
  , activityList = $("#activity-feed ul");

$(document).on('app_load', function() {
  // Do any work with FB or Parse here
  var user = User.current();
  user.fetch().then(function(user) {
    $("#profile-pic").css({backgroundImage: 'url("' + user.get("photo_url") + '")'});
    $("#user-name").text(user.get("first_name") + " " + user.get("last_name"));
    updateUserInfo(user); // invoke this on app_load
  });

  function updateUserInfo(u) {
    if (!u) u = user;
    // Retrieve user's current level
    u.level(function(lvl) {
      // Update points to level up
      lvl.pointsToNextLevel(u.get("points_earned"), function(pts) {
        $("#points-remaining").text(pts);
      });

      $("#user-level").text(lvl.get("priority"));
      $("#next-level").text(lvl.get("priority") + 1);
      $("#total-points").text(u.get("points_earned"));
    });

    // Retrieve user's badges
    u.badges(function(badges) {
      $("#user-badges").text(badges.length);
    })
  }

  function updateActivity() {
    activityList.empty();
    var query = new Parse.Query(Discovery)
      .include("user")
      .include("discoverable")
      .descending("updatedAt")
      .find().then(function(discoveries) {
        for (var key in discoveries) {
          var u = discoveries[key].get("user");
          var d = discoveries[key].get("discoverable");
          activityList.append(
            "<li class='activity'>"
            + "<div class='user-pic' style='background-image: url(" + u.get("photo_url") + ");'></div>"
            + "<div class='activity-text'>"
              + "<p class='text-center'>" + u.get("first_name") + " " + u.get("last_name") + " has discovered <a href='/discoverable.html?id=" + d.id + "'>" + d.get("name") + "</a>.</p>"
            + "</div>"
            + "<div class='activity-photo' style='background-image: url(" + d.get("photo").url() + ");'></div>");
        }
      });
  }
  updateActivity();

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
          var discovery = new Discovery();
          discovery.set("user", user);
          discovery.set("discoverable", d);
          discovery.save(null, { success: updateActivity });
          user.save(null, { success: updateUserInfo });
          checkinButton.text("Check in");
          checkinButton.click(checkin);
        }
      }); // query.find
    }); // geopoint.current
  });

});
