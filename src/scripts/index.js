var loginButton = $("#fb-login-overlay");

$(document).on('app_load', function() {
  loginButton.removeClass('desaturate');

  // User click to login via FB
  loginButton.click(function() {
    // Login via Parse SDK, requesting appropriate permissions
    Parse.FacebookUtils.logIn('public_profile, email, user_friends', {
      success: function(user) {
        // If user's first time logging in, save photo and name to db
        if (!user.existed()) {
          FB.api('/me?fields=id,first_name,last_name,picture.type(large)', function(res) {
            console.log(res);
            user.set("first_name", res.first_name);
            user.set("last_name", res.last_name);
            user.set("photo_url", res.picture.data.url);
            user.set("points_earned", 0);
            // TODO anything needed in success? fail gracefully on errors.
            user.save(null, { success: function(user) {redirect_to(home_path);}, error: function(user, error) { console.log("Failed to save User#" + user.objectId + " object with error code: " + error.message); } });
          });
        } else { redirect_to(home_path); }
      },
      // Login failed, let user know they need to login via FB
      error: function(user, error) { $('#login-error').removeClass('hide'); }
    });
  });
});
