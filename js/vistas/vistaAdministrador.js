/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  //*MIO
  this.modelo.preguntaEliminada.suscribir(function(){
    contexto.reconstruirLista();
  });
  //*MIO

  this.modelo.editarPregunta.suscribir(function(){
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    this.reconstruirLista();//*MIO*
    this.configuracionDeBotones();//*MIO
    validacionDeFormulario();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    nuevoItem = $("<li class='list-group-item' id='"+`${pregunta.id}`+"'>"+`${pregunta.textoPregunta}`+"</li>");//*MIO*
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      console.log(value);
      var respuestas = [];

      $('[name="option[]"]').each(function() {
        //completar
        var textoInput = $(this).val(), //*MIO
        respuesta={textoRespuesta:textoInput, cantidad:0 }//*MIO
        console.log(respuesta);
        respuestas.push(respuesta);//*MIO  
      })
      contexto.limpiarFormulario();
      //*MIO
      if(value=="" || respuestas[0].textoRespuesta==""){
        alert("No ha ingresado datos");
        
      }else{
        
      contexto.controlador.agregarPregunta(value, respuestas);
      }//*MIO
    });
    //asociar el resto de los botones a eventos
    //*MIO-botonBorrarPregunta*
    e.botonBorrarPregunta.click(function(){  
      var id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.borrarPregunta(id);
    }); //*MIO
    e.borrarTodo.click(function(){  
      
      contexto.controlador.borrarTodasPreguntas();
    });

    //*MIO
    e.botonEditarPregunta.click(function(){
      var id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.editarPregunta(id);

      
    });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
