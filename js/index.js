$(document).ready(function(){
	var diaporama = 2;
	var site = "http://divers.pierre-chauvelot.fr/slider/";
	var json;

initSlide();
		
			


	
function initSlide(){
	//récupération du JSON
	$.ajax({
		url: site+"ajax.php?action=getSlides&id="+diaporama,
		dataType: "json",
	}).done(function(data) {

		//création des LI de tout le slide
		json = data;
		$('h2').html(json.slides[0].titre);
		for (var i = 0; i < json.slides.length -1; i++){
			$('#slider ul').append('<li><img src="" id="image_'+i+'" /></li>');
		}
		//on charge les 3 premières images
		for (var i = 0; i < 3;i++){
			$('#image_'+i).attr('src','slides/'+json.slides[i].nom_fichier+'.jpg');
		}

		//$('audio').append('<source src="sons/'+json.slides[i].nom_fichier+'.mp3" type="audio/mp3">');

		$('#slider ul').cycle({ 
		    fx:     'fade', 
		    speed:  'fast', 
		    timeout: 0, 
		    next:   '#suivant', 
		    prev:   '#precedent' ,
		    after: 	dynamicLoad
		});
	});
}

function dynamicLoad(){
	var indexCurrent = parseInt($(this).find('img').attr('id').replace('image_', ''),10) ;

	if (indexCurrent > 1 && indexCurrent < json.slides.length -3){
		console.log('on passe dans la boucle')
		//suppression de l'image à 3 images précédentes
		$('#image_'+(indexCurrent - 3)).attr('src','');
		//ajout de l'image à 2 images précédentes
		$('#image_'+(indexCurrent - 2)).attr('src','slides/'+json.slides[(indexCurrent - 2)].nom_fichier+'.jpg');
	}
	if (indexCurrent <  json.slides.length -3){
		//suppression de l'image à 3 images suivantes
		$('#image_'+indexCurrent + 3).attr('src','');
		//ajout de l'image à 2 images suivantes
		$('#image_'+(indexCurrent + 2)).attr('src','slides/'+json.slides[(indexCurrent + 2) ].nom_fichier+'.jpg');
	}
}


//<img src="slides/'+json.slides[i].nom_fichier+'.jpg" id="image_'+i+'" />
/*	
	$('#precedent').click(function () {
		if (index > 0){
			
			if (index > 1 ){
				$('#slider ul').prepend('<li><img src="slides/'+json.slides[(index-2)].nom_fichier+'.jpg" id="image_'+(index-2)+'" /></li>');
				$('#slider ul li').last().remove();
			}
			
			$('ul li.current').prev().show().addClass('current');
			$('ul li.current').last().hide().removeClass('current');
			 
			index -=1;
		}
	});
	
	$('#suivant').click(function () {

		if (index < json.slides.length - 1){

			$('ul li.current').next().show().addClass('current');
			$('ul li.current').first().hide().removeClass('current');
			
			if (index < (json.slides.length - 3)){
				$('#slider ul').append('<li><img src="slides/'+json.slides[(index+3)].nom_fichier+'.jpg" id="image_'+(index+3)+'" /></li>');
				if (index > 2){
				$('#slider ul li').first().remove();
				}
			}
			index +=1;
		}
	});*/
});



