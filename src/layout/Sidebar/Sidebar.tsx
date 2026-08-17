import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { SetSideBarShow, ToggleTheme } from "../../redux/ui-managment";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { LuEyeClosed } from "react-icons/lu";
type SidebarType = {
    className: string;

}
const Sidebar = ({ className }: SidebarType) => {
    const { theme } = useAppSelector(state => state.uiManagerReducer)
    const dispatch = useAppDispatch();
    return (
        <div className={className}>
            <div className="h-app-header-h flex flex-row items-center justify-between">
                <h3 className="mr-3">ساید بار</h3>
                <div className="flex flex-row items-center">
                    <button onClick={() => dispatch(ToggleTheme())} className={`btn-style text-2xl  ${theme==="dark" && "rotate-90"}`}>{theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}</button>
                    <button onClick={() => dispatch(SetSideBarShow(false))} className="block md:hidden btn-style text-2xl"> <LuEyeClosed /></button>
                </div>
            </div>
            <hr className="mx-5 border-b dark:text-gray-400" />
        </div>
    );
};

export default Sidebar;