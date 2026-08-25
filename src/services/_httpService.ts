import axios, { type AxiosResponse } from "axios";
import { errorToast, showToast } from "../utils/toastUtils";

export const apiPath = import.meta.env.VITE_API_URL ?? "http://localhost:3001/";


axios.defaults.timeout=10000;

axios.interceptors.response.use((res)=>res,(error)=>{

    const res=error?.repons;
    if(!res?.status){
        errorToast("مشکلی از سمت سرور پیش آمده است...")
    } else if(res.status>=500){
        errorToast(`${res.status}مشکلی از سمت سرور رخ داده است`)
    }else if(res.status===401)
        errorToast("401 ورود غیر مجاز")
    else if(res.status===403)
        errorToast("شما مجاز به استفاده نیستید 403")
    else if(res.status>=400)
        errorToast(`${res.status} در ورود اطلاعات دقت کنید!`)
    else if(res.status>201)
        showToast(res?.data?.message || "در ورود اطلاعات دقت کنید.")

    return Promise.reject(error);
})










const httpService =<T>(
    url :string,
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    data?:unknown
):Promise<AxiosResponse<T>>=>{
    return axios({baseURL:apiPath,url,method,data})
    
}


export default httpService;