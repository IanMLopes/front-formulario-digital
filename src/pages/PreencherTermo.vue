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
        <button class="salvar" @click="cap()">Salvar Termo</button>
      <div class="brushes" style="display: none;">
          <button type="button" value="1"></button>
      </div>
       
      </div>  
    </div>


     <div class="mb-4" style="margin: auto 0; margin-left: 25px; z-index:5 ">
        <button
        style = "height:50px; display: flex;  border-radius: 3px; 
                border: #42b983 ;
                position: fixed;
                bottom: 20px;
        
        "
        type="button"
        class="btn btn-info"
        @click="$router.go(-1)">
        <img src="../assets/angle-left-solid.svg" alt="" style="width: 10px; margin: auto 0">
       <span style="margin: auto 0; margin-left: 5px "> Voltar</span> 
        </button>
 </div>

<!-- <button class="button"  @click="$router.go(-1)" style="display: flex; z-index: 2" >
     <img src="../assets/angle-left-solid.svg" alt="" style="width: 10px; margin: 0">
        <strong style="margin: auto 0; margin-left: 5px">  Voltar</strong>
    </button>  -->

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

alert("Enviado com Sucesso!")

this.$router.push(`/listapreenchertermo/${this.nr_atendimento}`)

 return enviar
},
 



forcanvas(){

 var canvas = document.querySelector('#paint-canvas');
 var context = canvas.getContext("2d");
  var isIdle = true;

let restore_array = []; //aaaaaa
let index = 0;  //aaaaaa

canvas.width  = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

  function drawstart(event) {
    console.log("EVENT", event)
    context.beginPath();
    var rect = canvas.getBoundingClientRect();
    console.log("rect", rect)

    context.moveTo(event.clientX - rect.left, event.clientY - rect.top);
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height)) //aaaaaaa
        index += 1
    isIdle = false;
  }
  function drawmove(event) {
    if (isIdle) return;
    var rect = canvas.getBoundingClientRect();
    context.lineTo(event.clientX - rect.left, event.clientY - rect.top);
    context.stroke();

  }
  function drawend(event) {
    if (isIdle) return;
    drawmove(event);
    isIdle = true;
  }
  function touchstart(event) { drawstart(event.touches[0]) }
  function touchmove(event) { drawmove(event.touches[0]); event.preventDefault(); }
  function touchend(event) { drawend(event.changedTouches[0]) }

  canvas.addEventListener('touchstart', touchstart, false);
  canvas.addEventListener('touchmove', touchmove, false);
  canvas.addEventListener('touchend', touchend, false);        

  canvas.addEventListener('mousedown', drawstart, false);
  canvas.addEventListener('mousemove', drawmove, false);
  canvas.addEventListener('mouseup', drawend, false);



var clearButton = document.getElementById('clear');

clearButton.addEventListener('click', function() {
  context.clearRect(0, 0, canvas.width, canvas.height); 

  restore_array = [];
  index = 1;
}
);

var clearButton = document.getElementById('voltar');

clearButton.addEventListener('click', function() {
  console.log("AA")

if (index <= 0){
    console.log("BB", index)
  index = 0;
context.clearRect(0, 0, canvas.width, canvas.height); 
restore_array = [];

}else {
  console.log("CC", index)
  index--;
  context.putImageData(restore_array[index], 0, 0);
  restore_array.pop();
}
});


},

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
   height: auto; display: block; flex-direction: column; position: fixed; bottom: 20px; right: 20px;z-index:2
}
.colors {
   width: 100%; text-align: center;display: flex; flex-direction: column; 
}
.salvar{
  width: 100%; height: 50px; border: 1px solid #00000026;  border-radius:5px;  outline: none; background: #40b381;  cursor: pointer; padding: 12px; margin-top: 4px;
}
.editar{
 height: 50px; width:130px; text-align: center; border-radius:5px; border: 1px solid #00000026; cursor: pointer;
}
.salvar:hover{
 background: #3da779;  border: 1px solid #808080; 
}
#clear{
  height: 50px; width:100%; text-align: center; border-radius:5px; border: 1px solid #00000026; cursor: pointer; margin-top: 4px
}
#voltar {
 height: 50px; width: 100%; text-align: center; border-radius:5px; border: 1px solid #00000026; cursor: pointer;  margin-top: 4px;
}
#travar  {
display: block; width: 100% ; height: 50px; text-align: center; border-radius:5px; border: 1px solid #00000026; cursor: pointer;  margin-top: 4px; 
  
}
#clear:hover, #voltar:hover, #travar:hover {
  background-color: #e2e0e0;
}

</style>