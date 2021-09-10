<template>

<div class="ver-termo">
        <div  v-for="termos in termos_preenchidos" :key="termos.NR_SEQ_TERMO_PADRAO">

                <div v-if="termos.NR_SEQ_TERMO_PADRAO == mostrar_termo_id">   
                    <div class="title">
                    <h3> Número de Atendimento: {{termos.NR_ATENDIMENTO}}  </h3>
                    <h3> {{termos.DS_TERMO}}  </h3>
                    </div>
                        <img class="image-termo"   v-bind:src="termos.TERMO_IMAGE" />   
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

</div>

</template>

<script>

import DataServices from '../services/DataServices'

export default {

    data(){

        return {
            termos_preenchidos:[],
             nr_atendimento:localStorage.getItem('storage_nr_atendimento'),
            mostrar_termo_id:this.$route.params.termo_id,
            
         }
    },


mounted(){
 this.carregarDados()

},

methods: {

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

.title {   border-radius: 8px; margin: 0;  text-align: center; }

h3 {  font: 500 16px Roboto, sans-serif; margin-left: 10px; color: #333; border-radius: 8px;  padding: 5px 0;  
}

.ver-termo .image-termo {
   position: relative !important;
   margin: 10px  auto !important;
   left: 50%;
   transform: translateX(-50%);
}

.button {
    padding: 15px 8px;
    border-radius: 3px;
    background: #42b983 ;
    color: #000000;
    border: #42b983 ;
    position: fixed;
    left: 25px;
    bottom: 20px;
    font-size: 14px;
    
    
}

</style>