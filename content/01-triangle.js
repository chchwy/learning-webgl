'use strict';

let gl = null;
let canvas = null;

function createVertexBuffer() {
  let vertices = [
    -50.0, 50.0, 0.0,
    -50.0,-50.0, 0.0,
    50.0,-50.0, 0.0,
    50.0, 50.0, 0.0];
  let vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  let indices = [0, 1, 2, 1, 2, 3];
  let indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

function main(canvasId) {
  console.log('01!');

  canvas = document.getElementById(canvasId);
  try {
    gl = canvas.getContext('webgl');
  } catch(e) {
    console.error("Cannot create WebGL context!", e);
  }

  if (!gl)
    console.error("Context is null!");

  gl.clearColor(0, 0, 0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

