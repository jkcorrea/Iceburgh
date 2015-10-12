$(document).on('fbload', function() {
  // Do any work with FB API here

  FB.api('/me/picture?type=large', function(res) {
    $("#profile-pic").css({backgroundImage: 'url("' + res.data.url + '")'});
  });

  FB.api('/me', function(res) {
    $("#user-details .name").text(res.name);
  });
});
