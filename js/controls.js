initUI = function(){

  $('#animation-speed-label').html(animation_speed + " x ");

  $("#slider").slider(
    {
      value:iteration,
      min: 0,
      max: ( coordinates.length -2),
      step: 1,
      slide: function(event, ui) {
        paused = true;
        iteration = ui.value;
        controls.enabled = false;
      },
      stop: function(event, ui) {
        paused = false;
        controls.enabled = true;
      }
    }
  );

  $(document).keypress(function(e) {
    var c = String.fromCharCode(e.which) // or e.keyCode
    if(c == "a"){
      addConnection();
    }
    if(c == "d"){
      deleteConnections();
    }
  });

  $( "#play-button" ).click(function() {
      if(paused != true){
        paused = true;
        document.getElementById("play-icon").className = "glyphicon glyphicon-play";
      }else{
        paused = false
        document.getElementById("play-icon").className = "glyphicon glyphicon-pause";
      }
  });

  $( "#toggle-skeleton" ).click(function() {
      if(skeleton_visible == true){
        for(i=0;i<connections.length;i++){
          connections[i].object.visible = false;
        }
        skeleton_visible = false;
        document.getElementById("skeleton-icon").className = "glyphicon glyphicon-eye-close";
      }else{
        for(i=0;i<connections.length;i++){
          connections[i].object.visible = true;
        }
        skeleton_visible = true
        document.getElementById("skeleton-icon").className = "glyphicon glyphicon-eye-open";
      }
  });

  // Create a connection, to do so, pass selected points
  $( "#add-connection" ).click(function() {
    addConnection();
  });

  function addConnection(){
    var connection = new Connection(selected[0].index, selected[1].index, connection_color, 10);
    connection.draw();
    connections.push(connection);
  }

   // Create a connection, to do so, pass selected points
  $( "#slowdown-animation" ).click(function() {
    animation_speed = animation_speed * 0.5;
    $('#animation-speed-label').html(animation_speed + " x ");
  });

     // Create a connection, to do so, pass selected points
  $( "#speedup-animation" ).click(function() {
    animation_speed = animation_speed * 2;
    $('#animation-speed-label').html(animation_speed + " x ");
  });

    // Create a connection, to do so, pass selected points
  $( "#delete" ).click(function(){
    deleteConnections();
  });

  function deleteConnections(){
    for(i=0;i<selected.length;i++){
      if(selected[i].type == "connection"){
        console.log(selected);
        console.log(selected[i].index);
        connections[selected[i].index].remove();
        // connections.splice(selected[i].index, 1);
      }
    }
  }

  // Create a connection, to do so, pass selected points
  $( "#selected-smaller" ).click(function(){
    
    if(selected[0].type == "connection"){
      console.log(connection_radius);
      connection_radius = connection_radius -1;
    }

    if(selected[0].type == "marker"){
      if( marker_radius > 0 ){
        marker_radius = marker_radius -1;
        for(var i = 0; i < markers.length; i++){
          markers[i].remove();
          markers[i].draw(marker_radius);
          scene.add(markers[i].object);
        }
      }
    }
  });

  // Create a connection, to do so, pass selected points
  $( "#selected-larger" ).click(function(){

    if(selected[0].type == "connection"){
      console.log(connection_radius);
      connection_radius = connection_radius +1;
    }

    if(selected[0].type == "marker"){

      marker_radius = marker_radius +1;

      for(var i = 0; i < markers.length; i++){
        markers[i].remove();
        markers[i].draw(marker_radius);
        scene.add(markers[i].object);
      }

    }

  });

  // Create a connection, to do so, pass selected points
  $( "#reset" ).click(function(){
    init();
  });
}

function onKeyDown(e) {
  if (e.keyCode == 0 || e.keyCode == 32) {
      if(paused != true){
        paused = true;
        document.getElementById("play-icon").className = "glyphicon glyphicon-play";
      }else{
        paused = false
        document.getElementById("play-icon").className = "glyphicon glyphicon-pause";
      }
    }
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  webglRenderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseDown( event ) {

  event.preventDefault();

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  // find intersections

  raycaster.setFromCamera( mouse, camera );

  var intersects = raycaster.intersectObjects( scene.children );

  if ( intersects.length > 0 ) {
    
    if(selected.length > 0){
      // If clicked item is not similar to selected items, empty array
      if(intersects[0].object.type != selected[0].type){
        deselectAll();
      }
      //
    }
    
    intersected = intersects[0].object;

    if(intersected.selected == false){
      intersected.selected = true;
    }else{
      intersected.selected = false;
    }

    // If there are to selected, shift second to first place, add new one
    if(selected.length == 2){
      selected[0].selected = false;
      selected[0] = selected[1];
      selected[1] = intersected;
    }else{
      selected.push(intersected);
    }
  }
}

function deselectAll(){
  for(i=0;i<markers.length;i++){
    markers[i].object.selected = false;
  }
  for(i=0;i<connections.length;i++){
    connections[i].object.selected = false;
  }
  selected = [];
}