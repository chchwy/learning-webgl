'use strict';

var gl = null;
var canvas = null;
var c_width = 0;
var c_height = 0;

function getGLContext(canvas_id) {

	canvas = document.getElementById(canvas_id);
	if (canvas == null) {
		alert("ERROR: cannot find canvas");
	}

	var names = ["webgl", "experiment-webgl", "webkit-3d", "moz-webgl"];

	var ctx = null;
	for (var i = 0; i < names.length; ++i) {
		try {
			ctx = canvas.getContext(names[i]);
		} catch(e) {}

		if (ctx) {
			console.log(names[i]);
			break;
		}
	}

	if ( ctx == null ) {
		alert("ERROR! no WebGL context.");
	}
	return ctx;
}

function clear(context) {
	context.clear(context.COLOR_BUFFER_BIT);
	context.viewport(0, 0, c_width, c_height);
}

function checkKey(ev) {
	//console.log( ev.keyCode );
	switch (ev.keyCode) {
	case 49: { //1
		gl.clearColor(0.3, 0.7, 0.2, 1.0);
		clear(gl);
		break;
	}
	case 50: { //2
		gl.clearColor(0.7, 0.3, 0.2, 1.0);
		clear(gl);
		break;
	}
	case 51: { //3
		var color = gl.getParameter(gl.COLOR_CLEAR_VALUE);
		console.log(color);
	}
	}
}

function run_hello_webgl(canvas_id) {
	gl = getGLContext(canvas_id);
	window.onkeydown = checkKey;

	gl.clearColor(0.4, 0.4, 0.6, 1.0);
	clear(gl);
}
