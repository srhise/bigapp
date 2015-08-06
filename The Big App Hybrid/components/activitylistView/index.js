'use strict';

app.activitylistView = kendo.observable({
    onShow: function() {}
});

// START_CUSTOM_CODE_activitylistView
// END_CUSTOM_CODE_activitylistView
(function(parent) {
    var dataProvider = app.data.bigAppBackend,
        dataSourceOptions = {
            type: 'everlive',
            transport: {
                typeName: 'ActivityList',
                dataProvider: dataProvider
            },
            schema: {
                model: {
                    fields: {
                        'text': {
                            field: 'text',
                            defaultValue: ''
                        },
                    }
                }
            },
        },
        dataSource = new kendo.data.DataSource(dataSourceOptions),
        activitylistViewModel = kendo.observable({
            dataSource: dataSource
        });

    parent.set('activitylistViewModel', activitylistViewModel);
})(app.activitylistView);