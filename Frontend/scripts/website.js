// All global variables
var commandlist, commandlist_textarea, stepmodifier, speedmodifier;
var m1slider, m1number, m2slider, m2number, m3slider, m3number, m4slider, m4number, m5slider, m5number;
var btn_grip_off, btn_grip_on, btn_grip_onandoff;
var btn_reset, btn_base, btn_shldr, btn_wrstv, btn_wrstr, btn_gripp;
var btn_start, btn_stop, btn_send;
var btn_sv_record, btn_sv_next, btn_sv_download;
var btn_sv_play, btn_sv_upload, btn_sv_send;

var oldValues = [];
var newValues = [];

window.onload = init();

function init(){
    commandlist = [];
    newValues = [];
    commandlist_textarea = document.getElementById("commandlist");
    stepmodifier = document.getElementById("stepmodifier");
    speedmodifier = document.getElementById("speedmodifier");

    m1slider = document.getElementById("m1slider");
    m1number = document.getElementById("m1number");

    m2slider = document.getElementById("m2slider");
    m2number = document.getElementById("m2number");

    m3slider = document.getElementById("m3slider");
    m3number = document.getElementById("m3number");

    m4slider = document.getElementById("m4slider");
    m4number = document.getElementById("m4number");

    m5slider = document.getElementById("m5slider");
    m5number = document.getElementById("m5number");

    btn_grip_off = document.getElementById("btn_grip_off");
    btn_grip_on = document.getElementById("btn_grip_on");
    btn_grip_onandoff = document.getElementById("btn_grip_onandoff");

    btn_reset = document.getElementById("btn_reset");
    btn_base = document.getElementById("btn_base");
    btn_shldr = document.getElementById("btn_shldr");
    btn_wrstv = document.getElementById("btn_wrstv");
    btn_wrstr = document.getElementById("btn_wrstr");
    btn_gripp = document.getElementById("btn_gripp");

    btn_start = document.getElementById("btn_start");
    btn_stop = document.getElementById("btn_stop");
    btn_send = document.getElementById("btn_send");

    btn_sv_record = document.getElementById("btn_sv_record");
    btn_sv_next = document.getElementById("btn_sv_next");
    btn_sv_download = document.getElementById("btn_sv_download");

    btn_sv_play = document.getElementById("btn_sv_play");
    btn_sv_upload = document.getElementById("btn_sv_upload");
    btn_sv_send = document.getElementById("btn_sv_send");
};


var steps = document.getElementsByClassName("stepbutton");
Array.prototype.forEach.call(steps, function(element) {
    element.addEventListener('click', () => { stepchange(); })});

function stepchange(){
    console.log("Step modifier changed to " + stepmodifier.value);
    m1number.step = stepmodifier.value;
    m1slider.step = stepmodifier.value;
    m2slider.step = stepmodifier.value;
    m2number.step = stepmodifier.value;
    m3slider.step = stepmodifier.value;
    m3number.step = stepmodifier.value;
    m4slider.step = stepmodifier.value;
    m4number.step = stepmodifier.value;
    m5slider.step = stepmodifier.value;
    m5number.step = stepmodifier.value;
};

m1slider.oninput = () => {m1number.value = m1slider.value;};
var buttons1 = document.getElementsByClassName("button1");
Array.prototype.forEach.call(buttons1, function(element) {
    element.addEventListener('click', () => { m1slider.value = m1number.value;})});

m2slider.oninput = () => {m2number.value = m2slider.value;};
var buttons2 = document.getElementsByClassName("button2");
Array.prototype.forEach.call(buttons2, function(element) {
    element.addEventListener('click', () => { m2slider.value = m2number.value;})});

m3slider.oninput = () => {m3number.value = m3slider.value;};
var buttons3 = document.getElementsByClassName("button3");
Array.prototype.forEach.call(buttons3, function(element) {
    element.addEventListener('click', () => { m3slider.value = m3number.value;})});

