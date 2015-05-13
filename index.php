<html>
<head>
	<title>Vizlab 1</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="js/webgl-debug.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r70/three.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.1.0/papaparse.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	<script src="http://code.jquery.com/ui/1.11.3/jquery-ui.js"></script>
	<!-- stats -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/stats.js/r11/Stats.min.js"></script>
	<script src="js/tsv.js"></script>
	<script src="js/marker.js"></script>

	<script src="js/connection.js"></script>
	<script src="js/websocket.js"></script>

	<script src="js/animate_from_file.js"></script>
	<script src="js/animate_from_socket.js"></script>
	<script src="js/init.js"></script>
	<script src="js/animate.js"></script>

	<script src="js/OrbitalControls.js"></script>

	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
</head>
<body>
	<div class="overlay">
		<div class="file-title-holder">
			<h1 class="file-title"></h1>
  		<a target="_blank" class="instructions" href="docs/manual.html">
  			<span class="glyphicon glyphicon-question-sign" aria-hidden="true"></span>
  		</a>
		</div>

		<div id="draw-controls-container">

			<div class="draw-controls skeleton-controls"><!-- SKELETON BUTTONS -->
				<div class="btn-row">
					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button id="toggle-skeleton" type="button" class="btn btn-default">	
							<span id="skeleton-icon" class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
						</button>
					</div>
				</div>

				<div class="btn-row">
					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button id="select-all-connections" type="button" class="btn btn-default">	
							<img src="images/select_all.svg">
						</button>
					</div>
				</div>	

				<div class="btn-row">
					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button id="add-connection" type="button" class="btn btn-default">
							<span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
						</button>	
						<button type="button" id="delete" class="btn btn-default">
							<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
						</button>	
					</div>
				</div>

				<div class="btn-row">
					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button id="show-load-skeleton-modal" type="button" class="btn btn-default">	
							<span class="glyphicon glyphicon-open" aria-hidden="true"></span>
						</button>
						<button id="show-save-skeleton-modal" type="button" class="btn btn-default">	
							<span class="glyphicon glyphicon glyphicon-save" aria-hidden="true"></span>
						</button>
					</div>
				</div>
			</div> 

			<div class="draw-controls marker-controls"><!-- Marker tools -->
				<div class="btn-row">
					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button id="toggle-show-markers" type="button" class="btn btn-default">	
							<span id="markers-visible-icon" class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
						</button>
					</div>
				</div>

				<div class="btn-row">
					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button id="select-all-markers" type="button" class="btn btn-default">	
							<img src="images/select_all.svg">
						</button>
					</div>
				</div>
			</div>

			<div class="draw-controls selected-controls"><!-- Select tools BUTTONS -->
				<div class="btn-row">
					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button id="toggle-show-selected" type="button" class="btn btn-default">	
							<span id="selected-toggle-icon" class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
						</button>
					</div>
				</div>

				<div class="btn-row">
					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button id="deselect-all" type="button" class="btn btn-default">	
							<img src="images/deselect.svg">
						</button>
					</div>
				</div>


				<div class="btn-row">
					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button type="button" class="btn btn-default" id="selected-larger">
							<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
						</button>
						<button type="button" class="btn btn-default" id="selected-smaller">	
							<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>
						</button>
					</div>
				</div>

			</div>
		</div>
		<div id="controls">
			<div class="container" id="controls-container">
				<div id="buttons-holder">

					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button id="show-socket-modal" type="button" class="btn btn-default">		
							<span class="glyphicon glyphicon-transfer"></span>
						</button>
					</div>

					<div class="btn-group btn-group-md animate-file-btn-grp" role="group" aria-label="..." style="display:none;">
						<button id="animate-file" type="button" class="btn btn-default">		
							<span class="glyphicon glyphicon-file"></span>
						</button>
					</div>

					<div class="btn-group btn-group-md connect-socket-btn-grp" role="group" aria-label="...">
						<button id="show-files-list" type="button" class="btn btn-default">	
							<span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>
						</button>
					</div>

					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button id="slowdown-animation" type="button" class="btn btn-default">
							<span class="glyphicon glyphicon-backward" aria-hidden="true"></span>
						</button>
						<button id="play-button" type="button" class="btn btn-default">
							<span id="play-icon" class="glyphicon glyphicon-pause" aria-hidden="true"></span>
						</button>
						<button  id="speedup-animation" type="button" class="btn btn-default">
							<span class="glyphicon glyphicon-forward" aria-hidden="true"></span>
						</button>
					</div>
				</div>

				<span id="animation-speed-label">Default</span>
				<span class="iteration-label" id="iteration">Default</span>

				<div id="slider-holder">
					<div id="slider"></div>
				</div>

			</div>
		</div>

		<div class="alerts">
			<div class="alert alert-success" role="alert">
				<a href="#" class="alert-link">...</a>
			</div>
			<div class="alert alert-info" role="alert">
				<a href="#" class="alert-link">...</a>
			</div>
			<div class="alert alert-warning" role="alert">
				<a href="#" class="alert-link">...</a>
			</div>
			<div class="alert alert-danger" role="alert">
				<a href="#" class="alert-link">...</a>
			</div>
		</div>


		<div id="show-files-modal" class="modal fade">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">Load files</h4>
					</div>
					<div class="modal-body">
						<ul>
							<?php
							foreach(glob('data/*.tsv') as $filename){
								echo "<li><a class='coordinate-file-url'>" . $filename . "</a></li>";
							}
							?>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<div id="socket-adress-modal" class="modal fade" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">

					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">Connect to socket</h4>
					</div>

					<div class="modal-body">

						<p>Please fill in the sockets' adress</p>

						<div class="input-group">
							<span class="input-group-btn">
								<button class="btn btn-default" id="connect-to-socket" type="button">Connect</button>
							</span>
							<input type="text" class="form-control" id="socket-adress" placeholder="ws://localhost:27015" value="" autofocus=":autofocus">						      
						</div><!-- /input-group -->

						<div class="row">
							<div class="center-block">
								<img id="socket-loader" style="display: none; width:auto; height: 34px;" src="images/reload.svg"/>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>

		<div id="save-skeleton-modal" class="modal fade" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">

					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">Save skeleton</h4>
					</div>

					<div class="modal-body">

						<p>Please fill in the skeletons' name</p>

						<div class="input-group">
							<span class="input-group-btn">
								<button class="btn btn-default" id="save-skeleton" type="button">Save</button>
							</span>
							<input type="text" class="form-control" id="skeleton-name" placeholder="skeleton name" value="" autofocus=":autofocus">						      
						</div><!-- /input-group -->

						<div class="alert alert-danger" id="enter-name" role="alert">
							<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
							<span class="sr-only">Error:</span> please enter a name
						</div>

						<div class="row">
							<div class="center-block">
								<img id="socket-loader" style="display: none; width:auto; height: 34px;" src="images/reload.svg"/>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>

		<div id="load-skeleton-modal" class="modal fade" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">

					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">Load skeleton</h4>
					</div>

					<div class="modal-body">

						<ul id="skeleton-files">

						</ul>

						<div class="row">
							<div class="center-block">
								<img id="socket-loader" style="display: none; width:auto; height: 34px;" src="images/reload.svg"/>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>

		<script>
			// All variables over here are global variables and can be changed and used throughout the application
			var camera, scene, canvasRenderer, webglRenderer;
			var controls;
			var container;
			var objects = [];

			// These 
			var pointerDetectRay, projector, mouse2D;  

			var selected = [];
			var markers = [];
			var connections = [];

			// Connections global variables
			var connectionWidth = 5;
			var connectionColor = "#888888";
			var selectedConnectionColor = "#0086ff";

			// Markers global variables
			var markerRadius = 10;
			var markerColor = "#000000";
			var selectedMarkerColor = "#0086ff";

			// Set plane variables
			var groundMaterialColor = "#72D874";

			// Animation variaibles
			var id;
			var iteration = 0;
			var animationSpeed = 8;
			var paused = false;
			var skeletonVisible = true;
			var markersVisible = true;
			var selectedVisible = true;
			
			var inputDisabled = false;
			var alertShown = false;
			var addingObjects = false;

			var stats = new Stats();			

			var coordinates = [];
			var numberOfCoordinates;

			<?php
			foreach(glob('data/*.tsv') as $filename){
				if ($i == 0) {
					echo "var filePath = '" . $filename . "';";
					break;
				}
			}
			?>

			animateFromFile(filePath);

			</script>
			<script src="js/controls.js"></script>
		</div>
	</body>
	</html>