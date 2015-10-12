$(document).on('fbload', function() {
  // Do any work with FB API here

  // Logout user and redirect to login page
  $("#fb-logout").click(function() {
    FB.logout(function() {
      window.location.href = "/";
    });
  });
});
