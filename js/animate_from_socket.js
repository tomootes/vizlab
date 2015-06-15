function animateFromSocket(adress){
  // Set title and animation speed on page
  $(".file-title").html("Receiving coordinates from: " + adress);
  $(".file-title-holder").addClass("active");
  $(".connect-socket-btn-grp").hide();
  $(".animate-file-btn-grp").show();
  $(".close-connection-btn-grp").show();
  $("#socket-adress-modal").modal('hide');

  selected = [];
  markers = [];
  connections = [];

  iteration = 0;
  animation_speed = 1;

  var numberOfCoordinates = ( coordinates.length - 2 );

  var mouse = new THREE.Vector2(), intersected;

  $("#slider").hide();
  $('#socket-loader').hide();

  replay = false;
  
  init();
  animate();
}





