function initSlider(){
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
}

window.addEventListener('resize', onWindowResize, false);

function deleteConnections(){
  if(selected[0]){
    console.log(selected);
    if(selected[0].type == "connection"){
      for(i=0;i<selected.length;i++){
        if(selected[i].type == "connection"){
          connections[selected[i].index].remove();
        }
      }
    }else{
      showAlert(".alert-info", "Please make sure you select only connection(s) and no other objects.");
    }
  }else{
    showAlert(".alert-info", "Please select something first!");
  } 
}

function pauseAnimation(){
  paused = true;
  document.getElementById("play-icon").className = "glyphicon glyphicon-play";
}

function startAnimation(){
  paused = false;  
  document.getElementById("play-icon").className = "glyphicon glyphicon-pause";
}

function togglePause(){
  if(paused == true){
    startAnimation();
  }else{
    pauseAnimation();
  }
}

$(document).keypress(function(e) {
  if(inputDisabled == false){
    var c = String.fromCharCode(e.which) // or e.keyCode
    if(c == "a"){
      addConnection();
    }
    if(c == "d"){
      deleteConnections();
    }
    if (e.keyCode == 0 || e.keyCode == 32) {
      togglePause();
    }
  }
});

// Pause animation if 
$( "#play-button" ).click(function() {
  togglePause();
});

$( "#toggle-skeleton" ).click(function() {
    if(skeletonVisible == true){
      for(i=0;i<connections.length;i++){
        connections[i].object.visible = false;
      }
      skeletonVisible = false;
      document.getElementById("skeleton-icon").className = "glyphicon glyphicon-eye-close";
    }else{
      for(i=0;i<connections.length;i++){
        connections[i].object.visible = true;
      }
      skeletonVisible = true
      document.getElementById("skeleton-icon").className = "glyphicon glyphicon-eye-open";
    }
});

// This function creates a connection if two markers are selected
function addConnection(){
  if(selected[0] && selected[1]){
    console.log(selected);
    if(selected[0].type == "marker" && selected[1].type == "marker"){
      var connection = new Connection(selected[0].index, selected[1].index, 10);
      connection.draw();
      connections.push(connection); 
    }else{
      showAlert(".alert-info", "Please make sure to select markers and no other objects.");
    }
  }else{
    showAlert(".alert-info", "Please select two markers first.");
  } 
}

// Create a connection, to do so, pass selected points
$( "#add-connection" ).click(function() {
  addConnection();
});

 // Create a connection, to do so, pass selected points
$( "#slowdown-animation" ).click(function() {
  animationSpeed = animationSpeed * 0.5;
  $('#animation-speed-label').html(animationSpeed + " x ");
});

   // Create a connection, to do so, pass selected points
$( "#speedup-animation" ).click(function() {
  animationSpeed = animationSpeed * 2;
  $('#animation-speed-label').html(animationSpeed + " x ");
});

  // Create a connection, to do so, pass selected points
$( "#delete" ).click(function(){
  deleteConnections();
});

// Create a connection, to do so, pass selected points
$( "#selected-smaller" ).click(function(){

  if(selected[0].type == "connection"){
    if(connectionWidth != 0){
      connectionWidth = connectionWidth - 1;  
    }
  }

  if(selected[0].type == "marker"){
    markerRadius = markerRadius -1;
    for(var i = 0; i < markers.length; i++){
      markers[i].remove();
      markers[i].draw();
      scene.add(markers[i].object);
    }
  }

});

// Create a connection, to do so, pass selected points
$( "#selected-larger" ).click(function(){

  if(selected[0].type == "connection"){
    if( connectionWidth < 10 ){
      connectionWidth = connectionWidth + 1;
    }
  }

  if(selected[0].type == "marker"){
    if( markerRadius > 0 ){
      markerRadius = markerRadius +1;
      for(var i = 0; i < markers.length; i++){
        markers[i].remove();
        markers[i].draw();
        scene.add(markers[i].object);
      }
    }
  }

});

// Create a connection, to do so, pass selected points
$( "#reset" ).click(function(){
  init(filePath);
});

