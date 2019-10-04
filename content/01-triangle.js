'use strict';

let gl = null;
let canvas = null;
let vertexShader = null;
let fragmentShader = null;
let program = null;
let vertexBuffer = null;
let indexBuffer = null;

function createVertexBuffer() {
  let vertices = [
    -50.0, 50.0, 0.0,
    -50.0,-50.0, 0.0,
    50.0,-50.0, 0.0];
  vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  let indices = [0, 1, 2];
  indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

const vertexShaderSrc = `
  attribute vec3 aVertexPosition;
  void main() {
    gl_Position = vec4(aVertexPosition, 1.0);
  }
`;
const fragmentShaderSrc = `
  precision highp float;
  void main() {
    gl_FragColor = vec4(0.9, 0.8, 0.4, 1.0);
  }
`;

function createShader(src, type) {
  let shader = null;
  if (type === 'vertex') {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else if (type === 'fragment') {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else {
    return null;
  }

  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Cannot compile shaders!");
    return null;
  }
  return shader;
}

function render() {
  createVertexBuffer();
  vertexShader = createShader(vertexShaderSrc, 'vertex');
  fragmentShader = createShader(fragmentShaderSrc, 'fragment');

  program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Cannot initialise shaders!");
  }
  gl.useProgram(program);
  program.vertexPosition = gl.getAttribLocation(program, "aVertexPosition");

  gl.clearColor(0, 0, 0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.viewport(0, 0, 600, 600);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.vertexAttribPointer(program.vertexPosition, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(program.vertexPosition);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);
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

  render();
}

