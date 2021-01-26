/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.editarPregunta = new Evento(this);
  this.paginaIniciada = new Evento(this);
  this.preguntaVotada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    let mayorNum = this.ultimoId;//*MIO
    this.preguntas.forEach((pregunta) => {if (pregunta.id > mayorNum){mayorNum = pregunta.id}});//*MIO
    this.ultimoId = mayorNum;//*MIO
    return this.ultimoId;//*MIO
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    
    this.preguntas.push(nuevaPregunta);
    
    this.guardar();
    this.preguntaAgregada.notificar();
  },
  borrarPregunta: function(indice){
    for(var i in this.preguntas){
      if(this.preguntas[i].id==indice){
        this.preguntas.splice(i,1);
      }
    }
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  borrarTodasPreguntas:function(){
    this.preguntas=[];
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  editarPreguntas:function(indice,texto){

    this.preguntas[indice].textoPregunta=texto;
    this.guardar();
    this.editarPregunta.notificar();

  },

  sumarVoto:function(nombrePregunta,respuestaSeleccionada){
    var preguntaElegida = this.preguntas.find(pregunta => pregunta.textoPregunta.toUpperCase()==nombrePregunta),
    respuestaElegida = preguntaElegida.cantidadPorRespuesta.find(respuesta=>respuesta.textoRespuesta==respuestaSeleccionada);
    respuestaElegida.cantidad+=1;
    this.guardar();
    this.preguntaVotada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('arregloPreguntas',JSON.stringify(this.preguntas)); //*MIO

  },
};
