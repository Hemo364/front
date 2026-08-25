import { useEffect, useState } from 'react';
import { deleteTaskCategoriesService, getTaskCategoriesService } from '../../services/getTaskCategoriesService';

import { convertToJalali } from '../../utils/dateUtils';

import { BsPencil, BsTrash3 } from 'react-icons/bs';
import { successToast } from '../../utils/toastUtils';
import AddCategorie from './_partials/AddCategorie';
import { confirmAlert } from '@/utils/sweetAlertUtils';


const Categories = () => {
    const [showModal,setShowModal]=useState(false);
    const [editingCategorie, setEditingCategorie] = useState<categoriesType | undefined>(undefined);
    const [categories, setCategories] = useState<categoriesType[]>([]);
    const [loading, setLoading] = useState(true);

    const getTasksCategories = async () => {
        const data = await getTaskCategoriesService();
        setCategories(data);
        setLoading(false);
    }
    useEffect(() => {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        getTasksCategories();
    }, [])

    if (loading) {
        return <div className="p-4 text-gray-600 dark:text-gray-300">در حال بارگذاری...</div>;
    }

    if (categories.length === 0) {
        return <div className="p-4 text-gray-600 dark:text-gray-300">دسته‌بندی‌ای یافت نشد</div>;
    }
    const handleCategorieAdded = (categorie: categoriesType) => {
        setCategories([...categories, categorie]);
    }
    const handleCategorieUpdated = (categorie: categoriesType) => {
        setCategories(categories.map((c) => (c.id === categorie.id ? categorie : c)));
    }
    const handleEditCategorie = (categorie: categoriesType) => {
        setEditingCategorie(categorie);
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
        setEditingCategorie(undefined);
    }
    const handleDeleteCategorie = async (categorie: categoriesType) => {
        const confirm = await confirmAlert("آیا مطمئن هستید؟")
        if(confirm.isConfirmed){

            await deleteTaskCategoriesService(categorie);
            setCategories(categories.filter((c) => c.id !== categorie.id));
            successToast("دسته با موفقیت حذف شد...")
        }
    }
    return (
        <div className="p-4">
            <div className='flex flex-row items-center  sm:justify-between sm:items-center text-center sm:text-right'>
                <h1 className='mb-3 text-2xl font-bold'>لیست دسته بندی وظایف</h1>
                <button onClick={() => { setEditingCategorie(undefined); setShowModal(true); }} className="p-3 m-2 rounded-full cursor-pointer dark:text-gray-100 bg-amber-400 hover:bg-amber-500 text-gray-900 transition-all duration-300 text-xs text-center w-auto min-w-[120px] flex items-center justify-center">
                    افزودن دسته بندی
                </button>

            </div>
            {showModal && (
                <AddCategorie
                    onClose={handleCloseModal}
                    onAdded={handleCategorieAdded}
                    onUpdated={handleCategorieUpdated}
                    categorie={editingCategorie}
                />
            )}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600 overflow-hidden">

                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600">
                                <th className="p-3 font-semibold">#</th>
                                <th className="p-3 font-semibold">عنوان</th>
                                <th className="p-3 font-semibold">توضیحات</th>
                                <th className="p-3 font-semibold">تاریخ ایجاد</th>
                                <th className="p-3 font-semibold">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat, index) => (
                                <tr
                                    key={cat.id}
                                    className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                >
                                    <td className="p-3 text-gray-500 dark:text-gray-400">{index + 1}</td>
                                    <td className="p-3 font-medium">{cat.title}</td>
                                    <td className="p-3 text-gray-600 dark:text-gray-300">{cat.description}</td>
                                    <td className="p-3 text-gray-600 dark:text-gray-300">{convertToJalali(cat.createdAt)}</td>
                                    <td className="">
                                        <button onClick={() => handleEditCategorie(cat)} className="p-2 rounded-full cursor-pointer dark:text-gray-100 bg-amber-400 hover:bg-amber-500 text-gray-900 transition-all duration-300 text-xs">
                                            <BsPencil size={15} />
                                        </button>
                                        <button onClick={() => handleDeleteCategorie(cat)} className="p-2 mr-5 rounded-full cursor-pointer dark:text-gray-100 bg-red-500 hover:bg-red-600 text-gray-900 transition-all duration-300 text-xs">
                                            <BsTrash3 size={15} />
                                        </button>
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
                    {categories.map((cat, index) => (
                        <div key={cat.id} className="p-3 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">{cat.title}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">#{index + 1}</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{cat.description}</p>
                            <div className="flex items-center justify-end ">
                                <span className="text-xs mx-2 text-gray-500 dark:text-gray-400">{convertToJalali(cat.createdAt)}</span>
                                <button onClick={() => handleEditCategorie(cat)} className="p-2 mx-2 rounded-full cursor-pointer dark:text-gray-100 bg-amber-400 hover:bg-amber-500 text-gray-900 transition-all duration-300 text-xs">
                                    <BsPencil size={12} />
                                </button>
                                <button className="p-2 rounded-full cursor-pointer dark:text-gray-100 bg-red-500 hover:bg-red-600 text-gray-900 transition-all duration-300 text-xs">
                                    <BsTrash3 size={12} />
                                </button>
                                <div></div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;