m4slider.oninput = () => {m4number.value = m4slider.value;};
var buttons4 = document.getElementsByClassName("button4");
Array.prototype.forEach.call(buttons4, function(element) {
    element.addEventListener('click', () => { m4slider.value = m4number.value;})});

m5slider.oninput = () => {m5number.value = m5slider.value;};
var buttons5 = document.getElementsByClassName("button5");
Array.prototype.forEach.call(buttons5, function(element) {
    element.addEventListener('click', () => { m5slider.value = m5number.value;})});

btn_sv_record.onclick = () => {
    if (btn_sv_record.checked){
        console.log("Recording");
        commandlist = [];
        newValues = [];
        commandlist_textarea.value = "";

        commandlist.push("pre_speed " + speedmodifier.value);

        commandlist.push("m1 " + m1number.value);
        commandlist.push("m2 " + m2number.value);
        commandlist.push("m3 " + m3number.value);
        commandlist.push("m4 " + m4number.value);
        commandlist.push("m5 " + m5number.value);
        commandlist.push("END");

        oldValues[0] = m1number.value;
        oldValues[1] = m2number.value;
        oldValues[2] = m3number.value;
        oldValues[3] = m4number.value;
        oldValues[4] = m5number.value;

        newValues[0] = m1number;
        newValues[1] = m2number;
        newValues[2] = m3number;
        newValues[3] = m4number;
        newValues[4] = m5number;

        commandlist_textarea.innerText = commandlist.join("\n");

        btn_sv_next.classList.remove("disabled");
        btn_sv_download.classList.remove("disabled");
        btn_sv_play.classList.remove("disabled");
        btn_sv_send.classList.remove("disabled");
    }
    else{
        console.log("Recording stopped");
        commandlist_textarea.innerText = "";

        btn_sv_next.classList.add("disabled");
        btn_sv_download.classList.add("disabled");
        btn_sv_play.classList.add("disabled");
        btn_sv_send.classList.add("disabled");
    }
}

btn_sv_next.onclick = () => {
    console.log("Next command");
    console.log(oldValues);
    console.log(newValues[0].value);
    var itemadded = false;
    for(var i = 0; i < 5; i++){
        if (newValues[i].value != oldValues[i]){
            commandlist.push("m" + (i+1) + " " + newValues[i].value);
            oldValues[i] = newValues[i].value;
            itemadded = true;
        }
    }
    if (itemadded){
        commandlist.push("END");
        commandlist_textarea.innerText = commandlist.join("\n");
    }
};

btn_sv_download.onclick = () => {
    console.log("Download");
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(commandlist_textarea.innerText));
    element.setAttribute('download', "commands.txt");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

btn_sv_upload.onclick = () => {
    console.log("Upload");
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file,'UTF-8');
        reader.onload = readerEvent => {
            var content = readerEvent.target.result;
            commandlist_textarea.innerText = content;
            btn_sv_play.classList.remove("disabled");
        }
    }
    input.click();
    btn_sv_send.classList.remove("disabled");
};

btn_grip_off.onclick = () => {
    if (btn_sv_record.checked){
        commandlist.push("grip 1");
        commandlist.push("END");
        commandlist_textarea.innerText = commandlist.join("\n");
    }
};

btn_grip_on.onclick = () => {
    if (btn_sv_record.checked){
        commandlist.push("grip 0");
        commandlist.push("END");
        commandlist_textarea.innerText = commandlist.join("\n");
    }
};

//TODO: Add global step counter modifier listener
//global step counter modifies slider and number input step values
//all input fields must be linked to a variable in the global scope
//Three.js animation file access to global variables provided by the website.js file
//Three.js would have its own listener for the slider and number input fields
//but listener variables comes from the website.js file

//TODO: Add increase acceleration for number input fields
//TODO: Add save and load functionality
//TODO: Add prebuilt commands functionality
//TODO: Add reset functionality
//TODO: Add robotic arm go to given position functionality

//MASSIVE TODO: Upload file button must not be disabled even if recording is not enabled