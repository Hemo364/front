import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { BsChevronDown } from 'react-icons/bs';
import { postTaskService } from '@/services/getTasksService';
import { successToast } from '@/utils/toastUtils';
import { useAppSelector } from '@/redux/reduxHooks';

interface AddTaskModalProps {
    categories: categoriesType[];
    onClose: () => void;
    onAdded: (task: taskType) => void;
}

const AddTaskModal = ({ categories, onClose, onAdded }: AddTaskModalProps) => {
    const theme = useAppSelector((state) => state.uiManagerReducer.theme);
    const [taskCategoryId, setTaskCategoryId] = useState(categories[0]?.id ?? '');
    const [title, setTitle] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const categoryDropdownRef = useRef<HTMLDivElement>(null);
    const selectedCategory = categories.find((c) => c.id === taskCategoryId);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target as Node)) {
                setCategoryDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskCategoryId || !title.trim()) return;

        setSubmitting(true);
        try {
            const res = await postTaskService({
                groupCode: '',
                title: title.trim(),
                description: '',
                isDone: false,
                taskCategoryId,
                repetitionType: 0,
                repetitionItems: 1,
                includeVacation: true,
                startedAt: new Date().toISOString(),
                endedAt: null,
                createdAt: new Date().toISOString(),
            });
            if (res?.data) {
                onAdded(res.data);
                successToast('تسک با موفقیت اضافه شد...');
                onClose();
            }
        } finally {
            setSubmitting(false);
        }
    };

    return createPortal(
        <div
            onClick={onClose}
            className={`fixed inset-0 z-50 flex items-center justify-center dark:text-gray-100 bg-black/50 p-4 ${theme}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-sm p-6 relative"
            >
                <h2 className="mb-5 font-bold text-lg">افزودن تسک جدید</h2>
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white text-xl cursor-pointer"
                >
                    ✕
                </button>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div ref={categoryDropdownRef} className="relative">
                        <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-200">
                            دسته بندی
                        </label>
                        <button
                            type="button"
                            onClick={() => setCategoryDropdownOpen((prev) => !prev)}
                            disabled={categories.length === 0}
                            className="w-full flex items-center justify-between rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <span className={selectedCategory ? '' : 'text-gray-400 dark:text-gray-500'}>
                                {selectedCategory ? selectedCategory.title : 'دسته بندی‌ای موجود نیست'}
                            </span>
                            <BsChevronDown
                                size={12}
                                className={`text-gray-400 transition-transform shrink-0 ${categoryDropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {categoryDropdownOpen && categories.length > 0 && (
                            <ul className="absolute z-10 mt-1.5 w-full max-h-48 overflow-y-auto rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-lg py-1">
                                {categories.map((category) => (
                                    <li key={category.id}>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setTaskCategoryId(category.id);
                                                setCategoryDropdownOpen(false);
                                            }}
                                            className={`w-full text-right px-3 py-2 text-sm cursor-pointer transition-colors ${
                                                category.id === taskCategoryId
                                                    ? 'bg-blue-500 text-white'
                                                    : 'hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100'
                                            }`}
                                        >
                                            {category.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-200">
                            عنوان تسک
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="عنوان تسک را وارد کنید"
                            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting || categories.length === 0}
                        className="mt-2 rounded-md flex items-center justify-center bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 cursor-pointer transition-colors"
                    >
                        ثبت
                    </button>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default AddTaskModal;
