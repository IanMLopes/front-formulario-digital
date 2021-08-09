<template>

  <div  style="height:auto; width: auto" :class="estilo1" >
    <div id="capturar" style=" max-width: 950px; margin: auto" >
    <div id="termo"  >

    <table id="table"  style=" width: 100%;  font: 400 14px Roboto, sans-serif; margin-top: 30px; margin: 25px  auto; text-align: center; border-collapse: collapse;">
    
            <tr>
                <td rowspan="4"  style="border: 1px solid; border-bottom: 1px solid    color: #212529; border-left: none;">  
                <img crossorigin="anonymous"  src="../assets/samel_logo.jpg" alt="" style="width: 120px; height: 115px; margin: 5px auto "> 
                </td>

                <td rowspan="4"  style="border: 1px solid; font-weight:bold, color: #808080;  ">
                    SAMEL: TERMO DE CONSENTIMENTO
                </td>
            
                <td style="border: 1px solid;  border-right: none; ">Código: F-CRP-012</td>
            </tr>
    
            <tr>
                <td style="border: 1px solid; border-right: none; ">Data da Revisão: 13/07/2020</td>
            </tr>
    
            <tr>
                <td style="border: 1px solid; border-right: none; ">N° Revisão: 03</td>
            </tr>
    
            <tr>
                <td style="border: 1px solid; border-right: none; ">Página: 1 de 1</td>
            </tr>
    
    </table>
    <div style="max-width:  950px; z-index:1">
    <canvas id="paint-canvas" ></canvas>

      <div id="altura"  v-html="paghtml">
        
        <div ></div>    

      </div>
    </div>
    </div>
    </div>

    <div class="buttons" >
      <div class="colors" >
        <button type="button" value="#000000"  style=" display: none"></button>
         <button v-if="aplicar" id="travar" type="button"  style="background: #f76a6a" @click="aplicar = !aplicar; teste1()">Liberar</button>
         <button v-else id="travar" type="button" style="background: #84f184" @click="aplicar = !aplicar" >Assinar</button>
        <button id="clear" type="button">Limpar</button>
        <button id="voltar" type="button">Desfazer</button>
      </div>

      <div >
        <button class="salvar" @click="cap()">Salvar Formulário</button>
      <div class="brushes" style="display: none;">
          <button type="button" value="1"></button>
      </div>
       
      </div>  
    </div>

<button class="button"  @click="$router.go(-1)" style="display: flex; z-index: 2" >
     <img src="../assets/angle-left-solid.svg" alt="" style="width: 10px; margin: 0">
        <strong style="margin: auto 0; margin-left: 5px">  Voltar</strong>
    </button> 

  </div>

</template>


<script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>

<script>
import DataServices from '../services/DataServices'

export default {
    
        data(){
            return {
                paghtml:[], 
                stringImg:'',
                nr_atendimento:localStorage.getItem('storage_nr_atendimento'),
                armazenar_termo:  localStorage.getItem('armazenar_termo'),
                aplicar: false,
            }
            
        },

      async  created() {
          await DataServices.buscar(this.armazenar_termo,  this.nr_atendimento).then(response => {
            console.log("AAA", response.data[0].HTML_FORM);
                    this.paghtml = response.data[0].HTML_FORM;
                }) 
                 this.mudaAltura()               
        },    
        
computed: {
estilo1(){

  if(this.aplicar){
  document.getElementById('screen').style.overflow = 'hidden'
  } else {
     document.getElementById('screen').style.overflow = ''
  }  
}
},

methods: {

 cap() {
    
  html2canvas(document.querySelector('#capturar'), {scrollY: -window.scrollY}).then(canvas => {

        this.stringImg = canvas.toDataURL('image/png', 1)


        if(this.stringImg ){

        this.enviarDados()
    
        }

    }
  )

},

mudaAltura() {
    var alturaAtual = document.querySelector('#altura').offsetHeight;
    
    this.novaAltura = parseInt(alturaAtual)
     document.querySelector('#paint-canvas').style.height = this.novaAltura + 15 + "px";
     if(this.novaAltura > 2000){
       this.pagina_termo = 2
     }else{
       this.pagina_termo = 1
     }
      this.forcanvas()
    },

async enviarDados(){

 let enviar = await DataServices.create(this.nr_atendimento, this.armazenar_termo, this.stringImg )
 console.log("NRNRNRNRNRNR",this.nr_atendimento, "TERMPTERMOTERMO", this.armazenar_termo, "IMGIMGIMGIMG",this.stringImg)

alert("Enviado com Sucesso!")

this.$router.push(`/listapreenchertermo/${this.nr_atendimento}`)

 return enviar
},
 

forcanvas() {
var canvas = document.querySelector('#paint-canvas');
var context = canvas.getContext("2d");

// Specifications
var  mouseX = 0;
var mouseY = 0;


canvas.width  = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

context.strokeStyle = 'black'; // initial brush color
context.lineWidth = 1;

var isDrawing = false;

let restore_array = []; //aaaaaa
let index = -1;  //aaaaaa

// Handle Colors
var colors = document.getElementsByClassName('colors')[0];

colors.addEventListener('click', function(event) {
  context.strokeStyle = event.target.value || 'black';
});

// Handle Brushes
var brushes = document.getElementsByClassName('brushes')[0];

brushes.addEventListener('click', function(event) {
  context.lineWidth = event.target.value || 1;
  console.log("tetttt",  context.lineWidth  )
});


// Mouse Down Event
canvas.addEventListener('mousedown', function(event) {
  setMouseCoordinates(event);
  isDrawing = true;
 

  // Start Drawing
  context.beginPath();
  context.moveTo(mouseX, mouseY);
});

// Mouse Move Event
canvas.addEventListener('mousemove', function(event) {
  console.log("teste")
 
  setMouseCoordinates(event);

  if(isDrawing){
    context.lineTo(mouseX, mouseY);
    context.stroke();
  }

});

// Mouse Up Event
canvas.addEventListener('mouseup', function(event) {
  setMouseCoordinates(event);
  isDrawing = false;

if ( event.type != 'mousemove'){
  restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height)) //aaaaaaa
  index += 1

  }

});

// TOUCH

// Mouse Down Event
canvas.addEventListener('touchstart', function(event) {
  setMouseCoordinates(event);
  
//  this.estilo1()
  isDrawing = true;

  // Start Drawing
  context.beginPath();
  context.moveTo(mouseX, mouseY);
});

// Mouse Move Event
canvas.addEventListener('touchmove', function(event) {
  console.log("teste2")
 
  setMouseCoordinates(event);

  if(isDrawing){
    context.lineTo(mouseX, mouseY);
    context.stroke();
  }

});

// TOUCH
canvas.addEventListener('touchend', function(event) {
 
  setMouseCoordinates(event);
  isDrawing = false;
   console.log("touch event", event)

if ( event.type != 'touchmove'){
  restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height)) //aaaaaaa
  index += 1
  }
});

