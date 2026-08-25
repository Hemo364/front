import { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { getTaskCategoriesService } from '@/services/getTaskCategoriesService';
import { getTasksService, putTaskService } from '@/services/getTasksService';
import { convertToJalali } from '@/utils/dateUtils';
import AddTaskModal from './_partials/AddTaskModal';

const Dashboard = () => {
    const [categories, setCategories] = useState<categoriesType[]>([]);
    const [tasks, setTasks] = useState<taskType[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const [resCategories, resTasks] = await Promise.all([
                getTaskCategoriesService(),
                getTasksService(),
            ]);
            setCategories(resCategories);
            setTasks(resTasks);
            setLoading(false);
        };
        fetchData();
    }, []);

    const todayTasks = tasks.filter(
        (task) => convertToJalali(task.startedAt, 'jYYYY/jMM/jD') === convertToJalali(new Date().toISOString(), 'jYYYY/jMM/jD')
    );

    const getCategoryTitle = (categoryId: string) => categories.find((c) => c.id === categoryId)?.title;

    const handleToggleTaskDone = async (task: taskType) => {
        const updatedTask = { ...task, isDone: !task.isDone };
        setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));
        try {
            await putTaskService(updatedTask);
        } catch {
            setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
        }
    };

    const handleTaskAdded = (task: taskType) => {
        setTasks((prev) => [...prev, task]);
    };

    if (loading) {
        return <div className="p-4 text-gray-600 dark:text-gray-300">در حال بارگذاری...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="mb-4 text-2xl font-bold">تسک های امروز</h1>

            <div className="w-full  max-w-md mx-auto sm:mx-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-300 dark:border-gray-600 p-4">
                {todayTasks.length === 0 ? (
                    <div className="py-10 text-center text-gray-400 dark:text-gray-500 text-base">
                        امروز هیچ کاری ندارید😴
                    </div>
                ) : (
                    <div className="flex flex-col gap-2.5">
                        {todayTasks.map((task) => (
                            <button
                                key={task.id}
                                type="button"
                                onClick={() => handleToggleTaskDone(task)}
                                className={`w-full flex items-center justify-between gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${
                                    task.isDone
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600'
                                }`}
                            >
                                <span className="font-medium text-sm">{task.title}</span>
                                <span className={`text-xs shrink-0 ${task.isDone ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {getCategoryTitle(task.taskCategoryId)}
                                </span>
                            </button>
                        ))}
                    </div>
                )}

                <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-2.5 text-sm font-medium cursor-pointer transition-colors"
                >
                    <BsPlusLg size={14} />
                    افزودن تسک
                </button>
            </div>

            {showModal && (
                <AddTaskModal
                    categories={categories}
                    onClose={() => setShowModal(false)}
                    onAdded={handleTaskAdded}
                />
            )}
        </div>
    );
};

export default Dashboard;
