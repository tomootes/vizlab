// Init the slider with id="slider"
// set the min, max, steps and functions for starting and stop to slide and
function initSlider(){
  $("#slider").slider({
    value:iteration,
    min: 0,
    max: (coordinates.length -2),
    step: 1,
    // When slider starts to slide
    slide: function(event, ui){     
      paused = true;
      iteration = ui.value;
      controls.enabled = false;
    },
    stop: function(event, ui){ 
      // When slider stops to slide
      paused = false;
      controls.enabled = true;
    }
  });
}

// Adjust the renderer when the screensize changes
function onWindowResize(){
  // Set new camera settings and update
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  // Set new webglRenderer settings which will be updated the new frame
  webglRenderer.setSize(window.innerWidth, window.innerHeight);
}

// Execute onWindowResize when the event 'resize' occures on object window
window.addEventListener('resize', onWindowResize, false);

// Delete connections if they are selected
function deleteConnections(){

  var numberOfConnections = connections.length;
  var counterOfRemoved = 0;

  var toBeDeleted = [];

  for(c=0;c<numberOfConnections;c++){
    console.log(c);
    var s = connections[c - counterOfRemoved].isSelected();
    if(s == true){
      console.log("JA DEZE !!" + c);
      connections[c - counterOfRemoved].remove();
      counterOfRemoved = counterOfRemoved + 1;
    }
  }
  selected = [];
}

// Function for pausing the animation
function pauseAnimation(){
  paused = true;
  // Change #play-icon elements' classname to .glypicon-play to show the play icon when playing
  document.getElementById("play-icon").className = "glyphicon glyphicon-play";
}

// Function for starting the animation
function startAnimation(){
  paused = false;  
  // Change #play-icon elements' classname to .glypicon-pause to show the play icon when is paused
  document.getElementById("play-icon").className = "glyphicon glyphicon-pause";
}

// If this function is executed the animation will play or pause dependant on the variable paused
function togglePause(){
  if(paused == true){
    startAnimation();
  }else{
    pauseAnimation();
  }
}

// Toggle pause if id="play-button" is clicked
$( "#play-button" ).click(function(){
  togglePause();
});

$(document).bind("keyup",function(e){
  // Create a variable which beholds pressed key
  var value = String.fromCharCode(e.keyCode);
  if(value == "A"){           // If the character pressed is an a is a, trigger the addConnections function
    addConnections();
  }
  if(value == "D"){           // If the character pressed is a d, trigger the deleteConnections function
    deleteConnections();
  }
  if (e.keyCode == 0 || e.keyCode == 32) {    // If spacebar (e.keyCode == 32) is pressed
    togglePause();                            // Pause the animation
  }
});

// This function checks if something is being select at the moment, returns false or true
function somethingSelected(){
  var r = false;
  if(selected.length > 0){
    r = true;
  }else{
    r = false;
  }
  return r;
}

// This function clears that selected array or shows an alert which says: "Nothing selected"
function selectAllConnections(){
  selected = [];
  for(i=0;i<connections.length;i++){
    selected.push(connections[i].object);
    console.log(selected);
  }
}

// This function clears that selected array or shows an alert which says: "Nothing selected"
function selectAllMarkers(){
  selected = [];
  for(i=0;i<markers.length;i++){
    selected.push(markers[i].object);
  }
}

// This function clears that selected array or shows an alert which says: "Nothing selected"
function deselectAll(){
  if(somethingSelected()){
    selected = [];
  }
  else{
    showAlert(".alert-info", "Nothing selected");
  }
}


// deselectAll() is triggered on the click of #deselect-all
$( "#deselect-all" ).click(function() {
  deselectAll();
});

// deselectAll() is triggered on the click of #deselect-all
$( "#select-all-connections" ).click(function() {
  selectAllConnections();
});

// deselectAll() is triggered on the click of #deselect-all
$( "#select-all-connections" ).click(function() {
  selectAllConnections();
});

// Toggle of visibility of the skeleton
function toggleSkeleton(){
  if(skeletonVisible == true){                // If the skeleton is visible
    for(i=0;i<connections.length;i++){        // Set them al to invisible
      connections[i].object.visible = false;
    }
    skeletonVisible = false;                  // As the global variable
    document.getElementById("skeleton-icon").className = "glyphicon glyphicon-eye-close";     // And change the #skeleton-icons' class to ".glyphicon-eye-close" 
  }else{                                      // If skeleton is not visible
    for(i=0;i<connections.length;i++){        // Make all connections visible again
      connections[i].object.visible = true;
    }
    skeletonVisible = true                    // As the global variable
    document.getElementById("skeleton-icon").className = "glyphicon glyphicon-eye-open";      // And change the #skeleton-icons' class to ".glyphicon-eye-close" 
  }
}