function saveSkeleton(){
  var name = $("#skeleton-name").val();

  var connections_data = {};
  connections_data.title = name;

  var connection_objects = []; 

  var marker_1;
  var marker_2;

  for(var i=0;i<connections.length;i++){
    console.log(connections[i]);
    marker_1 = connections[i].m1;
    marker_2 = connections[i].m2;
    var connection = {marker1: marker_1, marker2: marker_2}; 
    connection_objects.push(connection);
  }

  connections_data.connections = connection_objects;

  console.log(connections_data);

  var data = new FormData();
  data.append("data" , connection_objects);
  // var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
  // xhr.open( 'post', 'save_skeleton.php', true );
  // xhr.send(data, name);

  

  $('#save-skeleton-modal').modal('hide');
  showAlert(".alert-success","Skeleton with name: " + name + " saved succesfully!");
}

$( "#save-skeleton" ).click(function(){
  if( $("#skeleton-name").val() ) {
    saveSkeleton();
  } else {
    var alert = "#enter-name";
    $(alert).fadeIn();
    $(alert).delay( 1200 ).fadeOut();
  }
});

$( "#show-save-skeleton-modal").click(function(){
  if(connections.length > 0){
    $('#save-skeleton-modal').modal('show');
    pauseAnimation();
  } else{
    showAlert(".alert-info","Please draw a skeleton first!")
  }
});

$( "#show-files-list" ).click(function(){
  controls.enabled = false;
  pauseAnimation();
  $('#show-files-modal').modal('show');
});

$( "#show-socket-modal" ).click(function(){
  controls.enabled = false;
  pauseAnimation();
  $('#socket-adress-modal').modal('show');
  $('#socket-adress').focus();
});

$("#connect-to-socket").click(function(){
  $('.modal').find('#socket-loader').show();
  var adress = $('#socket-adress').val();
  connectToSocket(adress);
})

$("#animate-file").click(function(){
  animateFile(url);
})

$( ".coordinate-file-url" ).click(function(){
  $(".modal").modal('hide');
  var url = $(this).text();
  // webglRenderer.context.canvas.loseContext();
  animateFile(url);
});

function showAlert(alert_class, text){
  $(alert_class).html(text);
  $(alert_class).fadeIn();
  $(alert_class).delay( 1200 ).fadeOut();
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  webglRenderer.setSize(window.innerWidth, window.innerHeight);
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

$(document).mousedown(function() {
  onDocumentMouseDown(event, selected);
});

function onDocumentMouseDown( event ) {

  event.preventDefault();

  // get the mouse positions
  var mouse_x = ( event.clientX / window.innerWidth ) * 2 - 1;
  var mouse_y = -( event.clientY / window.innerHeight ) * 2 + 1;


  var vector = new THREE.Vector3(mouse_x, mouse_y, 0.5);
  
  // we do this by using the unproject function which converts the 2D mouse
  // position to a 3D vector.
  vector.unproject(camera);

  // now we cast a ray using this vector and see what is hit.
  var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

  raycaster.linePrecision = connectionWidth;
  // intersects contains an array of objects that might have been hit

  var intersects = raycaster.intersectObjects(scene.children);

  if ( intersects.length > 0 ) {
    // If array is not empty
    if(selected.length > 0){
      // If clicked item is not similar to selected items, empty array
      if(intersects[0].object.type != selected[0].type){
        deselectAll();
      }      
    }

    intersected = intersects[0].object;

    // If there are to selected, shift second to first place, add new one
    if(selected.length == 2){
      selected[0] = selected[1];
      selected[1] = intersected;
    }else{
      selected.push(intersected);
    
    }
  }
}

// This function causes to focus on the first inputfield of every modal that is fired
$('.modal').on('shown.bs.modal', function () {
  inputDisabled = true;
  lastfocus = $(this);
  $(this).find('input:text:visible:first').focus();
})

// This function causes to enable input when zeh modal is hidden
$('.modal').on('hidden.bs.modal', function () {
  inputDisabled = false;
})

