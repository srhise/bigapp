(function() {
    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app = {
        data: {},
    };
    
    app.events = (function(){
      var topics = {};
      var hOP = topics.hasOwnProperty;

      return {
        subscribe: function(topic, listener) {
          // Create the topic's object if not yet created
          if(!hOP.call(topics, topic)) topics[topic] = [];

          // Add the listener to queue
          var index = topics[topic].push(listener) -1;

          // Provide handle back for removal of topic
          return {
            remove: function() {
              delete topics[topic][index];
            }
          };
        },
        publish: function(topic, info) {
          // If the topic doesn't exist, or there's no listeners in queue, just leave
          if(!hOP.call(topics, topic)) return;

          // Cycle through topics queue, fire!
          topics[topic].forEach(function(item) {
                item(info != undefined ? info : {});
          });
        }
      };
    })();

    var bootstrap = function() {
        
        var initOptions;        
        var user = localStorage.getItem("user");
        user = JSON.parse(user);
        if (user) {
            initOptions = {
                // you can change the default transition (slide, zoom or fade)
                transition: 'none',
                // the application needs to know which view to load first
                initial: 'views/activityList.html',
                statusBarStyle: 'black-translucent'
            }
        } else {
            initOptions = {
                // you can change the default transition (slide, zoom or fade)
                transition: 'slide',
                // the application needs to know which view to load first
                initial: 'components/home/view.html',
                statusBarStyle: 'black-translucent'
            }
        }
        
        $(function() {
            app.mobileApp = new kendo.mobile.Application(document.body, initOptions);
        });
        
        window.onerror = function(msg) {
            alert(msg);
        };
        
        var apiErrorSubscription = app.events.subscribe('apierror', function(error) {
            swal({
                title: "BigApp Error",
                text: "We were unable to process your request. Please try again.",
                type: "error"
            });
        });
        
        // Initialize state module
        app.state.init();
        app.activityDetails.init();
		$(function() {
            if (typeof FastClick != 'undefined') {
                //FastClick.attach(document.body);
            }
        });
    };

    if (window.cordova) {
        // this function is called by Cordova when the application is loaded by the device
        document.addEventListener('deviceready', function() {
            // hide the splash screen as soon as the app is ready. otherwise
            // Cordova will wait 5 very long seconds to do it for you.
            if (navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }
            bootstrap();
        }, false);
    } else {
        bootstrap();
    }

    window.app = app;

    app.isOnline = function() {
        if (!navigator || !navigator.connection) {
            return true;
        } else {
            return navigator.connection.type !== 'none';
        }
    };
}());

// START_CUSTOM_CODE_kendoUiMobileApp
// END_CUSTOM_CODE_kendoUiMobileApp