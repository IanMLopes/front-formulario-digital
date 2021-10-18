<template>
<div>
           <img src="../assets/samel-health-tech-logo.png" alt="logo-samel">

<div id="list">
     
    <div class="title">
            <h2> Termos Preenchidos</h2>
            <h3>Número de Atendimento: <strong>{{this.nr_atendimento}} </strong> </h3>
        </div>

    <ul v-for="termos of  termos_preenchidos" :key="termos.NR_SEQ_TERMO_PADRAO"  >

            <li @click.prevent="mostrarTermo(termos.NR_SEQ_TERMO_PADRAO)" >
               {{termos.DS_TERMO}}
            </li>
    </ul>

</div>

 <div class="mb-4" style="position: fixed; z-index:9; right: 30px; top: 85%; display:flex; flex-direction: column ">
        <button
        style = "height:50px; padding: 0 40px; margin-bottom:3px"
        type="button"
        class="btn btn-info"
        @click="$router.push(`/listapreenchertermo/${nr_atendimento}`)">
        Termos
        </button>
        <button
        style = "height:50px; padding: 0 40px"
        type="button"
        class="btn btn-info"
        @click="$router.push('/'), sair()">
        Sair
        </button>
 </div>

</div>
</template>

<script>

import DataServices from '../services/DataServices'

export default {
    
    data(){

        return { 
            termos_preenchidos:[],
            nr_atendimento:this.$route.params.nr_atendimento,
            image_termo:''
         }
    },

mounted(){

document.getElementById('screen').style.overflow = ''

 this.carregarDados()

},

methods: {

 mostrarTermo(termo_id){


this.$router.push(`/vertermopreenchido/${termo_id}`)
},

 sair(){
       localStorage.clear();
    },

async carregarDados(){

    await DataServices.listaFormTermos(this.nr_atendimento)
    .then(response => {
        this.termos_preenchidos  = response.data
    })
},

},
    
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');


#list { width: 50%; height:  auto; border-radius: 5px; align-content: center;  transform: translateX(50%);
}
.title {   border-radius: 8px; margin: 0;  background: #f0f0f5; text-align: center; }

h2 { font: 600 24px Roboto, sans-serif;  color: #333;  border-radius: 8px; margin: 0; padding: 15px 0; 
}
h3 {  font: 400 16px Roboto, sans-serif; margin-left: 10px; color: #333; border-bottom: 1px solid #B0C4DE; border-radius: 8px;  padding: 5px 0;  
}

ul{ width: 100%;  margin: 0;  padding: 0;
}

li { list-style: none; padding: 30px 0; border: 1px solid #B0C4DE; border-radius: 8px;  cursor: pointer;  width: auto;  height: 100%;
    font: 500 16px Roboto, sans-serif; text-align: center;  margin: 2px 0px;  color: #292828;  background: #4af3aa;
}

li:hover {  border: 2px solid #808080;  transition-duration: .1s;
}


.button {
    padding: 15px 8px;
    border-radius: 3px;
    background: #42b983 ;
    color: #000000;
    border: #42b983 ;
    position: fixed;
    right: 25px;
    bottom: 40px;
    font-size: 14px;
    width: 160px;   
}
img {
    position: absolute;
    top: 20px;
    left: 40px;
    width: 120px;
}



</style>