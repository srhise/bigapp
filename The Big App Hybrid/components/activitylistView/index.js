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
            dataSource: dataSource,
            itemClick: function(e) {
                app.mobileApp.navigate('#components/activitylistView/details.html?uid=' + e.dataItem.uid);
            },
            detailsShow: function(e) {
                var item = e.view.params.uid,
                    itemModel = dataSource.getByUid(item);
                if (!itemModel.text) {
                    itemModel.text = String.fromCharCode(160);
                }
                activitylistViewModel.set('currentItem', itemModel);
            },
            currentItem: null
        });

    parent.set('activitylistViewModel', activitylistViewModel);
})(app.activitylistView);