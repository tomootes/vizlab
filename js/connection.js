function Connection(m1, m2, color){
    this.m1 = m1;
    this.m2 = m2;
    this.index = connections.length;

    this.draw = function(){

      var curve = new THREE.SplineCurve3([
        new THREE.Vector3(markers[m1].object.position.x,markers[m1].object.position.y,markers[m1].object.position.z), 
        new THREE.Vector3(markers[m2].object.position.x,markers[m2].object.position.y,markers[m2].object.position.z)
      ]);

      var line = new THREE.LineCurve3(
        new THREE.Vector3(markers[m1].object.position.x,markers[m1].object.position.y,markers[m1].object.position.z), 
        new THREE.Vector3(markers[m2].object.position.x,markers[m2].object.position.y,markers[m2].object.position.z)
      );

      var geometry = new THREE.TubeGeometry(
          curve,  //path
          5,    //segments
          connection_radius,     //radius
          5,     //radiusSegments
          false  //closed
      );
      geometry.dynamic = true;
      geometry.verticesNeedUpdate = true;

      var material = new THREE.MeshPhongMaterial( {color: color} );

      var connection = new THREE.SkinnedMesh( geometry, material, true );
      connection.matrixAutoUpdate = true;
      connection.index = this.index;
      connection.type = "connection";
      this.object = connection;
      scene.add(this.object);
    }

    this.update = function(){

      var curve = new THREE.SplineCurve3([
        new THREE.Vector3(markers[m1].object.position.x,markers[m1].object.position.y,markers[m1].object.position.z), 
        new THREE.Vector3(markers[m2].object.position.x,markers[m2].object.position.y,markers[m2].object.position.z)
      ]);

      var geometry = new THREE.TubeGeometry(
          curve,  //path
          5,    //segments
          connection_radius,     //radius
          5,     //radiusSegments
          false  //closed
      );

      // Update geometry
      this.object.geometry = geometry;

      var selected = this.selected();

      if(selected == true){
        this.object.material.color.set( selected_marker_color );
      }else{
        this.object.material.color.set( marker_color );
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
