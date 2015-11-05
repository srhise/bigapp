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
                    group: 'ages',
                    name: 'Elementary',
                    active: false,
                  	class: ''
                },
                {
                    id: 2,
                    group: 'ages',
                    name: 'Middle',
                    active: false,
                    class: ''
                },
                {
                    id: 3,
                    group: 'ages',
                    name: 'High',
                    active: false,
                    class: ''
                }                
            ],
            cost: [
                {
                    id: 1,
                    group: 'cost',
                    name: 'Free',
                    active: false,
                  	class: ''
                },
                {
                    id: 2,
                    group: 'cost',
                    name: 'Paid',
                    active: false,
                    class: ''
                },
                {
                    id: 3,
                    group: 'cost',
                    name: 'Perks Available',
                    active: false,
                    class: ''
                }                
            ],
            clearFilters: function() {
                $.each(viewModel.ages, function(index, value) {
                	value.set("active", false);
                    value.set("class", "");
            	});
            	
            	$.each(viewModel.cost, function(index, value) {
                	value.set("active", false);
                    value.set("class", "");
            	});
        
        		$.each(viewModel.indicators, function(index, value) {
                	value.set("active", false);
                    value.set("class", "");
            	});
        
        		$.each(viewModel.categories, function(index, value) {
                	value.set("active", false);
                    value.set("class", "");
            	});
                app.events.publish('filterChange', {ages: viewModel.ages, cost: viewModel.cost, indicators: viewModel.indicators, categories: viewModel.categories});
            }
        });
        var init = function () {
            
            app.middleWare.getCategories();
            app.middleWare.getIndicators();
            
            var categorySubscription = app.events.subscribe('newCategories', function(categories) {
                $.each(categories, function( index, value ) {
                    value.group = 'categories';
                	value.active = false;
                    value.class = '';
                });
                viewModel.set("categories", categories);
            });
            
            var indicatorsSubscription = app.events.subscribe('newIndicators', function(indicators) {
                $.each(indicators, function( index, value ) {
                    value.group = 'indicators'
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
            var id = e.data.id;
            var name = e.data.string;
            var group = e.data.group;
            
            if (group == 'ages') {
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
            
            if (group == 'cost') {
                $.each(viewModel.cost, function( index, value ) {
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
            
            if (group == 'categories') {
                $.each(viewModel.categories, function( index, value ) {
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
            
            app.events.publish('filterChange', {ages: viewModel.ages, cost: viewModel.cost, indicators: viewModel.indicators, categories: viewModel.categories});
            
        }
        
        return {
            viewModel: viewModel,
            init: init,
            show: show,
            hide: hide,
            onBeforeShow: onBeforeShow,
            addFilter: addFilter
        };
    }());
    return module;
}());