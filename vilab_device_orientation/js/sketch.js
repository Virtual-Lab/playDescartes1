// Webaudio-Code comes here 

if (window.DeviceOrientationEvent) {
  document.getElementById("doEvent").innerHTML = "DeviceOrientation";
  // Listen for the deviceorientation event and handle the raw data
  console.log("deviceorientation suceeded")
  
  window.addEventListener('deviceorientation', 
  	function (e) { deviceOrientationHandler(e)}, false);
} else {
  document.getElementById("doEvent").innerHTML = "Not supported."
};

function deviceOrientationHandler (eventData) {

	// gamma is the left-to-right tilt in degrees, where right is positive
	var tiltLR = eventData.gamma;

	// beta is the front-to-back tilt in degrees, where front is positive
	var tiltFB = eventData.beta;

	// alpha is the compass direction the device is facing in degrees
	var dir = eventData.alpha

	console.log(tiltLR, tiltFB, dir);
	var elLR = document.getElementById("doTiltLR").innerHTML = Math.round(tiltLR);
	var elFB = document.getElementById("doTiltFB").innerHTML = Math.round(tiltFB);
	var elDir = document.getElementById("doDirection").innerHTML = Math.round(dir);


	// Apply the transform to the image
	var logo = document.getElementById("imgLogo");
	logo.style.webkitTransform =
	  "rotate("+ tiltLR +"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";
	logo.style.MozTransform = "rotate("+ tiltLR +"deg)";
	logo.style.transform =
	  "rotate("+ tiltLR +"deg) rotate3d(1,0,0, "+ (tiltFB*-1)+"deg)";


}