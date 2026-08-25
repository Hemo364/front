import httpService from "./_httpService";

export const getTasksService = async (): Promise<taskType[]> => {
    const repons = await httpService<taskType[]>("/tasks", "GET");
    if (repons.status === 200) return repons.data;
    return [];
}

export const putTaskService = (data: taskType) => {
    return httpService<taskType>(`/tasks/${data.id}`, "PUT", data);
}

export const postTaskService = (data: Omit<taskType, "id">) => {
    return httpService<taskType>("/tasks", "POST", data);
}

export const deleteTaskService = (data: taskType) => {
    return httpService<taskType>(`/tasks/${data.id}`, "DELETE");
}