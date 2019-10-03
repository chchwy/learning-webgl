'use strict';

let gl = null;
let canvas = null;

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

  gl.clearColor(0.92, 0.91, 0.68, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

