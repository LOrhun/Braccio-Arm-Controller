import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

var model = null;
var bones = [];
var topic = 'test';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x060B16 );
var rendererDiv = document.getElementById('render-body');

const gsize = 20;
const divisions = 10;
const gridHelper = new THREE.GridHelper( gsize, divisions );
scene.add( gridHelper );

const camera = new THREE.PerspectiveCamera(40, rendererDiv.offsetWidth/rendererDiv.offsetHeight,0.1,1000);
camera.position.z = 19.716197200418886;
camera.position.y = 18.274130550152456;
camera.position.x = -26.921140045818014;

const renderer = new THREE.WebGLRenderer(
{antialias:true},
);
renderer.setSize(rendererDiv.offsetWidth, rendererDiv.offsetHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.LinearToneMapping;
rendererDiv.appendChild(renderer.domElement);

const loader = new GLTFLoader();
loader.load('./Resources/tester.glb', (gltf) => {
    scene.add(gltf.scene);
    model = gltf.scene;
    gltf.scene.rotateOnAxis(new THREE.Vector3(0,-1,0), Math.PI/2);
    gltf.scene.traverse((child) =>{
        if(child.name.includes('Bone')){
            bones.push(child);
        }
    });

    // const helper = new THREE.SkeletonHelper( gltf.scene);
    // helper.visible = true;
    // scene.add(helper);

    bones[0].rotation.y = (-m1slider.value * Math.PI / 180);
    bones[1].rotation.z = (m2slider.value - 116 * Math.PI / 180);
    bones[2].rotation.y = (m3slider.value - 205 * Math.PI / 180);
    bones[3].rotation.x = (m4slider.value - 115 * Math.PI / 180);
    bones[4].rotation.y = (m5slider.value - 122 * Math.PI / 180);
}, undefined, function (error) {

    console.error(error);
});

const ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
scene.add( ambientLight );

const dirLight = new THREE.DirectionalLight( 0xffffff, 2 );
dirLight.position.set( 10, 10, 15 );
scene.add( dirLight );

const controls = new OrbitControls( camera, renderer.domElement );

var m1old = 90;
function boneMovement1(){
    if (Math.abs(m1slider.value - m1old) % document.getElementById("speedmodifier").value != 0){
        if (m1old - m1slider.value > 0){
            bones[0].rotation.y -= (1 * Math.PI * Math.abs(m1slider.value - m1old) % document.getElementById("speedmodifier").value / 180);
            m1old -= 1 * Math.abs(m1slider.value - m1old) % document.getElementById("speedmodifier").value;
        }
        else{
            bones[0].rotation.y += (1 * Math.PI * Math.abs(m1slider.value - m1old) % document.getElementById("speedmodifier").value / 180);
            m1old += 1 * Math.abs(m1slider.value - m1old) % document.getElementById("speedmodifier").value;
        }
        console.log("m1slider.value: " + m1slider.value + " m1old: " + m1old);
    }
    if (m1old != m1slider.value){
        if (m1old - m1slider.value > 0){
            bones[0].rotation.y -= (1 * Math.PI * document.getElementById("speedmodifier").value / 180);
            m1old -= 1 * document.getElementById("speedmodifier").value;
        }
        else{
            bones[0].rotation.y += (1 * Math.PI * document.getElementById("speedmodifier").value / 180);
            m1old += 1 * document.getElementById("speedmodifier").value;
        }
        console.log("m1slider.value: " + m1slider.value + " m1old: " + m1old);
    }
};

var m2old = 90;
function boneMovement2(){
    if (Math.abs(m2slider.value - m2old) % document.getElementById("speedmodifier").value != 0){
        if (m2old - m2slider.value > 0){
            bones[1].rotation.z -= (1 * Math.PI * Math.abs(m2slider.value - m2old) % document.getElementById("speedmodifier").value / 180);
            m2old -= 1 * Math.abs(m2slider.value - m2old) % document.getElementById("speedmodifier").value;
        }
        else{
            bones[1].rotation.z += (1 * Math.PI * Math.abs(m2slider.value - m2old) % document.getElementById("speedmodifier").value / 180);
            m2old += 1 * Math.abs(m2slider.value - m2old) % document.getElementById("speedmodifier").value;
        }
        console.log("m2slider.value: " + m2slider.value + " m2old: " + m2old);
    }
    if (m2old != m2slider.value){
        if (m2old - m2slider.value > 0){
            bones[1].rotation.z -= (1 * Math.PI * document.getElementById("speedmodifier").value / 180);
            m2old -= 1 * document.getElementById("speedmodifier").value;
        }
        else{
            bones[1].rotation.z += (1 * Math.PI * document.getElementById("speedmodifier").value / 180);
            m2old += 1 * document.getElementById("speedmodifier").value;
        }
        console.log("m2slider.value: " + m2slider.value + " m2old: " + m2old);
    }
};

var m3old = -90;
function boneMovement3(){
    if (Math.abs((m3slider.value * -1) - m3old) % document.getElementById("speedmodifier").value != 0){
        if (m3old - (m3slider.value * -1) > 0){
            bones[2].rotation.y -= (1 * Math.PI * Math.abs((m3slider.value * -1) - m3old) % document.getElementById("speedmodifier").value / 180);
            m3old -= 1 * Math.abs((m3slider.value * -1) - m3old) % document.getElementById("speedmodifier").value;
        }
        else{
            bones[2].rotation.y += (1 * Math.PI * Math.abs((m3slider.value * -1) - m3old) % document.getElementById("speedmodifier").value / 180);
            m3old += 1 * Math.abs((m3slider.value * -1) - m3old) % document.getElementById("speedmodifier").value;
        }
        console.log("(m3slider.value * -1): " + (m3slider.value * -1) + " m3old: " + m3old);
    }
    if (m3old != (m3slider.value * -1)){
        if (m3old - (m3slider.value * -1) > 0){
            bones[2].rotation.y -= (1 * Math.PI * document.getElementById("speedmodifier").value / 180);
            m3old -= 1 * document.getElementById("speedmodifier").value;
        }
        else{
            bones[2].rotation.y += (1 * Math.PI * document.getElementById("speedmodifier").value / 180);
            m3old += 1 * document.getElementById("speedmodifier").value;
        }
        console.log("(m3slider.value * -1): " + (m3slider.value * -1) + " m3old: " + m3old);
    }
};

var m4old = 45;
var m4true = 45;
function boneMovement4(){
    if (Math.abs(m4true - m4old) % document.getElementById("speedmodifier").value != 0){
        if (m4old - m4true > 0){
            bones[3].rotation.x -= (1 * Math.PI * Math.abs(m4true - m4old) % document.getElementById("speedmodifier").value / 180);
            m4old -= 1 * Math.abs(m4true - m4old) % document.getElementById("speedmodifier").value;
        }
        else{
            bones[3].rotation.x += (1 * Math.PI * Math.abs(m4true - m4old) % document.getElementById("speedmodifier").value / 180);
            m4old += 1 * Math.abs(m4true - m4old) % document.getElementById("speedmodifier").value;
        }
        console.log("m4true: " + m4true + " m4old: " + m4old);
    }
    if (m4old != m4true){
        if (m4old - m4true > 0){
            bones[3].rotation.x -= (1 * Math.PI * document.getElementById("speedmodifier").value / 180);
            m4old -= 1 * document.getElementById("speedmodifier").value;
        }
        else{
            bones[3].rotation.x += (1 * Math.PI * document.getElementById("speedmodifier").value / 180);
            m4old += 1 * document.getElementById("speedmodifier").value;
        }
        console.log("m4true: " + m4true + " m4old: " + m4old);
    }
    m4true = m4slider.value - 45;
};

var m5old = 90;
function boneMovement5(){
    if (Math.abs(m5slider.value - m5old) % document.getElementById("speedmodifier").value != 0){
        if (m5old - m5slider.value > 0){
            bones[4].rotation.y -= (1 * Math.PI * Math.abs(m5slider.value - m5old) % document.getElementById("speedmodifier").value / 180);
            m5old -= 1 * Math.abs(m5slider.value - m5old) % document.getElementById("speedmodifier").value;
        }
        else{
            bones[4].rotation.y += (1 * Math.PI * Math.abs(m5slider.value - m5old) % document.getElementById("speedmodifier").value / 180);
            m5old += 1 * Math.abs(m5slider.value - m5old) % document.getElementById("speedmodifier").value;
        }
        console.log("m5slider.value: " + m5slider.value + " m5old: " + m5old);
    }
    if (m5old != m5slider.value){
        if (m5old - m5slider.value > 0){
            bones[4].rotation.y -= (1 * Math.PI * document.getElementById("speedmodifier").value / 180);
            m5old -= 1 * document.getElementById("speedmodifier").value;
        }
        else{
            bones[4].rotation.y += (1 * Math.PI * document.getElementById("speedmodifier").value / 180);
            m5old += 1 * document.getElementById("speedmodifier").value;
        }
        console.log("m5slider.value: " + m5slider.value + " m5old: " + m5old);
    }
};

btn_sv_play.addEventListener('click', () => {
    if (document.getElementById("commandlist").innerText != ""){
        var commands = document.getElementById("commandlist").innerText.split("\n");
        document.getElementById("speedmodifier").value = commands[0].split(" ")[1];
        var i = 1;
        var interval = setInterval(function(){
            if (i < commands.length){
                if (commands[i].includes("m1")){
                    m1slider.value = commands[i].split(" ")[1];
                }
                else if (commands[i].includes("m2")){
                    m2slider.value = commands[i].split(" ")[1];
                }
                else if (commands[i].includes("m3")){
                    m3slider.value = commands[i].split(" ")[1];
                }
                else if (commands[i].includes("m4")){
                    m4slider.value = commands[i].split(" ")[1];
                }
                else if (commands[i].includes("m5")){
                    m5slider.value = commands[i].split(" ")[1];
                }
                else if (commands[i].includes("grip")){
                    if (commands[i].split(" ")[1] == "1"){
                        btn_grip_on.click();
                    }
                    else{
                        btn_grip_off.click();
                    }
                }
                if (m1old == m1slider.value && m2old == m2slider.value && m3old == -m3slider.value && m4old == m4true && m5old == m5slider.value){
                    i++;
                }
            }
            else{
                clearInterval(interval);
            }
        });
    }
});

btn_start.addEventListener('click', () => {
    sendItToServer('11111111', topic);
});

btn_stop.addEventListener('click', () => {
    sendItToServer('00000000', topic);
});

btn_sv_send.addEventListener('click', () => {
    sendItToServer(document.getElementById("commandlist").innerText, topic);
    console.log(document.getElementById("commandlist").innerText);
});

btn_reset.addEventListener('click', () => {
    m1slider.value = 90;
    m1number.value = 90;

    m2slider.value = 90;
    m2number.value = 90;

    m3slider.value = 50;
    m3number.value = 50;
    
    m4slider.value = 15;
    m4number.value = 15;

    m5slider.value = 0;
    m5number.value = 0;

    btn_grip_off.click();
    sendItToServer('home', topic);
});

var lastknowngripstate = 0;
btn_grip_on.addEventListener('click', () => {
    sendItToServer('take', topic);
    lastknowngripstate = 1;
});

btn_grip_off.addEventListener('click', () => {
    sendItToServer('put', topic);
    lastknowngripstate = 0;
});

btn_grip_onandoff.addEventListener('click', () => {
    sendItToServer('and', topic);
    lastknowngripstate = 0;
});

btn_send.addEventListener('click', () => {
    var commandlist = [];
    commandlist.push("pre_speed " + document.getElementById("speedmodifier").value);
    commandlist.push("m1 " + m1slider.value);
    commandlist.push("m2 " + m2slider.value);
    commandlist.push("m3 " + m3slider.value);
    commandlist.push("m4 " + m4slider.value);
    commandlist.push("m5 " + m5slider.value);
    commandlist.push("END");
    if (btn_grip_on.checked && lastknowngripstate == 0){
        lastknowngripstate = 1;
        commandlist.push("grip 1");
        commandlist.push("END");
    }
    else if (btn_grip_off.checked && lastknowngripstate == 1){
        lastknowngripstate = 0;
        commandlist.push("grip 0");
        commandlist.push("END");
    }
    var sendable = commandlist.join("\n");
    sendItToServer(sendable, topic);

});

btn_base.addEventListener('click', () => {
    if (parseInt(m1slider.value) + 80 <= 180){
        m1slider.value = parseInt(m1slider.value) + 80;
        m1number.value = m1slider.value;
        btn_send.click();
    }
    else if (parseInt(m1slider.value) + 80 > 180){
        m1slider.value = (parseInt(m1slider.value) + 80) % 180;
        m1number.value = m1slider.value;
        btn_send.click();
    }
});

btn_shldr.addEventListener('click', () => {
    if (parseInt(m2slider.value) + 80 <= 168){
        m2slider.value = parseInt(m2slider.value) + 80;
        m2number.value = m2slider.value;
        btn_send.click();
    }
    else if (parseInt(m2slider.value) + 80 > 168){
        m2slider.value = (parseInt(m2slider.value) + 80) % 165;
        m2number.value = m2slider.value;
        btn_send.click();
    }
});

btn_wrstv.addEventListener('click', () => {
    if (parseInt(m3slider.value) + 80 <= 180){
        m3slider.value = parseInt(m3slider.value) + 80;
        m3number.value = m3slider.value;
        btn_send.click();
    }
    else if (parseInt(m3slider.value) + 80 > 180){
        m3slider.value = (parseInt(m3slider.value) + 80) % 180;
        m3number.value = m3slider.value;
        btn_send.click();
    }
});

btn_wrstr.addEventListener('click', () => {
    if (parseInt(m4slider.value) + 80 <= 180){
        m4slider.value = parseInt(m4slider.value) + 80;
        m4number.value = m4slider.value;
        btn_send.click();
    }
    else if (parseInt(m4slider.value) + 80 > 180){
        m4slider.value = (parseInt(m4slider.value) + 80) % 180;
        m4number.value = m4slider.value;
        btn_send.click();
    }
});

btn_gripp.addEventListener('click', () => {
    if (parseInt(m5slider.value) + 80 <= 180){
        m5slider.value = parseInt(m5slider.value) + 80;
        m5number.value = m5slider.value;
        btn_send.click();
    }
    else if (parseInt(m5slider.value) + 80 > 180){
        m5slider.value = (parseInt(m5slider.value) + 80) % 180;
        m5number.value = m5slider.value;
        btn_send.click();
    }
});

function sendItToServer(message, topic){
    const sentData = new FormData();
    sentData.append('message', message)
    sentData.append('topic', topic)

    const request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:8081/customsend/');
    request.send(sentData);
};


function animate() {
    requestAnimationFrame( animate );
    renderer.render(scene,camera);

    boneMovement1();
    boneMovement2();
    boneMovement3();
    boneMovement4();
    boneMovement5();
}

animate();

