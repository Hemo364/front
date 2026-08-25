import { memo, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../redux/reduxHooks";
import { SetSideBarShow } from "../../redux/ui-managment";
import { RxHamburgerMenu } from "react-icons/rx";
import { BellIcon, CircleDotIcon, User2Icon } from "lucide-react";
import { convertToJalali } from "../../utils/dateUtils";
type HeaderType ={
    className:string;

}
const Header = ({className}:HeaderType) => {
    const dispatch=useAppDispatch();
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`${className} justify-between items-center px-4 gap-3`}>
            <button onClick={()=>{dispatch(SetSideBarShow(true))}} className="block md:hidden text-2xl btn-style">
                <RxHamburgerMenu />
            </button>

            <p className="hidden mr-5 sm:block text-sm text-gray-500 dark:text-gray-400">{convertToJalali()}</p>

            <div className="flex items-center gap-4">
                <div ref={notificationsRef} className="relative">
                    <button
                        onClick={() => setShowNotifications((prev) => !prev)}
                        className="relative p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                        <BellIcon size={20} />
                        <CircleDotIcon size={10} className="absolute top-1.5 left-1.5 text-red-500 fill-red-500" />
                    </button>

                    {showNotifications && (
                        <>
                            <div
                                onClick={() => setShowNotifications(false)}
                                className="fixed inset-0 z-40 sm:hidden bg-black/40"
                            />
                            <div
                                className="fixed sm:absolute z-50 left-4 right-4 top-16 sm:top-auto sm:left-auto sm:right-0 sm:mt-2 sm:w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden"
                            >
                                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">اعلان‌ها</p>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-2 py-10 px-4 text-center">
                                    <BellIcon size={28} className="text-gray-300 dark:text-gray-600" />
                                    <p className="text-sm text-gray-400 dark:text-gray-500">هیچ اعلانی ندارید</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-2 pr-4 border-r border-gray-200 dark:border-gray-700">
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-amber-400 text-gray-900 shrink-0">
                        <User2Icon size={18} />
                    </div>
                    <p className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200">کاربر مهمان</p>
                </div>
            </div>
        </div>
    );
};

export default memo(Header);