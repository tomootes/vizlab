function animateFromSocket(adress){
  // Set title and animation speed on page
  $(".file-title").html("Receiving coordinates from: " + adress);
  $(".file-title-holder").addClass("active");
  $(".connect-socket-btn-grp").hide();
  $(".animate-file-btn-grp").show();
  $("#socket-adress-modal").modal('hide');

  selected = [];
  markers = [];
  connections = [];

  iteration = 0;
  animation_speed = 1;

  var numberOfCoordinates = ( coordinates.length - 2 );

  stats = new Stats();

  stats.setMode(0); // 0: fps, 1: ms

  // align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.body.appendChild( stats.domElement );

  var mouse = new THREE.Vector2(), intersected;

  $("#slider").hide();
  $('#socket-loader').hide();

  init();
  animate();
}





