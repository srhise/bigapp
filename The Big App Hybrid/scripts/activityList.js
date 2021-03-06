/**
 * Activity Listing Page
 */
var app = app || {};

app.activityList = (function () {
    var module = (function () {
        var viewModel = kendo.observable({
            activities: [],
            events: [],
            filters: [],
            activeFilters: [],
            hasFilters: false,
            pastEventsToggle: false,
            matchSupportEmail: function(e) {
               return "mailto:"+ app.state.model.user.matchSupportEmail + '?subject=App Activity Inquiry&body='+e.name;
            },
            totalActivities: function() {
                var activities = viewModel.get("activities");
                return activities.length;
            },
            totalEvents: function() {
                var events = viewModel.get("events");
                return events.length;
            },
            activityEmptyClass: function() {
              var status = viewModel.get("state.activitiesEmpty");
              if (status) {
                  return 'alert alert-info show';
              } else {
                  return 'alert alert-info hide';
              }
            },
            eventEmptyClass: function() {
              var status = viewModel.get("state.eventsEmpty");
              if (status) {
                  return 'alert alert-info show';
              } else {
                  return 'alert alert-info hide';
              }
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
            },
            state: {
                activitiesEmpty: false,
            	eventsEmpty: false,
                totalFilters: null,
                pastEventsText: 'Show Past Events'
            },
            loadActivity: function(e) {
            	app.middleWare.getActivity(e.data.id);
                app.mobileApp.navigate('views/activityDetails.html');
            },
            addToAgenda: function(e) {
                app.middleWare.addToAgenda(app.state.model.user.id, e.data.id, function() {
                    app.utilities.showToast('Successfully added ' + e.data.name + ' to Planner');
                    app.mobileApp.navigate('#views/myPlanner.html');
                    app.middleWare.getActivityAgenda(app.state.model.user.id);
            		app.middleWare.getEventAgenda(app.state.model.user.id);
                });
            },
            addToPlanner: function(e) {
                
                var registrationLink = e.data.registrationLink;
                
                if (registrationLink != '' && registrationLink != null) {
                    app.middleWare.addToAgenda(app.state.model.user.id, e.data.id, function() {
                    app.middleWare.getActivityAgenda(app.state.model.user.id);
            		app.middleWare.getEventAgenda(app.state.model.user.id);
                    swal({   
                            title: "Successfully added to your planner!",   
                            text: "Would you like to register for this event now?",   
                            type: "success",   
                            showCancelButton: true,   
                            confirmButtonColor: "#8f23b3",   
                            confirmButtonText: "Register",   
                            closeOnConfirm: false }, function(){
                            if (typeof navigator !== "undefined" && navigator.app) {
                                // Mobile device.
                                navigator.app.loadUrl(registrationLink, {openExternal: true});
                            } else {
                                // Possible web browser
                               window.open(registrationLink, '_blank', 'toolbarposition=top');
                            }
                        });
                    });
                } else {
                    app.middleWare.addToAgenda(app.state.model.user.id, e.data.id, function() {
                        app.utilities.showToast('Successfully added ' + e.data.name + ' to Planner');
                        app.mobileApp.navigate('#views/myPlanner.html');
                        app.middleWare.getActivityAgenda(app.state.model.user.id);
                        app.middleWare.getEventAgenda(app.state.model.user.id);
                    });
                }
                
            },
            addToCalendar: function(e) {
            	// Adding to calendar
                
                swal({   
                    title: "Find time on your Calendar!",   
                    text: "Would you like to tentatively schedule this on your phones calendar?",   
                    type: "info",   
                    showCancelButton: true,   
                    confirmButtonColor: "#8f23b3",   
                    confirmButtonText: "Schedule It!",   
                    closeOnConfirm: false }, function(){
                       var cal = window.plugins.calendar;
                        var title = e.data.name + ' (Big & Little Activity)';
                        var loc = e.data.locName;
                        var notes = e.data.description;
                        var today = new Date();
                        var start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                        today = new Date();
                        var end = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1);
                        cal.createEventInteractively(title, loc, notes, start, end, function() {
                            console.log('success');
                        }, function() {
                            console.log('failure');
                        });
                });
                
            },
            indicatorPopup: function(e) {
                app.middleWare.getIndicator(e.data.indicatorID);
            },
            showPastEvents: function(e) {
                var pastEventsLength = viewModel.pastEvents.length;
              	
                if (viewModel.pastEventsToggle === false) {
                    $.each(viewModel.pastEvents, function(index, value) {
                        viewModel.events.unshift(value); 
                    });
                    viewModel.pastEventsToggle = !viewModel.pastEventsToggle;
                    viewModel.state.set("pastEventsText","Hide Past Events");
                } else {
                    viewModel.events.splice(0, pastEventsLength);
                    viewModel.pastEventsToggle = !viewModel.pastEventsToggle;
                    viewModel.state.set("pastEventsText","Show Past Events");
                }
                
            }
        });
        var init = function () {
            
            var activitySubscription = app.events.subscribe('newActivities', function(activities) {
                viewModel.set("activities", activities);
                viewModel.set("snapshot", Defiant.getSnapshot(activities));
                app.utilities.handleTooltips();
                app.mobileApp.pane.loader.hide(); //hide loading animation
                
            });
            
            var eventSubscription = app.events.subscribe('newEvents', function(events) {
                viewModel.set("eventSnapshot", Defiant.getSnapshot(events));
                viewModel.set("events", events);
            });
            
             var pastEventSubscription = app.events.subscribe('newPastEvents', function(events) {
                viewModel.set("pastEvents", events);
                viewModel.set("pastEventsLength", events.length);
            });
            
            var filterSubscription = app.events.subscribe('newFilters', function(filters) {
                viewModel.set("filters", filters);
                viewModel.set("hasFilters", true);
            });
            
            var indicatorSubscription = app.events.subscribe('indicatorDetails', function(indicator) {
                swal(indicator.description);
            });
            
            app.mobileApp.pane.loader.show(); //show loading animation
            
            app.middleWare.getActivities();
            app.middleWare.getEvents();
            app.middleWare.getPastEvents();
            
            
        }
        var show = function () {
        	bindTabs();
            ratingWidget = $('.star-rating').kendoReplyRating({
                mouseover: function(e) {
                  var title = e.item.attr('title');
                  $('.star-hover').text(" - " + e.value + ": " + title);
                },
                mouseleave: function() {
                  $('.star-hover').text("");
                }
            }).data('kendoReplyRating');
            
            if (viewModel.activities.length === 0) {
                app.middleWare.getActivities();
                app.middleWare.getEvents();
                app.middleWare.getPastEvents();
            }
        }
        var afterShow = function () {
            if (viewModel.hasFilters) {
            	filterActivities();    
            }
        } 
        var hide = function () {

        }
    	var onBeforeShow = function() {
            $('.tabs .tab').show();
            
        }
        var filterActivities = function() {
			var searchString = '//*';
            var newItems = [];
            if (viewModel.filters.ages.length > 0) {
                var ageSearchArray = [];
                $.each(viewModel.filters.ages, function(index, item) {
                    ageSearchArray.push('contains(ageGroup,"'+item.name+'")');
                });
                searchString = searchString + '[' + ageSearchArray.join(' or ') + ']';
            }
            
            if (viewModel.filters.cost.length > 0) {
                var costSearchArray = [];
                $.each(viewModel.filters.cost, function(index, item) {
                    costSearchArray.push('contains(costType,"'+item.name+'")');
                });
                searchString = searchString + '[' + costSearchArray.join(' or ') + ']';
            }
            
            if (viewModel.filters.indicators.length > 0) {
                var indicatorSearchArray = [];
                $.each(viewModel.filters.indicators, function(index, item) {
                    indicatorSearchArray.push('contains(indicator,"'+item.name+'")');
                });
                searchString = searchString + '[' + indicatorSearchArray.join(' or ') + ']';
            }
            
            if (viewModel.filters.categories.length > 0) {
                var categorySearchArray = [];
                $.each(viewModel.filters.categories, function(index, item) {
                    categorySearchArray.push('contains(category,"'+item.description+'")');
                });
                searchString = searchString + '[' + categorySearchArray.join(' or ') + ']';
            }
            if (searchString != '//*') {
            	newItems = JSON.search(viewModel.snapshot, searchString);
            	app.activityList.viewModel.set("activities", newItems); 
                handleTooltips();
                if (newItems.length == 0) {
                    viewModel.set('state.activitiesEmpty', true);
                } else {
                    viewModel.set('state.activitiesEmpty', false);
                }
                
      			newItems = JSON.search(viewModel.eventSnapshot, searchString);
            	app.activityList.viewModel.set("events", newItems);
                if (newItems.length == 0) {
                    viewModel.set('state.eventsEmpty', true);
                } else {
                    viewModel.set('state.eventsEmpty', false);
                }      
                
            } else {
            	app.activityList.viewModel.set("activities", viewModel.snapshot.src);
                if (app.activityList.viewModel.activities.length == 0) {
                    viewModel.set('state.activitiesEmpty', true);
                } else {
                    viewModel.set('state.activitiesEmpty', false);
                }
                app.activityList.viewModel.set("events", viewModel.eventSnapshot.src);
                if (app.activityList.viewModel.events.length == 0) {
                    viewModel.set('state.eventsEmpty', true);
                } else {
                    viewModel.set('state.eventsEmpty', false);
                }
            }
        }
        var bindTabs = function() {
            $('.eventsTab').unbind('click').bind('click', function() {
            	$('.tabs .tab').removeClass('active');
                $('.eventsTab').addClass('active');
                $('.eventsListView').show();
                $('.activitiesListView').hide();
            });
            
            $('.activitiesTab').unbind('click').bind('click', function() {
            	$('.tabs .tab').removeClass('active');
                $('.activitiesTab').addClass('active');
                $('.eventsListView').hide();
                $('.activitiesListView').show();
            });
   			
        }
        
        var handleTooltips = function() {
            $('.indicator').unbind('click').bind('click', function() {
               $(this).find('.tooltip').toggle(); 
            });
        }
        
        return {
            viewModel: viewModel,
            init: init,
            show: show,
            hide: hide,
            bindTabs: bindTabs,
            onBeforeShow: onBeforeShow,
            afterShow: afterShow,
            handleTooltips: handleTooltips
        };
    }());
    return module;
}());
