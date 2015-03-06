function Marker(index, color, x, y, z, radius){

    this.index = index;
    this.index = color;
    this.index = x;
    this.index = y;
    this.index = z;
    this.index = radius;

    this.draw = function(){
        var geometry = new THREE.SphereGeometry( radius, 32, 32 );
        var material = new THREE.MeshPhongMaterial( {color: color} );
        var marker = new THREE.Mesh( geometry, material );
        marker.position.set(x,y,z);
        marker.receiveShadow = true;
        marker.castShadow = true;
        marker.selected = false;
        marker.index = index;
        return marker;
    }

    this.update = function(){
        var geometry = new THREE.SphereGeometry( radius, 32, 32 );
        var material = new THREE.MeshPhongMaterial( {color: color} );
        var marker = new THREE.Mesh( geometry, material );
        marker.position.set(x,y,z);
        marker.receiveShadow = true;
        marker.castShadow = true;
        marker.selected = false;
        marker.index = index;
        return marker;
    }
}