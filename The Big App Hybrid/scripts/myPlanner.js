/**
 * Activity Listing Page
 */
var app = app || {};

app.myPlanner = (function () {
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
            	app.middleWare.getActivity(e.data.activityID );
                app.mobileApp.navigate('views/activityDetails.html');
            },
            inquireActivity: function(e) {
            	alert(e.data.activityID );
            },
            trackActivity: function(e) {
            	alert(e.data.activityID );
            },
            removeActivity: function(e) {
            	app.middleWare.deleteFromAgenda(e.data.agendaID, app.state.model.user.id);
            },
            indicatorPopup: function(e) {
                app.middleWare.getIndicator(e.data.indicatorID);
            }
        });
        var init = function () {
            
            var activitySubscription = app.events.subscribe('newAgendaActivities', function(activities) {
                viewModel.set("activities", activities);
                app.utilities.handleTooltips();
            });
            
            var eventSubscription = app.events.subscribe('newAgendaEvents', function(events) {
                viewModel.set("events", events);
            });
            
            var indicatorSubscription = app.events.subscribe('indicatorDetails', function(indicator) {
                swal(indicator.description);
            });
            app.mobileApp.pane.loader.show(); //hide loading animation
			app.middleWare.getActivityAgenda(app.state.model.user.id);
            app.middleWare.getEventAgenda(app.state.model.user.id);
            
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
