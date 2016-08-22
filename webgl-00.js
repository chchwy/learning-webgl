
// WebGL 00
// 初始化 WebGL Context
// 其他什麼事都沒幹
// 如果成功會跳 Ya! 彈出視窗 否則就是

var gl = null;
var canvas = null;

function getGLContext()
{
  canvas = document.getElementById("my-canvas");
  if ( canvas == null )
  {
    alert("ERROR: no canvas on this page.");
  }

  var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl" ];

  for ( var i = 0; i < names.length; ++i )
  {
    try
    {
      gl = canvas.getContext( names[ i ] );
    }
    catch( e ) {}

    if ( gl ) break;
  }

  if ( gl == null )
  {
    alert( "WebGL is not available" );
  }
  else
  {
    alert("Ya!");
  }
}

function bodyOnLoad()
{
  getGLContext();
}
