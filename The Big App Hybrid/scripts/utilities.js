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
        
        return {
            showActiveTabs: showActiveTabs
        };
    }());
    return module;
}());
