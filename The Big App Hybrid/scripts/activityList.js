/**
 * Activity Listing Page
 */
var app = app || {};

app.activityList = (function () {
    'use strict';
    var module = (function () {
        var viewModel = kendo.observable({
            activities: []
        });
        var init = function () {
            var activitySubscription = app.events.subscribe('newActivities', function(obj) {
                viewModel.set("activities", obj);
            });
        }
        var show = function () {
            console.log('show');
        }        
        var hide = function () {
        	console.log('hide');
        }
    	var onBeforeShow = function() {
        	app.middleWare.getActivities();
        }
        return {
            viewModel: viewModel,
            init: init,
            show: show,
            hide: hide,
            onBeforeShow: onBeforeShow
        };
    }());
    return module;
}());
