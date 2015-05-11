
class CoordinatesFile {
  File text;

  CoordinatesFile(this.text);
  
  intoJson(){
    Stream<List<int>> inputStream = this.text;
  }
}

