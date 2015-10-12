var app = new Framework7();

$(function() {
  $.ajaxSetup({ cache: true });

  $.getScript('//connect.facebook.net/en_US/sdk.js', function() {
    FB.init({
      appId: '417307785141513',
      version: 'v2.4',
      xfbml: true
    });

    // Emit event so that any page knows that FB object has been loaded
    $(document).trigger('fbload');

    FB.getLoginStatus(function(res) {
      // If visitor is not logged in, redirect to login page
      if (res.status !== 'connected' && window.location.pathname !== '/')
        window.location.href = '/';
    });
  });
});
