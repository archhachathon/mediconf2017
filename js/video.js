
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
      }).catch(function(error){

      });
    }
  }



  function setName(){

  }


  function joinCall(){
    var name = document.getElementById("displayName").value;
    // To join a video conference call Connect method
    vidyoConnector.Connect({
      host:"prod.vidyo.io",  // Server name, for most production apps it will be prod.vidyo.io
      token:"cHJvdmlzaW9uAHZpbm9kQGVlZGZkYS52aWR5by5pbwA2MzY3NjQxNjcwNgAAYmJhYzAzNWRkZDFmZDlmNTA2NzljODk3ZGU3OTU4ZjA1NTg4YzY5MmFiMzM5ZmRiZjNjZjA1ZmY3MmY1YzA4ZjJmYzE1ZGMwZWMwNzIwODQyZGYxMDIxNjE1NWQyZTU1",          // Add generated token (https://developer.vidyo.io/documentation/4-1-16-8/getting-started#Tokens)
      displayName:name,  // Display name
      resourceId:"demoRoom123", // Room name
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

/*document.getElementById("conectBtn").addEventListener("click", function(){
    console.log('btn clicked');
    joinCall();
  });*/

  $('#conectBtn').on('click', function(){
    console.log('btn clicked');
    joinCall();
  });
