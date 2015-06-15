function Socket(adress){
  var ws = new WebSocket(adress, ['binary','base64']);
  ws.binaryType = 'arraybuffer';

  this.close = function(){
    ws.close();
  }

  this.connect = function(){
    // Pause the application
    paused = true;

    var connected = false;
    var first_array = true;
    
    ws.onopen = function(){
      console.log("connection opened");
      ws.send("Super secret");
      ws.send("handshake");
    }

    animationSpeed = 1;
    markerRadius = 43;
    coordinates = [];

    ws.onmessage = function(e){
      connected = true;
      var buffer = new Uint8Array(e.data);
      // Turn data into string
      var str = String.fromCharCode.apply(null, buffer);
      // Turn string into array without tabs
      var sa = splitArray(str);  
      // Turn array into coordinates divided by three
      var singleCoordinates = toCoordinates(sa);
      // Push singleCoordinates to all coordinates
      
      if(singleCoordinates.length > 0){
        coordinates.push(singleCoordinates);  
      }
      
      if(coordinates.length == 2){
        first_array = false;
        animateFromSocket(adress);
      } 
    }

    ws.onclose = function(e){
      initSlider();
      $(".file-title-holder").removeClass("active");
      $("#slider").show();
      showAlert(".alert-info", "Connection closed.");
      $(".file-title").html("Connection with: " + adress + " closed");
    }

    function splitArray(s){
      var splitArray = s.split('\t');
      return splitArray;
    }
    
    function toCoordinates(a){
      var newArray = [];
      var tempArray = [];

      for(i=0;i<a.length;i++){
        tempArray.push(a[i]);
        if(tempArray.length == 3){
          newArray.push(tempArray);
          tempArray = [];
        }
      }
      return newArray;
    }
  }
}