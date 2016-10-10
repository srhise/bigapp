app.home = kendo.observable({
    onShow: function() {},
    cleanView: function() {
        app.home.homeModel.email = '';
        app.home.homeModel.password = '';
    },
    onBeforeShow: function() {
    	
    },
   	init: function() {       
        
        var initialScreenSize = window.innerHeight;
        window.addEventListener("resize", function() {
	        if(window.innerHeight < initialScreenSize){
        	    $("[data-role=footer]").hide();
    	    }
        	else{
            	$("[data-role=footer]").show();
        	}
        }); 
        
        var invalidLogin = app.events.subscribe('loginerror', function() {
            swal({
                title: "Invalid Credentials",
                text: "We were unable to login using the provided credentials. Please try again.",
                type: "error"
            });
        });
        
    }
});

// START_CUSTOM_CODE_home
// END_CUSTOM_CODE_home
(function(parent) {
    var provider = app.data.bigAppBackend,
        mode = 'signin',
        registerRedirect = 'profileView',
        signinRedirect = 'profileView',
        successHandler = function(data) {
       
        },
        homeModel = kendo.observable({
            displayName: '',
            email: 'srhise@exactaindy.com',
            password: '02tboyziU!',
            validateData: function(data) {
                if (!data.email) {
                    swal({
                        title: "Couldn't Signin",
                        text: "Please enter a valid email address"
                    });
                    return false;
                }

                if (!data.password) {
                    swal({
                        title: "Couldn't Signin",
                        title: "Incorrect password specified"
                    });                 
                    return false;
                }

                return true;
            },
            signin: function() {
                var model = homeModel,
                email = model.email.toLowerCase(),
                password = model.password;

                if (!model.validateData(model)) {
                        return false;
                }
                
				app.mobileApp.pane.loader.show(); //show loading animation
                app.middleWare.appLogin({user:email, pass: password});
                
                //app.mobileApp.navigate('views/activityList.html');
           		//provider.Users.login(email, password, successHandler, init);
                           
            },
            register: function() {
                var model = homeModel,
                    email = model.email.toLowerCase(),
                    password = model.password,
                    displayName = model.displayName,
                    attrs = {
                        Email: email,
                        DisplayName: displayName
                    };

                if (!model.validateData(model)) {
                    return false;
                }

                provider.Users.register(email, password, attrs, successHandler, init);
            },
            toggleView: function() {
                app.mobileApp.navigate('components/forgotPassword/view.html');
            },
            link: function() {
                alert('test');
            }
        });

    parent.set('homeModel', homeModel);
    parent.set('onShow', function() {
		console.log(this);
    });
    parent.set('cleanView', function() {
    });
})(app.home);