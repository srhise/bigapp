'use strict';

app.agendaView = kendo.observable({
    onShow: function() {}
});

// START_CUSTOM_CODE_agendaView
// END_CUSTOM_CODE_agendaView
(function(parent) {
    var agendaViewModel = kendo.observable({
        openLink: function(url) {
            window.open(url, '_system');
            if (window.event) {
                window.event.preventDefault && window.event.preventDefault();
                window.event.returnValue = false;
            }
        }
    });

    parent.set('agendaViewModel', agendaViewModel);
})(app.agendaView);