//  Trigger toggleSkeleton(); if #toggle-skeleton is being clicked
$( "#toggle-skeleton" ).click(function() {
  toggleSkeleton();
});

// Toggle of visibility of the skeleton
function toggleMarkers(){
  if(markersVisible == true){                // If the skeleton is visible
    for(i=0;i<markers.length;i++){        // Set them al to invisible
      markers[i].object.visible = false;
    }
    markersVisible = false;                  // As the global variable
    document.getElementById("markers-visible-icon").className = "glyphicon glyphicon-eye-close";     // And change the #skeleton-icons' class to ".glyphicon-eye-close" 
  }else{                                      // If skeleton is not visible
    for(i=0;i<markers.length;i++){        // Make all connections visible again
      markers[i].object.visible = true;
    }
    markersVisible = true                    // As the global variable
    document.getElementById("markers-visible-icon").className = "glyphicon glyphicon-eye-open";      // And change the #skeleton-icons' class to ".glyphicon-eye-close" 
  }
}

//  Trigger toggleSkeleton(); if #toggle-skeleton is being clicked
$( "#toggle-show-markers" ).click(function() {
  toggleMarkers();
});

function hideSelectedObjects(){
  for(i=0;i<markers.length;i++){
    var s = markers[i].isSelected();

    if(s == true){
      markers[i].object.visible = false;
    }
  }
  for(i=0;i<connections.length;i++){
    var s = connections[i].isSelected();

    if(s == true){
      connections[i].object.visible = false;
    }
  }
}

function showSelectedObjects(){
  for(i=0;i<markers.length;i++){
    markers[i].object.visible = true;
  }
  for(i=0;i<connections.length;i++){
    connections[i].object.visible = true;
  }
}

$( "#toggle-show-selected" ).click(function() {
  if(somethingSelected()){
    if(selectedVisible == true){
      hideSelectedObjects();
      selectedVisible = false;
      document.getElementById("selected-toggle-icon").className = "glyphicon glyphicon-eye-close";
    }else{
      showSelectedObjects();
      selectedVisible = true
      document.getElementById("selected-toggle-icon").className = "glyphicon glyphicon-eye-open";
    }
  }
  else{
    showAlert(".alert-info", "Nothing selected");
  }
});

function createConnection(tbc1, tbc2){
  // Variable to store wether it exists
  var alreadyExists = false;

  // Check for all connections if its similar
  for(p=0;p<connections.length;p++){
    // Create variables to store in the connections informatio
    // If the information is the same or the same but reversed, the connection already exists and doesnt has to be create another time
    if((tbc1 == connections[p].m1 && tbc2 == connections[p].m2 ) || (tbc1 == connections[p].m2 && tbc2 == connections[p].m1 )){
      alreadyExists = true;
      // showAlert(".alert-info", "Connection already exists!");
    }
  }
  console.log("This connection already exists: " + alreadyExists);

  // var exists = validConnection(c1, c2);
  if(alreadyExists == false){
    console.log("adding connection" + tbc1 + " & " + tbc2);
    var connection = new Connection(tbc1,tbc2);
    connection.draw();
    connections.push(connection);     
  }else{
    console.log("NOT! adding connection" + tbc1 + " & " + tbc2);
  }
}

// This function creates a connection if two markers are selected
function addConnections(){
  if(addingObjects == false){
    addingObjects = true;
    // If at least two are selected
    if(selected[0] && selected[1]){
      // And both are markers
      if(selected[0].type == "marker" && selected[1].type == "marker"){
        // Draw connection for all selected items minus 1
        for(i=0;i<(selected.length-1);i++){
          createConnection(selected[i].index, selected[i+1].index);
        }
      }else{
        showAlert(".alert-info", "Please make sure to select markers and no other objects.");
      }
    }else{
      showAlert(".alert-info", "Please select two markers first.");
    }  
    addingObjects = false;  
  }
}

function validConnection(m1, m2){
  var result = false;
  for(p=0;p<connections.length;p++){
    if((connections[p].m1 == m1 && connections[p].m2 == m2) || (connections[p].m1 == m2 && connections[p].m2 == m1)){
      result = true;
      showAlert(".alert-info", "Connection already exists!");
    }else{
      result = false;
    }
  }
  if(m1 == m2){
    result = false;
    showAlert(".alert-info", "Can not connect to same marker.");
  }
  return result;
}

