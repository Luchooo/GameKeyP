$(function()
{
	$("#puntaje").hide();
	var inicia = false;
	var Contraseña = "";
	var pass = "3486";
	var animateIn = ["bounceIn","bounceInDown","bounceInLeft","bounceInRight","bounceInUp","fadeIn","fadeInDown","fadeInDownBig","fadeInLeft","fadeInLeftBig","fadeInRight","fadeInRightBig","fadeInUp","fadeInUpBig","rotateIn","rotateInDownLeft","rotateInDownRight","rotateInUpLeft","rotateInUpRight","slideInUp","slideInDown","slideInLeft","slideInRight","zoomIn","zoomInDown","zoomInLeft","zoomInRight","zoomInUp"];
	var animateOut = ["bounceOut","bounceOutDown","bounceOutLeft","bounceOutRight","bounceOutUp","fadeOut","fadeOutDown","fadeOutDownBig","fadeOutLeft","fadeOutLeftBig","fadeOutRight","fadeOutRightBig","fadeOutUp","fadeOutUpBig","rotateOut","rotateOutDownLeft","rotateOutDownRight","rotateOutUpLeft","rotateOutUpRigt","slideOutUp","slideOutDown","slideOutLeft","slideOutRight","zoomOut","zoomOutDown","zoomOutLeft","zoomOutRight","zoomOutUp"];
	var puntaje = 0;
	//var puntaje = 0;		
	$("#start_d").click(function(event)
	{
		$(this).fadeOut('fast', function() {
			setInterval(letraMuestra, 600);
			inicia = true;
			$(start_m).hide();
			$(start_f).hide();
		});
	});
	//Para generar numeros aleatorias...
	var letraMuestra = function()
	{			
		//Se debe obtener una letra aleatoria del alfabeto y ubicarla en una posición aleatoria...
		var posLetra = {
							left : Math.floor(Math.random() * (screen.width - 200)), 
							top  : Math.floor(Math.random() * (screen.height - 250)),
							bottom  : Math.floor(Math.random() * (screen.height - 100))
						};
		var numeroPone = Math.floor(Math.random()*9);			
		//var letraPone = String.fromCharCode(numLetra).toUpperCase();
		var divLetra = "<div class = 'circulo letra_"+(numeroPone)+" '" + 
							"style = \"left : "+(posLetra.left)+"px; top : "+(posLetra.top) + 
							"px; background-color: " + randomColor()+"\">" + 
							(numeroPone) + 
						"</div>";

		$("body").append(divLetra);
		//flash, wobble
		var aleatorio = Math.floor(Math.random()*animateIn.length);
		$(".letra_" + numeroPone).addClass("'animated "+animateIn[aleatorio]+"'");
	};

	//Para detectar eventos de teclado...
	$(document).keypress(function(event)
	{
		if(Contraseña.length < 4)
		{
			//console.log(event.keyCode);
			if(event.keyCode >= 48 && event.keyCode <= 57 && inicia)
			{
				var letraPresiona = String.fromCharCode(event.keyCode);
				//Número de ocrrencias de la letra...
				var numVeces = $(".letra_" + letraPresiona).size();
				console.log("Veces letra presionada:", numVeces);
				var random = Math.floor(Math.random()*animateOut.length);
				Contraseña+=String.fromCharCode(event.keyCode);
	  			console.log("Contraseña..."+Contraseña+"letraPresiona");

				$(".letra_" + letraPresiona).addClass("animated "+animateOut[random]).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function()
				{  				
				});
			}
			if(Contraseña.length === 4)
			{
				valirarContrasena();
			}
		}
		else
		{
			swal({title:"Contraseña Incorrecta",text:"Quieres intentar de nuevo", confirmButtonText: "Intentar de nuevo",cancelButtonText: "Salir", closeOnConfirm: true,showCancelButton: false , type:"error"},function(isConfirm){
				 isConfirm ? location.reload():window.close()});
		}
	});

	var valirarContrasena = function()
	{
		if (Contraseña === pass) 
		{
			swal({title:"Contraseña Correcta",text:"Acceso Autorizado", confirmButtonText: "Acceder",cancelButtonText: "Salir", closeOnConfirm: true,showCancelButton: false , type:"success"},function(isConfirm){
				 isConfirm ? location.replace("http://localhost/Casa_Domotica/Cliente/Administrador/Administrar_Casa/index.html"):window.close()});
		};
	};


	var randomColor = function()
	{
    	// from http://www.paulirish.com/2009/random-hex-color-code-snippets/
    	return '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +
    	(c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4);
  	};
});