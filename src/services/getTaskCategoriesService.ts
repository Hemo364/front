import httpService from "./_httpService";

export const getTaskCategoriesService = async():Promise<categoriesType[]>=>{
    const repons=await httpService<categoriesType[]>("/taskCategories","GET")
    if (repons.status==200 && Array.isArray(repons.data)) return repons.data;
    return [];
}
export const postTaskCategoriesService = (data: Omit<categoriesType, "id">)=>{
    return httpService<categoriesType>("/taskCategories","POST",data)
}
export const deleteTaskCategoriesService = (data:categoriesType)=>{
    return httpService<categoriesType>(`/taskCategories/${data.id}`,"DELETE")
}
export const putTaskCategoriesService = (data:categoriesType)=>{
    return httpService<categoriesType>(`/taskCategories/${data.id}`,"PUT",data)
}