import axios from 'axios'

const api = axios.create({
  baseURL: 'http://[ip]:3333'
})

export default api