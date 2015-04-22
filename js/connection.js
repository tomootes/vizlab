function Connection(m1, m2){
  this.m1 = m1;
  this.m2 = m2;
  this.index = connections.length;

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
    var selected = this.selected();

    if(selected == true){
      this.object.material.color.set( selectedConnectionColor );
    }else{
      this.object.material.color.set( connectionColor );
    }
  }

  this.remove = function(){
    scene.remove(this.object);
  }

  this.selected = function(){
    var r = false;
    if(selected.length > 0){

      for(i=0;i<selected.length;i++){
        
        if(selected[i].type == "connection"){
          
          if(selected[i].index == this.index){

            r = true;

          }
        }
      }
      return r
    }else{
      return false
    }
  }

}
