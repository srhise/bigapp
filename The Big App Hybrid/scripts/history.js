/**
 * History Page
 */
var app = app || {};
app.History = (function () {
    'use strict';
    var module = (function () {
        var viewModel = kendo.observable({
            year: [],
            indicator: [],
            historyList: []
        });
        var init = function () {
			
        }
        var show = function () {
            bindTabs();
        }        
        var hide = function () {
            
        }
    	var onBeforeShow = function() {
                       
            app.middleWare.historyYear(app.state.model.user.id, function(response) {
               viewModel.set("year", response.reverse());
               if (app.utilities.canAccessGoogleVisualization()) {
               	 drawColumn();    
               } else {
               	 google.charts.load('current', {packages: ['corechart']});
    		  	 google.charts.setOnLoadCallback(drawColumn);			   
               }
               app.middleWare.historyIndicators(app.state.model.user.id, function(response) {
                   viewModel.set("indicator", response);
                   if (app.utilities.canAccessGoogleVisualization()) {
                     drawDonut();    
                   } else {
                     google.charts.setOnLoadCallback(drawDonut);			   
                   }
               });
            });
            
            app.middleWare.historyList(app.state.model.user.id, function(response) {
               viewModel.set("historyList", response);
               console.log(response);
           });            
        
        }
        
        var addFilter = function(e) {
            
        }
        
        var drawDonut = function() {
			
            var indicatoryArray = [['Indicator', 'Count']];
            
            $.each(viewModel.indicator, function(index, value) {
            	indicatoryArray.push([value.indicator, value.count]);    
            });
            
            var data = google.visualization.arrayToDataTable(indicatoryArray);

            var options = {
              pieHole: 0.4,
              pieSliceText: 'label', 
              legend: 'none',
              chartArea: {'width': '100%', 'height': '80%'},
              colors:['#711db8','#8f23b4','#b256d3','#cf9cdf','#521469','#00A5C6','#DEBDDE','#000000'],
              fontName: 'Verdana'
            };

            var chart = new google.visualization.PieChart(document.getElementById('donutChart'));
            chart.draw(data, options);
        }
	
        var drawColumn = function() {
			
            var dateArray = [];
            
            $.each(viewModel.year, function(index, value) {
            	dateArray.push([value.month.charAt(0), value.count, value.month + ': ' + value.count]);    
            });
			var dataTable = new google.visualization.DataTable();
            dataTable.addColumn('string', 'Month');
            dataTable.addColumn('number', 'Count');
            // A column for custom tooltip content
            dataTable.addColumn({type: 'string', role: 'tooltip'});
          	dataTable.addRows(dateArray);        
            
            var options = {
                chartArea: {'width': '100%', 'height': '100px'},
                legend: { position: 'none' },
                colors: ['#666666'],
                axes: {
                x: {
                  0: { side: 'top', label: 'White to move'} // Top x-axis.
                }
                },
                bar: { groupWidth: "90%" },
                vAxis: {
                    gridlines: {
                        color: 'transparent'
                    }
                }
            };

           var chart = new google.visualization.ColumnChart(document.getElementById('columnChart'));
           chart.draw(dataTable, options);

        }
            
        var bindTabs = function() {
            
            $('.statsTab').unbind('click').bind('click', function() {
            	$('.tabs .tab').removeClass('active');
                $('.statsTab').addClass('active');
                $('.statsTabContent').show();
                $('.historyTabContent').hide();
            });
            
            $('.historyTab').unbind('click').bind('click', function() {
            	$('.tabs .tab').removeClass('active');
                $('.historyTab').addClass('active');
                $('.historyTabContent').show();
                $('.statsTabContent').hide();
            });
            
            $('.statsTab').click();
   			
        }
        
        return {
            viewModel: viewModel,
            init: init,
            show: show,
            hide: hide,
            onBeforeShow: onBeforeShow,
            drawDonut: drawDonut,
            drawColumn: drawColumn,
            bindTabs: bindTabs
        };
    }());
    return module;
}());