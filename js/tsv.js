function Tsv(path){
  this.path = path;

  this.getFile = function(){
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", this.path, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
  };

  this.toArray = function(s, first_row){
    var coordinates = [];
    coordinates[0] = [];
    var first_row = first_row;
    var char_index = 0;
    var current_line = 0;
    var line_iterator = 0;
    var current_coordinates = [];

    for(var i = 0; i < s.length; i++){

      if(line_iterator >= first_row && s[i] == '\t'){
        var sub = s.substr(char_index, (i - char_index));
        sub = parseFloat(sub);
        current_coordinates.push(sub);
        char_index = i;
        // Check how much coordinates are in the array, if 3 push to line array
        if(current_coordinates.length == 3){
          coordinates[current_line].push(current_coordinates); // Push coordinates to array
          current_coordinates = []; // Empty array
        }
      }

      if(s[i] == '\n'){
        line_iterator = line_iterator + 1;
        
        // If we are at the firstline > begin to push coordinates
        if(line_iterator > first_row){

          var sub = s.substr(char_index, (i - char_index));

          sub = parseFloat(sub);
          current_coordinates.push(sub);
          char_index = i;
          // Check how much coordinates are in the array, if 3 push to line array
          coordinates[current_line].push(current_coordinates); // Push coordinates to array
          current_coordinates = []; // Empty array
          current_line = current_line + 1;
          coordinates[current_line] = [];
        }
      }

    }  
  return coordinates;
  } 
}