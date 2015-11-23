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
            rating: null,
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
                var agendaID = e.data.agendaID;
            	swal({   
                    title: "How did it go?",   
                    text: "Your feedback is important. Please rate the activity and let us know if you have any further feedback.<div class='rating'><i data-id='1' class='rate fa fa-star inactive'></i><i data-id='2' class='rate fa fa-star inactive'></i><i data-id='3' class='rate fa fa-star inactive'></i><i data-id='4' class='rate fa fa-star inactive'></i><i data-id='5' class='rate fa fa-star inactive'></i></div><br/><textarea placeholder='additional feedback' rows='4'></textarea>",   
                    html: true,
                    inputPlaceholder: "Additional Feedback" 
                	}, function (inputValue) {                       	
                    	var comment = $('.sweet-alert textarea').val();
                   		var date = new Date();
                    	app.mobileApp.pane.loader.show();
                    	app.middleWare.markComplete(agendaID, comment, viewModel.get("rating"), date);
                	}
                );
                handleRating();
            },
            removeActivity: function(e) {
                swal({   
                    title: "Are you sure you want to remove this?",   
                    text: "Click ok to confirm.",   
                    type: "warning",   
                    showCancelButton: true,   
                    confirmButtonColor: "#8f23b3",   
                    confirmButtonText: "Ok",   
                    closeOnConfirm: false }, function(){
                        app.middleWare.deleteFromAgenda(e.data.agendaID, app.state.model.user.id);
                        $.each(viewModel.activities, function(index, value) {
                            if(typeof value != "undefined" && value.activityID == e.data.activityID) viewModel.activities.splice(index,1);
                        });
                        swal({
                            title: "Deleted!",
                            text: "Your activity was successfully removed.", 
                            type: "success",
                            timer: 1500,   
                            showConfirmButton: false
                        }); 
                });
            	
            },
            removeEvent: function(e) {
                swal({   
                    title: "Are you sure you want to remove this?",   
                    text: "Click ok to confirm.",   
                    type: "warning",   
                    showCancelButton: true,   
                    confirmButtonColor: "#8f23b3",   
                    confirmButtonText: "Ok",   
                    closeOnConfirm: false }, function(){
                        app.middleWare.deleteFromAgenda(e.data.agendaID, app.state.model.user.id);
                        $.each(viewModel.events, function(index, value) {
                            if(typeof value != "undefined" && value.activityID == e.data.activityID) viewModel.events.splice(index,1);
                        });
                        swal({
                            title: "Deleted!",
                            text: "Your activity was successfully removed.", 
                            type: "success",
                            timer: 1500,   
                            showConfirmButton: false
                        }); 
                });
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
            
            var completeSubscription = app.events.subscribe('activityComplete', function(response) {
                 app.mobileApp.pane.loader.hide();
                 swal({
                        title: "Success",
                        type: "success",
                        text: "You have successfully tracked this in your activity history! Thank you!."
                 });
                 
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
        
        var handleRating = function() {
            $('.rate').unbind('click').bind('click', function() {
               var rating = $(this).data('id');
               viewModel.set("rating", rating);
               $(this).css('color', '#444444');
               $(this).prevAll().css( "color", "#444444" );
               x$(this).nextAll().css( "color", "#cccccc" );
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
            handleRating: handleRating
        };
    }());
    return module;
}());
