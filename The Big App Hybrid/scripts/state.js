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
        
        var init = function () {
            var filterSubscription = app.events.subscribe('filterChange', function(filters) {
                handleFilters(filters);
            });
        }
        
        var handleAPIError = function(error) {
            app.events.publish('apierror', error);
        }
        
        var handleActivities = function(activities) {
            app.events.publish('newActivities', activities);
        }
        
        var handleEvents = function(events) {
            app.events.publish('newEvents', events);
        }
        
        var handleActivity = function(activity) {
            app.events.publish('singleActivityLoaded', activity);
        }
        
        var handleCategories = function(categories) {
            app.events.publish('newCategories', categories);
        }
        
        var handleIndicators = function(indicators) {
            app.events.publish('newIndicators', indicators);
        }
        
        var handleIndicatorRequest = function(indicator) {
            app.events.publish('indicatorDetails', indicator);
        }
        
        var handleFilters = function(filters) {
            filters.ages = filters.ages.filter(function( item ) {
                return item.active !== false;
            });
            
            filters.cost = filters.cost.filter(function( item ) {
                return item.active !== false;
            });
            
            filters.indicators = filters.indicators.filter(function( item ) {
                return item.active !== false;
            });
            
            filters.categories = filters.categories.filter(function( item ) {
                return item.active !== false;
            });
            
            app.events.publish('newFilters', filters);
        }
        
        return {
            model: model,
            init: init,
            handleAPIError: handleAPIError,
            handleActivities: handleActivities,
            handleActivity: handleActivity,
            handleEvents: handleEvents,
            handleCategories: handleCategories,
            handleIndicators: handleIndicators,
            handleIndicatorRequest: handleIndicatorRequest,
            handleFilters: handleFilters
        };
    }());
    return module;
}());
