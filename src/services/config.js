import axios from "axios";

export const http = axios.create({

    // baseURL: "http://192.168.43.236:8088/api/"
    baseURL: "https://api-hom-termo-digital.samel.com.br/api/"

});
