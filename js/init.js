function init(){  
  iteration = 0;

  // // Set stats to FPS mode and place topleft
  // stats.setMode(0);
  // stats.domElement.style.position = 'absolute';
  // stats.domElement.style.left = '0px';
  // stats.domElement.style.top = '0px';
  // document.body.appendChild( stats.domElement );

  numberOfCoordinates = ( coordinates.length - 2 );
  paused = false;

  // Setup camera 
  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 100000);
  camera.position.x = 2100;
  camera.position.y = 2000;
  camera.position.z = 3300;
  camera.up = new THREE.Vector3( 0, 0, 1 );

  // Create a new scene
  scene = new THREE.Scene();

  // Create grey floor
  var groundMaterial = new THREE.MeshBasicMaterial({
    color: groundMaterialColor
  });

  // Create and add the floor
  plane = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), groundMaterial);
  plane.name = "plane";
  plane.receiveShadow = true;
  scene.add(plane);

  // Setup lights and add to scene
  light = new THREE.DirectionalLight(0xdfebff, 1.75);
  light.position.set(0, 0, 250);
  light.position.multiplyScalar(1.3);
  scene.add(light);

  // Draw markers for the first line in coordinates[]
  for(var i=0;i<coordinates[1].length;i++){
    var marker = new Marker(i); 
    marker.draw(markerRadius, selected, coordinates, scene);
    markers.push(marker);
    scene.add(marker.object);
  }

  var SCREEN_WIDTH = window.innerWidth;
  var SCREEN_HEIGHT = window.innerHeight;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2; 

  // RENDERER
  webglRenderer = new THREE.WebGLRenderer({antialias : true});
  webglRenderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  webglRenderer.setClearColor( 0xffffff, 1);
  webglRenderer.domElement.style.position = "relative";
  webglRenderer.shadowMapEnabled = true;
  webglRenderer.shadowMapSoft = true;

  // Define the controls
  controls = new THREE.OrbitControls( camera );
  controls.damping = 0.2;

  $(".animation").remove();

  container = document.createElement('div');    
  container.className = "animation";
  $('body').prepend(container);
  container.appendChild(webglRenderer.domElement);   
}