$(document).ready(function(){
    var zoekTerm;
    $('#gaHalen').click(function() {
        zoekTerm = $('#zoekterm').val();
        haalFotos();
    });
    $('#zoekterm').keydown(function(e) {
        if(e.keyCode == 13) {
            zoekTerm = $(this).val();
            haalFotos();
        }
    });
    
    //foto's ophalen
    
    function haalFotos() {
        var flickrURL = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" +
        zoekTerm + "&jsoncallback=?"
        $.ajax (
            {
                dataType: 'json',
                method: 'GET',
                url: flickrURL,
                success: verwerkFotos
            }
        )
    }
    
    //plaats de foto's
    
    function verwerkFotos(data) {
		console.log(data);
		$('#fotos').html("");
		for(var i=0; i<data.items.length; i++){
			var foto = data.items[i];
			var htmlCode = "<div class='houder'><div class='afbeelding'><a href='" + foto.link + "' target='_blank'><img src='" + foto.media.m + "' alt='" + foto.title + "'></a></div><h4>" + foto.title +"</h4></div>";
			$('#fotos').append(htmlCode);
			}
		$('#bron a').attr("href", data.link).text(data.title + " by Flickr.com");
		}
});