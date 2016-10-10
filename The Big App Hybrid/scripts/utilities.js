/**
 * Global State Controller
 */
var app = app || {};

app.utilities = (function () {
    var module = (function () {
        
        var showActiveTabs = function() {
            
            $.each($('.tab'), function() {
                $(this).hide();
            });
            $.each($('div.tabs a.active'), function() {
                var activeTabClass;

                activeTabClass = $(this).data('id');

                $('.'+activeTabClass).show();
            });
            
        }
        
        var handleTooltips = function() {
            $('.indicator').unbind('click').bind('click', function() {
               $(this).find('.tooltip').toggle(); 
            });
        }
        
        var showToast = function(message) {
              window.plugins.toast.showWithOptions(
                {
                  message: message,
                  duration: "short",
                  position: "top"
                }
              );
        }
        
        var canAccessGoogleVisualization = function() {
            if ((typeof google === 'undefined') || (typeof google.visualization === 'undefined')) {
               return false;
            }
            else{
             return true;
           }
        }
        
        return {
            showActiveTabs: showActiveTabs,
            handleTooltips: handleTooltips,
            showToast: showToast,
            canAccessGoogleVisualization: canAccessGoogleVisualization
        };
    }());
    return module;
}());
