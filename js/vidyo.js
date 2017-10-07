var vidyoConnector;

  // Callback method when VidyoIO is done loading (pointer to this method is passed in the onload parameter while including the
   // VidyoClient.js file)
    function onVidyoClientLoaded(status) {
      console.log("VidyoClient load state - " + status.state);
      if (status.state == "READY") {
        VC.CreateVidyoConnector({
          viewId:"renderer", // Div ID where the composited video will be rendered, see VidyoConnector.html;
          viewStyle:"VIDYO_CONNECTORVIEWSTYLE_Default", // Visual style of the composited renderer
          remoteParticipants:10, // Maximum number of participants to render
          logFileFilter:"error",
          logFileName:"",
          userData:""
        }).then(function (vc) {
          console.log("Create success");
          vidyoConnector = vc;
          joinCall()
        }).catch(function(error){

        });
      }
    }

    function joinCall(){

      var token = getParameterByName('token');
      // To join a video conference call Connect method
      vidyoConnector.Connect({
        host:"prod.vidyo.io",  // Server name, for most production apps it will be prod.vidyo.io
        token: token,// "cHJvdmlzaW9uAHVzZXIxQGVkNjU4Ni52aWR5by5pbwA2MzY3NDEwMDg5NwAAZTUyODllZTRkMTYzNDhiYWQ0YTYwYzYzOTQ2ZWEyMDliYWRjZjkxODk3NzcxY2M0NzE3ODZlZjMzOTcyZTc4MTQwMTdkM2Q5ZGQ4YTNkYzRlODk4ZWU2YmY3MDk1MTc4",          // Add generated token (https://developer.vidyo.io/documentation/4-1-16-8/getting-started#Tokens)
        displayName:"Culturoo",  // Display name
        resourceId:"demoRoom", // Room name
        onSuccess: function(){
          console.log("Connected!! YAY!");
        },
        onFailure: function(reason){
          console.error("Connection failed");
        },
        onDisconnected: function(reason) {
          console.log(" disconnected - " + reason);
        }
      })
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
