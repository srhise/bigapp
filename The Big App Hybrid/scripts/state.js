/**
 * Global State Controller
 */
var app = app || {};

app.state = (function () {
    var module = (function () {
        var model = kendo.observable({
            activities: null,
            currentActivity: null,
            user: null
        });
        
        var init = function () {
            var user;
            user = JSON.parse(localStorage.getItem("user"));
            model.set("user", user);
            
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
        
         var handlePastEvents = function(events) {
            app.events.publish('newPastEvents', events);
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
        
        var handleAgenda = function(agendaItems, type) {
            if (type == 'event') {
                app.events.publish('newAgendaEvents', agendaItems);
            }
            
            if (type == 'activity') {
                app.events.publish('newAgendaActivities', agendaItems);
            }
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
        
        var handleLogin = function(user) {
            localStorage.setItem("user", JSON.stringify(user));
            app.state.model.set("user", user);
            app.mobileApp.navigate('views/activityList.html');
        }
        
        var handleLogout = function() {
            localStorage.removeItem("user");
            app.state.model.set("user", null);
            app.mobileApp.navigate('components/home/view.html');
        }
        
         var handleInvalidLogin = function() {
             app.events.publish('loginerror', ['Invalid Login or Password Specified']);
        }
         
        var handleComplete = function(response) {
            app.events.publish('activityComplete', response);
        }
        
        var handleUnauthorized = function() {
            sessionStorage.removeItem('user');
            app.state.model.set("user", null);
            app.mobileApp.navigate('components/home/view.html');
        }
        
        return {
            model: model,
            init: init,
            handleAPIError: handleAPIError,
            handleActivities: handleActivities,
            handleActivity: handleActivity,
            handleEvents: handleEvents,
            handlePastEvents: handlePastEvents,
            handleCategories: handleCategories,
            handleIndicators: handleIndicators,
            handleIndicatorRequest: handleIndicatorRequest,
            handleAgenda: handleAgenda,
            handleFilters: handleFilters,
            handleLogin: handleLogin,
            handleLogout: handleLogout,
            handleInvalidLogin: handleInvalidLogin,
            handleComplete: handleComplete,
            handleUnauthorized: handleUnauthorized
        };
    }());
    return module;
}());
