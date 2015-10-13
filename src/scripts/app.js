var root_path = '/', index_path = '/index.html', home_path = '/home.html';
function redirect_to(path) { window.location.pathname = path; }
function get_pathname() { return window.location.pathname; }
function at_root() { return get_pathname() === root_path || get_pathname === index_path; }

var app = new Framework7();
var $ = jQuery.noConflict();
$.ajaxSetup({ cache: true });

Parse.initialize("fb7wEhSejPWUDLU3VmdBYh8LCgFnv6AwUy1Cd3qj", "nBU31sSd28glL0wd8c39ydlVIrobJNggVijyRM62");

$.getScript('//connect.facebook.net/en_US/sdk.js', function() {
  Parse.FacebookUtils.init({
    appId: '417307785141513',
    version: 'v2.4',
    xfbml: true,
    cookie: true
  });

  FB.getLoginStatus(function(res) {
    if (res.status !== 'connected' && !at_root()) {
      // If visitor is not logged in, redirect to login page
      redirect_to(root_path);
    } else {
      // Emit event so that any page knows that FB object has been loaded
      $(document).trigger('app_load');

      // Give scripts a slight bit of time to load data, then reveal page
      setTimeout(function() { $(".screen-loader-container").addClass('hide'); }, 250);
    }
  });

});
