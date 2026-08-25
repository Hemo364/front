import { useState } from 'react';
import { createPortal } from 'react-dom';
import { postTaskCategoriesService, putTaskCategoriesService } from '../../../services/getTaskCategoriesService';
import { successToast } from '../../../utils/toastUtils';
import { useAppSelector } from '../../../redux/reduxHooks';

interface AddCategorieProps {
    onClose: () => void;
    onAdded: (categorie: categoriesType) => void;
    onUpdated?: (categorie: categoriesType) => void;
    categorie?: categoriesType;
}

const AddCategorie = ({ onClose, onAdded, onUpdated, categorie }: AddCategorieProps) => {
    const theme = useAppSelector((state) => state.uiManagerReducer.theme);
    const isEdit = Boolean(categorie);
    const [title, setTitle] = useState(categorie?.title ?? '');
    const [description, setDescription] = useState(categorie?.description ?? '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && categorie) {
            const res = await putTaskCategoriesService({
                ...categorie,
                title,
                description,
            });
            if (res?.data) {
                onUpdated?.(res.data);
                successToast('دسته با موفقیت ویرایش شد...');
                onClose();
            }
            return;
        }
        const res = await postTaskCategoriesService({
            title,
            description,
            icon: 'work_icon',
            userId: '1',
            createdAt: new Date().toISOString(),
        });
        if (res?.data) {
            onAdded(res.data);
            successToast('دسته با موفقیت اضافه شد...');
            onClose();
        }
    };

    return createPortal(
        <div onClick={onClose} className={`fixed inset-0 z-50 flex items-center justify-center dark:text-gray-100 bg-black/50 p-4 ${theme}`}>
            <div onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
                <h1 className="mb-5 font-bold">{isEdit ? 'ویرایش دسته بندی' : 'افزودن دسته بندی جدید'}</h1>
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white text-xl cursor-pointer"
                >
                    ✕
                </button>
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col my-3 mb-6  justify-center items-center">
                <div className="w-[70%]">
                    <label className="my-3 mb-2.5 text-sm font-medium text-heading">عنوان</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" id="title" className="bg-neutral-secondary-medium rounded mt-3 border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="فقط حروف فارسی" required />
                </div>
                <div className="w-[70%]">
                    <label className="my-4 mb-2.5 text-sm font-medium text-heading">توضیحات</label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" id="description" className="bg-neutral-secondary-medium rounded mt-3 border border-default-medium text-heading text-sm rounded-base focus:ring-brand  focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" required />
                </div>
            <button type="submit" className="p-3 border-b mt-2 bg-amber-400 rounded-md px-10 cursor-pointer hover:bg-amber-500 active:bg-amber-600">{isEdit ? 'ویرایش' : 'افزودن'}</button>
            </div>

        </form>
            </div>
        </div>,
        document.body
    );
};

export default AddCategorie;
