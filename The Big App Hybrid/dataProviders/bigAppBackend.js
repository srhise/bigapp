'use strict';

(function() {
    app.data.bigAppBackend = new Everlive({
        offlineStorage: true,
        apiKey: 'ONJA1QD8Eb4AFkmT',
        url: '//platform.telerik.com/bs-api/v1/',
        scheme: 'https'
    });

    document.addEventListener('online', function() {
        app.data.bigAppBackend.offline(false);
        app.data.bigAppBackend.sync();
    });

    document.addEventListener('offline', function() {
        app.data.bigAppBackend.offline(true);
    });

}());

// START_CUSTOM_CODE_bigAppBackend
// END_CUSTOM_CODE_bigAppBackend