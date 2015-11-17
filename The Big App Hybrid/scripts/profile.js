/**
 * My Profile Page
 */
var app = app || {};
app.profile = (function () {
    'use strict';
    var module = (function () {
        var viewModel = kendo.observable({
            photo: '',
            addImage: function() {
                var success = function (data) {
                    viewModel.set("photo", 'data:image/jpg;base64,' + data);
                    app.middleWare.appPicture(app.state.model.user.id, viewModel.photo);
                };
                var error = function () {
                    if (typeof errorCallback != "undefined") {

                    } else {
                        app.mobileApp.navigate('views/profile.html');
                    }
                };
                var config = {
                    encodingType: Camera.EncodingType.PNG,
                    destinationType: Camera.DestinationType.DATA_URL,
                    allowEdit : false,
                    targetWidth: 300,
                    targetHeight: 300,
                    correctOrientation: 1, 
                    saveToPhotoAlbum: 0,
                    quality: 95
                };
                navigator.camera.getPicture(success, error, config);
            },
            updateUser: function() {
                app.middleWare.updateUser({id: app.state.model.user.id, email: viewModel.profile.email, workPhone: viewModel.profile.workPhone, cellPhone: viewModel.profile.cellPhone}, function(response) {
                    swal({
                        title: "Request Received",
                        text: "Our team will manually process this request. Your information may not update immediately."
                    });
                });
            },
            logout: function() {
                app.state.handleLogout();
            },
            externalLinks: {
                
            }
        });
        var init = function () {
            app.middleWare.appUser(app.state.model.user.id, function(response) {
               viewModel.set("photo", response.photoData);
               viewModel.set("profile", response);
          	   formatExternalLinks();
            });
        }
        var show = function () {

        }        
        var hide = function () {
            
        }
    	var onBeforeShow = function() {
           
        }
        
        var addFilter = function(e) {
            
        }
        
        var formatExternalLinks = function() {
            // Match Support Phone & Email
            viewModel.set("matchSupportBusinessPhoneHref", 'tel:' + viewModel.profile.matchSupportBusinessPhone );
            viewModel.set("matchSupportCellPhoneHref", 'tel:' + viewModel.profile.matchSupportCellPhone );
            viewModel.set("matchSupportEmailHref", 'mailto:' + viewModel.profile.matchSupportEmail );
            
            // Emergency Contact Phone & Email
        }

        return {
            viewModel: viewModel,
            init: init,
            show: show,
            hide: hide,
            onBeforeShow: onBeforeShow,
            formatExternalLinks: formatExternalLinks
        };
    }());
    return module;
}());