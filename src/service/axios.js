import axios from "axios";

const Axios = axios.create({
    baseURL: 'https://filters.app3.speedio.com.br'
})

export default Axios