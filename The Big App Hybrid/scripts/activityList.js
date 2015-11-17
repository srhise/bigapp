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
            state: {
                activitiesEmpty: false,
            	eventsEmpty: false,
                totalFilters: null
            },
            loadActivity: function(e) {
            	app.middleWare.getActivity(e.data.id);
                app.mobileApp.navigate('views/activityDetails.html');
            },
            indicatorPopup: function(e) {
                app.middleWare.getIndicator(e.data.indicatorID);
            }
        });
        var init = function () {
            
            var activitySubscription = app.events.subscribe('newActivities', function(activities) {
                viewModel.set("snapshot", Defiant.getSnapshot(activities));
                viewModel.set("activities", activities);
                app.utilities.handleTooltips();
            });
            
            var eventSubscription = app.events.subscribe('newEvents', function(events) {
                viewModel.set("eventSnapshot", Defiant.getSnapshot(events));
                viewModel.set("events", events);
            });
            
            var filterSubscription = app.events.subscribe('newFilters', function(filters) {
                viewModel.set("filters", filters);
                viewModel.set("hasFilters", true);
            });
            
            var indicatorSubscription = app.events.subscribe('indicatorDetails', function(indicator) {
                swal(indicator.description);
            });
            app.mobileApp.pane.loader.show(); //hide loading animation
            app.middleWare.getActivities();
            app.middleWare.getEvents();
            
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
        
        return {
            viewModel: viewModel,
            init: init,
            show: show,
            hide: hide,
            bindTabs: bindTabs,
            onBeforeShow: onBeforeShow,
            afterShow: afterShow
        };
    }());
    return module;
}());
