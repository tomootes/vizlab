function Marker(index){
  this.index = index;
  
  this.draw = function(){
    var geometry = new THREE.SphereGeometry(markerRadius , 16, 16 );
    var is_selected = this.isSelected(selected);

    if(selected){
      var color = selectedMarkerColor;
    }else{
      var color = markerColor;
    }

    var material = new THREE.MeshBasicMaterial( {color: color } );
    var marker = new THREE.Mesh( geometry, material );
    
    marker.position.set(coordinates[0][this.index][0],coordinates[0][this.index][1],coordinates[0][this.index][2]);

    marker.type = "marker";
    marker.receiveShadow = true;
    marker.castShadow = true;
    marker.index = this.index;
    this.object = marker;
    scene.add(this.object);
  }

  this.update = function(selected, coordinates, iteration){
    this.object.position.set(coordinates[iteration][index][0], coordinates[iteration][index][1], coordinates[iteration][index][2]);
    var selected = this.isSelected(selected);
    if(selected){
      this.object.material.color.set( selectedMarkerColor );
    }else{
      this.object.material.color.set( markerColor );
    }
  }

  this.isSelected = function(){
    var s = false;
    for(o=0;o<selected.length;o++){
      var suuid = selected[o].uuid;
      var tuuid = this.object.uuid;
      if(suuid == tuuid){
        s = true;
      }
    }
    return s;
  }

  this.remove = function(){
    scene.remove(this.object);
  }
}