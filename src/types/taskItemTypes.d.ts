type taskType = {
    id: string,
    groupCode: string,
    title: string,
    description: string,
    isDone: boolean,
    taskCategoryId: string,
    repetitionType: number,
    repetitionItems: number,
    includeVacation: boolean,
    startedAt: string,
    endedAt: string | null,
    createdAt: string
}
