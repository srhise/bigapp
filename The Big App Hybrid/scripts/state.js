/**
 * Global State Controller
 */
var app = app || {};

app.state = (function () {
    var module = (function () {
        var model = kendo.observable({
            activities: null,
            currentActivity: null
        });
        
        var handleAPIError = function(error) {
            app.events.publish('apierror', error);
        }
        
        var handleActivities = function(activities) {
            app.events.publish('newActivities', activities);
        }
        
        var handleCategories = function(categories) {
            app.events.publish('newCategories', categories);
        }
        
        var handleIndicators = function(indicators) {
            app.events.publish('newIndicators', indicators);
        }
        
        return {
            model: model,
            handleAPIError: handleAPIError,
            handleActivities: handleActivities,
            handleCategories: handleCategories,
            handleIndicators: handleIndicators
        };
    }());
    return module;
}());
