/**
 * Activity Details Page
 */
var app = app || {};

app.activityDetails = (function () {
    var module = (function () {
        var viewModel = kendo.observable({
            activity: [],
            addToAgenda: function(e) {
                app.middleWare.addToAgenda(app.state.model.user.id, e.data.id, function() {
                    app.utilities.showToast('Successfully added ' + e.data.name + ' to Planner');
                    app.mobileApp.navigate('#views/myPlanner.html');
                    app.middleWare.getActivityAgenda(app.state.model.user.id);
                    app.middleWare.getEventAgenda(app.state.model.user.id);
                });
            },
            goToMap: function(e) {
                var url = "http://maps.google.com/?q="+e.data.lat+"," + e.data.lng;
                if (typeof navigator !== "undefined" && navigator.app) {
                    // Mobile device.
                    navigator.app.loadUrl(url, {openExternal: true});
                } else {
                    // Possible web browser
                    window.open(url, '_blank', 'toolbarposition=top');
                }
                return false;
        	},
            goToRegisterPage: function(e) {
                if (typeof navigator !== "undefined" && navigator.app) {
                    // Mobile device.
                    navigator.app.loadUrl(e.data.registrationLink, {openExternal: true});
                } else {
                    // Possible web browser
                    window.open(e.data.registrationLink, '_blank', 'toolbarposition=top');
                }
                return false;
            }
        });
        var init = function () {
            var activitySubscription = app.events.subscribe('singleActivityLoaded', function(activity) {
                if (activity.mediaURL == null) {
                    activity.mediaURL = '';
                }
                viewModel.set("activity", [activity]);
                $('.accordion a').on('click', function(e) {
                    e.preventDefault();
                    if (typeof navigator !== "undefined" && navigator.app) {
                        // Mobile device.
                         navigator.app.loadUrl($(this).attr('href'), {openExternal: true});
                    } else {
                        // Possible web browser
                        window.open($(this).attr('href'), '_blank', 'toolbarposition=top');
                    }
                    return false;
                });
                setTimeout(function() {
					app.mobileApp.pane.loader.hide(); //hide loading animation
                	app.utilities.handleTooltips();
                }, 3000);                
            });
        }
        
        var show = function () {
        }
        var afterShow = function () {

            
        } 
        var hide = function () {
        }
    	var onBeforeShow = function() {
            app.mobileApp.pane.loader.show(); //show loading animation
        }
        
        return {
            viewModel: viewModel,
            init: init,
            show: show,
            hide: hide,
            onBeforeShow: onBeforeShow,
            afterShow: afterShow
        };
    }());
    return module;
}());
