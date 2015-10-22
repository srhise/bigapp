'use strict';

app.forgotPassword = kendo.observable({
    onShow: function() {},
    cleanView: function() {},
    init: function() {
        app.forgotPassword.forgotModel.email = '';
    }
});

// START_CUSTOM_CODE_home
// END_CUSTOM_CODE_home
(function(parent) {
    var provider = app.data.bigAppBackend,
        init = function(error) {
            var initialScreenSize = window.innerHeight;
            window.addEventListener("resize", function() {
                if(window.innerHeight < initialScreenSize){
                    $("[data-role=footer]").hide();
                }
                else{
                    $("[data-role=footer]").show();
                }
            });
            
        },
        successHandler = function(data) {
        },
        forgotModel = kendo.observable({
            displayName: '',
            email: '',
            password: '',
            validateData: function(data) {
                if (!data.email) {
                    swal({
                        title: "Couldn't Reset Password",
                        text: "Please enter a valid email address"
                    });
                    return false;
                }

                return true;
            },
            forgetPassword: function() {
                var model = forgotModel,
                email = model.email.toLowerCase();
                if (!model.validateData(model)) {
                        return false;
                }

                swal({
                        title: "Password Reset Success",
                    	type: "success",
                        text: "Please check your email to obtain your password."
                });
            },
            goBack: function() {
                app.mobileApp.navigate('components/home/view.html');
            }
        });

    parent.set('forgotModel', forgotModel);
    parent.set('onShow', function() {
		console.log(this);
    });
    parent.set('cleanView', function() {
    });
})(app.forgotPassword);