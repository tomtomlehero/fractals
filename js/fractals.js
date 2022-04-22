
let global;
let context;

function innerTabHtml() {
    return `
  <div class="row" style="margin-top: 15px;">
    <div class="col">
      <canvas id="fcanvas" width="${global.canvasWidth}" height="${global.canvasHeight}"></canvas>
    </div>
  </div>
`
}

$(document).ready(function () {
    $.getJSON("json/fractals.json", function (data) {
        init(data);
    });
});

function init(data) {
    global = data;
    $("#content").html(innerTabHtml());
    anythingChanged();
}

function anythingChanged() {
    draw();
}


function y(weight) {
    return ((2 * global.margin - global.canvasHeight) * weight + (global.canvasHeight - global.margin) * global.grid.y.max - global.margin * global.grid.y.min)
        / (global.grid.y.max - global.grid.y.min);
}

function x(position) {
    return ((global.canvasWidth - 2 * global.margin) * position + (global.margin - global.canvasWidth) * global.grid.x.min + global.margin * global.grid.x.max)
        / (global.grid.x.max - global.grid.x.min);
}

function reset() {
    context.clearRect(0, 0, global.canvasWidth, global.canvasHeight);
}

function drawBoundaries() {
    context.lineWidth = 1;
    context.strokeStyle = "#335EA1";
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(global.canvasWidth, 0);
    context.lineTo(global.canvasWidth, global.canvasHeight);
    context.lineTo(0, global.canvasHeight);
    context.closePath();
    context.stroke();
}


function draw() {

    const canvas = document.getElementById("fcanvas");
    context = canvas.getContext("2d");

    reset();
    drawBoundaries();

    context.fillStyle = "#e8bb08";
    context.fillRect(x(-1), y(-1), 3, 3);

}
