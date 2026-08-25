import { getTaskCategoriesService } from '@/services/getTaskCategoriesService';
import { deleteTaskService, getTasksService, postTaskService, putTaskService } from '@/services/getTasksService';
import { confirmAlert } from '@/utils/sweetAlertUtils';
import { successToast } from '@/utils/toastUtils';
import { convertToJalali, getDateRange } from '@/utils/dateUtils';
import { useEffect, useRef, useState } from 'react';

const LONG_PRESS_DURATION = 500;

const Tasks = () => {
    const [dates, setDates] = useState<string[]>([]);
    const [categories, setCategories] = useState<categoriesType[]>([]);
    const [tasks, setTasks] = useState<taskType[]>([]);
    const [loading, setLoading] = useState(true);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const longPressTriggered = useRef(false);

    useEffect(() => {
        const fetchData = async () => {
            const resDates = getDateRange(3, 5);
            const [resCategories, resTasks] = await Promise.all([
                getTaskCategoriesService(),
                getTasksService(),
            ]);
            setDates(resDates);
            setCategories(resCategories);
            setTasks(resTasks);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleToggleTaskDone = async (task: taskType) => {
        const updatedTask = { ...task, isDone: !task.isDone };
        setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));
        try {
            await putTaskService(updatedTask);
        } catch {
            setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
        }
    };

    const handleCellClick = async (date: string, categoryId: string) => {
        const title = newTaskTitle.trim();
        if (!title) return;

        const newTask: Omit<taskType, 'id'> = {
            groupCode: '',
            title,
            description: '',
            isDone: false,
            taskCategoryId: categoryId,
            repetitionType: 0,
            repetitionItems: 1,
            includeVacation: true,
            startedAt: date,
            endedAt: null,
            createdAt: new Date().toISOString(),
        };

        setNewTaskTitle('');
        const res = await postTaskService(newTask);
        setTasks((prev) => [...prev, res.data]);
    };

    const handleDeleteTask = async (task: taskType) => {
        const confirm = await confirmAlert(task.title, 'آیا از حذف این آیتم اطمینان داری؟');
        if (confirm.isConfirmed) {
            await deleteTaskService(task);
            setTasks((prev) => prev.filter((t) => t.id !== task.id));
            successToast('تسک با موفقیت حذف شد...');
        }
    };

    const handleTaskContextMenu = (e: React.MouseEvent, task: taskType) => {
        e.preventDefault();
        e.stopPropagation();
        handleDeleteTask(task);
    };

    const handleTouchStart = (task: taskType) => {
        longPressTriggered.current = false;
        longPressTimer.current = setTimeout(() => {
            longPressTriggered.current = true;
            handleDeleteTask(task);
        }, LONG_PRESS_DURATION);
    };

    const clearLongPress = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }
    };

    const getTasksForCell = (date: string, categoryId: string) => {
        return tasks.filter(
            (task) =>
                task.taskCategoryId === categoryId &&
                convertToJalali(task.startedAt, 'jYYYY/jMM/jD') === convertToJalali(date, 'jYYYY/jMM/jD')
        );
    };

    if (loading) {
        return <div className="p-4 text-gray-600 dark:text-gray-300">در حال بارگذاری...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="mb-3 text-2xl font-bold">لیست تسک ها</h1>

            <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="عنوان تسک جدید را بنویسید و روی سلول موردنظر کلیک کنید..."
                className="mb-4 w-full max-w-md rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600">
                                <th className="p-3 font-semibold whitespace-nowrap">تاریخ</th>
                                {categories.map((category) => (
                                    <th key={category.id} className="p-3 font-semibold whitespace-nowrap">
                                        {category.title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dates.map((date) => (
                                <tr
                                    key={date}
                                    className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                >
                                    <td className="p-3 font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap">
                                        {convertToJalali(date)}
                                    </td>
                                    {categories.map((category) => {
                                        const cellTasks = getTasksForCell(date, category.id);
                                        return (
                                            <td
                                                key={category.id}
                                                onClick={() => handleCellClick(date, category.id)}
                                                className={`p-3 transition-shadow rounded-md ${
                                                    newTaskTitle.trim()
                                                        ? 'cursor-pointer hover:ring-2 hover:ring-blue-400 hover:ring-inset'
                                                        : ''
                                                }`}
                                            >
                                                {cellTasks.length > 0 ? (
                                                    <span className="flex flex-wrap gap-1.5">
                                                        {cellTasks.map((task) => (
                                                            <button
                                                                key={task.id}
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (longPressTriggered.current) return;
                                                                    handleToggleTaskDone(task);
                                                                }}
                                                                onContextMenu={(e) => handleTaskContextMenu(e, task)}
                                                                onTouchStart={() => handleTouchStart(task)}
                                                                onTouchEnd={clearLongPress}
                                                                onTouchMove={clearLongPress}
                                                                className={`inline-block rounded-md px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors cursor-pointer ${
                                                                    task.isDone
                                                                        ? 'bg-green-500 hover:bg-green-600'
                                                                        : 'bg-blue-500 hover:bg-blue-600'
                                                                }`}
                                                            >
                                                                {task.title}
                                                            </button>
                                                        ))}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-300 dark:text-gray-600">—</span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Tasks;
