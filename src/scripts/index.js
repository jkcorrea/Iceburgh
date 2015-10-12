var loginButton = $("#fb-login-overlay");

function loginStatusCallback(showErr, res) {
  if (res.status === 'connected') { redirect_to(home_path); }
  else { $('#login-error').toggleClass('hide', !showErr); }
}

// Wait until FB SDK loaded to use FB object
$(document).on('fbload', function() {
  // Do any work with FB API here

  // Enable login button
  loginButton.removeClass('desaturate');

  // Click to login, show errors if they didn't login/accept app permissions
  loginButton.click(function() {
    FB.login(loginStatusCallback.bind(null, true), {scope: 'public_profile, email, user_friends'});
  });
});


