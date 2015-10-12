var app = new Framework7();

$(function() {
    $.ajaxSetup({
        cache: !0
    }), $.getScript("//connect.facebook.net/en_US/sdk.js", function() {
        FB.init({
            appId: "417307785141513",
            version: "v2.4",
            xfbml: !0
        }), // Emit event so that any page knows that FB object has been loaded
        $(document).trigger("fbload");
    });
}), $(function() {
    function loginStatusCallback(showErr, res) {
        "connected" == res.status ? window.location.href = "/home.html" : $("#login-error").toggleClass("hide", !showErr);
    }
    // On document load
    var loginButton = $("#fb-login-overlay");
    // Only do login logic of on login screen
    loginButton.length && // Wait until FB SDK loaded to use FB object
    $(document).on("fbload", function() {
        console.log("fbload event captured"), // Enable login button
        loginButton.removeClass("desaturate"), // Check if user is already logged in, don't show errors if they aren't yet
        FB.getLoginStatus(loginStatusCallback.bind(null, !1)), // Click to login, show errors if they didn't login/accept app permissions
        loginButton.click(function() {
            FB.login(loginStatusCallback.bind(null, !0), {
                scope: "public_profile, email, user_friends"
            });
        });
    });
});