// Mouse Up Event
canvas.addEventListener('mouseup', function(event) {
  setMouseCoordinates(event);
  isDrawing = false;
   console.log("mouse event", event)
if ( event.type != 'mousemove'){
  restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height)) //aaaaaaa
  index += 1
  }

});

// TOUCH
function setMouseCoordinates(event) {
  var rect = canvas.getBoundingClientRect();

if(event.type == 'touchmove'){
   mouseX = event.changedTouches[0].clientX - rect.left;
   mouseY = event.changedTouches[0].clientY - rect.top;
  //  mouseX = event.touches[0].clientX - rect.left;
  //  mouseY = event.touches[0].clientY - rect.top;
    // this.estilo = true
}
else {
   mouseX = event.clientX - rect.left;
   mouseY = event.clientY - rect.top;
}
return {mouseX, mouseY}
   
}

// Handle Clear Button
var clearButton = document.getElementById('clear');

clearButton.addEventListener('click', function() {
  console.log("limpar")
  context.clearRect(0, 0, canvas.width, canvas.height); 

  restore_array = [];
  index = -1;
}
);

var clearButton = document.getElementById('voltar');

clearButton.addEventListener('click', function() {

if (index <= 0){
context.clearRect(0, 0, canvas.width, canvas.height); //aaa
restore_array = [];
  index = -1;
}else {
  index -= 1;
  restore_array.pop();
  context.putImageData(restore_array[index], 0, 0);
}
});
}

},
}
</script>

<style scoped>
html {
  overflow: hidden;
}

#paint-canvas{
     position: absolute; width: 900px; left:50%; transform: translateX(-50%);  cursor:crosshair; margin: 0 auto 20px; align-items: center; z-index:1;
}
.disp {
  display: none;
}

#termo  {
    max-width:  900px; height: auto;  margin: 10px auto 200px;   align-items: center; border: 1px solid; padding: 0; display: block; z-index:1;
}

.buttons {
   height: auto; display: flex; flex-direction: column; position: fixed; bottom: 20px; right: 20px;z-index:2
}
.colors {
   text-align: center;display: flex; flex-direction: column; width: 130px; 
}
.salvar{
   height: 50px; border: 1px solid #00000026;  border-radius:5px;  outline: none; background: #40b381;  cursor: pointer; padding: 12px; margin-top: 4px;
}
.editar{
 height: 50px; width:130px; text-align: center; border-radius:5px; border: 1px solid #00000026; cursor: pointer;
}
.salvar:hover{
 background: #3da779;  border: 1px solid #808080; 
}
#clear{
  height: 50px; width:auto; text-align: center; border-radius:5px; border: 1px solid #00000026; cursor: pointer; margin-top: 4px
}
#voltar {
 height: 50px; text-align: center; border-radius:5px; border: 1px solid #00000026; cursor: pointer;  margin-top: 4px;
}
#travar  {
 height: 50px; text-align: center; border-radius:5px; border: 1px solid #00000026; cursor: pointer;  margin-top: 4px; 
  
}
#clear:hover, #voltar:hover, #travar:hover {
  background-color: #e2e0e0;
}

.button {padding: 15px 8px; border-radius: 3px; background:#42b983; color: #000000; border:#42b983; position: fixed; left: 25px; bottom: 20px; font-size: 14px; z-index:1;
}



</style>