var root_path = '/', index_path = '/index.html', home_path = '/home.html';
function redirect_to(path) { window.location.pathname = path; }
function get_pathname() { return window.location.pathname; }
function at_root() { return get_pathname() === root_path || get_pathname === index_path; }

var app = new Framework7();

$.ajaxSetup({ cache: true });

$.getScript('//connect.facebook.net/en_US/sdk.js', function() {
  FB.init({
    appId: '417307785141513',
    version: 'v2.4',
    xfbml: true
  });

  FB.getLoginStatus(function(res) {
    // Do any work with FB API here

    // If visitor is not logged in, redirect to login page
    if (res.status !== 'connected' && !at_root()) {
      redirect_to(root_path);
    } else {
      // Emit event so that any page knows that FB object has been loaded
      $(document).trigger('fbload');
    }
  });

});
