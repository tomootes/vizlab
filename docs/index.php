<html>
<head>
  <title>Vizlab 1</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="js/webgl-debug.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r70/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.1.0/papaparse.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
  <script src="http://code.jquery.com/ui/1.11.3/jquery-ui.js"></script>

  <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="../css/docs.css">
</head>
<body>
  <div class="container docs-container white">
    <h1 class="file-title">Code overview</h1>
    <div class="function-container">

      <div class="function-row">
        <div class="row-container">
          <div class="well well-sm function-block">
            <div class="function first-function">
              <span class="function-title"><code>1. pageload</code></span>
            </div>
          </div>
        </div> 
      </div>

      <div class="function-row">
        <div class="row-container">
          <div class="arrow arrow-left">
            <img src="../images/arrow_down.svg"/>
          </div>
        </div>
      </div>

      <div class="function-row">
        <div class="row-container">
          <div class="arrow arrow-to-side arrow-left">
            <img src="../images/arrow_left.svg"/>
          </div>
          <div class="well well-sm function-block">
            <div class="function">
              <span class="function-title"><code>2.1 include js/*.js files</code></span>
            </div>
            <div class="function">
              <span class="function-title"><code>2.2 set global variables</code></span>
            </div>
            <div class="function">
              <span class="function-title"><code>2.3 include controls.js</code></span>
            </div>
          </div>
          <div class="arrow arrow-to-side arrow-right">
            <img src="../images/arrow_right.svg"/>
          </div>
        </div> 
      </div>

      <div class="function-row">
        <div class="row-container">
          <div class="well well-sm function-block">
            <div class="function">
              <span class="function-title"><code>3.1 animateFile(filepath.tsv);</code></span>
            </div>
          </div>
          <p class="inline-text" style="float: none;">or</p>
          <div class="well well-sm function-block ">
            <div class="function">
              <span class="function-title"><code>4.1 var socket = new Socket();</code></span>
            </div>
            <div class="function">
              <span class="function-title"><code>4.2 socket.connect(adress);</code></span>
            </div>
            <div class="function">
              <span class="function-title"><code>4.3 animateFromSocket(filepath.tsv);</code></span>
            </div>
          </div>
        </div>
      </div>

      <div class="function-row">
        <div class="row-container">
          <div class="arrow converge">
            <img src="../images/converge.svg"/>
          </div>
        </div>
      </div>

      <div class="function-row">
        <div class="row-container">
          <div class="well well-sm function-block highlight">
            <span class="function"><code>5.1 init();</code></span>
            <span class="function">
              <span class="icon"><img src="../images/iteration.svg"/></span>
              <span class="function-title"><code>5.2 animate();</code></span>
            </span>
          </div>
        </div>
      </div>

    </div>
    <h2>Code summaries</h2>
    <p>On this page the technical infrastructure of the web-application of the <a href="http://vizlab.hist.no/">Vizlab</a> of HiST is visualized and explained.</p>
    <p><br /></p>

    <!-- Chap-ter 1 -->
    <h2>pageload
      <a class="btn btn-primary btn-sm" href="page.html" role="button" target="_blank">index.php</a>
    </h2>
    <p>Index.php is the mainpage of the application, from here the rest of the application is loaded automatically.</p>

    <p><br /></p>

    <!-- Chap-ter 2 -->
    <h2>Initiation</h2>
    <h3>include <a target="_blank" href="../js">js/*.js</a> and <a target="_blank" href="../css">css/*.css</a> files 
      <a class="btn btn-primary btn-sm" role="button" target="_blank" href="page.html">index.php</a>
    </h3>
    <p>The first thing that happens when index.php is being opened is the loading of several files that are needed for functionality and layout. The .js files contain the functionality of the application while the .css files contain the layout settings. As for every webpage, most of the dependancies are being loaded within the "head" tag. Take notice that "js/controls.js" is being loaded at the end of index.php. All seperate JavaScript files are commented, and are accesible via generated webpages. This are the files that correspond to the equally named JavaScript files:</p>
    <ul>
      <?php
      foreach(glob('*.html') as $filename){
        echo "<li><a href=" . $filename . " class='coordinate-file-url'>" . $filename . "</a></li>";
      }
      ?>
    </ul>
    <h3>set global variables 
      <a class="btn btn-primary btn-sm" href="page.html" role="button" target="_blank">index.php</a>
    </h3>
    <p>Before all functionality and data can be loaded, we need global variables to store information in. The global variables can be changed and accessed from everywhere in the code. Take note that ater we initiated all the global variables the visualisation will automatically be loaded from the first file in the /data directory. The visualisation is loaded by the <code>animateFromFile(filepath);</code> later, this function can be loaded again for another file. Or a socket connection can be loaded. Thats why both functions were placed so prominently within the diagram.</p>
    <h3>include controls.js
      <a class="btn btn-primary btn-sm" href="controls.html" role="button" target="_blank">controls.js</a>
    </h3>
    <p>After we have initiated all global variables and loaded the animation the controls.js is being loaded. We initiate the controls last because the controls.js file contains a lot of triggers which are applied to certain id's and classes which have to exist before they are binded. To make sure everything already exists in the dom, the controls are loaded last.</p>

    <p><br /></p>

    <!-- Chap-ter 3 -->
    <h2>Animating file</h2>
    <h3>animateFile(filepath.tsv)
      <a class="btn btn-primary btn-sm" href="animate_from_file.html" role="button" target="_blank">animate_from_file.js</a>
    </h3>
    <p>This function is called while the page is being loaded, but can also be loaded from within the application itself while the app is already loaded. This function is similar to animateFromSocket() but of course with different functionalities. Within this function the file is being retrieved and translated into a usable array of vector-coordinates.</p>

    <p><br /></p>

    <!-- Chap-ter 4 -->
    <h2>Socket connection</h2>
    <h3>var socket = new Socket() 
      <a class="btn btn-primary btn-sm" href="controls.html" role="button" target="_blank">controls.js</a>
      <a class="btn btn-primary btn-sm" href="websocket.html" role="button" target="_blank">websocket.js</a>
    </h3>
    <p>Before the animation can be loaded from the socket a connection has to be set up. To keep the application accessible a Socket method was created so an object could be defined with the needed functions.</p>

    <h3>socket.connect(adress)
      <a class="btn btn-primary btn-sm" href="controls.html" role="button" target="_blank">controls.js</a>
      <a class="btn btn-primary btn-sm" href="websocket.html" role="button" target="_blank">websocket.js</a>
    </h3>
    <p>After the Socket object is created, the function .connect() can be called. In this case the object is called "socket" so the function is called by socket.connect(adress). In the controls.js file the aress first is retrieve from the form after the connection is being set uy. The code for this is pretty simple:</p>
      <code>var adress = $('#socket-adress').val();</code><br />
      <code>var socket = new Socket();</code><br />
      <code>socket.connect(adress);</code><br />
    <p>In the last line the connection with the given adress is being made.</p>

    <h3>animateFromSocket(filepath.tsv)
      <a class="btn btn-primary btn-sm" href="controls.html" role="button" target="_blank">controls.js</a>
      <a class="btn btn-primary btn-sm" href="animate_from_socket.html" role="button" target="_blank">animate_from_socket.js</a>
    </h3>
    <p>This function changes some things in the application like the title that is being showed on top of the page. Also the slider disappears, which will reappear when the connection is being closed again. All other functionalities will stay available and will work.</p>

    <p><br /></p>

    <!-- Chap-ter 5 -->
    <h2>Iterations</h2>
    <h3>init()
      <a class="btn btn-primary btn-sm" href="init.html" role="button" target="_blank">init.js</a>
    </h3>
    <p>The init is a very important function and is being ran before the animation can be displayed. Within the init function, the spheres are being drawn, the light is being set, the renderer is being intialized and the controls to move around the animation are being set.</p>
    <h3>animate()
      <a class="btn btn-primary btn-sm" href="animate.html" role="button" target="_blank">animate.js</a>
    </h3>
    <p>The animate function is being iterated by a JavaScript which request an iteration after its being executed:</p>
    <code>requestAnimationFrame(animate);</code>
    <p>Within the iteration a lot of things are being updated, for example the slider and the markers' positions.</p>

    <p><br /></p>
  </div
  <footer class="footer">
    <div class="container">
      <p class="text-muted">Place sticky footer content here.</p>
    </div>
  </footer>
</body>
</html>