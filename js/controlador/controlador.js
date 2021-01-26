/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  agregarVoto: function(nombrePregunta,respuestaSeleccionada){
  	this.modelo.sumarVoto(nombrePregunta,respuestaSeleccionada);
  },

  //*MIO
  borrarPregunta:function(id){
  	
  	this.modelo.borrarPregunta(id);

  },//*MIO

  borrarTodasPreguntas:function(){
  	this.modelo.borrarTodasPreguntas();
  },

  //*MIO
  editarPregunta:function(id){
  	//this.modelo.editarPreguntas(id);
  	var identificador=id-1; //a los fines de pasar la posicion necesaria para trabajar el arreglo preguntas ubicado en modelo.js
  	var texto= NaN;
   if( isNaN(id)==false){
  		texto = prompt("Escriba su pregunta");
    if((texto !== NaN) && (texto !== undefined)&&(texto !== null)&& (texto.length>0)){
      this.modelo.editarPreguntas(identificador, texto);
    }
    else{
    	alert("No ha ingresado la pregunta");
    }
}

  },


  
};

