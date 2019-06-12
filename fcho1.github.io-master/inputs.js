document.addEventListener("keydown"    , keyPressedHandler );
document.addEventListener("keyup"      , keyUpHandler );

var upHeld = false;
var downHeld = false;
var leftHeld = false;
var rightHeld = false;





function keyPressedHandler(evt){
   console.log(evt.keyCode)
   switch (evt.keyCode)
   {
       case keyboard.KEY_W:
           upHeld = true;
           break;
       case keyboard.KEY_S:
           downHeld = true;
           break;
       case keyboard.KEY_A:
           leftHeld = true;
           break;
       case keyboard.KEY_D:
           rightHeld = true;
           break;
   }
    evt.preventDefault();
}

function keyUpHandler(evt){
   console.log(evt.keyCode)
   switch (evt.keyCode)
   {
       case keyboard.KEY_W:
           upHeld = false;
           break;
       case keyboard.KEY_S:
           downHeld = false;
           break;
       case keyboard.KEY_A:
           leftHeld = false;
           break;
       case keyboard.KEY_D:
           rightHeld = false;
           break;
   }
}
