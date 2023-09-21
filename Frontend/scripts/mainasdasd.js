import * as Three from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new Three.Scene();
var controls = null;

var rendererDiv = document.getElementById('test');

const camera = new Three.PerspectiveCamera(40, rendererDiv.offsetWidth/rendererDiv.offsetHeight,0.1,1000);

const renderer = new Three.WebGLRenderer(
{antialias:true},
);
renderer.setSize(rendererDiv.offsetWidth, rendererDiv.offsetHeight);
renderer.setPixelRatio(window.devicePixelRatio);

window.onresize = () => {
    camera.aspect = rendererDiv.offsetWidth/rendererDiv.offsetHeight;
    renderer.setSize(rendererDiv.offsetWidth, rendererDiv.offsetHeight);
    camera.updateProjectionMatrix();
    controls.target = new Three.Vector3(0, 5, 0);
    controls.update();
}

renderer.outputColorSpace = Three.SRGBColorSpace;
rendererDiv.appendChild(renderer.domElement);

var bones = [];
var helper;
const loader = new GLTFLoader();
loader.load('./Resources/untitled.gltf', (gltf) => {
    scene.add(gltf.scene);
    gltf.scene.traverse((child) =>{
        if(child.name.includes('Bone')){
            bones.push(child);
        }
    });

    helper = new Three.SkeletonHelper( gltf.scene);
    helper.visible = true;
    scene.add(helper);
}, 
undefined, function ( error ) {
	console.error( error );
});

const ambientLight = new Three.AmbientLight( 0xffffff, 7 );
scene.add( ambientLight );

const dirLight = new Three.DirectionalLight( 0xefefff, 1.5 );
dirLight.position.set( 10, 10, 15 );
scene.add( dirLight );

camera.position.z = 16.284850612699433;
camera.position.y = 12.483396933076133;
camera.position.x = 11.397709957462036;

controls = new OrbitControls( camera, renderer.domElement );


var slider1 = document.getElementById("bone1");
var oldvalue1 = slider1.value;
slider1.oninput = function() {
    bones[0].rotation.y += (this.value - oldvalue1) / 50;
    oldvalue1 = this.value;
}

var slider2 = document.getElementById("bone2");
var oldvalue2 = slider2.value;
slider2.oninput = function() {
    bones[1].rotation.y += (this.value - oldvalue2) / 100;
    oldvalue2 = this.value;
}

var slider3 = document.getElementById("bone3");
var oldvalue3 = slider3.value;
slider3.oninput = function() {
    bones[2].rotation.x += (this.value - oldvalue3) / 100;
    oldvalue3 = this.value;
}

var slider4 = document.getElementById("bone4");
var oldvalue4 = slider4.value;
slider4.oninput = function() {
    bones[3].rotation.x += (this.value - oldvalue4) / 100;
    oldvalue4 = this.value;
}
var slider5 = document.getElementById("bone5");
var oldvalue5 = slider5.value;
slider5.oninput = function() {
    bones[4].rotation.y += (this.value - oldvalue5) / 50;
    oldvalue5 = this.value;
}

var countdown = 0;
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    // if (countdown % 10 === 0){
    //     bones[0].rotation.y += 0.5;
    //     bones[1].rotation.x += 0.1;
    //     bones[2].rotation.x += 0.2;
    // }
    countdown++;
}
animate();