'use strict';

app.profileView = kendo.observable({
    onShow: function() {}
});

// START_CUSTOM_CODE_profileView
// END_CUSTOM_CODE_profileView
(function(parent) {
    var dataProvider = app.data.bigAppBackend,
        processImage = function(img) {
            if (!img) {
                var empty1x1png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=';
                img = 'data:image/png;base64,' + empty1x1png;
            } else if (img.slice(0, 4) !== 'http' &&
                img.slice(0, 2) !== '//' &&
                img.slice(0, 5) !== 'data:') {
                var setup = dataProvider.setup;
                img = setup.scheme + ':' + setup.url + setup.apiKey + '/Files/' + img + '/Download';
            }

            return img;
        },

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
                        'JoinDate': {
                            field: 'JoinDate',
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
            dataSource: dataSource,
            itemClick: function(e) {
                app.mobileApp.navigate('#components/profileView/details.html?uid=' + e.dataItem.uid);
            },
            detailsShow: function(e) {
                var item = e.view.params.uid,
                    itemModel = dataSource.getByUid(item);
                itemModel.MapUrl = processImage(itemModel.Map);
                if (!itemModel.Email) {
                    itemModel.Email = String.fromCharCode(160);
                }
                profileViewModel.set('currentItem', itemModel);
            },
            currentItem: null
        });

    parent.set('profileViewModel', profileViewModel);
})(app.profileView);