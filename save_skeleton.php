<?php
  if($_POST["data"]){
    $data = $_POST["data"];
    $title = $_POST["title"];
    $fname = $title . ".json"; //generates random name
    $file = fopen("upload/" .$fname, 'w');  //creates new file
    fwrite($file, $data);
    fclose($file);  
  }
?>

