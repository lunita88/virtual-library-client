
var app = {
    // Application Constructor
    initialize: function() {
        //document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
       app.onDeviceReady();
    },
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log("Received event: " + id);
        this.showSplashScreen();
        setTimeout(function() { 
            app.hideSplashScreen();
            //app.testProtected();
            if(user.isLoggedIn()) {
                book.startSomePage();
            }else {
                user.showLogin();
            }
        }, 3000);

        //document.getElementById('testProtectedButton').onclick = this.testProtected;
        //user.init('userAuth');
    },
    splashScreenTemplate: `
           <div id="splashScreen">
             <img src="./img/splashScreen.jpg" />
           </div>
        `.trim(),
        showSplashScreen: function() {
           document.getElementById("splash").innerHTML = this.splashScreenTemplate;   
        },
        hideSplashScreen: function() {
           document.getElementById("splash").style.display = "none";   
        },
    /*
    testProtected: function () {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState==4) {
                switch (this.status) {
                    case 200:
                        var res = JSON.parse(xhttp.responseText);
                        console.log(res.message);
                        break;
                    case 401:
                        var res = JSON.parse(xhttp.responseText);
                        console.log(res.message);
                        user.showLogin('Please log in to access protected route.');
                        break;
                    case 403:
                        var res = JSON.parse(xhttp.responseText);
                        console.log(res.message);
                        user.showLogin('Please log in to access protected route.');
                        break;
                    default:
                        // unhandled error
                        console.log("Unhandled error");
                }
            }
        };
        xhttp.onerror = function (err) {
            var authContainer = document.getElementById('userAuth');

            authContainer.innerHTML = '<div id="snackbar">Service possibly down.</div>';
            var snackbarElement = document.getElementById("snackbar");
            snackbarElement.className = "show";

            // After 3 seconds, remove the show class from DIV
            setTimeout(function () { authContainer.innerHTML = ''; }, 3000);
            console.log(err);
        };

        xhttp.open("GET", "http://185.39.3.120:8001/test-protected", true);
        xhttp.setRequestHeader("Authorization", "Bearer: " + user.getToken());
        xhttp.send();
    } */
}; 


app.initialize();

