// WebGL 01
// 好奇不知道要做什麼

var gl = null;
var cnavs = null;
var c_width = 0;
var c_height = 0;

function getGLContext()
{
  canvas = document.getElementById("my-canvas");
  if ( canvas == null )
  {
    alert("ERROR: cannot find canvas");
  }

  var names = ["webgl", "experiment-webgl", "webkit-3d", "moz-webgl" ];

  var ctx = null;
  for ( var i = 0; i < names.length; ++i )
  {
    try
    {
      ctx = canvas.getContext( names[ i ] );
    }
    catch( e ) {}

    if ( ctx )
    {
      console.log( names[ i ] );
      break;
    }
  }


  if ( ctx == null )
  {
    alert("ERROR! no WebGL context." );
  }
  return ctx;
}

function clear( context )
{
  context.clear( context.COLOR_BUFFER_BIT );
  context.viewport( 0, 0, c_width, c_height );
}

function checkKey( ev )
{
  //console.log( ev.keyCode );
  switch ( ev.keyCode )
  {
    case 49:{
      gl.clearColor( 0.3, 0.7, 0.2, 1.0 );
      clear(gl);
      break;
    }
    case 50:{
      gl.clearColor( 0.7, 0.3, 0.2, 1.0 );
      clear( gl );
      break;
    }

    case 51:{
      var color = gl.getParameter( gl.COLOR_CLEAR_VALUE );
      alert('clearColor = ('
            + Math.round(color[0] * 10) / 10 + ","
            + Math.round(color[1] * 10) / 10 + ","
            + Math.round(color[2] * 10) / 10 + ")" );
    }
  }
}

function bodyOnLoad()
{
  gl = getGLContext();
  window.onkeydown = checkKey;
}
