var root_path = '/', index_path = '/index.html', home_path = '/home.html';
function redirect_to(path) { window.location.pathname = path; }
function get_pathname() { return window.location.pathname; }
function at_root() { return get_pathname() === root_path || get_pathname === index_path; }

var app = new Framework7();
$.ajaxSetup({ cache: true });
Parse.initialize("fb7wEhSejPWUDLU3VmdBYh8LCgFnv6AwUy1Cd3qj", "nBU31sSd28glL0wd8c39ydlVIrobJNggVijyRM62");

$.getScript('//connect.facebook.net/en_US/sdk.js', function() {
  Parse.FacebookUtils.init({
    appId: '417307785141513',
    version: 'v2.4',
    xfbml: true,
    cookie: true
  });

  User.currentAsync().then(function(user) {
    // redirect as needed
    if (user && at_root()) redirect_to(home_path);
    else if (!user && !at_root()) redirect_to(root_path);

    // Load app page
    $(document).trigger('app_load'); // Let app know we're ready
    $(".screen-loader-container").addClass('hide'); // Reveal the page
  });

});


var Level = Parse.Object.extend("Level", {
  // Instance methods

  // Find the next level (if it exists) and return points until that levels min_points
  pointsToNextLevel: function(points_earned, cb) {
    var _cb = function(level) { cb(level ? level.get("min_points") - points_earned : 0) };
    new Parse.Query(Level)
      .greaterThan("priority", this.get("priority"))
      .ascending("priority")
      .first()
      .then(_cb, _cb)
  }
});

var Badge = Parse.Object.extend("Badge");

var Discovery = Parse.Object.extend("Discovery");

var Discoverable = Parse.Object.extend("Discoverable");

var User = Parse.User.extend({
  // Instance methods

  // Get all levels the user has attained sorted by priority and pluck the highest one
  level: function(cb) {
    new Parse.Query(Level)
        .lessThanOrEqualTo("min_points", this.get("points_earned"))
        .descending("priority")
        .first()
        .then(cb, cb);
  },

  // Retrieve user's badges, or empty array if none
  badges: function(cb) {
    this.relation(Badge)
        .query()
        .find()
        .then(cb, cb.bind(null, []));
  }
});
