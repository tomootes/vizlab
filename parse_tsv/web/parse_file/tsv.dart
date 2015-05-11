import 'dart:html';
import 'point.dart';
import 'dart:convert';

class Tsv {
  String path;
  String contents;
  
  Tsv(String path){
    this.path = path; 
  }
  
  List<dynamic> getFileContents(path){
    List<dynamic> coordinates = [];
    HttpRequest.getString(path)
    .then((String fileContents){
      this.contents = fileContents;
      coordinates = toArray(this.contents, 11);
      print(coordinates);
    });
    return(coordinates);
  }
  
  List toArray(String s, int first_row){
    List <dynamic> coordinates = [];
    coordinates.add([]);
    coordinates[0].add([]);
    
    var current_line = 0;
    var current_coordinates = 0;
    var number_coordinates = 0;
    
    int char_index = 0;
    
    // For every character in the string
    for(var i = 0; i < s.length; i++){       
      if(s[i] == '\t'){
        String coordinate = s.substring(char_index, i);
        coordinate.trim();
        coordinate == double.parse(coordinate);
        
        coordinates[current_line][current_coordinates].add(coordinate);
        
        char_index = i;
        // Check how much coordinates are in the array, if 3 push to line array
        number_coordinates = number_coordinates + 1;
        if(number_coordinates == 3){
          number_coordinates = 0;
          current_coordinates = current_coordinates + 1;
          coordinates[current_line].add([]);
        }
      }
      if(s[i] == '\n'){
        String coordinate = s.substring(char_index, i);
        coordinate.trim();
        coordinate == double.parse(coordinate);
        
        coordinates[current_line][current_coordinates].add(coordinate);
        char_index = i;
        // Check how much coordinates are in the array, if 3 push to line array
        number_coordinates = number_coordinates + 1;
        if(number_coordinates == 3){
          number_coordinates = 0;
          current_coordinates = current_coordinates + 1;
        }
        number_coordinates = 0;
        current_coordinates = 0;
        // Create a new array for the next line 
        coordinates.add([]);
        current_line = current_line + 1;
        coordinates[current_line].add([]);
      }
    }
    return coordinates;
  }
}

  
