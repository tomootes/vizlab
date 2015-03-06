function Connector(m1, m2){

    this.m1 = m1;
    this.m2 = m2;

    this.draw = function(markers, scene){
        console.log(markers);
        // var v2 = new THREE.Vector3.set();
        var line = new THREE.LineCurve3(
            new THREE.Vector3(markers[m1].position.x,markers[m1].position.y,markers[m1].position.z), 
            new THREE.Vector3(markers[m2].position.x,markers[m2].position.y,markers[m2].position.z)
        );

        var geometry = new THREE.TubeGeometry(
            line,  //path
            20,    //segments
            2,     //radius
            8,     //radiusSegments
            false  //closed
        );
        var material = new THREE.MeshPhongMaterial( {color: "black"} );
        var connector = new THREE.SkinnedMesh( geometry, material, true);
        connector.receiveShadow = true;
        connector.castShadow = true;
        connector.selected = false;
        this.object = connector;
        scene.add(this.object);
    }

    this.update = function(){
        var line = new THREE.LineCurve3(
            new THREE.Vector3(markers[m1].position.x,markers[m1].position.y,markers[m1].position.z), 
            new THREE.Vector3(markers[m2].position.x,markers[m2].position.y,markers[m2].position.z)
        );
        this.object.material.geometry.line = line;
        console.log("hap?");
    }
}