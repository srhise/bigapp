/**
 * Activity Listing Page
 */
var app = app || {};
app.filterActivities = (function () {
    'use strict';
    var module = (function () {
        var viewModel = kendo.observable({
            filters: [],
            indicators: [],
            categories: [],
            ages: [
                {
                    id: 1,
                    name: 'Elementary School',
                    active: false,
                  	class: ''
                },
                {
                    id: 2,
                    name: 'Middle School',
                    active: false,
                    class: ''
                },
                {
                    id: 3,
                    name: 'High School',
                    active: false,
                    class: ''
                }                
            ]
        });
        var init = function () {
            
            app.middleWare.getCategories();
            app.middleWare.getIndicators();
            
            var categorySubscription = app.events.subscribe('newCategories', function(categories) {
                $.each(categories, function( index, value ) {
                	value.active = false;
                    value.class = '';
                });
                viewModel.set("categories", categories);
            });
            
            var indicatorsSubscription = app.events.subscribe('newIndicators', function(indicators) {
                $.each(indicators, function( index, value ) {
                	value.active = false;
                    value.class = '';
                });
                viewModel.set("indicators", indicators);
            });
        }
        var show = function () {
        	app.utilities.showActiveTabs();
            
            $('div.tabs a').on('click', function(e) {
                e.preventDefault();
                $('div.tabs a').removeClass('active');
                $(this).closest('a').toggleClass('active');
                app.utilities.showActiveTabs();
            });	
        }        
        var hide = function () {
        }
    	var onBeforeShow = function() {
           
        }
        var addFilter = function(e) {
            var id = $(e.target).closest('span').data().id;
            var name = $(e.target).closest('span').data().string;
            var group = $(e.target).closest('span').data().group;
            handleFilter(id, name, group );
        }
        var handleFilter = function(id, name, group) {
            if (group == 'ages') {
                $('[data-id=ages-'+id+'] i').toggleClass('fa fa-check');
                id = id.split('-')[1];
                $.each(viewModel.ages, function( index, value ) {
                  if(value.id == id) {
                      value.set("active", !value.active);
                      if (value.active) {
                          value.set("class", 'fa fa-check');
                      } else {
                          value.set("class", '');
                      }
                  }
                });
            }
            
            if (group == 'indicators') {
                $('[data-id=indicators-'+id+'] i').toggleClass('fa fa-check');
                id = id.split('-')[1];
                $.each(viewModel.indicators, function( index, value ) {
                  if(value.id == id) {
                      value.set("active", !value.active);
                      if (value.active) {
                          value.set("class", 'fa fa-check');
                      } else {
                          value.set("class", '');
                      }
                  }
                });
            }
            
            
        }
        return {
            viewModel: viewModel,
            init: init,
            show: show,
            hide: hide,
            onBeforeShow: onBeforeShow,
            addFilter: addFilter,
            handleFilter: handleFilter
        };
    }());
    return module;
}());