/**
 * Activity Details Page
 */
var app = app || {};

app.activityDetails = (function () {
    var module = (function () {
        var viewModel = kendo.observable({
            activity: []
        });
        var init = function () {
            var activitySubscription = app.events.subscribe('singleActivityLoaded', function(activity) {
                if (activity.mediaURL == null) {
                    activity.mediaURL = 'https://placeholdit.imgix.net/~text?txtsize=30&txt=380%C3%97180&w=380&h=180';
                }
                viewModel.set("activity", [activity]);
            });
        }
        var show = function () {
        }
        var afterShow = function () {
        } 
        var hide = function () {
        }
    	var onBeforeShow = function() {
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
