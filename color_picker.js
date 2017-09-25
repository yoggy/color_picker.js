//
// color_picker.js
//
// github:
//     https://github.com/yoggy/color_picker.js
//
// license:
//     Copyright (c) 2017 yoggy <yoggy0@gmail.com>
//     Released under the MIT license
//     http://opensource.org/licenses/mit-license.php;
//
var canvas;
var img;
var color_str_div;
var color_sample_div;

function setup() {
	canvas = createCanvas(400, 400);
    canvas.parent("sketch-holder");
    canvas.drop(onDropFile);
    
    color_str_div = select("#color_str").elt;
    color_sample_div = select("#color_sample").elt;
    
    frameRate(30);
}

function draw() {
    background(0,0,0);

    if (img) {
        image(img, 0, 0, img.size.width, img.size.height);
    }
    else {
        fill(255,255,255);
        textAlign(CENTER);
        textSize(24);
        text('Drag & Drop an image file...', width/2, height/2);
    }

    if (isInner()) {        
        msg = getColorMessage();
        color_str_div.innerText = msg;
        color_sample.style.backgroundColor = getColorHex();
    }
}

function mousePressed() {
    if (isInner() == true) {
        var input = select("#color_copy_area");
        input.elt.value = getColorMessage();
    }
}

function onDropFile(file) {
    console.log("onDropFile()")
    if (file.type === 'image') {
        img = createImg(file.data).hide();
    }
}

function isInner() {
    if (0 <= mouseX && mouseX < width && 0 <= mouseY && mouseY < height) return true;
    return false;
}

function getColor() {
    var c = get(mouseX, mouseY);
    var r = c[0];
    var g = c[1];
    var b = c[2];

    return [r, g, b];
}

function getColor() {
    var c = get(mouseX, mouseY); // <- p5.js function
    return {r: c[0],g: c[1],b: c[2]}
}

function getColorHex() {
    var r = getColor().r;
    var g = getColor().g;
    var b = getColor().b;

    color_hex = "#" 
    + ("0" + r.toString(16)).slice(-2) 
    + ("0" + g.toString(16)).slice(-2) 
    + ("0" + b.toString(16)).slice(-2);

    return color_hex;
}

function getColorMessage() {
    var r = getColor().r;
    var g = getColor().g;
    var b = getColor().b;

    var msg = "(R,G,B)=(" + r + ", " + g + ", " + b + ") " + getColorHex();

    return msg;
}

