$(document).on('app_load', function() {
  // Do any work with FB API here

  // Logout user and redirect to login page
  $("#fb-logout").click(function() {
    Parse.User.logOut().then(function() {
      redirect_to(root_path);
    });
  });
});
