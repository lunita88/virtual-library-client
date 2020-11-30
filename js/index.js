
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

        document.getElementById('testProtectedButton').onclick = this.testProtected;
        //user.init('userAuth');
        user.getSecondSinceEpoch();
    },
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
    }
};



/*
 closeLoginPage: function(res,userId) { 
    var newUser = {
        "username": document.querySelector('[name="username"]').value,
        "password": document.querySelector('[name="password"]').value,
    }
    var vUser = document.querySelector('[name="username"]').value;
    var vPass = document.querySelector('[name="password"]').value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var res = JSON.parse(xhttp.responseText);
                document.querySelector('[name="email"]').value = res.email;
                //document.querySelector('[name="password"]').value = res.password;
                  if(vUser == res.username && vPass == res.password ) {
                      console.log("ovo je pasvord");
                    
                    document.getElementById("login").style.display = "none";
                    document.getElementById("createBook").style.display = "block";
                    console.log("ispravan je");
          }      else {
                   document.getElementById("login").style.display = "block";
                   document.getElementById("createBook").style.display = "none";
                   console.log("nije ispravan password");
                   alert("nije ispravan password");
          }
          
            }
        }

        xhttp.open("POST", "http://185.39.3.120:8001/login", true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(newUser));
        //document.getElementById("buttonLogin").style.display = "none";
        //document.getElementById("startMeni").style.display = "none";
     

      
},  
 


    exit: function() {
       document.getElementById("showSignUp").style.display = "block";
       document.getElementById("showLogin").style.display = "block";
       document.getElementById("exit").style.display = "none";
       document.getElementById("login").style.display = "none";
       document.getElementById("buttonLogin").style.display = "none";
       document.getElementById("signUpPage").style.display = "none";
   },
   logOut: function() {
    document.getElementById("showSignUp").style.display = "block";
    document.getElementById("showLogin").style.display = "block";
    window.location.reload();
   }
};
*/

app.initialize();

