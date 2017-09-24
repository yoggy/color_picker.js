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

function setup() {
	canvas = createCanvas(400, 400);
    canvas.parent("sketch-holder");
    canvas.drop(onDropFile);
    
    color_str_div = select("#color_str");

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

    if (0 <= mouseX && mouseX < width && 0 <= mouseY && mouseY < height) {
        msg = getColorMessage();
        color_str_div.elt.innerText = msg;
    }
}

function onDropFile(file) {
    console.log("onDropFile()")
    if (file.type === 'image') {
        img = createImg(file.data).hide();
    }
}

function getColorMessage() {
    var c = get(mouseX, mouseY);
    var r = c[0];
    var g = c[1];
    var b = c[2];

    color_str = "#" 
        + ("0" + r.toString(16)).slice(-2) 
        + ("0" + g.toString(16)).slice(-2) 
        + ("0" + b.toString(16)).slice(-2);

    var msg = "(R,G,B)=(" + r + ", " + g + ", " + b + ") " + color_str;

    return msg;
}

function mousePressed() {
    var msg = getColorMessage();
    var input = select("#color_copy_area");
    input.elt.value = msg;
}