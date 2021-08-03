<template>
<div>
       <img src="../assets/samel-health-tech-logo.png" alt="logo-samel">

<div style="">
     
    <div id="list">
        <div class="title">
            <h2> Preencher Termos </h2>
            <h3>Número de Atendimento: <strong>{{this.nr_atendimento}} </strong> </h3>
        </div>
            <ul v-for="termos of  listaResultados" :key="termos.NR_SEQUENCIA"  >

            <li @click.prevent="armazenarTermo(termos.NR_SEQUENCIA)" 
                :class="{ inactive: termos.status }"> {{termos.DS_TERMO}} </li>

            </ul>
    </div>
    
</div>
    <button class="button" @click="$router.push(`/listartermospreenchidos/${nr_atendimento}`)" >
        <strong>   Termos Preenchidos</strong>
    </button>

</div>
</template>
    
<script>
import DataServices from '../services/DataServices'

export default {
    data(){
        return {

            listar_termos:[],
            armazenar_termo:'',
            nr_atendimento:this.$route.params.nr_atendimento,
            storage_nr_atendimento: '',
            listaFormTermos: '',
            listaResultados:''
        }
    },

mounted(){
    
     document.getElementById('screen').style.overflow = ''
  
    this.carregarDados()

},

methods: {
    

async carregarDados(){

 localStorage.setItem('storage_nr_atendimento', Number(this.nr_atendimento))

    await  DataServices.buscartermos().then(response => {
        this.listar_termos = response.data
  }
  )

    await DataServices.listaFormTermos(this.nr_atendimento)
    .then(response => {
        this.listaFormTermos = response.data
        this.buscarFormTermos()
    })
},

    buscarFormTermos() {

    if(this.listaFormTermos.length == 0){
        this.listaResultados = this.listar_termos 
    }else {

    for(let item of this.listaFormTermos){
        this.listaResultados = this.listar_termos.map(item2 => {
         if(item.NR_SEQ_TERMO_PADRAO == item2.NR_SEQUENCIA){
           item2['status'] = true
        }
            return item2
    }
    ) 
  }
}
},

armazenarTermo(termoSequencia) {

localStorage.setItem('armazenar_termo', Number(termoSequencia))

this.$router.push('/preenchertermo' )

}
},

}

</script>


<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');

.inactive{  background: #3aca8c; border: 1px solid #999999;  color: #666666; pointer-events:none;
}

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
.fundoImag{  width: auto; height: 100%; background-repeat: no-repeat; position: fixed; background-size: cover; margin: auto; left: 50%; transform: translateX(-50%);
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