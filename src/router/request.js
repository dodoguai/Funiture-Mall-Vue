import axios from 'axios'
function request(config){

    const instance1=axios.create({
        baseURL:'http://127.0.0.1:9000'
    })
    const instance2=axios.create({
        baseURL:'http://127.0.0.1:9001'
    })
    return [instance1,instance2]
}
export default request();