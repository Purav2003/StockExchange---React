import axios from "axios";

const TOKEN = "cepe5biad3i87vb20gagcepe5biad3i87vb20gb0"

export default axios.create({
    baseURL:"https://finnhub.io/api/v1",
    params:{
        token:TOKEN
    }
})