import Swal, { type SweetAlertIcon } from "sweetalert2";

export const confirmAlert =(
    title="آیا مطمئن هستید؟",
    text="",
    icon:SweetAlertIcon="warning",
    confirmButtonColor="#FF5555",
    confirmButtonText="تایید",


)=>{
    return Swal.fire({
        icon,
        title,
        text,
        showCancelButton:true,
        confirmButtonText,
        cancelButtonText:"انصراف",
        confirmButtonColor,
        cancelButtonColor:"gray"
    })

}