// Create a connection, to do so, pass selected points
$( "#add-connection" ).click(function() {
  addConnections();
});

 // Create a connection, to do so, pass selected points
 $( "#slowdown-animation" ).click(function() {
  if(animationSpeed > 1){
    animationSpeed = animationSpeed * 0.5;
  }
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

  for(var i=0;i<connections.length;i++){
    console.log(connections[i]);
    var marker_1 = connections[i].m1;
    var marker_2 = connections[i].m2;
    var connection = {m1: marker_1, m2: marker_2}; 
    connection_objects.push(connection);
  }

  connections_data.connections = connection_objects;

  var data = JSON.stringify(connections_data);

  $.ajax({
    url: 'save_skeleton.php',
    type: 'post',
    data: { 'data': data, 'title': name },
    success: savedSkeleton,
    error: errorSavingSkeleton
    }); // end ajax call

  function savedSkeleton(){
    $('#save-skeleton-modal').modal('hide');
    showAlert(".alert-success","Skeleton with name: " + name + " saved succesfully!");
  }
  function errorSavingSkeleton(e){
    $('#save-skeleton-modal').modal('hide');
    showAlert(".alert-error",e);
  }
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

$( "#show-load-skeleton-modal" ).click(function(){
  $.get( "skeleton_files_list.php", function( data ) {
    $("#skeleton-files").html( data );
  });
  $('#load-skeleton-modal').modal('show');
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
  var socket = new Socket();
  socket.connect(adress);
  animateFromSocket(adress);
})

$("#animate-file").click(function(){
  animateFromFile(url);
})

$( ".coordinate-file-url" ).click(function(){
  $(".modal").modal('hide');
  var url = $(this).text();
  // webglRenderer.context.canvas.loseContext();
  animateFromFile(url);
});

function loadSkeleton(url){
  removeSkeleton();

  $.getJSON(url, function(json){
    console.log(json);
    connections.length = 0;
    selected.length = 0;

    for(i=0;i<json.connections.length;i++){
      createConnection(json.connections[i].m1, json.connections[i].m2);
    }
  });
}

$(document.body).on("click", ".load-skeleton", 
  function(){
    $(".modal").modal('hide');
    var url = $(this).text();
    // webglRenderer.context.canvas.loseContext();
    loadSkeleton(url);
  }
);


function showAlert(alert_class, text){
  if(!alertShown){
    alertShown = true;
    $(alert_class).html(text);
    $(alert_class).fadeIn();
    
    setTimeout(hideAlert, 1000);

    function hideAlert(){
      $(alert_class).fadeOut();
      alertShown = false;
    }
  }  
}

function removeSkeleton(){
  for(i=0;i<connections.length;i++){
    scene.remove(connections[i].object);  
  }
  connections = [];
}

function onDocumentMouseDown( event ) {
  // 
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

  console.log()

  // intersects contains an array of objects that might have been hit

  var intersects = raycaster.intersectObjects(scene.children, true);
  
  for(i=0;i<intersects.length;i++){
    var o = intersects[i].object.name;
    if(o == "plane"){
      intersects.splice(i, 1);
      break;
    }
  }

  console.log(intersects);

  if ( intersects.length > 0 ) {
    // If array is not empty
    if(selected.length > 0){
      // If clicked item is not similar to selected items, empty array
      if(intersects[0].object.type != selected[0].type){
        deselectAll();
      }
    }
    
    intersected = intersects[0].object;
    // This variable will behold wether the intersected object was selected or not
    var isSelected = false;
    // Check if is in selected array
    for (i=0;i<selected.length;i++) {
      // If so, remove it 
      if (selected[i].uuid == intersects[0].object.uuid){
        isSelected = true;
        selected.splice(i, 1);
      }
    }
    // If the intersected object was not already selected, select it 
    if(isSelected == false){
      selected.push(intersected);  
    }
  }
}

$(document).mousedown(function(){
  onDocumentMouseDown(event, selected);
});

// This function causes to focus on the first inputfield of every modal that is fired
$('.modal').on('shown.bs.modal', function(){
  inputDisabled = true;
  controls.enabled = false;
  lastfocus = $(this);
  $(this).find('input:text:visible:first').focus();
  paused = true;
})

// This function causes to enable input when the modal is hidden
$('.modal').on('hidden.bs.modal', function(){
  inputDisabled = false;
  controls.enabled = true;
  paused = false;
})

