$(function() {

  // Logout user and redirect to login page
  $("#fb-logout").click(function() {
    FB.logout(function() {
      window.location.href = "/";
    });
  });
});
