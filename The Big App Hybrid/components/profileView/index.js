'use strict';

app.profileView = kendo.observable({
    onShow: function() {}
});

// START_CUSTOM_CODE_profileView
// END_CUSTOM_CODE_profileView
(function(parent) {
    var dataProvider = app.data.bigAppBackend,
        dataSourceOptions = {
            type: 'everlive',
            transport: {
                typeName: 'BigName',
                dataProvider: dataProvider
            },
            schema: {
                model: {
                    fields: {
                        'Name': {
                            field: 'Name',
                            defaultValue: ''
                        },
                        'Phone': {
                            field: 'Phone',
                            defaultValue: ''
                        },
                    },
                    icon: function() {
                        var i = 'globe';
                        return kendo.format('km-icon km-{0}', i);
                    }
                }
            },
        },
        dataSource = new kendo.data.DataSource(dataSourceOptions),
        profileViewModel = kendo.observable({
            dataSource: dataSource
        });

    parent.set('profileViewModel', profileViewModel);
})(app.profileView);