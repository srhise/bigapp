/**
 * My Profile Page
 */
var app = app || {};
app.updateInfo = (function () {
    'use strict';
    var module = (function () {
        var viewModel = kendo.observable({
            name: '',
            email: '',
            workPhone: '',
            cellPhone: '',
            updateInfo: function() {
                app.middleWare.updateUser({id: app.state.model.user.id, email: viewModel.email, workPhone: viewModel.phone, cellPhone: viewModel.cellPhone}, function(response) {
                    swal({
                        title: "Request Received",
                        text: "Our team will manually process this request. Your information may not update immediately."
                    });
                });
            }
        });
        var init = function () {
            app.middleWare.appUser(app.state.model.user.id, function(response) {
               viewModel.set("photo", response.photoData);
               viewModel.set("profile", response);
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

        return {
            viewModel: viewModel,
            init: init,
            show: show,
            hide: hide,
            onBeforeShow: onBeforeShow
        };
    }());
    return module;
}());