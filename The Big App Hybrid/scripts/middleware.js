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
        
        var getEvents =  function() {
          $.ajax({
            url: API_HOST + '/events',
            type: 'GET',
            success: function(response) {
               app.state.handleEvents(response);
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
            	app.state.handleActivity(response);
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
            	app.state.handleIndicatorRequest(response);
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
        
        var appLogin = function(data) {
          $.ajax({
            url: API_HOST + '/AppLogin/',
            data: data,
            type: 'POST',
            success: function(response) {
                app.mobileApp.pane.loader.hide(); //hide loading animation
            	app.state.handleLogin(response);                
            },
            error: function(xhr, ajaxOptions, thrownError) {
               app.mobileApp.pane.loader.hide(); //hide loading animation
               if (xhr.status == 401) {
                   app.state.handleInvalidLogin();
               } else {
               	   app.state.handleAPIError();    
               }
            }
          
         });
        }
        
        var updateUser = function(data, callback) {
              // { id:id, email:email, workPhone:workPhone, cellPhone:cellPhone }
              $.ajax({
                url: API_HOST + '/appuser/',
                data: data,
                type: 'POST',
                success: function(response) {
                    app.mobileApp.pane.loader.hide(); //hide loading animation
                    callback(response);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                   app.mobileApp.pane.loader.hide(); //hide loading animation
                   app.state.handleAPIError();
                }
             });
        }
        
        var appPicture = function(id, data) {
            var obj = {id: id, data: data};
            $.ajax({
            url: API_HOST + '/appPicture/',
            type: 'POST',
            data: obj,
            success: function(response) {
            	console.log(response);
            },
            error: function(xhr, ajaxOptions, thrownError) {
               app.state.handleAPIError();
            }
         });
        }
        
        var appUser = function(id, callback) {
            $.ajax({
                url: API_HOST + '/appUser/'+id,
                type: 'GET',
                success: function(response) {
                    callback(response);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                   app.state.handleAPIError();
                }
             });
        }
        
        var resetPassword = function(email, callback) {
            $.ajax({
                url: API_HOST + '/apppassword?email='+email,
                type: 'GET',
                success: function(response) {
                    callback(response);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                   app.state.handleAPIError();
                }
           });
        }
        
        var getActivityAgenda = function(userId) {
            $.ajax({
                url: API_HOST + '/agenda/?userId='+userId+'&type=activity',
                type: 'GET',
                success: function(response) {
                    app.mobileApp.pane.loader.hide(); //hide loading animation
               		app.state.handleAgenda(response, 'activity');
                },
                error: function(xhr, ajaxOptions, thrownError) {
                   app.state.handleAPIError();
                }
           });
        }
        
        var getEventAgenda = function(userId, type) {
            $.ajax({
                url: API_HOST + '/agenda/?userId='+userId+'&type=event',
                type: 'GET',
                success: function(response) {
                    app.mobileApp.pane.loader.hide(); //hide loading animation
               		app.state.handleAgenda(response, 'event');
                },
                error: function(xhr, ajaxOptions, thrownError) {
                   app.state.handleAPIError();
                }
           });
        }
        
        var addToAgenda = function(userID, activityID, callback) {
            //http:///bigappadmin.azurewebsites.net/api/Agenda/
            var obj = {userID: userID, activityID: activityID};
            $.ajax({
                url: API_HOST + '/agenda/',
                type: 'POST',
                data: obj,
                success: function(response) {
                    callback(response);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                   app.state.handleAPIError();
                }
           });
        }
        
        var deleteFromAgenda = function(agendaID, userID) {
            $.ajax({
                url: API_HOST + '/agenda?agendaID='+agendaID+'&userID='+userID,
                type: 'DELETE',
                success: function(response) {
                    callback(response);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                   app.state.handleAPIError();
                }
           });
        }
        
        var markComplete = function(agendaID, comment, rating, date) {
            //http:///bigappadmin.azurewebsites.net/api/Agenda/
            var obj = {agendaID: agendaID, comment: comment, rating: rating, date: date};
            $.ajax({
                url: API_HOST + '/agenda/',
                type: 'POST',
                data: obj,
                success: function(response) {
                    callback(response);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                   app.state.handleAPIError();
                }
           });
        }
        
        return {
            getActivities: getActivities,
            getEvents: getEvents,
            getActivity: getActivity,
            getIndicators: getIndicators,
            getIndicator: getIndicator,
            getCategories: getCategories,
            appLogin: appLogin,
            appPicture: appPicture,
            appUser: appUser,
            updateUser: updateUser,
            resetPassword: resetPassword,
            getActivityAgenda: getActivityAgenda,
            getEventAgenda: getEventAgenda,
            addToAgenda: addToAgenda,
            deleteFromAgenda: deleteFromAgenda
        };
    }());
    return module;
}());
