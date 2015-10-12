$(function() {
  $(document).on('fbload', function() {
    FB.api('/me/friends', function(response) {
       console.log(response);
    });
  });
});
