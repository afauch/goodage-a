/*––––––––––––––––––––––––––––––
_GLOBAL.JS

Set global variables and
functions for session

––––––––––––––––––––––––––––––*/

//Set global baseUrl variable depending on domain
//var baseUrl = 'http://asf-p-a.pancakeapps.com';
var baseUrl = window.location.protocol + "//" + window.location.host;

// goToUrl
// Assemble URL
// Fade out body
// Change page location!
function goToUrl (sessionBaseUrl, extensionPath) {

	var compiledUrl = sessionBaseUrl + extensionPath;
	console.log(compiledUrl);
	$('body').fadeOut('slow');
	// go to that URL
	window.location.href = compiledUrl;

}