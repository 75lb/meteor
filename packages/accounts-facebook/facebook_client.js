(function () {
  Meteor.loginWithFacebook = function (callback, serverSide) {
      var config = Accounts.configuration.findOne({service: 'facebook'});
	// var returnUri = "http://apps.facebook.com/lloydbrookes/"; 
	var returnUri = Meteor.absoluteUrl('_oauth/facebook?redirect');
    if (!config) {
      callback && callback(new Accounts.ConfigError("Service not configured"));
      return;
    }

    var state = Meteor.uuid();
    var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var display = mobile ? 'touch' : 'popup';

    var scope = "email";
    if (Accounts.facebook._options &&
        Accounts.facebook._options.scope)
      scope = Accounts.facebook._options.scope.join(',');

<<<<<<< HEAD
    if (serverSide) {
      var loginUrl = 'https://www.facebook.com/dialog/oauth?' + 
                      'client_id=[APP_ID]&redirect_uri=[REDIRECT_URI]&scope=[SCOPE]&state=[STATE]'
                      .replace("[APP_ID]", config.appId)
                      .replace("[REDIRECT_URI]", encodeURIComponent(returnUri))
                      .replace("[SCOPE]", scope)
                      .replace("[STATE]", state);
	  window.location.assign(loginUrl);
      
    } else {
	  var loginUrl =
            'https://www.facebook.com/dialog/oauth?client_id=' + config.appId +
            '&redirect_uri=' + Meteor.absoluteUrl('_oauth/facebook?close') +
            '&display=' + display + '&scope=' + scope + '&state=' + state;

      Meteor.accounts.oauth.initiateLogin(state, loginUrl, callback);
    }
=======
    var loginUrl =
          'https://www.facebook.com/dialog/oauth?client_id=' + config.appId +
          '&redirect_uri=' + Meteor.absoluteUrl('_oauth/facebook?close') +
          '&display=' + display + '&scope=' + scope + '&state=' + state;

    Accounts.oauth.initiateLogin(state, loginUrl, callback);
>>>>>>> a49685a1ec9bf32ae3cadffa832b80b1115d494f
  };

})();
