$(function() { // On document load

var loginButton = $("#fb-login-overlay");
// Only do login logic of on login screen
if (loginButton.length) {

  function loginStatusCallback(showErr, res) {
    if (res.status === 'connected') {
      localStorage.setItem("fb-access-token", res.authResponse.accessToken)
      window.location.href = '/home.html';
    } else {
      $('#login-error').toggleClass('hide', !showErr);
    }
  }

  // Wait until FB SDK loaded to use FB object
  $(document).on('fbload', function() {
    console.log("fbload event captured");
    // Enable login button
    loginButton.removeClass('desaturate');

    // // Check if user is already logged in, don't show errors if they aren't yet
    FB.getLoginStatus(loginStatusCallback.bind(null, false));

    // Click to login, show errors if they didn't login/accept app permissions
    loginButton.click(function() {
      FB.login(loginStatusCallback.bind(null, true), {scope: 'public_profile, email, user_friends'});
    });
  });

}

});
