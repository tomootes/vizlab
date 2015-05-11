// Copyright (c) 2012, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:html';
import 'dart:convert';
// import 'coordinates.dart';

Stopwatch stopwatch = new Stopwatch();

void main() {
  stopwatch..start();
  String path = "data/angry.tsv";
  makeRequest(path);   
}

void makeRequest(String path){
  addTextToElement("body","Loading " + path);
  HttpRequest.getString(path)
  .then(processingString)
  .catchError(handleError);
}

processingString(String s){
  addTextToElement("body","Processing string to list");
  List<String> coordinates = stringToArray(s,10);
  addTextToElement("body",coordinates[0]);
}

List stringToArray(String s, int firstRow){
  List<String> coordinates = [];
  int lineIndex = 0;
  int charIndex = 0;
  
  for(int i=0; i<s.length; i++){  
    
    if(s[i] == '\n'){
      lineIndex += 1;
      if(lineIndex >= firstRow){
        coordinates.add(s.substring(charIndex, i));           
      }
      charIndex = i;
    }
  }
  
  return(coordinates);
 
}

void handleError(Error e){
  var element = querySelector('body');
  element.text = e;
}

void addTextToElement(String elementSelector, String text){
  var element = querySelector(elementSelector);
  element.text = text;
}