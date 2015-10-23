/**
 * App Middleware Controller
 */
var app = app || {};

app.middleWare = (function () {
    var module = (function () {
        
        var API_HOST = 'http://bigappadmin.azurewebsites.net/api';
        
        var getActivities =  function() {
          $.ajax({
            url: API_HOST + '/activities',
            type: 'GET',
            success: function(response) {
               app.state.handleActivities(response);
            },
            error: function(xhr, ajaxOptions, thrownError) {
               app.state.handleAPIError();
            }
         });
        }
        
        var getActivity = function(id) {
          $.ajax({
            url: API_HOST + '/activities/'+id,
            type: 'GET',
            success: function(response) {
            	app.state.model.set("currentActivity", response);
            },
            error: function(xhr, ajaxOptions, thrownError) {
               app.state.handleAPIError();
            }
         });
        }
        
        var getIndicators = function(id) {
          $.ajax({
            url: API_HOST + '/indicator',
            type: 'GET',
            success: function(response) {
            	app.state.handleIndicators(response);
            },
            error: function(xhr, ajaxOptions, thrownError) {
               app.state.handleAPIError();
            }
         });
        }
        
        var getIndicator = function(id) {
          $.ajax({
            url: API_HOST + '/indicator/'+id,
            type: 'GET',
            success: function(response) {
            	app.state.model.set("currentIndicator", response);
            },
            error: function(xhr, ajaxOptions, thrownError) {
               app.state.handleAPIError();
            }
         });
        }
        
        var getCategories = function() {
          $.ajax({
            url: API_HOST + '/categories/',
            type: 'GET',
            success: function(response) {
            	app.state.handleCategories(response);
            },
            error: function(xhr, ajaxOptions, thrownError) {
               app.state.handleAPIError();
            }
         });
        }
        
        return {
            getActivities: getActivities,
            getActivity: getActivity,
            getIndicators: getIndicators,
            getIndicator: getIndicator,
            getCategories: getCategories
        };
    }());
    return module;
}());
