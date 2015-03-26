function Marker(index, x, y, z){
    this.index = index;
    this.x = x;
    this.y = y;
    this.z = z;
    
    this.draw = function(radius){
      var geometry = new THREE.SphereGeometry(radius , 16, 16 );
      var color;
      
      var selected = this.selected();

      if(selected){
        color = selected_marker_color;
      }else{
        color = marker_color;
      }

      var material = new THREE.MeshPhongMaterial( {color: color } );
      var marker = new THREE.Mesh( geometry, material );
      marker.position.set(this.x,this.y,this.z);
      marker.type = "marker";
      marker.receiveShadow = true;
      marker.castShadow = true;
      marker.index = this.index;
      this.object = marker;
      scene.add(this.object);
    }

    this.update = function(){
         
      this.object.position.set(coordinates[iteration][index][0], coordinates[iteration][index][1], coordinates[iteration][index][2]);

      var selected = this.selected();
      if(selected){
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
          if(selected[i].index == this.index){
            r = true;
          }
        }
        return r
      }else{
        return false
      }
    }
}