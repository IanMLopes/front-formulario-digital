import Vue from 'vue'
import Router from 'vue-router'
//import axios from 'axios'

import ListaPreencherTermo from '../pages/ListaPreencherTermo'
import PreencherTermo from '../pages/PreencherTermo'
import ListarTermosPreenchidos from '../pages/ListarTermosPreenchidos'
import VerTermoPreenchido from '../pages/VerTermoPreenchido'
import SearchNr from '../pages/SearchNr'


const BASE_URL = process.env.VUE_APP_FRONT_SET_URL;
console.log(BASE_URL);

Vue.use(Router)

export default new Router({
      mode: 'hash',
    routes:[

        {
            path: '/',
            name: '/',
            component: SearchNr
        },
        {
            path: '/preenchertermo',
            name: 'preenchertermo',
            component: PreencherTermo
        },
        {
            path: '/vertermopreenchido/:termo_id',
            name: 'vertermopreenchido',
            component: VerTermoPreenchido
        },
        {
            path: '/listartermospreenchidos/:nr_atendimento' ,
            name: 'listartermospreenchidos',
            component: ListarTermosPreenchidos
             
         },

         {
            path: '/listapreenchertermo/:nr_atendimento' ,
            name: 'listapreenchertermo',
            component: ListaPreencherTermo
        },
        
    ]
})
