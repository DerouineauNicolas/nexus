var THREE = require('three');
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
var NexusThree = require('./nexus_three');

window.onload = function() {

    var camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.z = 3;

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

        controls.handleResize();
        controls.update();
        renderer.render( scene, camera );
    }

    var redraw = true;
    function animate() {
        requestAnimationFrame(animate);

        controls.update();
        if(redraw)
            renderer.render( scene, camera );
        redraw = false;
    }



    var controls = new TrackballControls( camera );
    controls.target.set( 0, 0, -1 );
    controls.rotateSpeed = 10.0;
    controls.zoomSpeed = 1.5;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [ 65, 83, 68 ];
    controls.addEventListener( 'change', function() { redraw = true; } );

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );
    scene.add( new THREE.AmbientLight( 0x444444 ) );
    scene.background = new THREE.Color( 0x000000 );


    var light1 = new THREE.DirectionalLight( 0xffffff, 1.0 );
    light1.position.set( 1, 1, -1 );
    scene.add( light1 );

    var light2 = new THREE.DirectionalLight( 0xffffff, 1.0 );
    light2.position.set( -1, -1, 1 );
    scene.add( light2 );

    var renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setClearColor( scene.fog.color );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight);

    var container = document.getElementById( 'container');
    container.appendChild( renderer.domElement );

    /* An appropriate material can be used as a fourth arg for the NexusObject constructor

    var texture = new THREE.DataTexture( new Uint8Array([1, 1, 1]), 1, 1, THREE.RGBFormat );
    texture.needsUpdate = true;
    var material = new THREE.MeshLambertMaterial( { color: 0xffffff, map: texture } );
    */


    function onNexusLoad() {
        var s   = 1/nexus_obj.geometry.boundingSphere.radius;
        var target = new THREE.Vector3();
        var p = nexus_obj.geometry.boundingBox.getCenter(target).negate();
        nexus_obj.position.set(p.x*s, p.y*s, p.y*s); //.set(p.x, p.y, p.z); // = p; //.set(p.x, p.y, p.z);
        nexus_obj.scale.set(s, s, s); 
        redraw = true;

    //	nexus_obj.material = new THREE.PointsMaterial( {  size:3, color: 0x00ff00, transparent: false, opacity:0.25 } );
    }

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    }

    var model = getURLParameter('test') || "test/Model.nxz";

    var nexus_obj = new NexusThree.NexusObject(model, onNexusLoad, function() { redraw = true; }, renderer);
    scene.add(nexus_obj);

    window.addEventListener( 'resize', onWindowResize, false );

    animate();
}