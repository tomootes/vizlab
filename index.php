<html>
<head>
	<title>Vizlab web-app</title>

	<script src="bower_components/jquery/dist/jquery.min.js"></script>
	<script src="bower_components/jquery-ui/jquery-ui.js"></script>
	<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="bower_components/threejs/build/three.min.js"></script>

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
	<link rel="stylesheet" type="text/css" href="bower_components/bootstrap/dist/css/bootstrap.css">
	<!-- <link rel="stylesheet" type="text/css" href="bower_components/bootstrap/dist/css/bootstrap-theme.css"> -->
</head>
<body>
	<div class="top-buttons"> 
		<a target="_blank" href="docs/manual.html">
			<img class="help-icon icon" src="images/help.svg">
		</a>
		<img class="overlay-icon icon" src="images/overlay.svg">
		<img class="maximize-icon fullscreen-icon icon" src="images/maximize.svg">
		<img class="minimize-icon fullscreen-icon icon" src="images/minimize.svg" style="display:none;">
	</div>
	
	<div class="overlay">
		<div class="file-title-holder">
			<h1 class="file-title"></h1>
			<a target="_blank" class="instructions" href="docs/manual.html">
			</a>
		</div>

		<div id="draw-controls-container">
			<div class="draw-controls skeleton-controls"><!-- SKELETON BUTTONS -->
				<h5>Connections</h5>
				<div class="btn-row">
					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button id="toggle-skeleton" type="button" class="btn btn-default" title="Hide/show connections">	
							<span id="skeleton-icon" class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
						</button>
					</div>
				</div>

				<div class="btn-row">
					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button id="select-all-connections" type="button" class="btn btn-default" title="Select all">	
							<img src="images/select_all.svg">
						</button>
					</div>
				</div>

				<div class="btn-row">
					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button type="button" class="btn btn-default connections-larger" title="Increase connection width">
							<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
						</button>
						<button type="button" class="btn btn-default connections-smaller">
							<span class="glyphicon glyphicon-minus" aria-hidden="true" title="Decrease connection width"></span>
						</button>
					</div>
				</div>

				<div class="btn-row">
					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button id="add-connection" type="button" class="btn btn-default">
							<span class="glyphicon glyphicon-plus-sign" aria-hidden="true" title="Add connection"></span>
						</button>	
						<button type="button" id="delete" class="btn btn-default">
							<span class="glyphicon glyphicon-trash" aria-hidden="true" title="Delete connection"></span>
						</button>	
					</div>
				</div>

				<div class="btn-row">
					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button id="show-load-skeleton-modal" type="button" class="btn btn-default" title="Open skeleton file">	
							<span class="glyphicon glyphicon-open" aria-hidden="true"></span>
						</button>
						<button id="show-save-skeleton-modal" type="button" class="btn btn-default" title="Save skeleton file">	
							<span class="glyphicon glyphicon glyphicon-save" aria-hidden="true"></span>
						</button>
					</div>
				</div>
			</div> 

			<div class="draw-controls marker-controls"><!-- Marker tools -->

				<div class="btn-row">
					<h5>Markers</h5>
					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button id="toggle-show-markers" type="button" class="btn btn-default" title="Hide/show markers">	
							<span id="markers-visible-icon" class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
						</button>
					</div>
				</div>

				<div class="btn-row">
					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button id="select-all-markers" type="button" class="btn btn-default" title="Select all markers">	
							<img src="images/select_all.svg">
						</button>
					</div>
				</div>

				<div class="btn-row">
					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button type="button" class="btn btn-default markers-larger" title="Increase marker radius">
							<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
						</button>
						<button type="button" class="btn btn-default markers-smaller">	
							<span class="glyphicon glyphicon-minus" aria-hidden="true" title="Decrease marker radius"></span>
						</button>
					</div>
				</div>
			</div>

			<div class="draw-controls selected-controls"><!-- Select tools BUTTONS -->
				<div class="btn-row">
					<h5>Selected</h5>
					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button id="toggle-show-selected" type="button" class="btn btn-default" title="Hide/show selected items">	
							<span id="selected-toggle-icon" class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
						</button>
					</div>
				</div>

				<div class="btn-row">
					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button id="deselect-all" type="button" class="btn btn-default" title="Deselect all">	
							<img src="images/deselect.svg">
						</button>
					</div>
				</div>
			</div>
		</div>

		<div id="controls">
			<div class="container" id="controls-container">
				<div id="buttons-holder">

					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button id="show-socket-modal" type="button" class="btn btn-default" title="Show socket connection popup">		
							<span class="glyphicon glyphicon-transfer"></span>
						</button>
					</div>

					<div class="btn-group btn-group-md close-connection-btn-grp" role="group" aria-label="..." style="display:none;">
						<button id="close-connection" type="button" class="btn btn-default" title="Close connection">		
							<span class="glyphicon glyphicon glyphicon-off"></span>
						</button>
					</div>

					<div class="btn-group btn-group-md animate-file-btn-grp" role="group" aria-label="..." style="display:none;">
						<button id="animate-file" type="button" class="btn btn-default" title="Go back to file environment">		
							<span class="glyphicon glyphicon-file"></span>
						</button>
					</div>

					<div class="btn-group btn-group-md connect-socket-btn-grp" role="group" aria-label="...">
						<button id="show-files-list" type="button" class="btn btn-default" title="Open other files">	
							<span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>
						</button>
					</div>

					<div class="btn-group btn-group-md" role="group" aria-label="...">
						<button id="slowdown-animation" type="button" class="btn btn-default" title="Slow down animation">
							<span class="glyphicon glyphicon-backward" aria-hidden="true"></span>
						</button>
						<button id="play-button" type="button" class="btn btn-default">
							<span id="play-icon" class="glyphicon glyphicon-pause" aria-hidden="true" title="Play/pause animation"></span>
						</button>
						<button  id="speedup-animation" type="button" class="btn btn-default">
							<span class="glyphicon glyphicon-forward" aria-hidden="true" title="Speed up animation"></span>
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
							<input type="text" class="form-control" id="socket-adress" placeholder="ws://localhost:27015" value="ws://localhost:27015" autofocus=":autofocus">						      
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

					</div>
				</div>
			</div>
		</div>

		<script>
			// All variables over here are global variables and can be changed and used throughout the application
			var camera, scene, canvasRenderer, webglRenderer;
			var controls;
			var container;

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
			var iterationDelayCounter = 1;
			var counterMax;
			var animationSpeed = 8;
			var paused = false;
			var replay = true;
			var skeletonVisible = true;
			var markersVisible = true;
			var selectedVisible = true;
			var fullscreen = false;
			
			// Create global socket variable
			var socket;

			var inputDisabled = false;
			var alertShown = false;
			var addingObjects = false;			

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