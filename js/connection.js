function Connection(m1, m2){
  this.m1 = m1;
  this.m2 = m2;

  this.draw = function(){
    var x1 = markers[m1].object.position.x;
    var y1 = markers[m1].object.position.y;
    var z1 = markers[m1].object.position.z;
    var x2 = markers[m2].object.position.x;
    var y2 = markers[m2].object.position.y;
    var z2 = markers[m2].object.position.z;

    var material = new THREE.LineBasicMaterial({
      color: connectionColor,
      linewidth: connectionWidth
    });

    var v1 = new THREE.Vector3(x1, y1, z1);
    var v2 = new THREE.Vector3(x2, y2, z2);

    var geometry = new THREE.Geometry();
    geometry.vertices.push(v1, v2);
    geometry.dynamic = true;
    geometry.verticesNeedUpdate = true;

    var connection = new THREE.Line(geometry, material);

    connection.matrixAutoUpdate = true;
    connection.index = this.index;
    connection.type = "connection";
    this.object = connection;
    scene.add(this.object);
  }

  this.update = function(selected, markers){
    // Create variables with 
    var x1 = markers[m1].object.position.x;
    var y1 = markers[m1].object.position.y;
    var z1 = markers[m1].object.position.z;
    var x2 = markers[m2].object.position.x;
    var y2 = markers[m2].object.position.y;
    var z2 = markers[m2].object.position.z;
  
    // Update the vertices of the object    
    this.object.geometry.vertices[0].x = x1;
    this.object.geometry.vertices[0].y = y1;
    this.object.geometry.vertices[0].z = z1; 
    this.object.geometry.vertices[1].x = x2;
    this.object.geometry.vertices[1].y = y2;
    this.object.geometry.vertices[1].z = z2; 
    this.object.geometry.verticesNeedUpdate = true;

    // Update widt of the line
    this.object.material.linewidth = connectionWidth;

    // Check if selected via selected() 
    var s = this.isSelected();
    if(s == true){
      this.object.material.color.set( selectedConnectionColor );
    }else{
      this.object.material.color.set( connectionColor );
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
    for(i=0;i<connections.length;i++){
      var suuid = connections[i].object.uuid;
      var tuuid = this.object.uuid;
      if(suuid == tuuid){
        connections.splice(i, 1);
      }
    } 
  }

}
