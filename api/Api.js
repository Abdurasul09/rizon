import axios from "axios"
export const baseUrl = "http://68.183.182.243/";
const Axios = axios.create({
    baseURL: baseUrl
});


Axios.interceptors.request.use((config) =>{
    config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("access"))}`;
    return config;
})

Axios.interceptors.response.use(
    (config)=>{
    return config;
},
    async (err) => {

        const originalRequest = err.config;
        if(!err.response)return
        if (err.response.status === 401 && !err.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.post("http://68.183.182.243/token/refresh/", {
                    refresh: JSON.parse(localStorage.getItem("refresh")),
                });
                localStorage.setItem("access", response.data.access);
                return Axios.request(originalRequest);
            } catch (e) {
                return Promise.reject(e);
            }
        } else {
            return Promise.reject(err);
        }
    });

export default Axios;