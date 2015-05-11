<?php
  foreach(glob('upload/*.json') as $filename){
    echo "<li><a class='load-skeleton'>" . $filename . "</a></li>";
  }
?>
