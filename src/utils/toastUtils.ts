import { toast, type TypeOptions } from "react-toastify";

export const showToast =(text:string,icon:TypeOptions="info")=>{
    return toast(text,{
        closeOnClick:true,
        autoClose: 3000,
        // hideProgressBar: false,
        type: icon,
        rtl : true
    });
}


export const errorToast =(text="عملیات نا موفق")=>{
    return showToast(text,"error");
}
export const successToast =(text="عملیات موفق")=>{
    return showToast(text,"success");
}