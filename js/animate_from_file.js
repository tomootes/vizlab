function animateFromFile(filePath){
  // Set title and animation speed on page
  $('#animation-speed-label').html(animationSpeed + " x ");  
  $(".file-title").html(filePath);
  $(".file-title-holder").removeClass("active");
  $(".connect-socket-btn-grp").show();
  $(".animate-file-btn-grp").hide();
  $(".close-connection-btn-grp").hide();

  coordinates = [];
  selected = [];
  markers = [];
  removeSkeleton();

  var tsv = new Tsv(filePath);
  var s = tsv.getFile();

  if(s){
    coordinates = tsv.toArray(s, 10);
  }

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

  init();
  animate();
}