/*––––––––––––––––––––––––––––––
_PAGEFADE.JS

Lets page fade in after load

––––––––––––––––––––––––––––––*/

$(window).on("load",function(){

	FadeInPage().done(function(){

		// Instantiate ColorFade plugin
		InitiateColorFade();
		// Instantiate Fullpage.js
		$('#fullpage').fullpage({

			//"scrollBar: true" is required
			//to play nice with
			//InitiateColorFade
			scrollBar: true


		});

	});

});

function FadeInPage() {

	var deferred = $.Deferred();

	$('body').delay(300).fadeIn('slow', function(){
		deferred.resolve();		
	});

	return deferred.promise();

}