import {http} from "./config"

export default {

  buscar:(nr_sequencia, nr_atendimento) => {
    return http.get(`/usuarios/?nr_sequencia=${nr_sequencia}&nr_atendimento=${nr_atendimento}`);
  },

  buscartermos: (nr_atendimento) => {
    return  http.get(`/termos/:${nr_atendimento}`);
  },

// buscarNrAtendimento:(nr_atendimento) => {
//     return http.get(`/usuarios/?${nr_atendimento}`);
//   },


  create: (nr_atendimento, nr_seq_termo_padrao, termo_image, ) => {
    let json =  {
      nr_atendimento,
      nr_seq_termo_padrao,
      termo_image,
     
    }
      http.post(`/usuarios/enviar`,json).then(response => {
       return response
     })
      .catch(erro => {
       return erro
     })
  },

  validarNrAtendimento:(nr_atendimento) => {
    return http.get(`/usuarios/check?nr_atendimento=${nr_atendimento}`);
  },

  // nrExistir:(nr_atendimento) => {
  //   return http.get(`/usuarios/checkForm?nr_atendimento=${nr_atendimento}`);
  // },

  listaFormTermos:(nr_atendimento) => {
    return http.get(`/termos/checkTerms/${nr_atendimento}`);
  },

  }

  